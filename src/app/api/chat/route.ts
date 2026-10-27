// 자유 대화형 기능이 필요할 때 쓰는 범용 엔드포인트 (텍스트 응답)
import { NextResponse } from "next/server";
import { generate } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const { messages, system } = (await req.json()) as { messages: Msg[]; system?: string };
  if (!messages?.length) return NextResponse.json({ error: "messages 필요" }, { status: 400 });

  // 단순화를 위해 대화 기록을 하나의 프롬프트로 합쳐서 보냄
  const history = messages.map((m) => `${m.role === "user" ? "사용자" : "AI"}: ${m.content}`).join("\n");
  const out = await generate({
    system: system ?? "너는 친절하고 간결한 한국어 AI 어시스턴트다.",
    prompt: `${history}\nAI:`,
  });
  return NextResponse.json({ reply: out.text.trim(), mocked: out.mocked });
}
