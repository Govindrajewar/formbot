# FormBot Client

The React frontend for [FormBot](../README.md) — a visual chatbot/form
builder. Build a form from drag-and-drop blocks, save it to a folder, share
its public link, and review responses, all from this app.

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- **Landing page** (`/`) — marketing page with sign-up CTA
- **Auth** (`/login`, `/signup`) — email/password, JWT stored in
  `localStorage`; protected routes redirect to `/login` when logged out
  ([src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx))
- **Dashboard** (`/dashboard`) — folders and forms, create/rename/delete
  folders, create/edit/delete forms, share a form, jump to its responses
  ([src/pages/PostLogin.jsx](src/pages/PostLogin.jsx))
- **Workspace** (`/workspace`) — the drag-and-drop builder: add content
  bubbles (text, image, video, gif) and input blocks (text, number, email,
  phone, date, rating, button), reorder them, preview, and save
  ([src/components/Workspace/Flow.jsx](src/components/Workspace/Flow.jsx)).
  In-progress edits autosave to `localStorage` so a refresh or accidental
  tab close doesn't lose work
  ([src/utils/workspaceDraft.js](src/utils/workspaceDraft.js))
- **Public form view** (`/form/:formId`) and **preview** (`/preview`) —
  the conversational, one-question-at-a-time runtime that respondents (no
  account needed) and the form author (preview) both see
  ([src/pages/Desktop.jsx](src/pages/Desktop.jsx))
- **Responses** (`/responses/:formId`) — submitted answers for a form
- **Settings** (`/settings`) — update profile
- **Light/dark theme**, persisted to `localStorage`
  ([src/context/ColorModeContext.jsx](src/context/ColorModeContext.jsx))
- **Share menu** — copy-link and WhatsApp share for a form's public URL
  ([src/components/Shared/ShareMenu.jsx](src/components/Shared/ShareMenu.jsx))

## Tech stack

React 18, React Router 6, Axios, Create React App (react-scripts 5), lucide-react icons.

## Project structure

```
client/
├── public/                 Static assets, index.html
└── src/
    ├── api/                axiosInstance (auth header + 401 handling), User API calls
    ├── components/         Reusable UI: HomePage sections, Workspace builder, ProtectedRoute, ShareMenu
    ├── context/            ColorModeContext (light/dark theme)
    ├── pages/              One component per route (HomePage, LoginPage, Workspace, Desktop, ...)
    ├── style/              Per-page/component CSS
    ├── utils/              workspaceDraft (autosave), jwt, validators, formatName
    └── App.js              Route table
```

## Routes

| Path | Page | Auth |
|---|---|---|
| `/` | Landing page | — |
| `/login`, `/signup` | Auth | — |
| `/dashboard` | Folders & forms list | ✓ |
| `/workspace` | Form builder | ✓ |
| `/settings` | Account settings | ✓ |
| `/responses/:formId` | Responses for a form | ✓ |
| `/form/:formId` | Public form-filling view | — |
| `/preview`, `/desktop` | Builder's own preview | — |

## Environment variables

See [.env.example](.env.example). Read at build time (CRA inlines
`REACT_APP_*` vars into the bundle — these are not secret, just config).
`.env*` files are gitignored, so nothing is committed:

| Variable | Description |
|---|---|
| `REACT_APP_BACKEND_URL` | Base URL of the [server](../server) API |

For local dev, copy `.env.example` to `.env.development.local`. For
production, it must be set in the Vercel project's environment variables —
there's no committed fallback, so the build will call an undefined URL if
it's missing there.

## Local setup

```bash
npm install
cp .env.example .env.development.local   # defaults point at localhost:4000
npm start
```

Open [http://localhost:3000](http://localhost:3000). Requires the
[server](../server) running locally too — see its README, or run both
together with `npm run dev` from `server/`.

## Available scripts

- `npm start` — dev server with hot reload at `localhost:3000`
- `npm run build` — production build to `build/`
- `npm test` — CRA's interactive test runner

## Deployment

The app is deployed to **Vercel**, served from the domain root (no subpath).
[vercel.json](vercel.json) adds a catch-all rewrite to `index.html` so client-side
routes (e.g. `/login`, `/dashboard`, deep links, refreshes) resolve correctly,
since Vercel serves static files only and has no built-in SPA fallback.

Connect the repo in the Vercel dashboard with **Root Directory** set to
`client`, framework preset **Create React App**. Every push to `main` (or a
PR) triggers a deploy automatically.

#### Build-time environment variables

`REACT_APP_BACKEND_URL` is inlined at build time and must be set in the
Vercel project's **Settings → Environment Variables** (no committed
`.env.production` — see [Environment variables](#environment-variables)).

The backend's `CLIENT_URL` (CORS allowlist) must include this app's Vercel
origin (e.g. `https://your-app.vercel.app`) for API requests from the
deployed site to succeed.
