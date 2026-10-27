// DB 없이 브라우저에 결과 기록 저장 (해커톤 데모용). 실패해도 앱은 동작.
import type { Result } from "./prompts";

export type HistoryItem = { id: string; input: string; result: Result; at: number };
const KEY = "hk-history-v1";

export function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveHistory(item: Omit<HistoryItem, "id" | "at">) {
  try {
    const list = [{ ...item, id: crypto.randomUUID(), at: Date.now() }, ...loadHistory()].slice(0, 30);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
