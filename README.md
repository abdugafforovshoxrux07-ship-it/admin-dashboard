# Nimbus Admin — React Admin Dashboard

A modern, responsive admin dashboard built as a frontend portfolio project. It covers authentication, CRUD management for users/products/orders, and a full settings panel, all wired to a mock API layer that mirrors a real REST backend.

**[Live demo](#) · [Screenshots](#)** — replace with your deployed URL once live.

![tech](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000) ![tech](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=fff) ![tech](https://img.shields.io/badge/Zustand-5-orange) ![tech](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=fff)

---

## ✨ Features

- **Authentication** — email/password login with client-side validation, loading and error states, persisted session (Zustand + localStorage), and protected routes.
- **Dashboard** — key metrics (users, products, orders, revenue), recent orders and recent users panels, loading skeletons.
- **Users** — searchable, filterable, paginated table with avatar, role, and status; add/edit via modal form; delete with a confirmation dialog.
- **Products** — responsive card grid with image, category, price and stock; category filter; full CRUD with form validation.
- **Orders** — order table with payment/order status badges; detail modal with line items and an inline status changer.
- **Settings** — profile form, change-password form, notification toggles, and a light/dark theme switch.
- **Mock API layer** — every request goes through Axios and a service layer that simulates network latency and occasional failures, so all loading/success/error/empty states are real and demonstrable. Swap in a real backend by changing two environment variables — no component code changes required.
- **Responsive** — desktop, tablet and mobile layouts, with a collapsible/overlay sidebar on small screens.
- **Accessible** — labeled form fields, visible focus states, `aria-*` attributes on interactive elements, keyboard-dismissible modals.

## 🧱 Tech stack

| Concern            | Choice                          |
|---------------------|----------------------------------|
| UI library          | React 18                        |
| Build tool           | Vite                            |
| Routing              | React Router DOM v6              |
| State management     | Zustand (multiple focused stores)|
| HTTP client           | Axios                           |
| Styling               | Tailwind CSS                    |
| Icons                 | lucide-react                    |
| Toasts                | react-hot-toast                 |

## 📁 Project structure

```
admin-dashboard/
├── src/
│   ├── api/                # Axios instance + one service module per resource
│   │   ├── axiosClient.js  # Base Axios instance, auth header interceptor
│   │   ├── authApi.js
│   │   ├── userApi.js
│   │   ├── productApi.js
│   │   ├── orderApi.js
│   │   ├── mockAdapter.js  # Simulated latency/failures, localStorage-backed "DB"
│   │   └── mockData.js     # Seed data for the mock DB
│   ├── components/
│   │   ├── ui/              # Reusable, generic building blocks (Button, Modal, Table bits…)
│   │   ├── layout/           # Sidebar, Topbar
│   │   ├── dashboard/         # StatCard, RecentOrders, RecentUsers
│   │   ├── users/              # Users-specific components
│   │   ├── products/            # Products-specific components
│   │   └── orders/               # Orders-specific components
│   ├── layouts/
│   │   └── DashboardLayout.jsx   # Sidebar + Topbar + <Outlet />
│   ├── routes/
│   │   └── ProtectedRoute.jsx    # Redirects to /login when unauthenticated
│   ├── pages/                     # One component per route
│   ├── store/                      # Zustand stores — one per domain
│   │   ├── authStore.js
│   │   ├── uiStore.js
│   │   ├── themeStore.js
│   │   ├── userStore.js
│   │   ├── productStore.js
│   │   └── orderStore.js
│   ├── utils/
│   │   ├── formatters.js           # Currency/date/number formatting
│   │   ├── validators.js           # Form validation functions
│   │   └── clsx.js                 # Tiny className combinator
│   ├── App.jsx                      # Route table
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Tailwind directives + base styles
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── .env.example
```

**Why this structure?** Pages stay thin — they orchestrate a store and a handful of components. Components are split by scope (`ui` = generic and reusable anywhere, `users`/`products`/`orders` = specific to one domain). Each Zustand store owns exactly one slice of state, and each `api/*.js` file owns exactly one resource, so a change to how "products" are fetched never touches "orders" code.

## 🚀 Getting started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
git clone <your-repo-url>
cd admin-dashboard
npm install
```

### Environment variables

Copy the example file and adjust as needed:

```bash
cp .env.example .env
```

```bash
# .env
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK_API=true
```

With `VITE_USE_MOCK_API=true` (the default), the app runs entirely against an in-browser mock API — no backend required. Set it to `false` and point `VITE_API_BASE_URL` at a real backend to switch every `api/*.js` module over to live requests with no other code changes.

### Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`. On the login screen, any email plus a password of 6+ characters signs you in.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## 🏗️ Architecture notes

- **State is split by domain, not centralized.** `authStore` only knows about the current user/token, `uiStore` only knows about sidebar/menu state, and `userStore` / `productStore` / `orderStore` each own their own list, filters, pagination and CRUD actions. This keeps re-renders scoped and makes each store easy to reason about in isolation.
- **The API layer is the only place that knows about Axios.** Stores call functions like `fetchUsers()` or `createUser(payload)` from `api/userApi.js`; they never call Axios directly. This is what makes swapping mock data for a real backend a one-line env change instead of a rewrite.
- **The mock backend behaves like a real one.** `mockAdapter.js` adds artificial delay to every call and persists its "database" to `localStorage`, so CRUD operations survive a page refresh and the app's loading states are genuinely exercised — not just simulated with a `setTimeout` around static data.
- **Routing guards live in one place.** `ProtectedRoute.jsx` wraps the entire dashboard route tree; there's a single source of truth for "is the user allowed to see this."
- **Reusable UI primitives.** `Button`, `Input`, `Select`, `Modal`, `Card`, `Badge`, `Avatar`, `Pagination`, `EmptyState` and `ErrorState` are used across every page, so the visual language (spacing, focus rings, error styling) stays consistent without duplicated markup.

## ☁️ Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. In Vercel, click **New Project** and import the repository.
3. Vercel auto-detects Vite — leave the build command as `npm run build` and the output directory as `dist`.
4. Add your environment variables (`VITE_API_BASE_URL`, `VITE_USE_MOCK_API`) under **Project Settings → Environment Variables**.
5. Deploy. Every push to your main branch will trigger a new deployment automatically.

Alternatively, from the CLI:

```bash
npm install -g vercel
vercel
```

## 🗺️ Possible next steps

- Wire up a real backend (Node/Express, Firebase, Supabase, etc.) and flip `VITE_USE_MOCK_API` to `false`.
- Add role-based access control (e.g., hide Users/Settings from non-admins).
- Add automated tests (Vitest + React Testing Library) for stores and key components.
- Add data export (CSV) for the Users/Orders tables.

## 📄 License

MIT — free to use for learning, portfolios, or as a starting point for real projects.
