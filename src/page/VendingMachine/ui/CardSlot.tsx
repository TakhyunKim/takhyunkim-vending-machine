export function CardSlot() {
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
        💳 카드 출입구
      </div>
      <div
        style={{
          backgroundColor: "#1a252f",
          height: "40px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#95a5a6",
          fontSize: "12px",
          border: "2px dashed #7f8c8d",
        }}
      >
        카드를 넣어주세요
      </div>
    </div>
  );
}
