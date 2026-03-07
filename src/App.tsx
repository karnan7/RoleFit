import { useState } from "react";
import Header from "./components/Header";

export default function App() {
  const [showHistory, setShowHistory] = useState(false);

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
    </div>
  );
}
