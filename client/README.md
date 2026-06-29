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
├── public/                 Static assets, index.html, 404.html (GitHub Pages SPA fallback)
└── src/
    ├── api/                axiosInstance (auth header + 401 handling), User API calls
    ├── components/         Reusable UI: HomePage sections, Workspace builder, ProtectedRoute, ShareMenu
    ├── context/            ColorModeContext (light/dark theme)
    ├── pages/              One component per route (HomePage, LoginPage, Workspace, Desktop, ...)
    ├── style/              Per-page/component CSS
    ├── utils/              workspaceDraft (autosave), jwt, validators, formatName
    ├── deploymentLink.js   BACKEND_URL/FRONTEND_URL + buildAppUrl() helper
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

See [.env.example](.env.example). Both are read at build time (CRA inlines
`REACT_APP_*` vars) and fall back to production defaults in
[src/deploymentLink.js](src/deploymentLink.js) if unset:

| Variable | Description |
|---|---|
| `REACT_APP_BACKEND_URL` | Base URL of the [server](../server) API |
| `REACT_APP_FRONTEND_URL` | This app's own deployed URL |

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

The app is deployed to **GitHub Pages** at:

[https://govindrajewar.github.io/formbot/](https://govindrajewar.github.io/formbot/)

Deployment is automated: every push to `main` that touches `client/**` triggers
the [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) workflow, which
installs dependencies, runs `npm run build`, and publishes `client/build` to
GitHub Pages via `actions/deploy-pages`. No manual deploy step is required.

To trigger a deploy manually, run the workflow from the **Actions** tab
("Deploy to GitHub Pages" → "Run workflow").

#### One-time repository setup

In the GitHub repo settings: **Settings → Pages → Source → GitHub Actions**.

#### Routing on GitHub Pages

React Router uses `BrowserRouter` with `basename={process.env.PUBLIC_URL}`, so
clean URLs (e.g. `/login`, `/dashboard`) work the same as before. Since
GitHub Pages serves static files only and has no server-side rewrite rules,
direct loads and refreshes of deep links are handled via the
[SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages):
`public/404.html` redirects unmatched paths back to `index.html`, which
restores the original URL via `history.replaceState` before React mounts.

#### Build-time environment variables

`REACT_APP_BACKEND_URL` and `REACT_APP_FRONTEND_URL` are inlined at build
time. The workflow reads them from repository **Variables**
(Settings → Secrets and variables → Actions → Variables); if unset, the app
falls back to the production defaults in `src/deploymentLink.js`.

The backend's `CLIENT_URL` (CORS allowlist) must include
`https://govindrajewar.github.io` for API requests from the deployed site to
succeed.
