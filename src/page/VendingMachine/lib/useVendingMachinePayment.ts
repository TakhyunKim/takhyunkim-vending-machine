import { useState } from "react";

import { USER_CASH_MOCK, SAMSUNG_CARD_PAYMENT } from "../mock";

import { CardPayment, CashPayment } from "@/entities/Payment";

import type { Payment } from "@/entities/Payment/lib";
import type { VendingMachine } from "@/entities/VendingMachine/lib";

export function useVendingMachinePayment({
  vendingMachine,
}: {
  vendingMachine: VendingMachine;
}) {
  const [userCash, setUserCash] = useState<number>(USER_CASH_MOCK);
  const [userPayment, setUserPayment] = useState<Payment | null>(null);
  const { cashBalance } = vendingMachine.getSnapshot();
  const cardPayment = SAMSUNG_CARD_PAYMENT;

  // 현금 투입 핸들러
  const handleInsertCash = (amount: number) => {
    const isCardInserted = userPayment instanceof CardPayment;

    if (isCardInserted) {
      console.error("이미 카드를 투입했습니다");
      return;
    }

    const previousVendingMachineCashBalance = cashBalance;
    const newCashPayment = new CashPayment(
      previousVendingMachineCashBalance + amount
    );

    vendingMachine.initPayment(newCashPayment, amount);
    setUserCash((prev) => prev - amount);
    setUserPayment(newCashPayment);
  };

  // 카드 투입 핸들러
  const handleInsertCard = () => {
    const isCashInserted = userPayment instanceof CashPayment;

    if (isCashInserted) {
      console.error("이미 현금을 투입했습니다");
      return;
    }

    vendingMachine.initPayment(cardPayment, 0);
    setUserPayment(cardPayment);
  };

  const dispenseChange = () => {
    if (!userPayment) {
      console.error("결제 수단이 없습니다");
      return;
    }

    const change = vendingMachine.dispenseChange();
    setUserCash((prev) => prev + change);
    setUserPayment(null);
  };

  return {
    userCash,
    userCardPayment: cardPayment,
    userPayment,
    hasCard: userPayment === cardPayment,
    insertedCash: cashBalance,
    insertedCard: userPayment === cardPayment,
    handleInsertCash,
    handleInsertCard,
    dispenseChange,
  };
}
