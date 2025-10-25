import { useState } from "react";

import type { Payment } from "@/entities/Payment";
import type { Product } from "@/entities/Product";
import type { VendingMachine } from "@/entities/VendingMachine";

export function useVendingMachineProduct({
  payment,
  vendingMachine,
}: {
  payment: Payment | null;
  vendingMachine: VendingMachine;
}) {
  const [boughtProducts, setBoughtProducts] = useState<Product[]>([]);

  const buyProduct = (product: Product) => {
    try {
      if (!payment) {
        alert("결제 수단이 없습니다");
        return;
      }

      vendingMachine.buyProduct(payment, product.id);

      setBoughtProducts((prev) => [...prev, product]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: unknown) {
      alert("상품 구매에 실패했습니다");
    }
  };

  const resetBoughtProducts = () => {
    setBoughtProducts([]);
  };

  const { products } = vendingMachine.getSnapshot();

  return {
    products,
    boughtProducts,
    resetBoughtProducts,
    buyProduct,
  };
}
