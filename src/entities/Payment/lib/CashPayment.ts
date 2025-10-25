import { Payment } from "./Payment";

import { generateUuid } from "../../../shared/lib";

import type { PaymentState } from "../model";

const ACCEPTED_CACHE_LIST = [100, 500, 1000, 5000, 10000] as const;

export class CashPayment implements Payment {
  private state: PaymentState;

  constructor(balance: number) {
    this.state = { state: "idle", balance };
  }

  /**
   * @description 현금 결제 승인
   *
   * 현금으로 결제를 승인하는 과정
   * 사용자가 사용가능한 결제 수단을 활용했는지 체크하는 과정
   */
  async authorize(amount: number) {
    const isAccepted = ACCEPTED_CACHE_LIST.some((cache) => cache === amount);

    if (!isAccepted) {
      throw new Error("Invalid amount");
    }

    const paymentId = generateUuid(amount.toString());

    const previousBalance = this.state.balance;

    this.state = {
      state: "authorized",
      paymentId,
      balance: previousBalance + amount,
    };

    return this.state;
  }

  /**
   * @description 현금 구매
   *
   * 현금으로 구매하는 과정
   */
  async purchase(paymentId: string, amount: number) {
    const previousBalance = this.state.balance;

    if (previousBalance < amount) {
      throw new Error("Insufficient balance");
    }

    this.state = {
      state: "purchased",
      paymentId,
      balance: previousBalance - amount,
    };

    return this.state;
  }

  /**
   * @description 현금 결제 취소
   *
   * 현금으로 결제를 취소하는 과정
   */
  async cancel(paymentId: string) {
    this.state = { state: "canceled", paymentId, balance: this.state.balance };

    return this.state;
  }

  done() {
    this.state = { state: "idle", balance: 0 };
    return this.state;
  }

  getBalance() {
    return this.state.balance;
  }
}
