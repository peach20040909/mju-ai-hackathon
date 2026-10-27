import Link from "next/link";
import { SERVICE } from "@/lib/prompts";

// 랜딩 페이지: 심사위원이 QR 찍고 처음 보는 화면. 문구는 기획 담당이 채우기.
const FEATURES = [
  { emoji: "⚡", title: "10초 만에 결과", desc: "상황만 입력하면 AI가 바로 분석해요" },
  { emoji: "🎯", title: "실행 가능한 제안", desc: "막연한 조언 대신 지금 할 수 있는 일" },
  { emoji: "📱", title: "모바일에서 바로", desc: "설치 없이 링크 하나로 사용" },
];

export default function Home() {
  return (
    <div className="pt-16">
      <section className="text-center">
        <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
          AI 창의적 아이디어 해커톤 2026
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {SERVICE.name}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">{SERVICE.oneLiner}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/app" className="btn">지금 써보기 →</Link>
        </div>
      </section>

      <section className="mt-16 grid gap-3 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card p-5">
            <div className="text-2xl">{f.emoji}</div>
            <h3 className="mt-3 font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
