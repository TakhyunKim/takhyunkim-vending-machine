import { Subscribable } from "../../../shared/lib";

import type { Product } from "../../Product/lib";
import type { Payment } from "../../Payment/lib";
import type { Dispenser } from "../../Dispenser/lib";
import type { Change } from "../../Change/lib";

interface VendingMachineSnapshot {
  products: Product[];
  cashBalance: number;
}

export class VendingMachine extends Subscribable<
  () => void,
  VendingMachineSnapshot
> {
  private readonly dispenser: Dispenser;
  private readonly change: Change;

  constructor(products: Product[], dispenser: Dispenser, change: Change) {
    const snapshot: VendingMachineSnapshot = {
      products,
      cashBalance: 0,
    };
    super(snapshot);

    this.dispenser = dispenser;
    this.change = change;
  }

  initPayment(payment: Payment, amount: number) {
    // 잔돈 한도 초과 체크
    this.change.checkLimitBalance();

    // 결제 수단 승인
    payment.authorize(amount);

    this.snapshot = {
      ...this.snapshot,
      cashBalance: this.snapshot.cashBalance + amount,
    };

    this.notifyListeners();
  }

  /**
   * @description 상품 구매
   *
   * @param payment 결제 수단
   * @param paymentId 결제 승인 번호
   * @returns 상품 구매 번호
   */
  buyProduct(payment: Payment, productId: string) {
    // 상품 선택
    const product = this.selectProduct(productId);

    // 상품 구매
    const remainingBalance = payment.purchase(product.price);

    // 상품 배출
    this.dispenseProduct(product.id);

    // 상품 재고 감소
    product.decreaseQuantity();

    this.snapshot = {
      products: [...this.snapshot.products],
      cashBalance: remainingBalance,
    };

    // 상태 변경 알림
    this.notifyListeners();
  }

  /**
   * @description 잔돈 배출
   *
   * 결제 수단의 잔액을 참조하여 잔돈을 배출하는 과정
   *
   * @param payment 결제 수단
   */
  dispenseChange() {
    const change = this.change.getChange(this.snapshot.cashBalance);
    const totalChange = Object.entries(change).reduce(
      (acc, [key, value]) => acc + value * Number(key),
      0
    );

    // 잔액 초기화
    this.snapshot = {
      ...this.snapshot,
      cashBalance: 0,
    };

    // 상태 변경 알림
    this.notifyListeners();

    return totalChange;
  }

  /**
   * @description 상품 선택
   *
   * @param productId 상품 ID
   * @returns 상품 선택 상태
   */
  private selectProduct(productId: string) {
    const product = this.snapshot.products.find(({ id }) => id === productId);

    if (!product) {
      throw new Error("제품을 찾을 수 없습니다. 관리자에게 문의해주세요");
    }

    if (!product.isInStock()) {
      throw new Error("제품이 품절되었습니다");
    }

    return product;
  }

  private dispenseProduct(productId: string) {
    const product = this.snapshot.products.find(({ id }) => id === productId);

    if (!product) {
      throw new Error("제품을 찾을 수 없습니다. 관리자에게 문의해주세요");
    }

    const productPosition = this.snapshot.products.findIndex(
      ({ id }) => id === productId
    );

    this.dispenser.dispense(productPosition);
  }

  protected onSubscribe() {
    this.notifyListeners();
  }

  protected onUnsubscribe() {
    this.listeners.clear();
  }
}
