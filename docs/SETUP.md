# 설치 및 실행 가이드

## 사전 요구사항
- Node.js (v16 이상)
- MongoDB (로컬 설치 또는 MongoDB Atlas)
- npm 또는 yarn

## 설치 방법

### 1. 저장소 클론
```bash
git clone <repository-url>
cd goorm-todo
```

### 2. 의존성 설치
```bash
# 모든 패키지 설치 (루트, 서버, 클라이언트)
npm run install:all

# 또는 개별 설치
npm install                    # 루트 패키지 (concurrently)
npm run install:server        # 서버 패키지
npm run install:client        # 클라이언트 패키지
```

### 3. MongoDB 설정
로컬 MongoDB를 사용하는 경우:
```bash
# MongoDB 서비스 시작 (macOS)
brew services start mongodb/brew/mongodb-community

# MongoDB 서비스 시작 (Ubuntu)
sudo systemctl start mongod

# MongoDB 서비스 시작 (Windows)
net start MongoDB
```

### 4. 애플리케이션 실행

#### 개발 모드 (추천)
```bash
# 서버와 클라이언트 동시 실행
npm run dev
```

이 명령어는 다음을 동시에 실행합니다:
- 서버: `http://localhost:3001` (nodemon으로 자동 재시작)
- 클라이언트: `http://localhost:3000` (React 개발 서버)

#### 개별 실행
```bash
# 서버만 실행
npm run dev:server

# 클라이언트만 실행
npm run dev:client
```

#### 프로덕션 모드
```bash
# 클라이언트 빌드
npm run build

# 서버 실행
npm run start:server
```

## 접속 방법
브라우저에서 `http://localhost:3000`으로 접속

## 프로젝트 구조
```
goorm-todo/
├── client/             # React 프론트엔드
│   ├── src/
│   │   ├── components/ # React 컴포넌트
│   │   ├── types/      # TypeScript 타입 정의
│   │   ├── App.tsx     # 메인 앱 컴포넌트
│   │   └── index.tsx   # 엔트리 포인트
│   ├── package.json    # 클라이언트 의존성
│   └── tsconfig.json   # TypeScript 설정
├── server/             # Express 백엔드
│   ├── app.js          # Express 서버 및 API 라우트
│   └── package.json    # 서버 의존성
├── docs/               # 프로젝트 문서
├── package.json        # 루트 프로젝트 설정
└── README.md           # 프로젝트 개요
```

## 포트 설정
- **서버**: 3001 (기본값)
- **클라이언트**: 3000 (기본값)
- **프록시**: 클라이언트에서 `/api` 요청을 서버로 프록시

## 환경 변수 (선택사항)
서버 디렉토리에 `.env` 파일을 생성하여 다음 변수들을 설정할 수 있습니다:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/goorm-todo
```

## 개발 워크플로우

### 1. 새로운 기능 개발
1. 서버 API 수정: `server/app.js`
2. React 컴포넌트 수정: `client/src/components/`
3. 타입 정의 수정: `client/src/types/`

### 2. 패키지 추가
```bash
# 서버 패키지 추가
cd server && npm install <package-name>

# 클라이언트 패키지 추가
cd client && npm install <package-name>
```

### 3. 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 빌드 파일 확인
ls client/build/
```

## 문제 해결

### MongoDB 연결 오류
- MongoDB 서비스가 실행 중인지 확인
- 연결 URL이 올바른지 확인 (기본값: `mongodb://localhost:27017/goorm-todo`)
- 방화벽 설정 확인

### 포트 충돌
- 다른 애플리케이션이 3000번 또는 3001번 포트를 사용하고 있지 않은지 확인
- 환경변수로 다른 포트 설정 가능

### 프록시 오류
- `client/package.json`의 `"proxy": "http://localhost:3001"` 설정 확인
- 서버가 3001 포트에서 실행 중인지 확인

### TypeScript 오류
- `client/` 디렉토리에서 `npx tsc --noEmit` 실행하여 타입 검사
- 타입 정의 파일 확인: `client/src/types/`

### 패키지 설치 오류
- Node.js 버전 확인 (v16 이상 필요)
- npm 캐시 클리어: `npm cache clean --force`
- node_modules 삭제 후 재설치:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```