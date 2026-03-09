import { useRef, useEffect } from "react";
import type { ParsedResponse } from "../types";
import Section from "./Section";
import RichText from "./RichText";

interface CoachResponseProps {
  response: ParsedResponse;
  rawResponse: string;
  category: string;
  query: string;
  accentColor: string;
}

export default function CoachResponse({
  response,
  rawResponse,
  category,
  query,
  accentColor,
}: Readonly<CoachResponseProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [response]);

  const hasAnySections =
    response.restatement ||
    response.code ||
    response.commentary ||
    response.narration ||
    response.extras;

  return (
    <div
      ref={containerRef}
      style={{
        background: "#080810",
        border: "1px solid #0e0e1a",
        borderRadius: "16px",
        padding: "32px",
        animation: "fadeSlide 0.4s ease",
      }}
    >
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            height: "2px",
            flex: 1,
            background: `linear-gradient(to right, ${accentColor}, transparent)`,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: accentColor,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {category} — {query}
        </span>
        <div
          style={{
            height: "2px",
            flex: 1,
            background: `linear-gradient(to left, ${accentColor}, transparent)`,
          }}
        />
      </div>

      {hasAnySections ? (
        <>
          {response.restatement && (
            <Section
              emoji="🔍"
              title="Problem Restatement"
              accentColor={accentColor}
              delay={0}
            >
              <p
                style={{
                  color: "#cdd6f4",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  fontStyle: "italic",
                  borderLeft: `3px solid ${accentColor}`,
                  paddingLeft: "16px",
                  margin: 0,
                }}
              >
                {response.restatement}
              </p>
            </Section>
          )}

          {response.code && (
            <Section
              emoji="💻"
              title="Code / Diagram / Example"
              accentColor={accentColor}
              delay={150}
            >
              <RichText text={response.code} />
            </Section>
          )}

          {response.commentary && (
            <Section
              emoji="🗣️"
              title="Line-by-Line Commentary"
              accentColor={accentColor}
              delay={300}
            >
              <RichText text={response.commentary} />
            </Section>
          )}

          {response.narration && (
            <Section
              emoji="🧭"
              title="Narration Guidance"
              accentColor={accentColor}
              delay={450}
            >
              <RichText text={response.narration} />
            </Section>
          )}

          {response.extras && (
            <Section
              emoji="🎯"
              title="Interview Extras"
              accentColor={accentColor}
              delay={600}
            >
              <RichText text={response.extras} />
            </Section>
          )}
        </>
      ) : (
        // Fallback: raw response if parsing missed all sections
        <div
          style={{
            color: "#a6adc8",
            fontSize: "14px",
            lineHeight: "1.85",
            whiteSpace: "pre-wrap",
          }}
        >
          {rawResponse}
        </div>
      )}
    </div>
  );
}
