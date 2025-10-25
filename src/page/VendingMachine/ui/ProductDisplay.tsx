export function ProductDisplay() {
  return (
    <div
      style={{
        backgroundColor: "#34495e",
        borderRadius: "15px",
        padding: "15px",
        height: "350px",
        border: "3px solid #1a252f",
      }}
    >
      <div
        style={{
          color: "#ecf0f1",
          fontSize: "14px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        📦 상품 진열대
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          height: "calc(100% - 30px)",
        }}
      >
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#ecf0f1",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              cursor: "pointer",
              border: "2px solid #bdc3c7",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            🥤
          </div>
        ))}
      </div>
    </div>
  );
}
