export function ChangeSlot() {
  return (
    <div
      style={{
        backgroundColor: "#34495e",
        borderRadius: "10px",
        padding: "15px",
        border: "3px solid #1a252f",
        height: "100px",
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
        🪙 거스름돈 반환구
      </div>
      <div
        style={{
          backgroundColor: "#1a252f",
          height: "50px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          border: "2px solid #7f8c8d",
        }}
      />
    </div>
  );
}
