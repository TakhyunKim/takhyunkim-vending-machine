import { beforeEach, describe, expect, test, vi } from "vitest";

import { VendingMachine } from "./VendingMachine";
import { Product } from "../../Product/lib";
import { Change } from "../../Change/lib";
import { Dispenser } from "../../Dispenser/lib";
import { CashPayment } from "../../Payment/lib";

describe("VendingMachine", () => {
  let vendingMachine: VendingMachine;
  let products: Product[];
  let dispenser: Dispenser;
  let change: Change;

  beforeEach(() => {
    // 테스트용 상품 생성
    products = [
      new Product({
        id: "cola",
        name: "콜라",
        price: 1000,
        quantity: 10,
      }),
      new Product({
        id: "cider",
        name: "사이다",
        price: 1200,
        quantity: 5,
      }),
      new Product({
        id: "water",
        name: "물",
        price: 800,
        quantity: 0,
      }),
    ];

    dispenser = new Dispenser();
    change = new Change(10, 10, 10, 10, 10);

    vendingMachine = new VendingMachine(products, dispenser, change);

    // console.log 모킹
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  describe("dispenseChange", () => {
    test("잔돈을 배출하고 잔액을 0으로 초기화한다", () => {
      const payment = new CashPayment(10000);
      vendingMachine.initPayment(payment, 5000);

      const changeAmount = vendingMachine.dispenseChange();

      expect(changeAmount).toBe(5000);
      expect(vendingMachine.getSnapshot().cashBalance).toBe(0);
    });

    test("구매 후 남은 잔액을 거슬러준다", () => {
      const payment = new CashPayment(5000);
      vendingMachine.initPayment(payment, 5000);
      vendingMachine.buyProduct(payment, "cola");

      const changeAmount = vendingMachine.dispenseChange();

      expect(changeAmount).toBe(4000);
      expect(vendingMachine.getSnapshot().cashBalance).toBe(0);
    });

    test("잔액이 0일 때도 거스름돈을 배출할 수 있다", () => {
      const changeAmount = vendingMachine.dispenseChange();

      expect(changeAmount).toBe(0);
      expect(vendingMachine.getSnapshot().cashBalance).toBe(0);
    });
  });

  describe("통합 시나리오", () => {
    test("결제 초기화 -> 상품 구매 -> 잔돈 배출 전체 흐름이 정상 동작한다", () => {
      const payment = new CashPayment(5000);

      // 1. 결제 초기화
      vendingMachine.initPayment(payment, 5000);
      expect(vendingMachine.getSnapshot().cashBalance).toBe(5000);

      // 2. 상품 구매
      vendingMachine.buyProduct(payment, "cola");
      expect(vendingMachine.getSnapshot().cashBalance).toBe(4000);

      // 3. 잔돈 배출
      const changeAmount = vendingMachine.dispenseChange();
      expect(changeAmount).toBe(4000);
      expect(vendingMachine.getSnapshot().cashBalance).toBe(0);
    });

    test("여러 상품 구매 후 잔돈을 배출한다", () => {
      const payment = new CashPayment(10000);

      vendingMachine.initPayment(payment, 10000);
      vendingMachine.buyProduct(payment, "cola"); // 1000원
      vendingMachine.buyProduct(payment, "cider"); // 1200원
      vendingMachine.buyProduct(payment, "cola"); // 1000원

      const changeAmount = vendingMachine.dispenseChange();
      expect(changeAmount).toBe(6800);
    });

    test("구독자에게 상태 변경을 알린다", () => {
      const listener = vi.fn();
      vendingMachine.subscribe(listener);

      const payment = new CashPayment(10000);
      vendingMachine.initPayment(payment, 5000);

      expect(listener).toHaveBeenCalled();
    });
  });
});
