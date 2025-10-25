interface WalletProps {
  cash: number;
  onInsertCash: (amount: number) => void;
  onInsertCard: () => void;
  hasCard: boolean;
}

export function Wallet({
  cash,
  onInsertCash,
  onInsertCard,
  hasCard,
}: WalletProps) {
  const cashOptions = [1000, 5000, 10000] as const;

  return (
    <div
      style={{
        width: "300px",
        backgroundColor: "#8e44ad",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        💰 내 지갑
      </div>

      {/* 보유 현금 */}
      <div
        style={{
          backgroundColor: "#9b59b6",
          borderRadius: "10px",
          padding: "15px",
          border: "2px solid #7d3c98",
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
          💵 보유 현금
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {cash.toLocaleString()}원
        </div>
      </div>

      {/* 현금 투입 */}
      <div
        style={{
          backgroundColor: "#9b59b6",
          borderRadius: "10px",
          padding: "15px",
          border: "2px solid #7d3c98",
        }}
      >
        <div
          style={{
            color: "#ecf0f1",
            fontSize: "12px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          💸 현금 투입
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {cashOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => onInsertCash(amount)}
              disabled={cash < amount}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: cash >= amount ? "#27ae60" : "#95a5a6",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: cash >= amount ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                opacity: cash >= amount ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (cash >= amount) {
                  e.currentTarget.style.backgroundColor = "#229954";
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (cash >= amount) {
                  e.currentTarget.style.backgroundColor = "#27ae60";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {amount.toLocaleString()}원 투입
            </button>
          ))}
        </div>
      </div>

      {/* 카드 */}
      <div
        style={{
          backgroundColor: "#9b59b6",
          borderRadius: "10px",
          padding: "15px",
          border: "2px solid #7d3c98",
        }}
      >
        <div
          style={{
            color: "#ecf0f1",
            fontSize: "12px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          💳 내 카드
        </div>
        {hasCard ? (
          <button
            onClick={onInsertCard}
            style={{
              width: "100%",
              height: "70px",
              borderRadius: "8px",
              border: "2px solid #f39c12",
              backgroundColor: "#3498db",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2980b9";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3498db";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div style={{ fontSize: "20px" }}>💳</div>
            <div>신용카드</div>
            <div style={{ fontSize: "10px", opacity: 0.8 }}>
              클릭하여 자판기에 투입
            </div>
          </button>
        ) : (
          <div
            style={{
              width: "100%",
              height: "60px",
              borderRadius: "8px",
              border: "2px dashed #7f8c8d",
              backgroundColor: "#7f8c8d",
              color: "#ecf0f1",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.5,
            }}
          >
            카드 사용 중
          </div>
        )}
      </div>
    </div>
  );
}
