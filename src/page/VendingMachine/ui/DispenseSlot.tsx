export function DispenseSlot() {
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
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "10px",
          border: "2px solid #7f8c8d",
        }}
      >
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
      </div>
    </div>
  );
}
