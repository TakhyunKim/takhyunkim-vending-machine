import {
  afterEach,
  beforeEach,
  describe,
  expect,
  type MockInstance,
  test,
  vi,
} from "vitest";

import { Dispenser } from "./Dispenser";

describe("Dispenser", () => {
  let consoleLogSpy: MockInstance;

  beforeEach(() => {
    // console.log를 스파이하여 호출 내역을 추적
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // 각 테스트 후 스파이 복원
    consoleLogSpy.mockRestore();
  });

  describe("dispense", () => {
    test("상품을 배출하는 전체 프로세스를 실행한다", () => {
      const dispenser = new Dispenser();
      const position = 0;

      dispenser.dispense(position);

      // 총 3번의 console.log 호출이 있어야 함 (moveToPosition, rotateMotor, dispenseToSlot)
      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    });

    test("포지션 0의 상품을 배출할 때 올바른 순서로 동작한다", () => {
      const dispenser = new Dispenser();
      const position = 0;

      dispenser.dispense(position);

      // 1. 포지션으로 이동
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        `[Dispenser] ${position} 위치로 이동합니다`
      );

      // 2. 모터 회전
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        2,
        `[Dispenser] ${position} 위치로 모터를 회전합니다`
      );

      // 3. 상품 배출
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        3,
        `[Dispenser] ${position} 위치의 상품을 배출합니다`
      );
    });

    test("포지션 5의 상품을 배출할 때 올바른 순서로 동작한다", () => {
      const dispenser = new Dispenser();
      const position = 5;

      dispenser.dispense(position);

      // 올바른 포지션으로 로그가 출력되는지 확인
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        `[Dispenser] ${position} 위치로 이동합니다`
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        2,
        `[Dispenser] ${position} 위치로 모터를 회전합니다`
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        3,
        `[Dispenser] ${position} 위치의 상품을 배출합니다`
      );
    });

    test("여러 포지션의 상품을 연속으로 배출할 수 있다", () => {
      const dispenser = new Dispenser();

      dispenser.dispense(0);
      dispenser.dispense(1);
      dispenser.dispense(2);

      // 3개의 배출 프로세스 = 총 9번의 console.log 호출
      expect(consoleLogSpy).toHaveBeenCalledTimes(9);

      // 첫 번째 배출 (position 0)
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        "[Dispenser] 0 위치로 이동합니다"
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        2,
        "[Dispenser] 0 위치로 모터를 회전합니다"
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        3,
        "[Dispenser] 0 위치의 상품을 배출합니다"
      );

      // 두 번째 배출 (position 1)
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        4,
        "[Dispenser] 1 위치로 이동합니다"
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        5,
        "[Dispenser] 1 위치로 모터를 회전합니다"
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        6,
        "[Dispenser] 1 위치의 상품을 배출합니다"
      );

      // 세 번째 배출 (position 2)
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        7,
        "[Dispenser] 2 위치로 이동합니다"
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        8,
        "[Dispenser] 2 위치로 모터를 회전합니다"
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        9,
        "[Dispenser] 2 위치의 상품을 배출합니다"
      );
    });

    test("음수 포지션도 처리할 수 있다", () => {
      const dispenser = new Dispenser();
      const position = -1;

      dispenser.dispense(position);

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        `[Dispenser] ${position} 위치로 이동합니다`
      );
    });

    test("큰 포지션 번호도 처리할 수 있다", () => {
      const dispenser = new Dispenser();
      const position = 99;

      dispenser.dispense(position);

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        `[Dispenser] ${position} 위치로 이동합니다`
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        2,
        `[Dispenser] ${position} 위치로 모터를 회전합니다`
      );
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        3,
        `[Dispenser] ${position} 위치의 상품을 배출합니다`
      );
    });
  });

  describe("배출 프로세스 내부 동작", () => {
    test("moveToPosition이 먼저 호출된다", () => {
      const dispenser = new Dispenser();

      dispenser.dispense(0);

      // 첫 번째 로그가 이동 관련이어야 함
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        1,
        "[Dispenser] 0 위치로 이동합니다"
      );
    });

    test("rotateMotor가 moveToPosition 다음에 호출된다", () => {
      const dispenser = new Dispenser();

      dispenser.dispense(0);

      // 두 번째 로그가 모터 회전 관련이어야 함
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        2,
        "[Dispenser] 0 위치로 모터를 회전합니다"
      );
    });

    test("dispenseToSlot이 마지막에 호출된다", () => {
      const dispenser = new Dispenser();

      dispenser.dispense(0);

      // 세 번째 로그가 상품 배출 관련이어야 함
      expect(consoleLogSpy).toHaveBeenNthCalledWith(
        3,
        "[Dispenser] 0 위치의 상품을 배출합니다"
      );
    });
  });

  describe("인스턴스 생성", () => {
    test("새 Dispenser 인스턴스를 생성할 수 있다", () => {
      const dispenser = new Dispenser();
      expect(dispenser).toBeInstanceOf(Dispenser);
    });

    test("여러 Dispenser 인스턴스를 독립적으로 사용할 수 있다", () => {
      const dispenser1 = new Dispenser();
      const dispenser2 = new Dispenser();

      dispenser1.dispense(0);
      dispenser2.dispense(1);

      // 총 6번의 호출 (각각 3번씩)
      expect(consoleLogSpy).toHaveBeenCalledTimes(6);
    });
  });
});
