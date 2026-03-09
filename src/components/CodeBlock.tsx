import { useState } from "react";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: Readonly<CodeBlockProps>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative", margin: "12px 0" }}>
      <pre
        style={{
          background: "#0a0a0f",
          border: "1px solid #1e1e2e",
          borderRadius: "8px",
          padding: "20px",
          overflowX: "auto",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: "13px",
          lineHeight: "1.7",
          color: "#cdd6f4",
          margin: 0,
        }}
      >
        {code}
      </pre>

      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: copied ? "#00ff88" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "6px",
          color: copied ? "#000" : "#888",
          fontSize: "11px",
          padding: "4px 10px",
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "monospace",
        }}
      >
        {copied ? "✓ copied" : "copy"}
      </button>
    </div>
  );
}
