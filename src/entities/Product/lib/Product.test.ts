import { describe, expect, test } from "vitest";

import { Product } from "./Product";

import type { ProductType } from "../model";

describe("Product", () => {
  const mockProduct: ProductType = {
    id: "product-1",
    name: "콜라",
    price: 1000,
    quantity: 10,
  };

  describe("constructor", () => {
    test("상품 정보로 Product 인스턴스를 생성한다", () => {
      const product = new Product(mockProduct);

      expect(product.id).toBe("product-1");
      expect(product.name).toBe("콜라");
      expect(product.price).toBe(1000);
      expect(product.quantity).toBe(10);
    });

    test("여러 상품 인스턴스를 독립적으로 생성할 수 있다", () => {
      const product1 = new Product({
        id: "product-1",
        name: "콜라",
        price: 1000,
        quantity: 10,
      });

      const product2 = new Product({
        id: "product-2",
        name: "사이다",
        price: 1200,
        quantity: 5,
      });

      expect(product1.id).toBe("product-1");
      expect(product2.id).toBe("product-2");
    });
  });

  describe("isInStock", () => {
    test("재고가 있으면 true를 반환한다", () => {
      const product = new Product(mockProduct);
      expect(product.isInStock()).toBe(true);
    });

    test("재고가 0이면 false를 반환한다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 0,
      });
      expect(product.isInStock()).toBe(false);
    });

    test("재고 감소 후 재고 상태를 올바르게 반환한다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 1,
      });

      expect(product.isInStock()).toBe(true);
      product.decreaseQuantity();
      expect(product.isInStock()).toBe(false);
    });

    test("재고 증가 후 재고 상태를 올바르게 반환한다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 0,
      });

      expect(product.isInStock()).toBe(false);
      product.increaseQuantity();
      expect(product.isInStock()).toBe(true);
    });
  });

  describe("decreaseQuantity", () => {
    test("재고를 1 감소시킨다", () => {
      const product = new Product(mockProduct);
      const newQuantity = product.decreaseQuantity();

      expect(newQuantity).toBe(9);
      expect(product.quantity).toBe(9);
    });

    test("여러 번 재고를 감소시킬 수 있다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 5,
      });

      product.decreaseQuantity();
      expect(product.quantity).toBe(4);

      product.decreaseQuantity();
      expect(product.quantity).toBe(3);

      product.decreaseQuantity();
      expect(product.quantity).toBe(2);
    });

    test("재고가 1개일 때 감소시키면 0이 된다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 1,
      });

      const newQuantity = product.decreaseQuantity();

      expect(newQuantity).toBe(0);
      expect(product.quantity).toBe(0);
    });

    test("재고가 0일 때 에러 발생 후 재고는 변하지 않는다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 0,
      });

      expect(() => product.decreaseQuantity()).toThrow("제품이 품절되었습니다");
      expect(product.quantity).toBe(0);
    });
  });

  describe("increaseQuantity", () => {
    test("재고를 1 증가시킨다", () => {
      const product = new Product(mockProduct);
      const newQuantity = product.increaseQuantity();

      expect(newQuantity).toBe(11);
      expect(product.quantity).toBe(11);
    });

    test("여러 번 재고를 증가시킬 수 있다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 0,
      });

      product.increaseQuantity();
      expect(product.quantity).toBe(1);

      product.increaseQuantity();
      expect(product.quantity).toBe(2);

      product.increaseQuantity();
      expect(product.quantity).toBe(3);
    });

    test("재고 감소 후 다시 증가시킬 수 있다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 5,
      });

      product.decreaseQuantity(); // 4
      expect(product.quantity).toBe(4);

      product.increaseQuantity(); // 5
      expect(product.quantity).toBe(5);
    });
  });

  describe("통합 시나리오", () => {
    test("재고 감소와 증가를 반복할 수 있다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 5,
      });

      product.decreaseQuantity(); // 4
      product.decreaseQuantity(); // 3
      product.increaseQuantity(); // 4
      product.decreaseQuantity(); // 3
      product.increaseQuantity(); // 4
      product.increaseQuantity(); // 5

      expect(product.quantity).toBe(5);
    });

    test("재고를 모두 소진 후 다시 충전할 수 있다", () => {
      const product = new Product({
        ...mockProduct,
        quantity: 2,
      });

      product.decreaseQuantity(); // 1
      product.decreaseQuantity(); // 0
      expect(product.isInStock()).toBe(false);

      product.increaseQuantity(); // 1
      expect(product.isInStock()).toBe(true);

      product.decreaseQuantity(); // 0
      expect(product.isInStock()).toBe(false);
    });

    test("여러 상품을 독립적으로 관리할 수 있다", () => {
      const cola = new Product({
        id: "cola",
        name: "콜라",
        price: 1000,
        quantity: 5,
      });

      const cider = new Product({
        id: "cider",
        name: "사이다",
        price: 1200,
        quantity: 3,
      });

      cola.decreaseQuantity();
      cider.decreaseQuantity();
      cider.decreaseQuantity();

      expect(cola.quantity).toBe(4);
      expect(cider.quantity).toBe(1);
    });
  });
});
