# REACT NATIVE 커뮤니티 10012- Frontend
주제: REACT NATIVE 커뮤니티 개발

## 개발 인원
### 김민석 - 개인 

##  시작하기

### 사전 요구사항
- **Node.js 20+**
- **npm**


### 프로젝트 클론
```bash
git clone https://github.com/nas7062/REACT_NAVITE-.git .
```
### vsCode 실행

### 설치 및 실행
1. **의존성 설치**
```bash
npm install
```




3. **개발 서버 실행**

```bash
npm expo start
```

4. **브라우저에서 열기**
```
http://localhost:8081
```

## 💻 개발 가이드

### Path Alias 시스템

TypeScript path alias를 사용하여 깔끔한 import를 지원합니다.

**tsconfig.json 설정**:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
    }
  }
}
```
**사용 예시**:

```typescript
// ❌ 상대 경로 (복잡함)
import { Button } from "../..//src/components/ui/button";

// ✅ Path Alias (깔끔함)
import {CardTitle,
} from "@/components/ui/card";
```

### 스타일
- react-native  StyleSheet 사용
## 🛠 기술 스택

### Core
- **React** 19
- **React Native** 0.81 (Expo 기반)
- **Expo** 54
- **Expo Router** 6 (파일 기반 라우팅)

### 상태 관리 · 서버 상태
- **TanStack React Query** (`@tanstack/react-query`, Devtools 포함)
- **React Hook Form** (`react-hook-form`)
- **Zod** (Form/데이터 스키마 및 검증)

### 백엔드 · 데이터
- **Firebase**
  - JS SDK (`firebase`)
  - React Native Firebase
    - `@react-native-firebase/app`
    - `@react-native-firebase/auth`
    - `@react-native-firebase/firestore`

### UI · UX
- **Expo Image / Image Picker** (`expo-image`, `expo-image-picker`)
- **Expo Linear Gradient** (`expo-linear-gradient`)
- **Expo Vector Icons** (`@expo/vector-icons`)
- **React Native Toast Message** (`react-native-toast-message`)
- **Keyboard Aware Scroll View** (`react-native-keyboard-aware-scroll-view`)

### 유틸리티
- **Day.js** (날짜/시간 처리)
- **UUID** (`uuid`)
- **React Native Worklets** (`react-native-worklets`)

### 웹 대응
- **React Native Web** (`react-native-web`)
- **React DOM** (`react-dom`)

### 개발 도구

- **TypeScript** 5
- **ESLint + eslint-config-expo**
- **React Query Devtools** (`@tanstack/react-query-devtools`)
- **@types/react** (타입 정의)

## ✨ 주요 기능
### 인증(Authentication)
- **Firebase Authentication** 기반 회원가입 및 로그인
- 이메일·비밀번호 방식 사용자 관리
- 로그인 유지 및 자동 세션 관리

### 커뮤니티 기능
- **게시글 CRUD**  
  - 게시글 생성(Create)  
  - 게시글 조회(Read) – 목록 & 상세 페이지  
  - 게시글 수정(Update)  
  - 게시글 삭제(Delete)
    
- **무한 스크롤 목록**
  - `FlatList` + **React Query `useInfiniteQuery`** 조합을 활용한 무한 스크롤 구현
  - 스크롤 하단 도달 시 다음 페이지 자동 요청
  - Firestore 기반 페이징 데이터 로딩

- **이미지 첨부 기능**
  - Expo Image Picker를 활용한 이미지 업로드
  - 게시글 내 이미지 미리보기 및 표시

- **댓글 및 대댓글(계층형 댓글) 기능**
  - 실시간 Firestore 기반 댓글 저장
  - 특정 댓글에 대한 대댓글 작성 기능
  - 작성/수정/삭제 지원

- **좋아요(Like) 기능**
  - 각 게시글에 대한 좋아요 추가/취소 기능
  - Firestore에서 사용자별 좋아요 상태 관리

### 프로필 기능
- **내 정보 조회**  
  - 닉네임, 이메일 등 사용자 정보 표시

- **활동 내역 요약**
  - 내가 작성한 게시글 개수
  - 내가 작성한 댓글 개수

- **프로필 UI 구성**
  - 사용자별 대표 정보 및 활동 요약 카드
    
