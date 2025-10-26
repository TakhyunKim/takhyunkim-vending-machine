import { Payment } from "./Payment";

import { generateUuid } from "@/shared/lib";

import type { CardPaymentInfo } from "../model";

export class CardPayment implements Payment {
  private readonly info: CardPaymentInfo;

  constructor(info: CardPaymentInfo) {
    this.info = info;
  }

  /**
   * @description 카드 결제 승인
   *
   * 카드사에서 승인 번호를 받은 상태로 실제 돈이 빠져나가지 않은 상태
   * 결제 가능하다는 점을 카드사로부터 확인 받은 상태
   */
  authorize() {
    const paymentId = generateUuid(this.info.cardNumber);
    return paymentId;
  }

  /**
   * @description 카드 구매
   *
   * 카드로 구매하는 과정
   *
   * @returns 결제 잔액(카드는 잔액이 없음)
   */
  purchase() {
    console.log("[CardPayment] 카드 구매");
    return 0;
  }

  /**
   * @description 카드 잔액 조회
   *
   * @returns 카드 잔액(카드는 잔액이 없음)
   */
  getBalance() {
    return 0;
  }
}
