---
name: stock-feature-dev
description: "Stock-Info 프로젝트에 새 기능을 풀스택으로 추가할 때 반드시 사용. backend-dev, frontend-dev, qa-reviewer 에이전트 팀을 조율하여 FastAPI 엔드포인트 + React 컴포넌트를 함께 개발하고 통합 검증까지 완료. '기능 추가', '새 페이지', '새 차트', '새 API', '엔드포인트 추가', '컴포넌트 추가' 등 풀스택 개발 요청 시 이 스킬을 사용할 것."
---

# Stock Feature Dev — 풀스택 기능 개발 오케스트레이터

Stock-Info 프로젝트에 새 기능을 추가할 때 backend-dev, frontend-dev, qa-reviewer 팀을 조율하는 오케스트레이터.

## 실행 모드: 에이전트 팀 (팬아웃/팬인 + 생성-검증 복합 패턴)

## 에이전트 구성

| 팀원 | 에이전트 타입 | 역할 | 출력 |
|------|-------------|------|------|
| backend-dev | 커스텀 (`backend-dev`) | FastAPI 엔드포인트 + 데이터 모듈 | `_workspace/backend_api_spec.md` + 코드 파일 |
| frontend-dev | 커스텀 (`frontend-dev`) | React 컴포넌트 + 차트 | `_workspace/frontend_components.md` + 코드 파일 |
| qa-reviewer | 커스텀 (`qa-reviewer`) | 통합 정합성 검증 | `_workspace/qa_report.md` |

## 워크플로우

### Phase 1: 요구사항 분석

1. 사용자 요청을 분석하여 다음을 파악한다:
   - 필요한 백엔드 API 엔드포인트 (URL, HTTP 메서드, 요청/응답 shape)
   - 필요한 프론트엔드 컴포넌트 (페이지 vs 공통 컴포넌트)
   - 필요한 DB 쿼리 또는 외부 데이터 소스
   - 영향받는 기존 파일 목록
2. `_workspace/` 디렉토리 생성
3. 요구사항을 `_workspace/00_requirements.md`에 정리

### Phase 2: 팀 구성

1. 팀 생성:
   ```
   TeamCreate(
     team_name: "stock-dev-team",
     members: [
       {
         name: "backend-dev",
         agent_type: "backend-dev",
         model: "opus",
         prompt: "당신은 Stock-Info 프로젝트의 백엔드 개발자입니다. _workspace/00_requirements.md를 읽고 백엔드 작업을 수행하세요. 구현 완료 후 _workspace/backend_api_spec.md에 API 스펙을 저장하고 frontend-dev에게 SendMessage로 알려주세요."
       },
       {
         name: "frontend-dev",
         agent_type: "frontend-dev",
         model: "opus",
         prompt: "당신은 Stock-Info 프로젝트의 프론트엔드 개발자입니다. _workspace/00_requirements.md를 읽되, backend-dev로부터 API 스펙 완성 알림을 받은 후 _workspace/backend_api_spec.md를 읽고 프론트엔드 작업을 시작하세요. 완료 후 _workspace/frontend_components.md에 컴포넌트 정보를 저장하고 qa-reviewer에게 알려주세요."
       },
       {
         name: "qa-reviewer",
         agent_type: "qa-reviewer",
         model: "opus",
         prompt: "당신은 Stock-Info 프로젝트의 QA 검증자입니다. backend-dev와 frontend-dev 양쪽에서 구현 완료 알림을 받은 후 통합 검증을 수행하세요. 결과를 _workspace/qa_report.md에 저장하고 리더에게 SendMessage로 최종 결과를 보고하세요."
       }
     ]
   )
   ```

2. 작업 등록:
   ```
   TaskCreate(tasks: [
     { title: "backend-API 구현", description: "요구사항에 맞는 FastAPI 엔드포인트 및 데이터 모듈 구현", assignee: "backend-dev" },
     { title: "backend-API 스펙 문서화", description: "_workspace/backend_api_spec.md에 응답 shape 저장", assignee: "backend-dev", depends_on: ["backend-API 구현"] },
     { title: "frontend-컴포넌트 구현", description: "API 스펙에 맞는 React 컴포넌트 및 차트 구현", assignee: "frontend-dev", depends_on: ["backend-API 스펙 문서화"] },
     { title: "qa-통합 검증", description: "API 응답 shape와 프론트엔드 소비 코드 교차 비교", assignee: "qa-reviewer", depends_on: ["frontend-컴포넌트 구현"] }
   ])
   ```

