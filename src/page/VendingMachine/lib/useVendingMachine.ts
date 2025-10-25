import { useSyncExternalStore } from "react";

import { VendingMachine } from "@/entities/VendingMachine/lib";

import { PRODUCTS_MOCK_LIST, DISPENSER_MOCK, CHANGE_MOCK } from "../mock";

export const VENDING_MACHINE = new VendingMachine(
  PRODUCTS_MOCK_LIST,
  DISPENSER_MOCK,
  CHANGE_MOCK
);

export function useVendingMachine() {
  useSyncExternalStore(
    (callback) => VENDING_MACHINE.subscribe(callback),
    () => VENDING_MACHINE.getSnapshot()
  );

  return {
    vendingMachine: VENDING_MACHINE,
  };
}
