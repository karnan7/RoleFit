import { CATEGORIES } from "../constants/categories";

interface CategorySelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function CategorySelector({
  selected,
  onSelect,
}: Readonly<CategorySelectorProps>) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <div
        style={{
          fontSize: "11px",
          color: "#45475a",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "14px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
        }}
      >
        Topic
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              background: selected === c.id ? `${c.color}18` : "transparent",
              border: `1px solid ${selected === c.id ? c.color : "#1e1e2e"}`,
              borderRadius: "10px",
              color: selected === c.id ? c.color : "#585b70",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "12px" }}>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
