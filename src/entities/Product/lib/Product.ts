import type { ProductType } from "../model";

export class Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  quantity: number;

  constructor(product: ProductType) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
  }

  isInStock() {
    return this.quantity > 0;
  }

  decreaseQuantity() {
    if (!this.isInStock()) {
      throw new Error("제품이 품절되었습니다");
    }

    this.quantity -= 1;
    return this.quantity;
  }

  increaseQuantity() {
    this.quantity += 1;
    return this.quantity;
  }
}
