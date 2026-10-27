"use client";

import { useEffect, useState } from "react";
import { clearHistory, loadHistory, type HistoryItem } from "@/lib/history";
import { ResultView } from "@/components/ResultView";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => setItems(loadHistory()), []);

  return (
    <div className="pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">기록</h1>
        {items.length > 0 && (
          <button className="btn btn-ghost h-9 text-sm" onClick={() => (clearHistory(), setItems([]))}>
            전체 삭제
          </button>
        )}
      </div>
      {items.length === 0 && <p className="mt-6 text-muted">아직 기록이 없어요.</p>}
      <div className="mt-4 space-y-3">
        {items.map((h) => (
          <div key={h.id} className="card p-4">
            <button className="w-full text-left" onClick={() => setOpen(open === h.id ? null : h.id)}>
              <div className="font-semibold">{h.result.title}</div>
              <div className="mt-1 line-clamp-1 text-sm text-muted">{h.input}</div>
              <div className="mt-1 text-xs text-muted">{new Date(h.at).toLocaleString("ko-KR")}</div>
            </button>
            {open === h.id && <div className="mt-4"><ResultView result={h.result} /></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
