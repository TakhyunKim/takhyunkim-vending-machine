interface CompleteButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function CompleteButton({ onClick, disabled }: CompleteButtonProps) {
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
