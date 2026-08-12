# Los Santos Customs (React)

A car dealership management site - public listings/booking pages plus a staff portal for managing employees, inventory, and bookings. Originally built in **PHP + MySQL** for a university project; this version is a ground-up rewrite in **React** (Vite + React Router), built as a learning exercise and to make the project deployable as a live demo on **Netlify**.

## What changed from the original PHP version

The original app was a server-rendered PHP site backed by a MySQL database (`config.php`, PDO/MySQLi queries, PHP session auth). That requires a persistent server and database, which a static host like Netlify can't provide. To keep the project demoable without standing up separate hosting, this rewrite:

- **Replaces the PHP backend with a React SPA.** All pages (`Home`, `Cars`, `Team`, staff `Dashboard`, `Employees`, `Garage`, `Bookings`) are client-side React components routed with React Router.
- **Replaces MySQL with browser `localStorage`.** Data (employees, cars, bookings) ships as seed JSON (`src/data/seed/`) and is loaded into `localStorage` on first run (`seedLoader.js`), then read/written through simple service modules (`storage.js`, `*Service.js`) - no database or API server needed.
- **Replaces PHP session auth with a client-side session.** Staff login is handled via `AuthContext`, storing a session token in `localStorage` with a 30-minute expiry and route protection (`ProtectedRoute.jsx`), in place of PHP's server-side session/cookie auth.
- **Adds a static SPA redirect rule** (`public/_redirects`) so deep links (e.g. `/staff/garage`) resolve correctly on Netlify instead of 404ing.

The result behaves the same as the original for demo purposes, but runs entirely in the browser as static files - no server, database, or backend config required.

> **Note:** Since all data lives in the visitor's browser `localStorage`, changes made in the demo (adding cars, employees, bookings) are local to that browser/device and reset if storage is cleared. This is intentional for a portfolio/demo deployment, not a production data store.

## Tech Stack

- React 19 + Vite
- React Router
- Plain CSS (no framework)
- `localStorage` as a mock persistence layer

## Local Development

```bash
npm install
npm run dev
```

## Build & Deploy (Netlify)

```bash
npm run build
```
