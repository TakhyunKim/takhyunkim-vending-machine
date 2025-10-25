import { ProductDisplay } from "./ProductDisplay";
import { CardSlot } from "./CardSlot";
import { CashSlot } from "./CashSlot";
import { DispenseSlot } from "./DispenseSlot";
import { ChangeSlot } from "./ChangeSlot";
import { Wallet } from "./Wallet";

import { useVendingMachine } from "../lib/useVendingMachine";
import { useVendingMachinePayment } from "../lib/useVendingMachinePayment";
import { useVendingMachineProduct } from "../lib/useVendingMachineProduct";

export function VendingMachinePage() {
  const { vendingMachine } = useVendingMachine();
  const {
    userCash,
    userPayment,
    insertedCash,
    insertedCard,
    handleInsertCash,
    handleInsertCard,
    dispenseChange,
  } = useVendingMachinePayment({ vendingMachine });
  const { products, boughtProducts, buyProduct, resetBoughtProducts } =
    useVendingMachineProduct({
      vendingMachine,
      payment: userPayment,
    });

  return (
    <VendingMachineContainer>
      {/* 지갑 */}
      <Wallet
        cash={userCash}
        onInsertCash={handleInsertCash}
        onInsertCard={handleInsertCard}
        hasCard={!insertedCard}
      />

      {/* 자판기 */}
      <Container>
        <Header>🥤 VENDING MACHINE</Header>

        <ProductDisplay
          products={products}
          onBoughtProduct={(product) => buyProduct(product)}
        />

        <Content>
          <PaymentSection>
            <CardSlot isInserted={insertedCard} />
            <CashSlot insertedAmount={insertedCash} />
          </PaymentSection>
          <DispenseSlot boughtProducts={boughtProducts} />
        </Content>

        <ChangeSlot />

        {/* 거래 완료 버튼 */}
        <CompleteButton
          disabled={
            boughtProducts.length === 0 && !insertedCard && insertedCash === 0
          }
          onClick={() => {
            dispenseChange();
            resetBoughtProducts();
          }}
        />
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

interface CompleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function CompleteButton({ onClick, disabled }: CompleteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "16px",
        backgroundColor: disabled ? "#7f8c8d" : "#27ae60",
        color: "#fff",
        fontSize: "18px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "12px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s",
        boxShadow: disabled ? "none" : "0 4px 8px rgba(39, 174, 96, 0.3)",
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "#229954";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(39, 174, 96, 0.4)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "#27ae60";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(39, 174, 96, 0.3)";
        }
      }}
    >
      {disabled ? "🔒 거래 없음" : "✅ 거래 완료"}
    </button>
  );
}
