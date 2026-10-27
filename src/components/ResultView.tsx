import type { Result } from "@/lib/prompts";

export function ResultView({ result }: { result: Result }) {
  return (
    <div className="space-y-3">
      <div className="card p-5">
        <h2 className="text-xl font-bold">{result.title}</h2>
        <p className="mt-2 text-muted">{result.summary}</p>
      </div>
      {result.items.map((it, i) => (
        <div key={i} className="card p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold">
              <span className="mr-2 text-brand">{i + 1}</span>
              {it.title}
            </h3>
            {it.tag && (
              <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand">
                {it.tag}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{it.description}</p>
          {typeof it.score === "number" && (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-brand" style={{ width: `${Math.max(0, Math.min(100, it.score))}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div className="space-y-3">
      <div className="card space-y-3 p-5">
        <div className="skeleton h-6 w-1/2" />
        <div className="skeleton h-4 w-full" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="card space-y-3 p-5">
          <div className="skeleton h-5 w-1/3" />
          <div className="skeleton h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}
