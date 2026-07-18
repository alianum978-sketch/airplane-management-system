# SkyManager — Airplane Management System

A responsive, front-end Airplane Management System built with **HTML5, CSS3, Bootstrap 5** and vanilla **JavaScript**. It gives an airline operations team a single control-room view: a dashboard, ticket management with full CRUD, and live departures / arrivals boards.

## Screens

| Page | File | Purpose |
|---|---|---|
| Home Dashboard | `index.html` | KPI stat cards, a live "split-flap" flight board, weekly flight volume + seat-class charts, recent bookings |
| Ticket Management | `tickets.html` | Search, filter, add, edit and delete passenger tickets |
| Departures | `departures.html` | Searchable/filterable table of outbound flights with gate, terminal and status |
| Arrivals | `arrivals.html` | Searchable/filterable table of inbound flights with baggage claim, terminal and status |

All four pages share the same sidebar navigation, top bar and footer for a consistent experience.

## Tech stack

- **HTML5** — semantic, accessible markup
- **CSS3** — a custom design-token system (`css/style.css`) layered on top of...
- **Bootstrap 5.3** — grid, modal, and responsive utilities (via CDN)
- **Bootstrap Icons** — iconography throughout (via CDN)
- **Chart.js** — dashboard charts (via CDN)
- **Vanilla JavaScript (ES6)** — no framework, no build step; data-driven rendering and DOM updates

No build tools, bundlers, or package installs are required — it's a static site that runs directly in the browser.

## Project structure

```
airplane-management-system/
├── index.html            # Home Dashboard
├── tickets.html           # Ticket Management
├── departures.html        # Departures board
├── arrivals.html           # Arrivals board
├── css/
│   └── style.css          # Design tokens + all component styles
├── js/
│   ├── data.js             # Single source of truth: mock flights & tickets
│   ├── main.js              # Shared utilities: sidebar toggle, clock, formatters
│   ├── dashboard.js          # Dashboard page controller
│   ├── tickets.js             # Ticket Management CRUD controller
│   ├── departures.js           # Departures page controller
│   └── arrivals.js              # Arrivals page controller
├── assets/
│   └── favicon.svg          # Brand mark / favicon
├── .gitignore
└── README.md
```

**Why this structure?** Each page has its own small controller script so logic stays easy to find, while `data.js` is the single shared dataset every page reads from (no duplicated hard-coded tables). `main.js` holds only what's truly shared: the mobile sidebar toggle and the live clock.

## Features

- Fully responsive layout — collapsible sidebar with a slide-in drawer on mobile/tablet
- Ticket Management supports **Create, Read, Update and Delete** against an in-memory dataset, with live search and class/status filters
- Departures & Arrivals boards support live search and status filtering, plus quick summary stat cards
- Dashboard includes a signature "live flight board" styled after an airport split-flap display, plus two Chart.js visualizations
- Color-coded status and class badges used consistently across all tables
- Keyboard-focus states and `prefers-reduced-motion` support for accessibility

## Running the project

No installation is required. Either:

1. **Open directly** — double-click `index.html` (or any page) to open it in your browser, or
2. **Serve locally** (recommended, avoids any browser file:// restrictions):

   ```bash
   # Python 3
   python -m http.server 8000

   # then open:
   http://localhost:8000
   ```

   or, with Node.js installed:

   ```bash
   npx serve .
   ```

## Notes

- All flight and ticket data in `js/data.js` is mock data for demonstration purposes.
- Changes made in Ticket Management (add/edit/delete) live only in memory for the current browser session — refreshing the page resets to the seed data, since this is a front-end-only project with no backend/database.

---

Built as an academic project — Airplane Management System.
