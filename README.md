# 해커톤 스타터 (Next.js + AI)

입력 → AI 분석 → 결과 카드까지 이미 동작하는 뼈대입니다. 주제가 나오면 **`src/lib/prompts.ts`만 고쳐도** 서비스가 하나 나옵니다.

## 1. 대회 전에 끝내둘 것 (집에서, 30분)

```bash
npm install
cp .env.example .env.local   # 키 넣기 (없으면 mock으로 동작)
npm run dev                  # http://localhost:3000
```

1. **GitHub**에 새 레포 만들고 push
2. **Vercel** 로그인(GitHub 연동) → Add New Project → 이 레포 Import → Deploy
3. Vercel → Settings → Environment Variables에 `ANTHROPIC_API_KEY`(또는 `OPENAI_API_KEY`) 추가 → Redeploy
4. 배포 URL에서 `/app` 실행해서 실제 AI 응답 나오는지, `/api/health` 확인
5. API 크레딧 잔액 확인 (밤새 테스트하면 몇 천 원 나올 수 있음)

→ 당일에는 **push만 하면 1~2분 뒤 자동 배포**됩니다.

## 2. 주제 발표 후 수정 순서

| 순서 | 파일 | 할 일 |
|---|---|---|
| 1 | `src/lib/prompts.ts` | 서비스 이름·한 줄 소개·입력 문구, AI 역할(SYSTEM_PROMPT), 결과 JSON 모양 |
| 2 | `src/components/ResultView.tsx` | 결과 모양을 바꿨다면 카드 UI 수정 |
| 3 | `src/app/page.tsx` | 랜딩 문구(FEATURES) — 기획 담당이 써준 문구 붙여넣기 |
| 4 | `src/app/globals.css` | `:root` 색 토큰 — 디자인 담당이 정한 브랜드 컬러 |

Claude Code 쓸 때: `CLAUDE.md`에 구조가 정리돼 있어서 "주제는 OOO, 이런 기능으로 바꿔줘"라고만 해도 됩니다.

## 3. 기능 지도

- `/` 랜딩 · `/app` 핵심 기능(텍스트 + 이미지 입력) · `/history` 기록
- `POST /api/analyze` `{ input, imageDataUrl? }` → `{ result, mocked }`
- `POST /api/chat` `{ messages:[{role,content}], system? }` → `{ reply }` (챗봇형 주제일 때)
- `GET /api/health` → 현재 사용 중인 AI provider 확인
- API 키가 없거나 호출 실패 → **자동으로 mock 응답** (발표 중 와이파이 끊겨도 화면은 나옴)
