# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run from the repo root (not `src/`):

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config in `eslint.config.js`; `dist` ignored)
- `npm run preview` — serve the built `dist/`

There is no test runner configured.

## Stack

React 19 + Vite, plain JavaScript (`.jsx`, no TypeScript), Tailwind CSS v4 (via `@tailwindcss/vite`, configured in `src/index.css`, no `tailwind.config`) with DaisyUI, Redux Toolkit, React Router v7, axios, framer-motion. This is the frontend only for a developer-matching ("Tinder for devs") app; it needs a separate backend.

## Architecture

**Backend dependency.** `src/utils/constants.jsx` hardcodes `BASE_URL = "http://localhost:3213"`. Every API call uses `axios` with `{ withCredentials: true }` because auth is a server-set cookie. Endpoints used: `POST /login`, `/signup`, `/logout`, `GET /profile/view`, `PATCH /profile/update`, `GET /users/feed?page=1&limit=10`, `POST /request/send/{Interested|Ignored}/{userId}`. Note the response shapes differ: login/signup/`/profile/view` return the user directly, while `/profile/update` returns `{ data: user }`.

**Routing** (`src/App.jsx`). `/` (Hero landing) and `/login` render standalone. `/feed`, `/connections`, `/requests`, `/profile` are nested under the `Body` layout route, which renders the navbar (with profile dropdown and logout) and an `<Outlet />`. `Connections.jsx` and `Requests.jsx` are currently stubs.

**State** (`src/utils/AppStore.jsx`). Two slices, both initial state `null` (meaning "not loaded yet", not "empty"):
- `user` — the logged-in user; set by login/signup and by profile save (`addUser`), cleared on logout (`removeUser`).
- `feed` — array of candidate users; `removeUserFromFeed(id)` is applied optimistically on swipe, before the request API call resolves.

There is no auth guard. Pages that need the user fetch it themselves when the store is empty (see `userProfile.jsx`, which calls `/profile/view` so a page refresh works). `Body.jsx` reads `store.user` but does not load it, so the navbar avatar is blank after a refresh until the profile page has run. `Feed` skips fetching if `feed` is already set.

**Feed swiping** (`Feed.jsx`). Shows the top 3 cards stacked. `SwipeableCard` (drag + exit animation via `AnimatePresence`), `SwipeZones` (driven by a shared `dragX` motion value), and `VibeFeedback` (toast) cooperate through `Feed`'s state (`exitDir`, `feedback`). The card's buttons and drag gestures both call the same `handleSend(status, userId)`; `STATUS_MAP` converts UI words (`interested`/`ignored`) to the capitalized values the backend path expects.

**Profile editing** (`userProfile.jsx`). The form keeps `skills` as a comma-separated string, builds a `previewUser` on every keystroke, and renders the same `userCard` used in the feed as a live preview. Client-side limits: skills at most 15 characters each and at most 10 total.

**Avatars** (`src/utils/getAvatar.jsx`). `getAvatar(user)` returns `photoUrl` or a gender-based default; `getDefaultAvatar` is used in `onError` handlers for broken URLs. Defaults are referenced as `/images/default-*.png`, but the files live in the repo-root `images/` folder (there is no `public/`), so this works in dev because Vite serves the project root but will not be in `dist/` after a build. Components import other images directly via relative paths (e.g. `../../images/Login.png`), which Vite bundles correctly.

**Styling.** Heavy use of inline Tailwind utility classes with a cream (`#fff8ee`/`#FFF9ED`) on black palette. Fonts (Sedan SC, Borel, Alumni Sans, Libertinus Serif Display) are loaded from Google Fonts in `index.html` and used via arbitrary classes like `font-['Sedan_SC']`; `index.css` separately sets Inter Tight as the default sans font.
