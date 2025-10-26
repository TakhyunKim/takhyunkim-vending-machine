import { useState } from "react";

export function useVendingMachineAdmin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      return;
    }

    setPrice(value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      return;
    }

    setQuantity(value);
  };

  const reset = () => {
    setName("");
    setPrice(0);
    setQuantity(0);
  };

  return {
    name,
    price,
    quantity,
    handleNameChange,
    handlePriceChange,
    handleQuantityChange,
    reset,
  };
}
