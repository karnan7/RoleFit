import type { Category } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "dsa",
    label: "DSA",
    icon: "⚡",
    color: "#00ff88",
    desc: "Algorithms & Data Structures",
  },
  {
    id: "javascript",
    label: "JavaScript",
    icon: "JS",
    color: "#f7df1e",
    desc: "JS Concepts & Patterns",
  },
  {
    id: "system design",
    label: "System Design",
    icon: "◈",
    color: "#7c8dff",
    desc: "Architecture & Scale",
  },
  {
    id: "oop",
    label: "OOP",
    icon: "◻",
    color: "#ff6b9d",
    desc: "Object-Oriented Principles",
  },
  {
    id: "database",
    label: "Database",
    icon: "⬡",
    color: "#ff9f43",
    desc: "SQL, Indexes, Modeling",
  },
  {
    id: "networking",
    label: "Networking",
    icon: "⬡",
    color: "#26d0ce",
    desc: "HTTP, DNS, Protocols",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    icon: "◎",
    color: "#a55eea",
    desc: "STAR Stories & Soft Skills",
  },
];

export const SUGGESTIONS: Record<string, string[]> = {
  dsa: [
    "two sum",
    "binary search",
    "LRU cache",
    "merge intervals",
    "valid parentheses",
  ],
  javascript: [
    "closures",
    "event loop",
    "promises vs async/await",
    "prototypal inheritance",
    "this keyword",
  ],
  "system design": [
    "design Twitter",
    "URL shortener",
    "rate limiter",
    "distributed cache",
    "notification system",
  ],
  oop: [
    "SOLID principles",
    "abstraction vs encapsulation",
    "composition vs inheritance",
    "factory pattern",
    "observer pattern",
  ],
  database: [
    "indexing",
    "ACID properties",
    "SQL vs NoSQL",
    "normalization",
    "transactions",
  ],
  networking: [
    "what happens when you type a URL",
    "TCP vs UDP",
    "REST vs GraphQL",
    "HTTP/2 vs HTTP/3",
    "OAuth 2.0",
  ],
  behavioral: [
    "conflict with a teammate",
    "time you failed",
    "handling tight deadlines",
    "leading without authority",
    "receiving harsh feedback",
  ],
};

export const SYSTEM_PROMPT = `You are an Interview Explanation Coach. Your job is to teach the user HOW to explain their thinking clearly, confidently, and professionally in a technical interview setting.

Always respond with ALL FIVE sections in this exact order, each starting with its emoji header on its own line:

### 1. 🔍 Problem Restatement
Restate the question in simple, plain language. Strip jargon. Open with: "So the question is asking me to…"

### 2. 💻 Code / Diagram / Example
- Coding topics (DSA, JavaScript, OOP): Provide clean, interview-ready code in a markdown code block.
- System design: Provide an ASCII diagram or structured architecture outline.
- Conceptual topics (database, networking): Provide a diagram, table, or structured comparison in a code block.
- Behavioral: Provide a STAR outline in a code block.
NEVER skip this section.

### 3. 🗣️ Line-by-Line Commentary
Walk through the solution step by step as if narrating at a whiteboard. Use first-person: "Here I'm doing X because…"

### 4. 🧭 Narration Guidance
Meta-advice on HOW to deliver the explanation. Include tips on pacing, pausing, checking in with the interviewer.

### 5. 🎯 Interview Extras
- 2–3 likely follow-up questions
- Edge cases to mention proactively
- Alternative approaches
Keep all sections focused and concise.`;
