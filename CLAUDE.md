# 해커톤 프로젝트 — Claude Code용 컨텍스트

명지대 AI 창의적 아이디어 해커톤(밤샘, 11/5 20:00 ~ 11/6 08:30 제출, 발표 5분).
개발자는 1명(백엔드 주력), 나머지 팀원 3명은 기획·디자인. **속도와 시연 안정성이 최우선.**

## 구조
- `src/lib/prompts.ts` — ★ 주제별로 제일 먼저 수정. 서비스 이름/문구, SYSTEM_PROMPT, buildPrompt, ResultSchema(zod)
- `src/lib/ai.ts` — LLM 호출(Anthropic/OpenAI fetch, 키 없거나 실패 시 mock). 건드릴 일 거의 없음
- `src/app/api/analyze` — 입력(+이미지) → JSON 결과. `api/chat` — 대화형. `api/health` — 상태 확인
- `src/app/page.tsx` 랜딩, `src/app/app/page.tsx` 핵심 기능, `src/app/history` 기록(localStorage)
- `src/components/ResultView.tsx` — 결과 카드 UI
- `src/app/globals.css` — 색 토큰(:root). 디자인 톤은 여기서

## 규칙
- 스택: Next.js 15 App Router + TypeScript + Tailwind v4. 새 라이브러리는 꼭 필요할 때만
- DB 없음(localStorage). 진짜 필요하면 Supabase 추가 고려
- 결과 형식을 바꾸면 ResultSchema · buildPrompt의 JSON 예시 · ResultView 세 곳을 같이 수정
- 모바일 우선(심사위원이 QR로 폰에서 접속). 모든 화면 375px에서 확인
- 에러가 나도 화면이 멈추지 않게: 로딩/에러/빈 상태 항상 처리
- 배포: GitHub push → Vercel 자동 배포. 환경변수는 Vercel 대시보드에 설정
