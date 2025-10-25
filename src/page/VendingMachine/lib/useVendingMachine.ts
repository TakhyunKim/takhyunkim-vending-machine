import { useState } from "react";

import { VendingMachine } from "@/entities/VendingMachine/lib";

import { PRODUCTS_MOCK_LIST, DISPENSER_MOCK, CHANGE_MOCK } from "../mock";

export const VENDING_MACHINE = new VendingMachine(
  PRODUCTS_MOCK_LIST,
  DISPENSER_MOCK,
  CHANGE_MOCK
);

export function useVendingMachine() {
  const [vendingMachine, setVendingMachine] =
    useState<VendingMachine>(VENDING_MACHINE);

  return {
    vendingMachine,
    setVendingMachine,
  };
}
