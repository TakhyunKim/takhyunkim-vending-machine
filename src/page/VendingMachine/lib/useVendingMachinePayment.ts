import { useState } from "react";

import { CASH_PAYMENT, SAMSUNG_CARD_PAYMENT } from "../mock";

import type { Payment } from "@/entities/Payment";
import type { VendingMachine } from "@/entities/VendingMachine/lib";

export function useVendingMachinePayment({
  vendingMachine,
}: {
  vendingMachine: VendingMachine;
}) {
  const [insertedCash, setInsertedCash] = useState(0); // 투입된 현금
  const [isCardInserted, setIsCardInserted] = useState(false); // 카드 투입 여부
  const [userPayment, setUserPayment] = useState<Payment | null>(null);

  const cashPayment = CASH_PAYMENT;
  const cashBalance = cashPayment.getBalance();

  const cardPayment = SAMSUNG_CARD_PAYMENT;

  // 현금 투입 핸들러
  const handleInsertCash = async (amount: number) => {
    if (isCardInserted) {
      // TODO: 이미 카드를 투입했다는 알림을 추가
      console.error("이미 카드를 투입했습니다");
      return;
    }

    if (cashBalance < amount) {
      // TODO: 차후 현금 부족 알림을 추가
      console.error("현금 부족");
      return;
    }

    await vendingMachine.initPayment(cashPayment, amount);

    setInsertedCash((prev) => prev + amount);
    setUserPayment(cashPayment);
  };

  // 카드 투입 핸들러
  const handleInsertCard = async () => {
    if (insertedCash > 0) {
      // TODO: 이미 현금을 투입했다는 알림을 추가
      console.error("이미 현금을 투입했습니다");
      return;
    }

    await vendingMachine.initPayment(cardPayment, {});
    setIsCardInserted(true);
    setUserPayment(cardPayment);
  };

  return {
    userCash: cashBalance,
    userCardPayment: cardPayment,
    userPayment,
    insertedCash,
    isCardInserted,
    handleInsertCash,
    handleInsertCard,
  };
}
