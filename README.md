# FormBot

FormBot is a visual chatbot/form builder. Drag and drop blocks to build
conversational forms, organize them into folders, share a public link, and
collect responses — all from a dashboard with light/dark themes.

- **Live app:** deployed on Vercel (see [client README](client/README.md#deployment))
- **API:** https://formbot-server-fxza.onrender.com

## Features

- Drag-and-drop form/chatbot builder ([client/src/components/Workspace/Flow.jsx](client/src/components/Workspace/Flow.jsx))
- Folder organization for forms
- Public, shareable form links (`/form/:formId`) with a WhatsApp/copy-link share menu
- Response collection and a per-form responses dashboard
- Email/password auth with JWT, protected routes
- Light/dark color mode
- Draft autosave while editing in the workspace

## Tech stack

| | |
|---|---|
| **Client** | React 18, React Router, Axios, Create React App |
| **Server** | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Joi, Helmet, rate limiting |

## Project structure

```
FormBot/
├── client/   React frontend (deployed to Vercel)
└── server/   Express API (deployed to Render)
```

Each has its own README with more detail: [client/README.md](client/README.md).

## Local setup

Requires Node.js 18+ and a MongoDB connection string (e.g. MongoDB Atlas).

```bash
# Server
cd server
cp .env.example .env        # fill in MONGODB_URL, jwtPrivateKey, CLIENT_URL
npm install

# Client
cd ../client
cp .env.example .env.development.local   # defaults point at localhost:4000
npm install
```

Run both together from `server/`:

```bash
cd server
npm run dev   # starts the API (nodemon) and the client (CRA dev server) concurrently
```

Or run them separately: `npm run server` / `npm run client` from `server/`, or `npm start` from `client/`.

- Client: http://localhost:3000
- Server: http://localhost:4000

## Deployment

- **Client** → Vercel, auto-deployed on every push to `main` (Root Directory `client`). See [client/README.md](client/README.md#deployment) for routing/config details.
- **Server** → Render (or any Node host). Set `MONGODB_URL`, `jwtPrivateKey`, and `CLIENT_URL` (must include the Vercel origin for CORS) in the host's environment.
