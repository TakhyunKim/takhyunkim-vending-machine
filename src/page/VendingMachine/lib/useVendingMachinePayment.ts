import { useState } from "react";

import { CASH_PAYMENT, SAMSUNG_CARD_PAYMENT } from "../mock";

import type { Payment } from "@/entities/Payment";
import type { VendingMachine } from "@/entities/VendingMachine/lib";

export function useVendingMachinePayment({
  vendingMachine,
}: {
  vendingMachine: VendingMachine;
}) {
  const [userPayment, setUserPayment] = useState<Payment | null>(null);

  const cashPayment = CASH_PAYMENT;
  const cardPayment = SAMSUNG_CARD_PAYMENT;

  // 현금 투입 핸들러
  const handleInsertCash = (amount: number) => {
    const isCardInserted = userPayment === cardPayment;

    if (isCardInserted) {
      console.error("이미 카드를 투입했습니다");
      return;
    }

    vendingMachine.initPayment(cashPayment, amount);
    setUserPayment(cashPayment);
  };

  // 카드 투입 핸들러
  const handleInsertCard = () => {
    const isCashInserted = userPayment === cashPayment;

    if (isCashInserted) {
      console.error("이미 현금을 투입했습니다");
      return;
    }

    vendingMachine.initPayment(cardPayment, 0);
    setUserPayment(cardPayment);
  };

  const handleCompleteTransaction = () => {
    if (!userPayment) {
      console.error("결제 수단이 없습니다");
      return;
    }

    vendingMachine.dispenseChange();
    setUserPayment(null);
  };

  return {
    userCash: cashPayment.getBalance(),
    userCardPayment: cardPayment,
    userPayment,
    hasCard: userPayment === cardPayment,
    insertedCash: vendingMachine.getCashBalance(),
    insertedCard: userPayment === cardPayment,
    handleInsertCash,
    handleInsertCard,
    handleCompleteTransaction,
  };
}
