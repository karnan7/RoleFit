interface HeaderProps {
  historyCount: number;
  showHistory: boolean;
  onToggleHistory: () => void;
}

export default function Header({
  historyCount,
  showHistory,
  onToggleHistory,
}: Readonly<HeaderProps>) {
  return (
    <div
      style={{
        borderBottom: "1px solid #0e0e1a",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "rgba(5,5,8,0.92)",
        backdropFilter: "blur(12px)",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #00ff88, #7c8dff)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          ◈
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              letterSpacing: "0.02em",
              color: "#cdd6f4",
            }}
          >
            Role Fit
          </div>
          <div style={{ fontSize: "11px", color: "#45475a", marginTop: "1px" }}>
            AI-powered explanation trainer
          </div>
        </div>
      </div>

      <button
        onClick={onToggleHistory}
        style={{
          background: showHistory ? "rgba(255,255,255,0.08)" : "transparent",
          border: "1px solid #1e1e2e",
          borderRadius: "8px",
          color: "#6c7086",
          fontSize: "12px",
          padding: "7px 14px",
          cursor: "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.05em",
          transition: "all 0.2s",
        }}
      >
        {historyCount > 0 ? `History (${historyCount})` : "History"}
      </button>
    </div>
  );
}
