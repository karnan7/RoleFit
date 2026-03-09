import type { ParsedResponse, ContentPart } from "../types";

export function parseResponse(text: string): ParsedResponse {
  const sections: ParsedResponse = {};
  const lines = text.split("\n");
  type SectionKey = keyof ParsedResponse;
  let current: SectionKey | null = null;
  let buffer: string[] = [];

  const flush = () => {
    if (current) sections[current] = buffer.join("\n").trim();
  };

  for (const line of lines) {
    if (line.match(/^###?\s*1\.|🔍/)) {
      flush();
      current = "restatement";
      buffer = [
        line.replace(/^###?\s*1\.\s*🔍[^\n]*/, "").replace(/^🔍[^\n]*/, ""),
      ];
    } else if (line.match(/^###?\s*2\.|💻/)) {
      flush();
      current = "code";
      buffer = [
        line.replace(/^###?\s*2\.\s*💻[^\n]*/, "").replace(/^💻[^\n]*/, ""),
      ];
    } else if (line.match(/^###?\s*3\.|🗣/)) {
      flush();
      current = "commentary";
      buffer = [
        line.replace(/^###?\s*3\.\s*🗣[^\n]*/, "").replace(/^🗣[^\n]*/, ""),
      ];
    } else if (line.match(/^###?\s*4\.|🧭/)) {
      flush();
      current = "narration";
      buffer = [
        line.replace(/^###?\s*4\.\s*🧭[^\n]*/, "").replace(/^🧭[^\n]*/, ""),
      ];
    } else if (line.match(/^###?\s*5\.|🎯/)) {
      flush();
      current = "extras";
      buffer = [
        line.replace(/^###?\s*5\.\s*🎯[^\n]*/, "").replace(/^🎯[^\n]*/, ""),
      ];
    } else if (current) {
      buffer.push(line);
    }
  }

  flush();
  return sections;
}

export function extractContentParts(text: string): ContentPart[] {
  const parts: ContentPart[] = [];
  const regex = /```[\w]*\n?([\s\S]*?)```/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: "text", content: text.slice(last, match.index) });
    }
    parts.push({ type: "code", content: match[1].trim() });
    last = regex.lastIndex;
  }

  if (last < text.length) {
    parts.push({ type: "text", content: text.slice(last) });
  }

  return parts;
}
