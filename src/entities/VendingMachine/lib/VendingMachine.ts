import type { Product } from "../../Product/lib";
import type { Payment } from "../../Payment/lib";
import type { Dispenser } from "../../Dispenser/lib";
import type { Change } from "../../Change/lib";

export class VendingMachine {
  private readonly dispenser: Dispenser;
  private readonly change: Change;

  private snapshot: {
    products: Product[];
    cashBalance: number;
  };
  private listeners: Set<() => void> = new Set();

  constructor(products: Product[], dispenser: Dispenser, change: Change) {
    this.dispenser = dispenser;
    this.change = change;

    this.snapshot = {
      products: products,
      cashBalance: 0,
    };
  }

  /**
   * @description 상태 변경 구독
   *
   * @param listener 상태 변경 시 호출될 콜백
   * @returns 구독 해제 함수
   */
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * @description 상태 스냅샷 반환
   *
   * @returns 현재 상태
   */
  getSnapshot() {
    return this.snapshot;
  }

  /**
   * @description 구독자들에게 상태 변경 알림
   */
  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
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
    payment.purchase(product.price);

    // 상품 배출
    this.dispenseProduct(product.id);

    this.snapshot = {
      ...this.snapshot,
      cashBalance: this.snapshot.cashBalance - product.price,
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
      throw new Error("Product not found");
    }

    if (!product.isInStock()) {
      throw new Error("Product is out of stock");
    }

    return product;
  }

  private dispenseProduct(productId: string) {
    const product = this.snapshot.products.find(({ id }) => id === productId);

    if (!product) {
      throw new Error("Product not found");
    }

    product.decreaseQuantity();

    this.snapshot = {
      ...this.snapshot,
      products: [...this.snapshot.products],
    };

    this.dispenser.dispense(productId);
  }
}