### Phase 3: 개발 (팀 자체 조율)

**실행 방식:** backend-dev → frontend-dev → qa-reviewer 순차 의존 (API 스펙 확정 후 UI 개발)

팀원들이 공유 작업 목록을 통해 자체 조율한다. 리더는 모니터링하며 개입한다.

**핵심 통신 흐름:**
- backend-dev가 API 스펙 완성 → frontend-dev에게 SendMessage
- frontend-dev가 컴포넌트 완성 → qa-reviewer에게 SendMessage
- qa-reviewer가 버그 발견 → 해당 에이전트에게 SendMessage로 버그 리포트
- qa-reviewer가 최종 판정 → 리더에게 SendMessage

**산출물 저장 경로:**

| 팀원 | 출력 경로 |
|------|----------|
| backend-dev | `_workspace/backend_api_spec.md` + `backend/` 코드 파일 |
| frontend-dev | `_workspace/frontend_components.md` + `frontend/src/` 코드 파일 |
| qa-reviewer | `_workspace/qa_report.md` |

**리더 모니터링:**
- 팀원이 유휴 상태가 되면 자동 알림 — TaskGet으로 전체 진행률 확인
- frontend-dev가 backend-dev 스펙 없이 30분 이상 대기하면 직접 개입
- qa-reviewer가 버그 발견 후 수정 루프가 2회 초과하면 리더가 중재

### Phase 4: QA 검증 및 수정

1. qa-reviewer의 최종 결과 수신
2. PASS이면 Phase 5로 진행
3. FAIL이면 해당 에이전트에게 SendMessage로 수정 지시 → Phase 3 재실행 (최대 2회)
4. 2회 재시도 후에도 FAIL이면 사용자에게 알리고 진행 여부 확인

### Phase 5: 정리

1. 팀원들에게 종료 요청 (SendMessage)
2. TeamDelete로 팀 정리
3. `_workspace/` 보존 (감사 추적용)
4. 사용자에게 완료 보고:
   - 구현된 파일 목록
   - 새 API 엔드포인트 요약
   - 새 페이지/컴포넌트 요약
   - QA 결과 요약

## 데이터 흐름

```
[리더: 요구사항 분석]
        ↓
[backend-dev: API 구현] → backend_api_spec.md
        ↓ SendMessage
[frontend-dev: 컴포넌트 구현] → frontend_components.md
        ↓ SendMessage
[qa-reviewer: 교차 검증] → qa_report.md
        ↓ SendMessage
[리더: 완료 보고]
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| backend-dev 실패 | 리더가 직접 API 스펙 작성 후 frontend-dev에게 전달 |
| frontend-dev 실패 | 리더가 컴포넌트 요구사항 단순화 후 재시도 |
| qa-reviewer 실패 | 리더가 수동으로 backend_api_spec.md와 frontend 코드 교차 확인 |
| QA 2회 FAIL | 사용자에게 알리고 버그 리포트만 제공, 수동 수정 권장 |
| 팀원 간 데이터 충돌 | 출처 명시 후 병기, 리더가 최종 판단 |

## 테스트 시나리오

### 정상 흐름
1. 사용자: "종목 비교 기능을 추가해줘 — 두 종목의 주가 차트를 같이 보고 싶어"
2. Phase 1: backend에 `/compare?code1=005930&code2=000660` 엔드포인트 필요, frontend에 비교 차트 페이지 필요
3. Phase 2: 3명 팀 구성, 4개 작업 등록
4. Phase 3: backend-dev가 API 구현 → frontend-dev에게 스펙 전달 → frontend-dev가 Chart.js 비교 차트 구현 → qa-reviewer 검증
5. Phase 4: QA PASS
6. 결과: `backend/main.py`에 새 엔드포인트, `frontend/src/pages/CompareChart.js` 생성

### 에러 흐름
1. qa-reviewer가 "backend 응답의 날짜 형식이 `20240101`이지만 frontend는 `2024-01-01`을 기대" 버그 발견
2. backend-dev에게 SendMessage: 날짜 형식 수정 요청
3. backend-dev가 수정 완료 → qa-reviewer 재검증
4. 재검증 PASS → Phase 5 진행
