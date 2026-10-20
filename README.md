# Carverse — Frontend

React + Vite + Tailwind frontend for Carverse, a car marketplace with a
visitor-facing storefront and a hidden member/admin portal.

## Run it

```bash
npm install
npm run dev
```

Then open the printed localhost URL.

## Demo accounts

This prototype uses `localStorage` as a stand-in database (see
`src/context/AuthContext.jsx`), seeded on first load.

- **Admin** — username `admin`, password `admin123`
- **Member** — username `johnk`, password `member123`

## The flow

- Visitors can browse cars, view details, and buy — no login required.
- Click the shield logo **5 times** (top-left) to reach the hidden member
  login at `/login`.
- From there, new visitors can submit a **Request Membership** form.
  Requests start as `pending`.
- An **admin** logs in and approves/rejects requests at `/admin/requests`.
- Once approved, the member can log in and reach `/dashboard`. Rejected or
  still-pending users are redirected to a status page instead.

## Structure

```
src/
  context/AuthContext.jsx   auth + membership request state (localStorage-backed)
  data/mockData.js          vehicles, users, requests, conversations
  components/               shared UI (Navbar, Sidebar, VehicleCard, layouts...)
  pages/                    one file per route
```

## Notes for wiring up a real backend

Everything reads from `src/data/mockData.js` and `AuthContext`. Swap the
functions in `AuthContext` (`login`, `submitMembershipRequest`,
`approveRequest`, `rejectRequest`) for real API calls, and replace the
`vehicles` export with a fetch — the components don't need to change.
