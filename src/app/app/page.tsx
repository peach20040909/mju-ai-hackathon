"use client";

import { useState } from "react";
import { SERVICE, type Result } from "@/lib/prompts";
import { saveHistory } from "@/lib/history";
import { ResultSkeleton, ResultView } from "@/components/ResultView";

// 핵심 기능 화면: 입력 → AI 분석 → 결과 카드
export default function AppPage() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [mocked, setMocked] = useState(false);

  // 폰 사진은 용량이 커서 Vercel 요청 한도(4.5MB)를 넘기 쉬움 → 1280px JPEG로 줄여서 보냄
  async function onFile(f?: File) {
    if (!f) return setImage(null);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(url);
    };
    img.onerror = () => setError("이미지를 읽지 못했어요");
    img.src = url;
  }

  async function submit() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input, imageDataUrl: image ?? undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "요청 실패");
      setResult(data.result);
      setMocked(data.mocked);
      saveHistory({ input, result: data.result });
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold">{SERVICE.inputLabel}</h1>

      <div className="card mt-4 p-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SERVICE.inputPlaceholder}
          rows={5}
          className="w-full resize-none bg-transparent text-base outline-none placeholder:text-muted"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !loading) submit();
          }}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
          <label className="cursor-pointer text-sm text-muted hover:text-text">
            📎 {image ? "이미지 첨부됨 (변경)" : "이미지 첨부 (선택)"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <button className="btn" disabled={loading || (!input.trim() && !image)} onClick={submit}>
            {loading ? "분석 중…" : "분석하기"}
          </button>
        </div>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="첨부 이미지" className="mt-3 max-h-48 rounded-lg border border-line" />
        )}
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      {mocked && result && (
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
          MOCK 응답이에요 (API 키 미설정 또는 호출 실패)
        </p>
      )}

      <div className="mt-6">
        {loading && <ResultSkeleton />}
        {result && <ResultView result={result} />}
      </div>
    </div>
  );
}
