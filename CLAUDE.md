# Frontend CLAUDE.md

## 프로젝트 정보

- **프로젝트 이름**: Frontend
- **프레임워크**: React 18
- **빌드 도구**: Vite
- **언어**: JavaScript (JSX)
- **Node 버전**: 18+

## 프로젝트 구조

```
frontend/
├── src/
│   ├── main.jsx          (진입점)
│   ├── App.jsx           (루트 컴포넌트)
│   └── App.css           (스타일)
├── index.html            (HTML)
├── vite.config.js        (Vite 설정)
└── package.json
```

## 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저: `http://localhost:3000`

## 빌드

```bash
npm run build
```

결과물: `dist/` 디렉토리

## 코딩 컨벤션

- 파일명은 PascalCase (예: App.jsx, HelloWorld.jsx)
- 컴포넌트 파일은 .jsx 확장자
- 스타일은 CSS 파일로 분리
- React Hooks 사용 권장

## 환경 변수

- 백엔드 API: `http://localhost:8080`

## 주요 패키지

- React 18.3.1
- React DOM 18.3.1
- Vite 5.0.8
