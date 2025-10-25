interface CashSlotProps {
  insertedAmount?: number;
}

export function CashSlot({ insertedAmount = 0 }: CashSlotProps) {
  return (
    <div
      style={{
        backgroundColor: "#34495e",
        borderRadius: "10px",
        padding: "15px",
        border: "3px solid #1a252f",
        flex: 1,
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
        💵 현금 투입구
      </div>
      <div
        style={{
          backgroundColor: insertedAmount > 0 ? "#27ae60" : "#1a252f",
          height: "40px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: insertedAmount > 0 ? "#fff" : "#95a5a6",
          fontSize: "12px",
          border:
            insertedAmount > 0 ? "2px solid #229954" : "2px dashed #7f8c8d",
          fontWeight: insertedAmount > 0 ? "bold" : "normal",
          transition: "all 0.3s",
        }}
      >
        {insertedAmount > 0
          ? `${insertedAmount.toLocaleString()}원 투입됨`
          : "지폐를 넣어주세요"}
      </div>
    </div>
  );
}
