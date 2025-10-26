import { useState } from "react";

import { Admin } from "./Admin";
import { ProductDisplay } from "./ProductDisplay";
import { CardSlot } from "./CardSlot";
import { CashSlot } from "./CashSlot";
import { DispenseSlot } from "./DispenseSlot";
import { ChangeSlot } from "./ChangeSlot";
import { Wallet } from "./Wallet";
import { CompleteButton } from "./CompleteButton";

import { useVendingMachine } from "../lib/useVendingMachine";
import { useVendingMachinePayment } from "../lib/useVendingMachinePayment";
import { useVendingMachineProduct } from "../lib/useVendingMachineProduct";

export function VendingMachinePage() {
  const [isOpenAdminDialog, setIsOpenAdminDialog] = useState(false);

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
  const {
    products,
    boughtProducts,
    buyProduct,
    resetBoughtProducts,
    addProduct,
  } = useVendingMachineProduct({
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
        <button onClick={() => setIsOpenAdminDialog(true)}>
          관리자 페이지
        </button>
      </Container>

      {isOpenAdminDialog && (
        <dialog
          open={isOpenAdminDialog}
          closedby="any"
          onClose={() => setIsOpenAdminDialog(false)}
        >
          <Admin
            supportedProductList={products}
            onAddProduct={(product) => addProduct(product)}
          />
        </dialog>
      )}
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
