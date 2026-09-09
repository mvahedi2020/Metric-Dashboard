# Contributing

Keep this repository a transparent, standalone product sample. Do not add real customer data, credentials, external APIs, analytics, or unsupported outcome claims.

## Local setup

Install dependencies with `npm install`, then start the demo with `npm run dev`. The Vite production base is `/Metric-Dashboard/`. Saved insights use the versioned key `northstar.metric-dashboard.v1`.

Before opening a change, run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. Local browser tests use the installed Chrome channel; CI installs Playwright Chromium. Set `CAPTURE_MEDIA=1` to retain workflow screenshots and videos.

Preserve the metric definitions, cohort observation logic, account-level vocabulary, empty-data handling, local-storage warning and reset, keyboard access, responsive layout, and fictional-data disclosure. Update the product documentation whenever definitions or behavior change.
