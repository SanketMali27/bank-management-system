# Copilot / AI Agent Instructions — Bank_manag

Purpose: enable an AI coding agent to be immediately productive in this repo by documenting architecture, workflows, conventions, and gotchas discovered in the code.

- **Big picture**: This is a two-part MERN-style app.
  - Backend: `backend/index.js` — Express server, MongoDB via `mongoose` (`backend/config/db.js`). Routes live in `backend/routes/*`, controllers in `backend/controllers/*`, and models in `backend/models/*` (e.g. `Accounts.js`).
  - Frontend: Vite + React in `frontend/` (entry `frontend/src/main.jsx`, routes in `frontend/src/pages/*`). Frontend communicates with backend over REST and stores JWT in `localStorage`.

- **How to run (developer quick-start)**
  - Install backend deps: `cd backend && npm install`
  - Start backend: `node index.js` (the repo currently has no `start` script; run the file directly or add a script).
  - Install frontend deps: `cd frontend && npm install`
  - Start frontend: `npm run dev` (runs Vite, default origin `http://localhost:5173`).

- **Environment variables**
  - `MONGODB_URL` — MongoDB connection string (if unset, backend will skip DB connection but continue running).
  - `JWT_SECRET` and `JWT_EXPIRE` — required for JWT generation and verification in `backend/controllers/AccountController.js` and `backend/middlewares/authMiddleware.js`.

- **Key integration points & patterns**
  - CORS: backend allows `http://localhost:5173` in `backend/index.js`.
  - Auth: frontend `frontend/utils/api.js` sends `Authorization: Bearer <token>` header from `localStorage` and redirects to `/login` on 401. Backend verifies tokens in `backend/middlewares/authMiddleware.js` and sets `req.userId`.
  - Logging: `backend/index.js` contains two request-logging middleware lines (useful for live debugging): they log every request's method and URL.

- **Data model notes** (examples)
  - `backend/models/Accounts.js`: `accountNumber` is a required `String` and must be unique; `address` is a nested object with `street`, `city`, `state`, `pincode`.
  - `backend/controllers/AccountController.js` creates accounts with `accountNumber = 'ACC' + Date.now()` and returns JWT on login.

- **Project-specific conventions / gotchas**
  - Routes import path mismatch: some routes reference `../middleware/authMiddleware.js` (singular) but the codebase places the file at `backend/middlewares/authMiddleware.js` (plural). When editing imports prefer the real path `middlewares/authMiddleware.js` or adjust consistently.
  - DB connection is defensive: `connectDB()` will warn and skip if `MONGODB_URL` is unset — tests and local dev may run without a DB.
  - Backend `package.json` currently lacks `start`/`dev` scripts — when adding scripts, keep `type: "module"` in `backend/package.json`.

- **When changing code**
  - Follow existing structure: add route → controller → model. Example: `routes/accountroutes.js` wires `POST /account/create` → `controllers/AccountController.createAccount`.
  - Preserve JSON response shape used across controllers: `{ success: boolean, message: string, ... }`.
  - When modifying auth logic, update both `backend/controllers/AccountController.js` (token creation) and `backend/middlewares/authMiddleware.js` (token verification) together.

- **Files to inspect for context or examples**
  - `backend/index.js` — server bootstrap, CORS, request logging
  - `backend/config/db.js` — DB connect behavior
  - `backend/routes/accountroutes.js` — routing conventions
  - `backend/controllers/AccountController.js` — controller patterns, error handling, JWT usage
  - `backend/models/Accounts.js` — mongoose schema conventions
  - `frontend/utils/api.js` — fetch wrapper and 401 handling

- **Edits an AI agent is likely to perform**
  - Add missing scripts to `backend/package.json` (e.g. `dev`: `nodemon index.js`) and keep `type: "module"`.
  - Fix import path mismatch for `authMiddleware` across routes.
  - Add input validation & clearer error messages in controllers (follow the existing `{ success, message }` response pattern).

If anything is unclear or you want me to include examples for editing tests, adding start scripts, or normalizing imports, tell me which area to expand. 
