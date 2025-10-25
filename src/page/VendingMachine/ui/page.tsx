import { useState } from "react";
import { ProductDisplay } from "./ProductDisplay";
import { CardSlot } from "./CardSlot";
import { CashSlot } from "./CashSlot";
import { DispenseSlot } from "./DispenseSlot";
import { ChangeSlot } from "./ChangeSlot";
import { Wallet } from "./Wallet";

import { PRODUCTS_MOCK_LIST, DISPENSER_MOCK, CHANGE_MOCK } from "../mock";
import { VendingMachine } from "@/entities/VendingMachine/lib";

// TODO: 나중에 실제 자판기 로직 구현 시 사용
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vendingMachine = new VendingMachine(
  PRODUCTS_MOCK_LIST,
  DISPENSER_MOCK,
  CHANGE_MOCK
);

export function VendingMachinePage() {
  // 사용자 지갑 상태
  const [userCash, setUserCash] = useState(50000); // 보유 현금
  const [hasCard, setHasCard] = useState(true); // 카드 보유 여부

  // 자판기 상태
  const [insertedCash, setInsertedCash] = useState(0); // 투입된 현금
  const [isCardInserted, setIsCardInserted] = useState(false); // 카드 투입 여부

  // 현금 투입 핸들러
  const handleInsertCash = (amount: number) => {
    if (userCash >= amount) {
      setUserCash((prev) => prev - amount);
      setInsertedCash((prev) => prev + amount);
    }
  };

  // 카드 투입 핸들러
  const handleInsertCard = () => {
    setHasCard(false);
    setIsCardInserted(true);
  };

  return (
    <VendingMachineContainer>
      {/* 지갑 */}
      <Wallet
        cash={userCash}
        onInsertCash={handleInsertCash}
        onInsertCard={handleInsertCard}
        hasCard={hasCard}
      />

      {/* 자판기 */}
      <Container>
        <Header>🥤 VENDING MACHINE</Header>

        <ProductDisplay products={PRODUCTS_MOCK_LIST} />

        <Content>
          <PaymentSection>
            <CardSlot isInserted={isCardInserted} />
            <CashSlot insertedAmount={insertedCash} />
          </PaymentSection>
          <DispenseSlot />
        </Content>

        <ChangeSlot />
      </Container>
    </VendingMachineContainer>
  );
}

function VendingMachineContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#1a1a2e",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "450px",
        height: "900px",
        backgroundColor: "#2c3e50",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        textAlign: "center",
        color: "#fff",
        fontSize: "24px",
        fontWeight: "bold",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        height: "250px",
      }}
    >
      {children}
    </div>
  );
}

function PaymentSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {children}
    </div>
  );
}
