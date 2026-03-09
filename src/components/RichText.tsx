import CodeBlock from "./CodeBlock";
import { extractContentParts } from "../lib/PareserResponse";

interface RichTextProps {
  text: string;
}

export default function RichText({ text }: Readonly<RichTextProps>) {
  const parts = extractContentParts(text);

  return (
    <div>
      {parts.map((part, i) =>
        part.type === "code" ? (
          <CodeBlock key={i} code={part.content} />
        ) : (
          <p
            key={i}
            style={{
              color: "#a6adc8",
              fontSize: "14px",
              lineHeight: "1.85",
              margin: "6px 0",
              whiteSpace: "pre-wrap",
            }}
          >
            {part.content}
          </p>
        ),
      )}
    </div>
  );
}
