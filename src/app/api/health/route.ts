// 발표 전 서버/키 상태 확인용: /api/health
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    provider:
      process.env.AI_PROVIDER ||
      (process.env.ANTHROPIC_API_KEY ? "anthropic" : process.env.OPENAI_API_KEY ? "openai" : "mock"),
    time: new Date().toISOString(),
  });
}
