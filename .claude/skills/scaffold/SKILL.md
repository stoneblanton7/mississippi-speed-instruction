---
name: scaffold
description: "Scaffold a new project from scratch with the full folder structure, CLAUDE.md, Docker setup, routing skeleton, and initial commit. Use this skill whenever starting a new project, creating a new repo, bootstrapping a new app, or when the user says 'new project', 'start fresh', 'spin up', 'create the project', 'set up the repo', or 'scaffold'. Also trigger when the user mentions creating a new tool for a client, starting a new website prototype, or building something from zero. This skill handles all project types: websites, business tools, portals, dashboards, and utility apps."
---

# Scaffold Skill

Set up a complete project from zero. This skill creates the folder structure, CLAUDE.md, Docker configuration, routing skeleton, design system foundation, and pushes the initial commit — all in one pass.

Read this entire file before creating any files.

---

## BEFORE YOU START

Ask these questions if the user hasn't already specified:

1. **Project name** — What's the repo name? (kebab-case, e.g., `wade-dashboard`)
2. **Project type** — Website prototype, business tool, or utility app?
3. **Who is it for** — Client name, business description, one sentence.
4. **Portals / pages** — What pages or portals does it need? (e.g., "CEO portal + Admin portal" or "Home, Services, About, Contact")
5. **Design direction** — Dark premium? Light and clean? Warm and accessible? What's the vibe?
6. **Color palette** — Primary accent color, or should we pick based on industry?
7. **Docker port** — Assign a port that doesn't conflict with existing projects (avoid 3000, 5173, 5174, 5177, 5179)

If the user has already answered these through prior conversation, don't re-ask. Extract from context.

---

## STEP 1: CREATE PROJECT DIRECTORY

```bash
mkdir -p ~/Desktop/[project-name]
cd ~/Desktop/[project-name]
```

---

## STEP 2: INITIALIZE REACT + VITE + TAILWIND

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom lucide-react
npm install motion  # framer-motion successor
cd ..
```

---

## STEP 3: CREATE FOLDER STRUCTURE

```
[project-name]/
├── .claude/
│   └── skills/           # Copy relevant skills here from stone-skills repo
├── context/              # Domain knowledge, business context
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       ├── images/
│   │       ├── videos/
│   │       └── fonts/
│   ├── src/
│   │   ├── api/
│   │   │   └── data/           # Mock JSON data files
│   │   ├── components/
│   │   │   ├── layout/         # Layout components (Topbar, Sidebar, etc.)
│   │   │   └── ui/             # Reusable UI (Button, Badge, Card, Toast, Modal, Toggle)
│   │   ├── contexts/           # ThemeContext, ToastContext, AuthContext
│   │   ├── pages/              # One folder per route or portal
│   │   ├── utils/              # Helper functions, formatters
│   │   ├── App.jsx             # Route definitions
│   │   ├── global.css          # CSS variables, Tailwind directives
│   │   ├── config.js           # Status configs, constants, feature toggles
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── docker-compose.yml
├── Dockerfile
├── CLAUDE.md
├── .gitignore
└── README.md
```

Create stub files for every folder. Empty folders don't get committed to git, so add a `.gitkeep` or a placeholder file.

---

## STEP 4: DOCKER SETUP

### Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
EXPOSE [PORT]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "[PORT]"]
```

### docker-compose.yml
```yaml
services:
  frontend:
    build: .
    ports:
      - "[PORT]:[PORT]"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
```

Replace `[PORT]` with the assigned port.

---

## STEP 5: TAILWIND CONFIGURATION

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-soft': 'var(--color-accent-soft)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        green: 'var(--color-green)',
        red: 'var(--color-red)',
        amber: 'var(--color-amber)',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

Override the font family if the project specifies different fonts.

### global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #F2F4F8;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F8F9FC;
  --color-accent: /* PROJECT ACCENT */;
  --color-accent-hover: /* DARKER ACCENT */;
  --color-accent-soft: /* ACCENT + 0C opacity */;
  --color-text: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #B0BEC5;
  --color-border: #E2E8F0;
  --color-border-light: #F1F5F9;
  --color-green: #059669;
  --color-red: #DC2626;
  --color-amber: #D97706;
}

.dark {
  --color-bg: #080C14;
  --color-surface: #0F1520;
  --color-surface-alt: #131B2B;
  --color-accent: /* PROJECT ACCENT (may adjust for dark) */;
  --color-accent-hover: /* ACCENT HOVER DARK */;
  --color-accent-soft: /* ACCENT + 12 opacity */;
  --color-text: #E2E8F0;
  --color-text-secondary: #8494AB;
  --color-text-muted: #B0BEC5;
  --color-border: #1C2840;
  --color-border-light: #151F34;
  --color-green: #34D399;
  --color-red: #F87171;
  --color-amber: #FBBF24;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

Fill in the accent colors based on the project's design direction.

---

## STEP 6: ROUTING SKELETON

### App.jsx
Create routes based on the project type:

**For multi-portal business tools:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortalSelect from './pages/PortalSelect';
// Import portal layouts and pages

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalSelect />} />
        {/* Portal routes with layout wrappers */}
      </Routes>
    </BrowserRouter>
  );
}
```

**For websites:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
// Import pages

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Other pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## STEP 7: CORE CONTEXTS

Create these three contexts in `src/contexts/`:

### ThemeContext.jsx
- Reads system preference on mount
- Adds/removes `.dark` class on `<html>` element
- Persists to localStorage
- Exports `useTheme()` hook

### ToastContext.jsx
- `addToast(message, type)` — type is 'success', 'error', 'info'
- Auto-dismiss after 3 seconds
- Renders in bottom-right corner
- Exports `useToast()` hook

### AuthContext.jsx (mock)
- `user` state with role, name, company
- `login(role)` / `logout()` functions
- For prototypes — swap for real auth later
- Exports `useAuth()` hook

---

## STEP 8: CLAUDE.MD

Generate the project CLAUDE.md using the local template. Fill in:
- Project name and description
- Tech stack with assigned port
- Page/route inventory
- Design system colors and fonts
- Empty Lab Notes and User Preferences sections

---

## STEP 9: GIT INIT + FIRST COMMIT

```bash
cd ~/Desktop/[project-name]
git init
git add .
git commit -m "feat: scaffold [project-name] with React/Vite/Tailwind/Docker"
git remote add origin https://github.com/stoneblanton7/[project-name].git
git branch -M stone-dev
git push -u origin stone-dev
```

---

## STEP 10: VERIFY

```bash
docker compose up --build
```

Open `localhost:[PORT]` in the browser. You should see the skeleton rendering with:
- Correct background color from CSS variables
- Font loading (DM Sans)
- Basic routing working (click between routes)
- Theme toggle functional (dark/light switch)

Screenshot and send to Stone for review.

Commit: `"feat: scaffold [project-name] with React/Vite/Tailwind/Docker"`

---

## CHECKLIST BEFORE MOVING ON

- [ ] All folders created with correct structure
- [ ] Docker runs without errors
- [ ] CSS variables defined for both light and dark mode
- [ ] Tailwind config maps CSS variables to class names
- [ ] Routes render (even if just placeholder text)
- [ ] ThemeContext toggles dark/light mode
- [ ] ToastContext can fire a test toast
- [ ] CLAUDE.md is complete and accurate
- [ ] First commit pushed to GitHub on stone-dev branch
- [ ] Port doesn't conflict with other running projects
