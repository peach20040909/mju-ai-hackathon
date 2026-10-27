import { NextResponse } from "next/server";
import { extractJson, generate } from "@/lib/ai";
import { buildPrompt, ResultSchema, SYSTEM_PROMPT } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 60; // Vercel 함수 타임아웃(초)

export async function POST(req: Request) {
  try {
    const { input, imageDataUrl } = (await req.json()) as { input?: string; imageDataUrl?: string };
    if (!input?.trim() && !imageDataUrl) {
      return NextResponse.json({ error: "입력이 비어 있어요" }, { status: 400 });
    }

    const out = await generate({
      system: SYSTEM_PROMPT,
      prompt: buildPrompt(input?.trim() || "(이미지만 첨부됨)"),
      json: true,
      imageDataUrl,
    });

    const parsed = ResultSchema.safeParse(extractJson(out.text));
    if (!parsed.success) {
      return NextResponse.json({ error: "AI 응답 형식이 달라요. 다시 시도해 주세요.", raw: out.text }, { status: 502 });
    }
    return NextResponse.json({ result: parsed.data, provider: out.provider, mocked: out.mocked });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "서버 오류가 발생했어요" }, { status: 500 });
  }
}
