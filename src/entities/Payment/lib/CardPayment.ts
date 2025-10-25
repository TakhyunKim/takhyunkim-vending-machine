import { Payment } from "./Payment";
import { CardGateway } from "./CardGateway";

import type { CardPaymentInfo, PaymentState } from "../model";

export class CardPayment implements Payment {
  private state: PaymentState;
  private readonly info: CardPaymentInfo;
  private readonly cardGateway: CardGateway;

  constructor(info: CardPaymentInfo, cardGateway: CardGateway) {
    this.state = { state: "idle", balance: 0 };
    this.info = info;
    this.cardGateway = cardGateway;
  }

  /**
   * @description 카드 결제 승인
   *
   * 카드사에서 승인 번호를 받은 상태로 실제 돈이 빠져나가지 않은 상태
   * 결제 가능하다는 점을 카드사로부터 확인 받은 상태
   */
  async authorize() {
    const { paymentId } = await this.cardGateway.authorize(this.info);
    this.state = {
      state: "authorized",
      paymentId,
      balance: 0,
    };

    return this.state;
  }

  /**
   * @description 카드 구매
   *
   * 카드로 구매하는 과정
   */
  async purchase(id: string, amount: number) {
    const { paymentId } = await this.cardGateway.purchase(id, amount);
    this.state = { state: "purchased", paymentId, balance: 0 };

    return this.state;
  }

  /**
   * @description 결제 취소
   *
   * 결제를 취소하는 과정
   * 결제 취소된 상태
   */
  async cancel(paymentId: string) {
    await this.cardGateway.cancel(paymentId);
    this.state = { state: "canceled", paymentId, balance: 0 };

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
