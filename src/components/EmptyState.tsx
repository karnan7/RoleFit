export default function EmptyState() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 0",
        color: "#313244",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.4 }}>
        ◈
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "14px",
          letterSpacing: "0.05em",
        }}
      >
        Select a topic above to begin your coaching session
      </div>
    </div>
  );
}
