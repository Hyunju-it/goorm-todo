# Goorm TODO 앱

간단하고 직관적인 할 일 관리 웹 애플리케이션입니다.

## 🚀 주요 기능
- ✅ TODO 항목 추가, 조회, 수정, 삭제 (CRUD)
- ✏️ 인라인 편집으로 할 일 내용 수정
- 📱 반응형 디자인 (모바일/데스크톱 지원)
- 💾 MongoDB를 통한 데이터 영구 저장
- ⚡ 실시간 UI 업데이트
- 🎨 깔끔하고 사용하기 쉬운 인터페이스

## 🛠 사용 기술

### 프론트엔드
- **React 19** - 컴포넌트 기반 UI 라이브러리
- **TypeScript** - 정적 타입 검사
- **CSS3** - 반응형 스타일링
- **Fetch API** - 비동기 HTTP 통신

### 백엔드
- **Express.js** - 웹 서버 프레임워크
- **MongoDB** - NoSQL 데이터베이스
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing

## 📁 프로젝트 구조

```
goorm-todo/
├── client/             # React 프론트엔드
│   ├── src/
│   │   ├── components/ # React 컴포넌트
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── AddTodo.tsx
│   │   ├── types/      # TypeScript 타입 정의
│   │   │   └── Todo.ts
│   │   ├── App.tsx     # 메인 앱 컴포넌트
│   │   └── index.tsx   # 엔트리 포인트
│   ├── package.json    # 클라이언트 의존성
│   └── tsconfig.json   # TypeScript 설정
├── server/             # Express 백엔드
│   ├── app.js          # Express 서버 및 API 라우트
│   └── package.json    # 서버 의존성
├── docs/               # 프로젝트 문서
│   ├── API.md          # API 문서
│   ├── SETUP.md        # 설치 및 실행 가이드
│   └── FEATURES.md     # 기능 명세서
├── package.json        # 루트 프로젝트 설정
└── README.md           # 프로젝트 개요
```

## 🏁 빠른 시작

### 사전 요구사항
- Node.js (v16 이상)
- MongoDB (로컬 설치 또는 MongoDB Atlas)

### 설치 및 실행
```bash
# 모든 의존성 설치
npm run install:all

# MongoDB 시작 (로컬)
# macOS: brew services start mongodb/brew/mongodb-community
# Ubuntu: sudo systemctl start mongod

# 개발 서버 실행 (서버: 3001, 클라이언트: 3000)
npm run dev

# 또는 개별 실행
npm run dev:server  # 서버만 실행 (포트 3001)
npm run dev:client  # 클라이언트만 실행 (포트 3000)
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 📦 Available Scripts

### 루트 레벨
- `npm run dev` - 서버와 클라이언트 동시 실행
- `npm run dev:server` - 서버만 개발 모드로 실행
- `npm run dev:client` - 클라이언트만 실행
- `npm run start:server` - 서버만 프로덕션 모드로 실행
- `npm run start:client` - 클라이언트만 프로덕션 모드로 실행
- `npm run build` - 클라이언트 빌드
- `npm run install:all` - 모든 패키지 설치
- `npm run install:server` - 서버 패키지만 설치
- `npm run install:client` - 클라이언트 패키지만 설치

### 서버 (server/ 디렉토리)
- `npm start` - 프로덕션 모드로 서버 실행
- `npm run dev` - 개발 모드로 서버 실행 (nodemon)

### 클라이언트 (client/ 디렉토리)
- `npm start` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm test` - 테스트 실행

## 📚 문서

자세한 내용은 `docs/` 폴더의 문서를 참고하세요:
- [API 문서](docs/API.md)
- [설치 및 실행 가이드](docs/SETUP.md)
- [기능 명세서](docs/FEATURES.md)

## 🤝 개발 완료 체크리스트

- [x] 프로젝트 초기 세팅 및 디렉토리 구성
- [x] React + TypeScript 프론트엔드 구현
- [x] 데이터베이스 스키마 설계
- [x] API 라우팅 설계 및 구현
- [x] React 컴포넌트 구성
- [x] 상태관리 및 이벤트 처리 구현
- [x] CRUD 기능 구현 (추가, 조회, 수정, 삭제)
- [x] 인라인 편집 기능 구현
- [x] 반응형 디자인 적용
- [x] 서버/클라이언트 분리 구조
- [x] 프로젝트 문서 작성
