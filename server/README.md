# FormBot Server

The Express/MongoDB API behind [FormBot](../README.md) — handles auth, form
storage, public form viewing, and response collection for the
[client](../client).

## Features

- Email/password auth with bcrypt password hashing and JWT sessions
- Per-user forms and folders, with ownership checks on every read/write
- Public, unauthenticated endpoints for viewing a shared form and submitting
  a response (so respondents don't need an account)
- Request validation (Joi) on every write endpoint
- Rate limiting on `/signup` and `/login` (10 requests / 15 min) to slow down
  credential stuffing
- Security headers via Helmet, gzip via compression, CORS allowlist via
  `CLIENT_URL`
- Paginated list endpoints (`page`/`limit` query params, capped at 100/page)

## Tech stack

Node.js, Express, MongoDB (Mongoose), JSON Web Tokens, bcrypt, Joi,
Helmet, express-rate-limit, compression, cors.

## Project structure

```
server/
├── index.js                  App entry point: middleware, route mounting, DB connect
└── src/
    ├── controllers/          Request handlers (User, FormData, Response, Folder)
    ├── middleware/           auth (JWT), validate (Joi), rateLimiter
    ├── models/                Mongoose schemas (User, FormData, Folder, Response)
    ├── routes/                Express routers, one per resource
    ├── validation/            Joi schemas, one per resource
    └── utils/pagination.js   Shared page/limit/skip + paginated-response helper
```

## API reference

All routes are mounted at the server root (no `/api` prefix). Authenticated
routes require `Authorization: Bearer <token>`.

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/signup` | — | Create an account |
| POST | `/login` | — | Log in, returns a JWT |
| PATCH | `/user` | ✓ | Update the current user's profile |
| POST | `/dynamic-items` | ✓ | Create a form |
| GET | `/formdata` | ✓ | List the current user's forms (paginated, optional `?folderId=`) |
| GET | `/formdata/:currentFormId` | ✓ | Get one of the current user's forms (for editing) |
| PATCH | `/formdata/:currentFormId` | ✓ | Update a form (owner only) |
| DELETE | `/formdata/:currentFormId` | ✓ | Delete a form (owner only) |
| GET | `/viewForm/:currentFormId` | — | **Public** — fetch a form to render/fill out via its share link |
| POST | `/formdata/:formId/responses` | — | **Public** — submit answers to a form |
| GET | `/formdata/:formId/responses` | ✓ | List responses to one of the current user's forms |
| POST | `/folders` | ✓ | Create a folder |
| GET | `/folders` | ✓ | List the current user's folders |
| PATCH | `/folders/:folderId` | ✓ | Rename a folder |
| DELETE | `/folders/:folderId` | ✓ | Delete a folder |

A form (`FormData`) is a `formName` plus an ordered `itemList` of blocks —
content bubbles (`text`, `image`, `video`, `gif`) and inputs (`textInput`,
`numberInput`, `emailInput`, `phoneInput`, `dateInput`, `ratingInput`,
`buttonInput`) — built visually in the client's workspace.

## Environment variables

See [.env.example](.env.example):

| Variable | Description |
|---|---|
| `PORT` | Port to listen on (default `4000`) |
| `MONGODB_URL` | MongoDB connection string |
| `jwtPrivateKey` | Secret used to sign/verify JWTs |
| `CLIENT_URL` | Comma-separated list of allowed CORS origins (must include the deployed client's origin, e.g. `https://your-app.vercel.app`) |

## Local setup

```bash
cp .env.example .env   # fill in MONGODB_URL, jwtPrivateKey, CLIENT_URL
npm install
npm run server          # nodemon index.js, http://localhost:4000
```

`npm run dev` starts this API and the client dev server together
(`npm run server` + `npm run client`, the latter via `--prefix ../client`).

## Deployment

Deployed on Render (or any Node host) as a standard `node index.js`
process. Set `MONGODB_URL`, `jwtPrivateKey`, and `CLIENT_URL` in the host's
environment — `CLIENT_URL` must include the client's deployed origin or
its requests will be rejected by CORS. See the
[client README](../client/README.md#deployment) for where the client is
hosted.
