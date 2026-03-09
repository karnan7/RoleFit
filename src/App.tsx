import { useState } from "react";
import { useCoach } from "./hooks/useCoach";
import { CATEGORIES } from "./constants/categories";
import Header from "./components/Header";
import CategorySelector from "./components/CategorySelector";
import QueryInput from "./components/QueryInput";
import CoachResponse from "./components/CoachResponse";
import HistorySidebar from "./components/HistorySidebar";
import EmptyState from "./components/EmptyState";
import type { HistoryItem } from "./types";

export default function App() {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const {
    loading,
    error,
    response,
    rawResponse,
    history,
    ask,
    loadFromHistory,
    clearError,
  } = useCoach();

  const accentColor =
    CATEGORIES.find((c) => c.id === selectedCat)?.color ?? "#00ff88";

  const handleCategorySelect = (id: string) => {
    setSelectedCat(id);
    setQuery("");
  };

  const handleSubmit = (q: string) => {
    if (!selectedCat) return;
    ask(selectedCat, q);
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setSelectedCat(item.cat);
    setQuery(item.q);
    loadFromHistory(item);
    setShowHistory(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#050508",
        color: "#cdd6f4",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <Header
        historyCount={history.length}
        showHistory={showHistory}
        onToggleHistory={() => setShowHistory((v) => !v)}
      />

      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Sidebar */}
        {showHistory && (
          <HistorySidebar history={history} onSelect={handleHistorySelect} />
        )}

        {/* Main content */}
        <div style={{ flex: 1, padding: "40px 48px", maxWidth: "840px" }}>
          <CategorySelector
            selected={selectedCat}
            onSelect={handleCategorySelect}
          />

          {selectedCat && (
            <QueryInput
              category={selectedCat}
              query={query}
              loading={loading}
              onChange={setQuery}
              onSubmit={handleSubmit}
            />
          )}

          {/* Loading spinner */}
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "20px 0",
                color: "#585b70",
                fontSize: "13px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: `2px solid ${accentColor}30`,
                  borderTop: `2px solid ${accentColor}`,
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Crafting your coaching session…
              </span>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div
              style={{
                background: "#ff6b6b18",
                border: "1px solid #ff6b6b40",
                borderRadius: "10px",
                padding: "16px 20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#ff6b6b", fontSize: "13px" }}>
                {error}
              </span>
              <button
                onClick={clearError}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: "0 4px",
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Response */}
          {response && !loading && (
            <CoachResponse
              response={response}
              rawResponse={rawResponse}
              category={selectedCat ?? ""}
              query={query}
              accentColor={accentColor}
            />
          )}

          {/* Empty state */}
          {!selectedCat && !loading && <EmptyState />}
        </div>
      </div>
    </div>
  );
}
