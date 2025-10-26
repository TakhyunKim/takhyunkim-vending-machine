import { describe, expect, test } from "vitest";

import { Change } from "./Change";

describe("Change", () => {
  describe("checkLimitBalance", () => {
    test("모든 화폐 단위가 제한을 만족하면 true를 반환한다", () => {
      const change = new Change(10, 10, 10, 10, 10);
      expect(change.checkLimitBalance()).toBe(true);
    });

    test("모든 화폐 단위가 제한을 초과하면 true를 반환한다", () => {
      const change = new Change(20, 20, 20, 20, 20);
      expect(change.checkLimitBalance()).toBe(true);
    });

    test("100원이 제한 미만이면 에러를 발생시킨다", () => {
      const change = new Change(9, 10, 10, 10, 10);
      expect(() => change.checkLimitBalance()).toThrow("100원 잔고 부족");
    });

    test("500원이 제한 미만이면 에러를 발생시킨다", () => {
      const change = new Change(10, 9, 10, 10, 10);
      expect(() => change.checkLimitBalance()).toThrow("500원 잔고 부족");
    });

    test("1000원이 제한 미만이면 에러를 발생시킨다", () => {
      const change = new Change(10, 10, 9, 10, 10);
      expect(() => change.checkLimitBalance()).toThrow("1000원 잔고 부족");
    });

    test("5000원이 제한 미만이면 에러를 발생시킨다", () => {
      const change = new Change(10, 10, 10, 9, 10);
      expect(() => change.checkLimitBalance()).toThrow("5000원 잔고 부족");
    });

    test("10000원이 제한 미만이면 에러를 발생시킨다", () => {
      const change = new Change(10, 10, 10, 10, 9);
      expect(() => change.checkLimitBalance()).toThrow("10000원 잔고 부족");
    });
  });

  describe("getChange", () => {
    describe("거스름돈 계산 성공", () => {
      test("1000원 거스름돈을 정확히 계산한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(1000)).toEqual({
          "10000": 0,
          "5000": 0,
          "1000": 1,
          "500": 0,
          "100": 0,
        });
      });

      test("5000원 거스름돈을 정확히 계산한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(5000)).toEqual({
          "10000": 0,
          "5000": 1,
          "1000": 0,
          "500": 0,
          "100": 0,
        });
      });

      test("10000원 거스름돈을 정확히 계산한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(10000)).toEqual({
          "10000": 1,
          "5000": 0,
          "1000": 0,
          "500": 0,
          "100": 0,
        });
      });

      test("여러 화폐 단위를 조합하여 거스름돈을 계산한다 (8600원)", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(8600)).toEqual({
          "10000": 0,
          "5000": 1,
          "1000": 3,
          "500": 1,
          "100": 1,
        });
      });

      test("모든 화폐 단위를 조합하여 거스름돈을 계산한다 (18700원)", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(18700)).toEqual({
          "10000": 1,
          "5000": 1,
          "1000": 3,
          "500": 1,
          "100": 2,
        });
      });

      test("100원 거스름돈을 정확히 계산한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(100)).toEqual({
          "10000": 0,
          "5000": 0,
          "1000": 0,
          "500": 0,
          "100": 1,
        });
      });

      test("500원 거스름돈을 정확히 계산한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(500)).toEqual({
          "10000": 0,
          "5000": 0,
          "1000": 0,
          "500": 1,
          "100": 0,
        });
      });
    });

    describe("잔액 차감", () => {
      test("거스름돈 지급 후 잔액이 정확히 차감된다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        change.getChange(8600); // 사용: 5000원 1개, 1000원 3개, 500원 1개, 100원 1개

        // 잔액이 업데이트되었는지 두 번째 요청으로 확인
        const secondChange = change.getChange(8600);
        expect(secondChange).toEqual({
          "10000": 0,
          "5000": 1,
          "1000": 3,
          "500": 1,
          "100": 1,
        });
      });

      test("큰 단위 화폐부터 우선적으로 사용한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        const result = change.getChange(15000);

        // 5000원 3개 대신 10000원 1개와 5000원 1개를 사용해야 함
        expect(result).toEqual({
          "10000": 1,
          "5000": 1,
          "1000": 0,
          "500": 0,
          "100": 0,
        });
      });

      test("연속된 거스름돈 요청을 올바르게 처리한다", () => {
        const change = new Change(10, 10, 10, 10, 2);

        change.getChange(10000); // 10000원 1개 사용
        change.getChange(10000); // 10000원 1개 사용

        // 이제 큰 금액은 5000원만 남음
        const result = change.getChange(5000);
        expect(result).toEqual({
          "10000": 0,
          "5000": 1,
          "1000": 0,
          "500": 0,
          "100": 0,
        });
      });
    });

    describe("에러 케이스", () => {
      test("100원 단위가 아닌 금액이면 에러를 발생시킨다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(() => change.getChange(150)).toThrow(
          "100원 단위로만 거슬러 줄 수 있습니다"
        );
      });

      test("100원 단위가 아닌 금액이면 에러를 발생시킨다 (1원)", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(() => change.getChange(1)).toThrow(
          "100원 단위로만 거슬러 줄 수 있습니다"
        );
      });

      test("100원 단위가 아닌 금액이면 에러를 발생시킨다 (99원)", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(() => change.getChange(99)).toThrow(
          "100원 단위로만 거슬러 줄 수 있습니다"
        );
      });

      test("잔돈이 전혀 없으면 에러를 발생시킨다", () => {
        const change = new Change(0, 0, 0, 0, 0);
        expect(() => change.getChange(100)).toThrow(
          "잔돈이 부족합니다. 관리자에게 문의해주세요."
        );
      });

      test("정확히 거슬러 줄 수 없으면 에러를 발생시킨다", () => {
        // 500원만 있는 경우, 100원을 거슬러 줄 수 없음
        const change = new Change(0, 2, 0, 0, 0);
        expect(() => change.getChange(100)).toThrow(
          "잔돈이 부족합니다. 관리자에게 문의해주세요."
        );
      });

      test("정확히 거슬러 줄 수 없으면 에러를 발생시킨다 (300원)", () => {
        // 500원만 있는 경우, 300원을 거슬러 줄 수 없음
        const change = new Change(0, 2, 0, 0, 0);
        expect(() => change.getChange(300)).toThrow(
          "잔돈이 부족합니다. 관리자에게 문의해주세요."
        );
      });

      test("총 잔액이 부족하면 에러를 발생시킨다", () => {
        const change = new Change(1, 1, 1, 1, 1); // 총 16600원
        expect(() => change.getChange(20000)).toThrow(
          "잔돈이 부족합니다. 관리자에게 문의해주세요."
        );
      });

      test("거스름돈 계산 실패 시 잔액이 차감되지 않는다", () => {
        const change = new Change(0, 1, 0, 0, 0);

        // 에러가 발생하는지 확인
        expect(() => change.getChange(100)).toThrow(
          "잔돈이 부족합니다. 관리자에게 문의해주세요."
        );

        // 잔액이 변경되지 않았으므로 500원은 여전히 사용 가능
        const result = change.getChange(500);
        expect(result).toEqual({
          "10000": 0,
          "5000": 0,
          "1000": 0,
          "500": 1,
          "100": 0,
        });
      });
    });

    describe("엣지 케이스", () => {
      test("0원 거스름돈 요청을 처리한다", () => {
        const change = new Change(10, 10, 10, 10, 10);
        expect(change.getChange(0)).toEqual({
          "10000": 0,
          "5000": 0,
          "1000": 0,
          "500": 0,
          "100": 0,
        });
      });

      test("큰 단위가 소진되면 작은 단위로 거슬러 준다", () => {
        const change = new Change(10, 10, 10, 0, 0);
        const result = change.getChange(5000);

        // 5000원이 없으므로 1000원 5개로 거슬러 줌
        expect(result).toEqual({
          "10000": 0,
          "5000": 0,
          "1000": 5,
          "500": 0,
          "100": 0,
        });
      });

      test("제한된 고액권으로 큰 금액을 처리한다", () => {
        const change = new Change(10, 10, 20, 0, 1);
        const result = change.getChange(15000);

        // 5000원이 없으므로 10000원 1개와 1000원 5개로 거슬러 줌
        expect(result).toEqual({
          "10000": 1,
          "5000": 0,
          "1000": 5,
          "500": 0,
          "100": 0,
        });
      });
    });
  });
});
