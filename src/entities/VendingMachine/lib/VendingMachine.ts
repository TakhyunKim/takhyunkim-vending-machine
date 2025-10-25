import type { Product } from "../../Product/lib";
import type { Payment } from "../../Payment/lib";
import type { Dispenser } from "../../Dispenser/lib";
import type { Change } from "../../Change/lib";

export class VendingMachine {
  private readonly products: Product[];
  private readonly dispenser: Dispenser;
  private readonly change: Change;
  // 자판기 내에 현금 잔액
  private cashBalance: number;

  constructor(products: Product[], dispenser: Dispenser, change: Change) {
    this.products = products;
    this.dispenser = dispenser;
    this.change = change;
    this.cashBalance = 0;
  }

  initPayment(payment: Payment, amount: number) {
    // 잔돈 한도 초과 체크
    this.change.checkLimitBalance();

    // 결제 수단 승인
    const paymentId = payment.authorize(amount);
    return paymentId;
  }

  /**
   * @description 상품 구매
   *
   * @param payment 결제 수단
   * @param paymentId 결제 승인 번호
   * @returns 상품 구매 번호
   */
  buyProduct(payment: Payment, product: Product) {
    // 상품 선택
    this.selectProduct(product.id);

    // 상품 구매
    payment.purchase(product.price);

    // 상품 배출
    this.dispenseProduct(product.id);
  }

  /**
   * @description 잔돈 배출
   *
   * 결제 수단의 잔액을 참조하여 잔돈을 배출하는 과정
   *
   * @param payment 결제 수단
   */
  dispenseChange() {
    const change = this.change.getChange(this.cashBalance);
    const totalChange = Object.values(change).reduce(
      (acc, curr) => acc + curr,
      0
    );

    return totalChange;
  }

  getProducts() {
    return this.products;
  }

  getCashBalance() {
    return this.cashBalance;
  }

  /**
   * @description 상품 선택
   *
   * @param productId 상품 ID
   * @returns 상품 선택 상태
   */
  private selectProduct(productId: string) {
    const product = this.products.find(({ id }) => id === productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.isInStock()) {
      throw new Error("Product is out of stock");
    }
  }

  private dispenseProduct(productId: string) {
    const product = this.products.find(({ id }) => id === productId);

    if (!product) {
      throw new Error("Product not found");
    }

    product.decreaseQuantity();
    this.dispenser.dispense(productId);
  }
}
