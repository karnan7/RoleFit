import { useState, useCallback } from "react";
import type { ParsedResponse, HistoryItem } from "../types";
import { SYSTEM_PROMPT } from "../constants/categories";
import { parseResponse } from "../lib/PareserResponse";

// Point this to your deployed Cloudflare Worker URL
const PROXY_URL = import.meta.env.VITE_PROXY_URL;

interface UseCoachReturn {
  loading: boolean;
  error: string | null;
  response: ParsedResponse | null;
  rawResponse: string;
  history: HistoryItem[];
  ask: (category: string, query: string) => Promise<void>;
  loadFromHistory: (item: HistoryItem) => void;
  clearError: () => void;
}

export function useCoach(): UseCoachReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ParsedResponse | null>(null);
  const [rawResponse, setRawResponse] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const ask = useCallback(async (category: string, query: string) => {
    const q = query.trim();
    if (!q || !category) return;

    setLoading(true);
    setResponse(null);
    setError(null);
    setRawResponse("");

    try {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `${category} – ${q}` }],
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const text: string =
        data.content?.map((b: { text?: string }) => b.text ?? "").join("") ??
        "";

      setRawResponse(text);
      setResponse(parseResponse(text));
      setHistory((prev) => [
        { cat: category, q, text, time: Date.now() },
        ...prev.slice(0, 9),
      ]);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(
        `Couldn't reach the API — ${message}. Check your proxy URL and try again.`,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setRawResponse(item.text);
    setResponse(parseResponse(item.text));
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    loading,
    error,
    response,
    rawResponse,
    history,
    ask,
    loadFromHistory,
    clearError,
  };
}
