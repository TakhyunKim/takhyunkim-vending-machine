export class Dispenser {
  constructor() {}

  /**
   * @description 배열 포지션 위치의 상품을 디스펜스
   *
   * 내부적으로 grabProduct -> dispenseToSlot 순서로 처리
   *
   * @param productPosition 상품 배열 포지션 (0부터 시작)
   */
  dispense(position: number) {
    this.grabProduct(position);
    this.dispenseToSlot(position);
  }

  /**
   * @description 특정 포지션의 상품을 잡음
   *
   * 디스펜서 암이 해당 포지션 위치로 이동하고
   * 모터를 회전시켜 상품을 잡거나 밀어냄
   *
   * @param productPosition 상품 배열 포지션
   */
  private grabProduct(productPosition: number) {
    this.moveToPosition(productPosition);
    this.rotateMotor(productPosition);
  }

  /**
   * @description 디스펜서 암을 특정 포지션 위치로 이동
   *
   * @param productPosition 이동할 상품 배열 포지션
   */
  private moveToPosition(productPosition: number) {
    console.log(`[Dispenser] ${productPosition} 위치로 이동합니다`);
  }

  /**
   * @description 모터를 회전시켜 상품을 잡거나 밀어냄
   *
   * @param productPosition 현재 상품 배열 포지션
   */
  private rotateMotor(productPosition: number) {
    console.log(`[Dispenser] ${productPosition} 위치로 모터를 회전합니다`);
  }

  /**
   * @description 상품을 배출구로 떨어뜨림
   *
   * @param productPosition 상품 배열 포지션
   */
  private dispenseToSlot(productPosition: number) {
    console.log(`[Dispenser] ${productPosition} 위치의 상품을 배출합니다`);
  }
}
