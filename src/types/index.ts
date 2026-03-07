export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  desc: string;
}

export interface HistoryItem {
  cat: string;
  q: string;
  text: string;
  time: number;
}

export interface ParsedResponse {
  restatement?: string;
  code?: string;
  commentary?: string;
  narration?: string;
  extras?: string;
}

export interface ContentPart {
  type: "text" | "code";
  content: string;
}
