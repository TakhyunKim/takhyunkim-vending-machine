import type { Product } from "@/entities/Product";

interface DispenseSlotProps {
  boughtProducts: Product[];
}

export function DispenseSlot({ boughtProducts }: DispenseSlotProps) {
  return (
    <div
      style={{
        width: "140px",
        backgroundColor: "#34495e",
        borderRadius: "10px",
        padding: "15px",
        border: "3px solid #1a252f",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          color: "#ecf0f1",
          fontSize: "12px",
          marginBottom: "8px",
          fontWeight: "bold",
        }}
      >
        📤 배출구
      </div>
      <div
        style={{
          backgroundColor: "#1a252f",
          flex: 1,
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: boughtProducts.length > 0 ? "flex-start" : "flex-end",
          padding: "10px",
          border: "2px solid #7f8c8d",
          position: "relative",
          overflow: "auto",
          gap: "8px",
        }}
      >
        {boughtProducts.length > 0 ? (
          boughtProducts.map((product, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                padding: "8px",
                backgroundColor: "#2c3e50",
                borderRadius: "8px",
                border: "2px solid #3498db",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  textAlign: "center",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              >
                🥤
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    color: "#ecf0f1",
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginBottom: "2px",
                    wordBreak: "break-word",
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    color: "#95a5a6",
                    fontSize: "9px",
                  }}
                >
                  {product.price.toLocaleString()}원
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              width: "100%",
              height: "30px",
              backgroundColor: "#34495e",
              borderRadius: "5px 5px 0 0",
              border: "2px solid #95a5a6",
              borderBottom: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
