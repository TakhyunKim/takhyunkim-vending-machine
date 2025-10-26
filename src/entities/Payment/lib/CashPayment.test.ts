import { describe, expect, test } from "vitest";

import { CashPayment } from "./CashPayment";

describe("CashPayment", () => {
  describe("constructor", () => {
    test("초기 잔액으로 CashPayment 인스턴스를 생성한다", () => {
      const cashPayment = new CashPayment(10000);
      expect(cashPayment.getBalance()).toBe(10000);
    });

    test("0원으로 CashPayment 인스턴스를 생성할 수 있다", () => {
      const cashPayment = new CashPayment(0);
      expect(cashPayment.getBalance()).toBe(0);
    });
  });

  describe("authorize", () => {
    test("100원 단위를 승인한다", () => {
      const cashPayment = new CashPayment(10000);
      const paymentId = cashPayment.authorize(100);
      expect(paymentId).toBeTruthy();
      expect(typeof paymentId).toBe("string");
    });

    test("500원 단위를 승인한다", () => {
      const cashPayment = new CashPayment(10000);
      const paymentId = cashPayment.authorize(500);
      expect(paymentId).toBeTruthy();
      expect(typeof paymentId).toBe("string");
    });

    test("1000원 단위를 승인한다", () => {
      const cashPayment = new CashPayment(10000);
      const paymentId = cashPayment.authorize(1000);
      expect(paymentId).toBeTruthy();
      expect(typeof paymentId).toBe("string");
    });

    test("5000원 단위를 승인한다", () => {
      const cashPayment = new CashPayment(10000);
      const paymentId = cashPayment.authorize(5000);
      expect(paymentId).toBeTruthy();
      expect(typeof paymentId).toBe("string");
    });

    test("10000원 단위를 승인한다", () => {
      const cashPayment = new CashPayment(10000);
      const paymentId = cashPayment.authorize(10000);
      expect(paymentId).toBeTruthy();
      expect(typeof paymentId).toBe("string");
    });

    test("지원하지 않는 화폐 단위(50원)는 에러를 발생시킨다", () => {
      const cashPayment = new CashPayment(10000);
      expect(() => cashPayment.authorize(50)).toThrow(
        "지원하지 않는 화폐 단위입니다"
      );
    });

    test("지원하지 않는 화폐 단위(2000원)는 에러를 발생시킨다", () => {
      const cashPayment = new CashPayment(10000);
      expect(() => cashPayment.authorize(2000)).toThrow(
        "지원하지 않는 화폐 단위입니다"
      );
    });

    test("지원하지 않는 화폐 단위(200원)는 에러를 발생시킨다", () => {
      const cashPayment = new CashPayment(10000);
      expect(() => cashPayment.authorize(200)).toThrow(
        "지원하지 않는 화폐 단위입니다"
      );
    });

    test("음수 금액은 에러를 발생시킨다", () => {
      const cashPayment = new CashPayment(10000);
      expect(() => cashPayment.authorize(-100)).toThrow(
        "지원하지 않는 화폐 단위입니다"
      );
    });

    test("0원은 에러를 발생시킨다", () => {
      const cashPayment = new CashPayment(10000);
      expect(() => cashPayment.authorize(0)).toThrow(
        "지원하지 않는 화폐 단위입니다"
      );
    });

    test("동일한 금액으로 여러 번 승인할 수 있다", () => {
      const cashPayment = new CashPayment(10000);
      const paymentId1 = cashPayment.authorize(1000);
      const paymentId2 = cashPayment.authorize(1000);

      // 각각 다른 paymentId를 받아야 함
      expect(paymentId1).toBeTruthy();
      expect(paymentId2).toBeTruthy();
      expect(paymentId1).not.toBe(paymentId2);
    });
  });

  describe("purchase", () => {
    test("잔액이 충분하면 구매가 성공하고 잔액을 차감한다", () => {
      const cashPayment = new CashPayment(10000);
      const remainingBalance = cashPayment.purchase(3000);

      expect(remainingBalance).toBe(7000);
      expect(cashPayment.getBalance()).toBe(7000);
    });

    test("잔액 전체를 사용할 수 있다", () => {
      const cashPayment = new CashPayment(5000);
      const remainingBalance = cashPayment.purchase(5000);

      expect(remainingBalance).toBe(0);
      expect(cashPayment.getBalance()).toBe(0);
    });

    test("잔액이 부족하면 에러를 발생시킨다", () => {
      const cashPayment = new CashPayment(1000);
      expect(() => cashPayment.purchase(2000)).toThrow("잔액이 부족합니다");
    });

    test("잔액이 부족하면 잔액이 차감되지 않는다", () => {
      const cashPayment = new CashPayment(1000);

      expect(() => cashPayment.purchase(2000)).toThrow("잔액이 부족합니다");
      expect(cashPayment.getBalance()).toBe(1000);
    });

    test("여러 번 구매할 수 있다", () => {
      const cashPayment = new CashPayment(10000);

      cashPayment.purchase(2000);
      expect(cashPayment.getBalance()).toBe(8000);

      cashPayment.purchase(3000);
      expect(cashPayment.getBalance()).toBe(5000);

      cashPayment.purchase(1000);
      expect(cashPayment.getBalance()).toBe(4000);
    });

    test("0원 구매를 처리할 수 있다", () => {
      const cashPayment = new CashPayment(5000);
      const remainingBalance = cashPayment.purchase(0);

      expect(remainingBalance).toBe(5000);
      expect(cashPayment.getBalance()).toBe(5000);
    });

    test("음수 금액으로 구매하면 잔액이 증가한다", () => {
      const cashPayment = new CashPayment(5000);
      const remainingBalance = cashPayment.purchase(-1000);

      expect(remainingBalance).toBe(6000);
      expect(cashPayment.getBalance()).toBe(6000);
    });
  });

  describe("getBalance", () => {
    test("현재 잔액을 반환한다", () => {
      const cashPayment = new CashPayment(15000);
      expect(cashPayment.getBalance()).toBe(15000);
    });

    test("구매 후 잔액이 변경된다", () => {
      const cashPayment = new CashPayment(10000);
      cashPayment.purchase(3000);
      expect(cashPayment.getBalance()).toBe(7000);
    });

    test("잔액은 구매 실패 시 변경되지 않는다", () => {
      const cashPayment = new CashPayment(1000);

      expect(() => cashPayment.purchase(2000)).toThrow("잔액이 부족합니다");
      expect(cashPayment.getBalance()).toBe(1000);
    });
  });

  describe("통합 시나리오", () => {
    test("승인과 구매를 연속으로 수행할 수 있다", () => {
      const cashPayment = new CashPayment(10000);

      // 승인
      const paymentId = cashPayment.authorize(5000);
      expect(paymentId).toBeTruthy();

      // 구매
      const remainingBalance = cashPayment.purchase(5000);
      expect(remainingBalance).toBe(5000);
    });

    test("여러 승인 후 구매를 할 수 있다", () => {
      const cashPayment = new CashPayment(20000);

      cashPayment.authorize(5000);
      cashPayment.authorize(1000);
      cashPayment.authorize(10000);

      cashPayment.purchase(5000);
      expect(cashPayment.getBalance()).toBe(15000);

      cashPayment.purchase(3000);
      expect(cashPayment.getBalance()).toBe(12000);
    });
  });
});
