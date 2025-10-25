import { Payment } from "./Payment";
import { CardGateway } from "./CardGateway";

import type { CardPaymentInfo } from "../model";

export class CardPayment implements Payment {
  private readonly info: CardPaymentInfo;
  private readonly cardGateway: CardGateway;

  constructor(info: CardPaymentInfo, cardGateway: CardGateway) {
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
    return paymentId;
  }

  /**
   * @description 카드 구매
   *
   * 카드로 구매하는 과정
   */
  async purchase(amount: number) {
    const { paymentId } = await this.cardGateway.purchase(amount);
    return paymentId;
  }
}
