import type { VendingMachineState } from "../model";

import type { Product } from "../../Product/lib";
import type { Payment } from "../../Payment/lib";
import type { Dispenser } from "../../Dispenser/lib";
import type { Change } from "../../Change/lib";

export class VendingMachine {
  private state: VendingMachineState;
  private readonly products: Product[];
  private readonly dispenser: Dispenser;
  private readonly change: Change;

  constructor(products: Product[], dispenser: Dispenser, change: Change) {
    this.products = products;
    this.dispenser = dispenser;
    this.change = change;
    this.state = { state: "idle", paymentId: undefined };
  }

  async initPayment(payment: Payment, info: unknown) {
    try {
      // 잔돈 한도 초과 체크
      this.change.checkLimitBalance();

      // 결제 수단 승인
      const authorizedState = await this.authorizePayment(payment, info);

      return authorizedState;
    } catch (error) {
      throw new Error("Failed to initialize payment", { cause: error });
    }
  }

  /**
   * @description 상품 구매
   *
   * @param payment 결제 수단
   * @param paymentId 결제 승인 번호
   * @returns 상품 구매 번호
   */
  async buyProduct(payment: Payment, product: Product) {
    try {
      // 상품 선택
      const selectedState = this.selectProduct(product.id);

      // 상품 구매
      await payment.purchase(selectedState.paymentId!, product.price);

      // 상품 배출
      this.dispenseProduct(product.id);

      return this.state;
    } catch (error) {
      throw new Error("Failed to buy product", { cause: error });
    }
  }

  dispenseChange(payment: Payment) {
    try {
      const change = this.change.getChange(payment.getBalance());
      const totalChange = Object.values(change).reduce(
        (acc, curr) => acc + curr,
        0
      );

      this.state = {
        state: "change",
        change: totalChange,
      };
    } catch (error) {
      throw new Error("Failed to dispense change", { cause: error });
    }
  }

  /**
   * @description 결제 수단 승인
   *
   * @param payment 결제 수단
   * @param info 결제 정보
   * @returns 결제 승인 번호
   */
  private async authorizePayment(payment: Payment, info: unknown) {
    try {
      const { paymentId } = await payment.authorize(info);

      if (!paymentId) {
        throw new Error("Payment ID not found");
      }

      this.state = {
        state: "authorized",
        paymentId,
      };

      return this.state;
    } catch (error) {
      throw new Error("Failed to authorize payment", { cause: error });
    }
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

    if (this.state.state !== "authorized") {
      throw new Error("Payment not authorized");
    }

    this.state = {
      state: "selecting",
      productId,
      paymentId: this.state.paymentId,
    };

    return this.state;
  }

  private dispenseProduct(productId: string) {
    try {
      if (this.state.state !== "purchased") {
        throw new Error("Product not purchased");
      }

      this.dispenser.dispense(productId);

      this.state = { state: "dispensing", productId };
    } catch (error) {
      throw new Error("Failed to dispense product", { cause: error });
    }
  }
}
