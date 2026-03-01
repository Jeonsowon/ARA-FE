# 🤖 ARA 학습용 챗봇 (Frontend)

ARA는 학습을 돕는 **웹 기반 챗봇** 프로젝트입니다.
프론트엔드는 **HTML / CSS / Vanilla JavaScript(ES Modules)** 로 구현했으며, JWT 인증 기반으로 서버 API와 통신해 채팅방 단위로 학습 대화를 관리합니다.

> **담당 역할:** 프론트엔드 전담  
> UI/UX 구현, 채팅 인터랙션, API 연동(fetch), 로그인/회원가입 팝업 플로우, 사이드바/채팅방 관리, Markdown 렌더링 및 타이핑 애니메이션 적용을 담당했습니다.

---

## 📌 프로젝트 설명

사용자가 메시지를 입력하면 서버에 요청을 보내 챗봇 응답을 받아 화면에 출력하는 학습용 챗봇입니다.  
챗봇은 **채팅방(chatroom)** 단위로 대화를 저장/로드할 수 있고, 좌측 사이드바에서 채팅방 목록을 관리(조회/이름 변경/삭제)할 수 있습니다.

또한 학습 보조를 위한 **액션 버튼(학습내용 요약, 질문내용 요약, 퀴즈 생성)** UI를 제공하며, 
봇 응답은 **Markdown 렌더링(marked)** 및 **타이핑 애니메이션(Typed.js)** 으로 읽기 쉬운 형태로 표시됩니다.

---

## ✅ 주요 기능

### 1) 인증 (로그인/회원가입)
- 토큰(JWT)을 `localStorage`에 저장하여 로그인 상태 유지
- 미로그인 상태에서 메시지 전송 시 **로그인 팝업** 표시
- 401/403 응답 시 토큰 제거 후 로그인 재유도

### 2) 채팅(메시지 전송/렌더링)
- Enter/전송 버튼으로 메시지 전송
- 입력값 기반 전송 버튼 활성/비활성 처리
- 입력창 자동 높이 조절(auto resize)
- 사용자 메시지 즉시 UI에 표시(Optimistic UI)
- 봇 메시지:
  - `\\n` → `\n` 변환
  - Markdown → HTML 렌더링(`marked`)
  - 타이핑 애니메이션(`Typed.js`)

### 3) 채팅방(chatroom) 관리
- URL 기반 채팅방 식별: `/chatroom=<chatroomId>`
- 채팅방 목록 불러오기
- 채팅방 클릭 시 해당 채팅방으로 이동 및 히스토리 로드
- 채팅방 옵션(더보기) 팝업:
  - 이름 변경(PUT)
  - 채팅방 삭제(DELETE)
- 메인 페이지 UI 복원(채팅방 해제 및 초기 안내 문구 표시)

### 4) 사이드바/학습 UI
- 좌측 사이드바: Study Chats / Library / Custom Widgets 섹션
- 섹션 토글 버튼 UI
- 파일 추가 UI(업로드 입력 요소 포함)
- 학습 액션 버튼 UI(요약/퀴즈 생성)

---

## 🛠 Tech Stack

- **HTML5 / CSS3**
- **JavaScript (Vanilla, ES Modules)**
- **Fetch API** (REST 통신)
- **JWT** (Authorization Bearer Token)
- **marked** (Markdown 렌더링)
- **Typed.js** (타이핑 애니메이션)
- **Google Material Icons**

---

## 🔌 API 연동

> Base URL: `https://api.stai.kr`

- 메시지 전송 / (필요 시) 채팅방 생성  
  - `POST /chat/new`  
  - Body: `{ "message": "...", "chatroom_id": "..." | null }`  
  - Header: `Authorization: Bearer <token>`  
  - Response 예시: `{ "chatroomId": "...", "botMessage": "..." }`

- 채팅방 메시지 로드  
  - `GET /chatroom/{chatroomId}`  
  - Header: `Authorization: Bearer <token>`  
  - Response 예시: `{ "chatroom": {...}, "messages": [...] }`

- 채팅방 목록 조회  
  - `GET /api/chatrooms`  
  - Header: `Authorization: Bearer <token>`

- 채팅방 이름 변경  
  - `PUT /api/chatroom/{chatroomId}`  
  - Body: `{ "newTitle": "..." }`  
  - Header: `Authorization: Bearer <token>`

- 채팅방 삭제  
  - `DELETE /api/chatroom/{chatroomId}`  
  - Header: `Authorization: Bearer <token>`

---

## 📁 프로젝트 구조 (핵심 모듈)

- `index.html` : 전체 레이아웃(사이드바/채팅 UI/팝업 포함)
- `css/main.css` : 스타일
- `js/main.js` : 엔트리(모듈 초기화)
- `js/dom-elements.js` : DOM 요소 셀렉터 모음(단일 참조 관리)
- `js/chat-actions.js` : 메시지 전송/채팅방 메시지 로드/렌더링 로직
- `js/chat-management.js` : 채팅방 목록/이름변경/삭제/메인 페이지 복원 로직

---

## 🧩 UI 구성

### 사이드바(좌측)
- Study Chats 목록 + 채팅방 추가 버튼
- 채팅방 옵션 팝업(이름 변경/삭제)
- Library(파일 추가 UI)
- Custom Widgets(위젯 추가 UI)

### 메인(우측)
- 상단 헤더(사이드바 토글, 로고, 공유/유저 버튼)
- 채팅 안내 문구
- 메시지 입력 영역(textarea + send button)
- 학습 액션 버튼(요약/퀴즈 생성)

### 팝업
- 로그인 팝업
- 회원가입 팝업
- 사용자 정보 팝업(로그아웃 포함)

---

## 🚀 실행 방법

1) 저장소 클론
- `git clone https://github.com/Jeonsowon/ARA-FE.git`

2) 실행
- 정적 페이지 기반이므로 `index.html`을 브라우저에서 열거나,
- VSCode **Live Server** 실행을 권장합니다.

---

## 👩‍💻 담당 역할 (Frontend)

- 전체 UI/UX 설계 및 퍼블리싱(HTML/CSS)
- DOM 요소 모듈화(`dom-elements.js`)로 유지보수성 개선
- 메시지 전송/응답 렌더링 로직 구현(`chat-actions.js`)
- Markdown 렌더링 + 타이핑 애니메이션 적용(marked, Typed.js)
- JWT 로그인 플로우(팝업, 토큰 저장/만료 처리) 구현
- 채팅방 목록/옵션(이름변경/삭제)/라우팅(History API) 구현(`chat-management.js`)
- 메인 페이지 UI 복원 및 사용자 경험(스크롤/상태 처리) 개선
