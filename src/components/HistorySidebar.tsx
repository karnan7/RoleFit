import type { HistoryItem } from "../types";
import { CATEGORIES } from "../constants/categories";

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export default function HistorySidebar({
  history,
  onSelect,
}: Readonly<HistorySidebarProps>) {
  return (
    <div
      style={{
        width: "260px",
        minHeight: "calc(100vh - 77px)",
        borderRight: "1px solid #0e0e1a",
        padding: "20px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#45475a",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
        }}
      >
        Recent
      </div>

      {history.length === 0 && (
        <div style={{ color: "#313244", fontSize: "13px" }}>
          No history yet.
        </div>
      )}

      {history.map((item, i) => {
        const cat = CATEGORIES.find((c) => c.id === item.cat);
        return (
          <button
            key={i}
            onClick={() => onSelect(item)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "6px",
              transition: "background 0.15s",
              border: "1px solid transparent",
              background: "transparent",
              color: "inherit",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                fontSize: "10px",
                color: cat?.color ?? "#888",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "4px",
              }}
            >
              {item.cat}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#89b4fa",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.q}
            </div>
          </button>
        );
      })}
    </div>
  );
}
