import type { CardPaymentInfo } from "../model";

/**
 * @description 카드 게이트웨이 인터페이스
 *
 * - 승인: 카드사에 결제 요청을 보내고 승인 번호를 받는 과정
 * - 캡처: 승인 번호를 사용하여 결제를 완료하는 과정
 * - 취소: 결제를 취소하는 과정
 */
export abstract class CardGateway {
  abstract authorize(card: CardPaymentInfo): Promise<{ paymentId: string }>;
  abstract purchase(
    paymentId: string,
    amount: number
  ): Promise<{ paymentId: string }>;
  abstract cancel(paymentId: string): Promise<{ paymentId: string }>;
}
