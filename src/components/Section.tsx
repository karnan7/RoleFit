import { useState, useEffect, type ReactNode } from "react";

interface SectionProps {
  emoji: string;
  title: string;
  accentColor: string;
  delay?: number;
  children: ReactNode;
}

export default function Section({
  emoji,
  title,
  accentColor,
  delay = 0,
  children,
}: Readonly<SectionProps>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        marginBottom: "28px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        <span style={{ fontSize: "20px" }}>{emoji}</span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: accentColor,
          }}
        >
          {title}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: `linear-gradient(to right, ${accentColor}40, transparent)`,
          }}
        />
      </div>

      <div style={{ paddingLeft: "4px" }}>{children}</div>
    </div>
  );
}
