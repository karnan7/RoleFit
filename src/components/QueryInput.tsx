import { useRef } from "react";
import { CATEGORIES, SUGGESTIONS } from "../constants/categories";

interface QueryInputProps {
  category: string;
  query: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
}

export default function QueryInput({
  category,
  query,
  loading,
  onChange,
  onSubmit,
}: Readonly<QueryInputProps>) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const accentColor = cat?.color ?? "#00ff88";
  const suggestions = SUGGESTIONS[category] ?? [];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(query);
    }
  };

  const handleSuggestionClick = (s: string) => {
    onChange(s);
    onSubmit(s);
  };

  return (
    <div
      style={{
        background: "#0a0a0f",
        border: `1px solid ${accentColor}30`,
        borderRadius: "14px",
        padding: "20px 24px",
        marginBottom: "28px",
        boxShadow: `0 0 40px ${accentColor}08`,
      }}
    >
      {/* Category label */}
      <div
        style={{
          fontSize: "11px",
          color: accentColor,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "12px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
        }}
      >
        {cat?.desc}
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
        <textarea
          ref={textareaRef}
          rows={2}
          placeholder={`e.g. ${suggestions[0] ?? "ask anything"}`}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#cdd6f4",
            fontSize: "15px",
            lineHeight: "1.6",
            resize: "none",
            fontFamily: "'Inter', sans-serif",
            outline: "none",
          }}
        />

        <button
          onClick={() => onSubmit(query)}
          disabled={loading || !query.trim()}
          style={{
            background: loading
              ? "#1e1e2e"
              : `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
            border: "none",
            borderRadius: "10px",
            color: loading ? "#45475a" : "#000",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            padding: "10px 20px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
          }}
        >
          {loading ? "thinking…" : "Coach me →"}
        </button>
      </div>

      {/* Suggestion chips */}
      <div
        style={{
          marginTop: "14px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestionClick(s)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid #1e1e2e",
              borderRadius: "20px",
              color: "#585b70",
              fontSize: "11px",
              padding: "4px 12px",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
