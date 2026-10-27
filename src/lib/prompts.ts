// ★ 주제 발표 후 제일 먼저 고치는 파일 ★
// 서비스의 "AI가 하는 일"을 여기서 정의. 화면은 ResultSchema 모양만 맞추면 그대로 렌더링됨.
import { z } from "zod";

export const SERVICE = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "우리팀 서비스",
  oneLiner: "AI가 상황을 분석해서 바로 실행할 수 있는 제안을 줍니다",
  inputLabel: "지금 상황을 알려주세요",
  inputPlaceholder: "예) 다음 주에 팀플 발표가 있는데 역할 분담이 안 돼서 고민이에요",
};

export const SYSTEM_PROMPT = `너는 대학생을 돕는 서비스의 AI 어시스턴트다.
사용자의 입력을 분석해서 바로 실행 가능한 제안을 한국어로 준다.
제안은 구체적이고 짧게. 과장하지 말 것.`;

export function buildPrompt(input: string) {
  return `사용자 입력:
"""
${input}
"""

아래 JSON 형식으로만 답하라:
{
  "title": "결과 제목 (20자 이내)",
  "summary": "한두 문장 요약",
  "items": [
    { "title": "제안 제목", "description": "구체적인 설명 1~2문장", "tag": "짧은 태그", "score": 0~100 사이 정수(적합도) }
  ]
}
items는 3~5개.`;
}

export const ResultSchema = z.object({
  title: z.string(),
  summary: z.string(),
  items: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        tag: z.string().optional(),
        score: z.number().optional(),
      })
    )
    .default([]),
});
export type Result = z.infer<typeof ResultSchema>;
