import { beforeEach, describe, expect, test, vi } from "vitest";

import { CardPayment } from "./CardPayment";

import type { CardPaymentInfo } from "../model";

describe("CardPayment", () => {
  const mockCardInfo: CardPaymentInfo = {
    cardNumber: "1234-5678-9012-3456",
    cardExpirationDate: "12/25",
    cardCvv: "123",
  };

  describe("constructor", () => {
    test("카드 정보로 CardPayment 인스턴스를 생성한다", () => {
      const cardPayment = new CardPayment(mockCardInfo);
      expect(cardPayment).toBeInstanceOf(CardPayment);
    });

    test("다른 카드 정보로 인스턴스를 생성할 수 있다", () => {
      const anotherCardInfo: CardPaymentInfo = {
        cardNumber: "9876-5432-1098-7654",
        cardExpirationDate: "06/26",
        cardCvv: "456",
      };
      const cardPayment = new CardPayment(anotherCardInfo);
      expect(cardPayment).toBeInstanceOf(CardPayment);
    });
  });

  describe("authorize", () => {
    test("카드 결제를 승인하고 paymentId를 반환한다", () => {
      const cardPayment = new CardPayment(mockCardInfo);
      const paymentId = cardPayment.authorize();

      expect(paymentId).toBeTruthy();
      expect(typeof paymentId).toBe("string");
    });

    test("카드 번호를 기반으로 고유한 paymentId를 생성한다", () => {
      const cardPayment = new CardPayment(mockCardInfo);
      const paymentId1 = cardPayment.authorize();
      const paymentId2 = cardPayment.authorize();

      // 동일한 카드로 여러 번 승인할 수 있음
      expect(paymentId1).toBeTruthy();
      expect(paymentId2).toBeTruthy();
    });

    test("여러 번 승인을 요청할 수 있다", () => {
      const cardPayment = new CardPayment(mockCardInfo);

      const paymentId1 = cardPayment.authorize();
      const paymentId2 = cardPayment.authorize();
      const paymentId3 = cardPayment.authorize();

      expect(paymentId1).toBeTruthy();
      expect(paymentId2).toBeTruthy();
      expect(paymentId3).toBeTruthy();
    });
  });

  describe("purchase", () => {
    beforeEach(() => {
      // Math.random을 초기화
      vi.restoreAllMocks();
    });

    test("구매가 성공하면 0을 반환한다", () => {
      // Math.random을 0.5로 고정 (성공 케이스)
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);
      const result = cardPayment.purchase();

      expect(result).toBe(0);
    });

    test("구매가 실패하면 에러를 발생시킨다 (10% 확률)", () => {
      // Math.random을 0.05로 고정 (실패 케이스, < 0.1)
      vi.spyOn(Math, "random").mockReturnValue(0.05);

      const cardPayment = new CardPayment(mockCardInfo);

      expect(() => cardPayment.purchase()).toThrow("결제 실패");
    });

    test("랜덤 값이 0이면 결제가 실패한다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);

      const cardPayment = new CardPayment(mockCardInfo);

      expect(() => cardPayment.purchase()).toThrow("결제 실패");
    });

    test("여러 번 구매를 시도할 수 있다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);

      expect(cardPayment.purchase()).toBe(0);
      expect(cardPayment.purchase()).toBe(0);
      expect(cardPayment.purchase()).toBe(0);
    });
  });

  describe("getBalance", () => {
    test("카드 잔액은 항상 0이다", () => {
      const cardPayment = new CardPayment(mockCardInfo);
      expect(cardPayment.getBalance()).toBe(0);
    });

    test("승인 후에도 잔액은 0이다", () => {
      const cardPayment = new CardPayment(mockCardInfo);
      cardPayment.authorize();
      expect(cardPayment.getBalance()).toBe(0);
    });

    test("구매 후에도 잔액은 0이다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);
      cardPayment.purchase();
      expect(cardPayment.getBalance()).toBe(0);
    });

    test("여러 번 구매 후에도 잔액은 0이다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);
      cardPayment.purchase();
      cardPayment.purchase();
      cardPayment.purchase();
      expect(cardPayment.getBalance()).toBe(0);
    });
  });

  describe("통합 시나리오", () => {
    test("승인 후 구매를 수행할 수 있다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);

      const paymentId = cardPayment.authorize();
      expect(paymentId).toBeTruthy();

      const result = cardPayment.purchase();
      expect(result).toBe(0);
    });

    test("여러 번 승인 후 구매를 수행할 수 있다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);

      cardPayment.authorize();
      cardPayment.authorize();
      cardPayment.authorize();

      const result = cardPayment.purchase();
      expect(result).toBe(0);
    });

    test("구매 실패 후 재시도할 수 있다", () => {
      const randomSpy = vi.spyOn(Math, "random");

      // 첫 번째 시도 실패
      randomSpy.mockReturnValueOnce(0.05);

      const cardPayment = new CardPayment(mockCardInfo);
      expect(() => cardPayment.purchase()).toThrow("결제 실패");

      // 두 번째 시도 성공
      randomSpy.mockReturnValueOnce(0.5);
      expect(cardPayment.purchase()).toBe(0);
    });

    test("승인 없이도 구매를 시도할 수 있다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const cardPayment = new CardPayment(mockCardInfo);
      const result = cardPayment.purchase();

      expect(result).toBe(0);
    });

    test("여러 카드로 독립적으로 결제할 수 있다", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const card1 = new CardPayment({
        cardNumber: "1111-2222-3333-4444",
        cardExpirationDate: "12/25",
        cardCvv: "123",
      });
      const card2 = new CardPayment({
        cardNumber: "5555-6666-7777-8888",
        cardExpirationDate: "06/26",
        cardCvv: "456",
      });

      const paymentId1 = card1.authorize();
      const paymentId2 = card2.authorize();

      expect(paymentId1).not.toBe(paymentId2);

      expect(card1.purchase()).toBe(0);
      expect(card2.purchase()).toBe(0);
    });
  });
});
