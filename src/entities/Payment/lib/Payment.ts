/**
 * @description 결제 인터페이스
 *
 * - 승인: 결제 요청을 보내고 승인 번호를 받는 과정
 * - 구매: 승인 번호를 사용하여 결제를 완료하는 과정
 * - 취소: 결제를 취소하는 과정
 */
export abstract class Payment {
  /**
   * @description 결제 승인
   *
   * 결제 요청을 보내고 승인 번호를 받는 과정
   * 결제 가능하다는 점을 결제 서비스로부터 확인 받은 상태
   *
   * @param info 결제 정보(cash: 현금 결제 금액, card: 카드 결제 정보)
   * @returns 결제 승인 번호
   */
  abstract authorize(info: unknown): void;

  /**
   * @description 결제 구매
   *
   * 결제 요청을 보내고 결제 완료 번호를 받는 과정
   *
   * @param paymentId 결제 승인 번호
   * @param amount 결제 금액
   * @returns 결제 완료 번호
   */
  abstract purchase(amount: number): void;

  abstract getBalance(): number;
}
