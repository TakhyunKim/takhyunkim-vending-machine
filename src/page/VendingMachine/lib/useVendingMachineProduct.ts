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

  const handleBoughtProduct = async (product: Product) => {
    try {
      if (!payment) {
        throw new Error("Payment not found");
      }

      await vendingMachine.buyProduct(payment, product);

      setBoughtProducts((prev) => [...prev, product]);
    } catch (error) {
      console.error(error);
    }
  };

  const products = vendingMachine.getProducts();

  return {
    products,
    boughtProducts,
    handleBoughtProduct,
  };
}
