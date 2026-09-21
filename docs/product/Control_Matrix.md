# Control Matrix: Metric Dashboard

Every number is a fictional sample count. The dashboard has no login, live data source, analytics feed, or external customer action.

| Area | Control | Expected behavior | Recovery / boundary |
|---|---|---|---|
| Navigation | Brand, Dashboard, Definitions, Case study | Changes the hash page and exposes the current navigation item | Browser back/forward works locally |
| Filters | Period | Recalculates all counts, rates, date windows, comparison bars, export, and summary for 30 or 90 days | Reset restores 30 days |
| Filters | Segment | Recalculates from coherent account counts for All, SMB, Mid-market, or Enterprise | Early access shows an unavailable state rather than 0%; View all segments recovers |
| Definitions | Metric cards and definitions page | Shows current and prior numerator/denominator counts beside each rate and calculation description | Rates are percentages; comparisons are percentage points calculated before display rounding |
| Chart | Current/prior comparison | Displays each selected rate against the equal-length preceding sample window; the accessible chart description includes scope, cohort/observation dates, and percentage-point movement | It is descriptive, not causal evidence |
| Interpretation | Save sample prompt | Saves the deterministic question with current filter scope and a Sample prompt label | A prompt is distinct from the reviewer's own interpretation; duplicate saves are explained; local only |
| Interpretation | Add your interpretation | Requires nonblank text and saves it with scope and a My interpretation label | Empty submit shows an error; no remote write occurs |
| Notebook | Remove and Clear all | Removes one or all locally saved insights | Both changes can be undone once |
| Notebook | Collection validation | Accepts at most 50 saved insights, with at most 500 characters per insight | A larger or malformed payload remains untouched and shows an explicit reset path |
| Notebook | Undo notebook change | Restores the immediately prior save, remove, clear, or reset | Disabled and labeled when there is no notebook change to undo |
| Sharing | Copy stakeholder summary | Copies selected scope, current/prior source counts, rates and changes, both cohort/observation dates, and fictional-data disclosure to the clipboard | Clipboard failure is shown; CSV remains available |
| Sharing | Export CSV | Downloads current/prior numerators and denominators, rates, percentage-point changes, both cohort and observation dates, and sample label | No upload or external sharing occurs |
| Recovery | Reset sample | Explains that notes, All · 30 days filters, and the draft note will be cleared before action, then restores default filters and clears local notebook entries | Keep working or Escape preserves state; notebook content is retained as the one-step undo snapshot and focus returns to the reset control |
| Persistence | Versioned browser storage | Restores valid saved insights with distinct IDs and known filter scopes on refresh | Unreadable or conflicting data stays in storage until an explicit Reset sample; unavailable storage shows a separate warning, and the current tab remains usable |
| Freshness | Observation-age label | Keeps the Sep 8, 2026 sample observation date visible with an age label against the walkthrough date | This is fixture freshness, not a live-data health signal |
| Accessibility | Native controls, labels, focus outlines, keyboard navigation | Supports keyboard operation and semantic labels | Responsive layout fits the tested mobile viewport |
