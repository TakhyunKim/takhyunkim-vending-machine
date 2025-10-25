import { CardGateway } from "./CardGateway";

import { generateUuid } from "@/shared/lib";

import type { CardPaymentInfo } from "../model";

/**
 * @description 삼성 카드 게이트웨이
 * - 과제를 수행하기 위해 카드 게이트웨이를 구현하지 않고 자체적으로 임의 구현
 *
 * - 승인: 카드사에 결제 요청을 보내고 승인 번호를 받는 과정
 * - 캡처: 승인 번호를 사용하여 결제를 완료하는 과정
 * - 취소: 결제를 취소하는 과정
 */
export class SamsungCardGateway extends CardGateway {
  authorize(card: CardPaymentInfo): Promise<{ paymentId: string }> {
    return Promise.resolve({ paymentId: generateUuid(card.cardNumber) });
  }

  purchase(amount: number): Promise<{ paymentId: string }> {
    return Promise.resolve({
      paymentId: generateUuid(String(amount)),
    });
  }
}
