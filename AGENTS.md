# FRONTEND KNOWLEDGE BASE

**Stack:** React 18 + Vite 5 + Tailwind CSS

## OVERVIEW

React SPA consuming Spring Boot REST API, with component-based architecture and Tailwind styling.

## STRUCTURE

```
frontend/
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Root component
│   ├── App.css           # Global styles
│   ├── components/       # UI components
│   └── api/             # API calls
├── index.html
├── vite.config.js        # Dev server config
├── tailwind.config.js    # Tailwind config
└── package.json
```

## WHERE TO LOOK

| Component | Path | Notes |
|-----------|------|-------|
| Entry | `main.jsx` | React root render |
| Routing | `App.jsx` | Component composition |
| Components | `components/*.jsx` | PostList, PostDetail, PostWrite |
| API Layer | `api/postApi.js` | Backend API calls |

## CODE MAP

### Components

| Component | File | Purpose |
|-----------|------|---------|
| `PostList` | `components/PostList.jsx` | List all posts |
| `PostDetail` | `components/PostDetail.jsx` | View single post |
| `PostWrite` | `components/PostWrite.jsx` | Create/edit post |

### API

| Module | File | Endpoints |
|--------|------|-----------|
| Post API | `api/postApi.js` | GET/POST/PUT/DELETE posts |

## CONVENTIONS

- **Files:** PascalCase (.jsx), camelCase (.js)
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS (no custom CSS unless necessary)
- **API:** Fetch via `api/postApi.js` → `http://localhost:8080`

## COMMANDS

```bash
npm install          # Install dependencies
npm run dev         # Dev server on port 3000
npm run build       # Production build → dist/
npm run preview     # Preview production build
```

## DEPENDENCIES

- `react` - UI library
- `react-dom` - DOM rendering
- `@vitejs/plugin-react` - Vite React plugin
- `tailwindcss` - Utility CSS framework
- `autoprefixer` - Vendor prefixes

## API INTEGRATION

- Base URL: `http://localhost:8080`
- Vite dev server proxies to backend
- Docker: `VITE_API_URL=http://backend:8080`

## ANTI-PATTERNS

- DO NOT use class components (use hooks)
- DO NOT make API calls directly in components (use `api/` layer)
- DO NOT use inline styles (use Tailwind classes)
