import { ProductDisplay } from "./ProductDisplay";
import { CardSlot } from "./CardSlot";
import { CashSlot } from "./CashSlot";
import { DispenseSlot } from "./DispenseSlot";
import { ChangeSlot } from "./ChangeSlot";

import { PRODUCTS_MOCK_LIST, DISPENSER_MOCK, CHANGE_MOCK } from "../mock";
import { VendingMachine } from "@/entities/VendingMachine/lib";

const vendingMachine = new VendingMachine(
  PRODUCTS_MOCK_LIST,
  DISPENSER_MOCK,
  CHANGE_MOCK
);

export function VendingMachinePage() {
  return (
    <Container>
      <Header>🥤 VENDING MACHINE</Header>

      <ProductDisplay products={PRODUCTS_MOCK_LIST} />

      <Content>
        <PaymentSection>
          <CardSlot />
          <CashSlot />
        </PaymentSection>
        <DispenseSlot />
      </Content>

      <ChangeSlot />
    </Container>
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
