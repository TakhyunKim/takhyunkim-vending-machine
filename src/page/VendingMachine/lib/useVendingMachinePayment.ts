import { useState } from "react";

import { USER_CASH_MOCK, SAMSUNG_CARD_PAYMENT } from "../mock";

import { CardPayment, CashPayment } from "@/entities/Payment";

import type { Payment } from "@/entities/Payment";
import type { VendingMachine } from "@/entities/VendingMachine";

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
    try {
      const isCardInserted = userPayment instanceof CardPayment;

      if (isCardInserted) {
        alert("이미 카드를 투입했습니다");
        return;
      }

      const previousVendingMachineCashBalance = cashBalance;
      const newCashPayment = new CashPayment(
        previousVendingMachineCashBalance + amount
      );

      vendingMachine.initPayment(newCashPayment, amount);
      setUserCash((prev) => prev - amount);
      setUserPayment(newCashPayment);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "현금 투입 중 오류가 발생했습니다";

      alert(errorMessage);
    }
  };

  // 카드 투입 핸들러
  const handleInsertCard = () => {
    try {
      const isCashInserted = userPayment instanceof CashPayment;

      if (isCashInserted) {
        alert("이미 현금을 투입했습니다");
        return;
      }

      vendingMachine.initPayment(cardPayment, 0);
      setUserPayment(cardPayment);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "카드 투입 중 오류가 발생했습니다";

      alert(errorMessage);
    }
  };

  const dispenseChange = () => {
    try {
      if (!userPayment) {
        alert("결제 수단이 없습니다");
        return;
      }

      const change = vendingMachine.dispenseChange();
      setUserCash((prev) => prev + change);
      setUserPayment(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "거스름돈 반환 중 오류가 발생했습니다";

      alert(errorMessage);
    }
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
