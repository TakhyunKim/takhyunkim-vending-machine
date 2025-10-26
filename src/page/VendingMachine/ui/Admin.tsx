import { useVendingMachineAdmin } from "../lib/useVendingMachineAdmin";

import type { Product } from "@/entities/Product";

interface AdminProps {
  supportedProductList: Product[];
  onAddProduct: ({
    name,
    price,
    quantity,
  }: {
    name: string;
    price: number;
    quantity: number;
  }) => void;
}

export function Admin({ supportedProductList, onAddProduct }: AdminProps) {
  const {
    name,
    price,
    quantity,
    handleNameChange,
    handlePriceChange,
    handleQuantityChange,
    reset,
  } = useVendingMachineAdmin();

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "32px" }}>자판기 관리자 페이지</h1>
      <ProductTable supportedProductList={supportedProductList} />
      <ProductForm
        name={name}
        price={price}
        quantity={quantity}
        onNameChange={handleNameChange}
        onPriceChange={handlePriceChange}
        onQuantityChange={handleQuantityChange}
        onAddProduct={() => {
          onAddProduct({ name, price, quantity });
          reset();
        }}
        disabled={!name || !price || !quantity}
      />
    </div>
  );
}

function ProductForm({
  name,
  price,
  quantity,
  disabled,
  onNameChange,
  onPriceChange,
  onQuantityChange,
  onAddProduct,
}: {
  name: string;
  price: number;
  quantity: number;
  disabled: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddProduct: () => void;
}) {
  return (
    <div>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
        상품 추가
      </h2>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#f9fafb",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#2c3e50",
              }}
            >
              상품명
            </label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="예: 사이다"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#2c3e50",
              }}
            >
              가격 (원)
            </label>
            <input
              type="number"
              value={price}
              onChange={onPriceChange}
              placeholder="예: 1200"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#2c3e50",
              }}
            >
              수량 (개)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={onQuantityChange}
              placeholder="예: 20"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              padding: "10px 24px",
              backgroundColor: disabled ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            onClick={onAddProduct}
            disabled={disabled}
          >
            상품 추가
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductTable({
  supportedProductList,
}: {
  supportedProductList: Product[];
}) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
        현재 상품 목록
      </h2>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f9fafb" }}>
            <tr style={{ color: "#2c3e50" }}>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  maxWidth: "60px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                상품명
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                가격
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  maxWidth: "80px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                재고
              </th>
            </tr>
          </thead>
          <tbody>
            {supportedProductList.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductTableRow({ product }: { product: Product }) {
  return (
    <tr>
      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #e5e7eb",
          fontSize: "14px",
          maxWidth: "60px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.id}
      </td>
      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #e5e7eb",
          fontSize: "14px",
          maxWidth: "150px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.name}
      </td>
      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #e5e7eb",
          fontSize: "14px",
          maxWidth: "100px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.price.toLocaleString()}원
      </td>
      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #e5e7eb",
          fontSize: "14px",
          maxWidth: "80px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.getQuantity()}개
      </td>
    </tr>
  );
}
