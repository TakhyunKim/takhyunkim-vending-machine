import { Payment } from "./Payment";

import { generateUuid } from "../../../shared/lib";

const ACCEPTED_CACHE_LIST = [100, 500, 1000, 5000, 10000] as const;

export class CashPayment implements Payment {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  /**
   * @description 현금 결제 승인
   *
   * 현금으로 결제를 승인하는 과정
   * 사용자가 사용가능한 결제 수단을 활용했는지 체크하는 과정
   */
  authorize(amount: number) {
    const isAccepted = ACCEPTED_CACHE_LIST.some((cache) => cache === amount);

    if (!isAccepted) {
      throw new Error("지원하지 않는 화폐 단위입니다");
    }

    const paymentId = generateUuid(amount.toString());
    return paymentId;
  }

  /**
   * @description 현금 구매
   *
   * 현금으로 구매하는 과정
   */
  purchase(amount: number) {
    if (this.balance < amount) {
      throw new Error("잔액이 부족합니다");
    }

    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}
