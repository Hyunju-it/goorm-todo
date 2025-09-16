# API 문서

## 개요
Goorm TODO 앱의 RESTful API 문서입니다.

## 기본 URL
- 개발 환경: `http://localhost:3001/api`
- 프론트엔드 프록시를 통한 접근: `http://localhost:3000/api`

## 엔드포인트

### 1. 모든 TODO 조회
- **URL**: `/todos`
- **Method**: `GET`
- **설명**: 모든 TODO 항목을 최신순으로 조회
- **응답**:
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "text": "할 일 내용",
    "completed": false,
    "createdAt": "2023-09-06T10:30:00.000Z"
  }
]
```

### 2. TODO 추가
- **URL**: `/todos`
- **Method**: `POST`
- **설명**: 새로운 TODO 항목을 추가
- **요청 본문**:
```json
{
  "text": "새로운 할 일",
  "completed": false
}
```
- **응답**:
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "text": "새로운 할 일",
  "completed": false,
  "createdAt": "2023-09-06T10:30:00.000Z"
}
```

### 3. TODO 수정
- **URL**: `/todos/:id`
- **Method**: `PUT`
- **설명**: TODO 항목의 완료 상태 또는 텍스트 내용을 수정
- **요청 본문 (완료 상태 변경)**:
```json
{
  "completed": true
}
```
- **요청 본문 (텍스트 수정)**:
```json
{
  "text": "수정된 할 일 내용"
}
```
- **요청 본문 (둘 다 수정)**:
```json
{
  "text": "수정된 할 일 내용",
  "completed": true
}
```
- **응답**:
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "text": "수정된 할 일 내용",
  "completed": true,
  "createdAt": "2023-09-06T10:30:00.000Z"
}
```

### 4. TODO 삭제
- **URL**: `/todos/:id`
- **Method**: `DELETE`
- **설명**: TODO 항목을 삭제
- **응답**:
```json
{
  "message": "Todo deleted successfully"
}
```

## 오류 응답
모든 오류는 다음 형식으로 반환됩니다:
```json
{
  "error": "오류 메시지"
}
```

### 상태 코드
- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `404`: 리소스를 찾을 수 없음
- `500`: 서버 내부 오류

## 클라이언트 연동
React 클라이언트는 프록시를 통해 API에 접근합니다:
- 클라이언트: `http://localhost:3000`
- 서버: `http://localhost:3001`
- 프록시 설정: `client/package.json`에서 `"proxy": "http://localhost:3001"` 설정

이를 통해 클라이언트에서는 상대 경로 `/api/todos`로 API 호출이 가능합니다.