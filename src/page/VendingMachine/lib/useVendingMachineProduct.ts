import { useState } from "react";

import type { Payment } from "@/entities/Payment/lib";
import type { Product } from "@/entities/Product/lib";
import type { VendingMachine } from "@/entities/VendingMachine/lib";

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
        throw new Error("Payment not found");
      }

      vendingMachine.buyProduct(payment, product.id);

      setBoughtProducts((prev) => [...prev, product]);
    } catch (error) {
      console.error(error);
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
