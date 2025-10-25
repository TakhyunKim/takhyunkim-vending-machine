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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = async (product: Product) => {
    try {
      if (!payment) {
        throw new Error("Payment not found");
      }

      await vendingMachine.buyProduct(payment, product);

      setSelectedProduct(product);
    } catch (error) {
      console.error(error);
    }
  };

  const products = vendingMachine.getProducts();

  return {
    products,
    selectedProduct,
    handleSelectProduct,
  };
}
