# Control Matrix: Metric Dashboard

Every number is a fictional sample count. The dashboard has no login, live data source, analytics feed, or external customer action.

| Area | Control | Expected behavior | Recovery / boundary |
|---|---|---|---|
| Navigation | Brand, Dashboard, Definitions, Case study | Changes the hash page and exposes the current navigation item | Browser back/forward works locally |
| Filters | Period | Recalculates all counts, rates, date windows, comparison bars, export, and summary for 30 or 90 days | Reset restores 30 days |
| Filters | Segment | Recalculates from coherent account counts for All, SMB, Mid-market, or Enterprise | Early access shows an unavailable state rather than 0%; View all segments recovers |
| Definitions | Metric cards and definitions page | Shows every numerator, denominator, rate, and calculation description | Rates are percentages; comparisons are percentage points |
| Chart | Current/prior comparison | Displays each selected rate against the equal-length preceding sample window | It is descriptive, not causal evidence |
| Interpretation | Save this insight | Saves the displayed prompt with current filter scope | Duplicate saves are explained; local only |
| Interpretation | Add your interpretation | Requires nonblank text and saves it with scope | Empty submit shows an error; no remote write occurs |
| Notebook | Remove and Clear all | Removes one or all locally saved insights | Both changes can be undone once |
| Notebook | Undo notebook change | Restores the immediately prior save, remove, clear, or reset | Disabled and labeled when there is no notebook change to undo |
| Sharing | Copy stakeholder summary | Copies a scoped, fictional-data disclosure to the clipboard | Clipboard failure is shown; CSV remains available |
| Sharing | Export CSV | Downloads metrics with counts, rate, date windows, and sample label | No upload or external sharing occurs |
| Recovery | Reset sample | Restores default filters and clears local notebook entries | Notebook content is retained as the one-step undo snapshot |
| Persistence | Versioned browser storage | Restores valid saved insights on refresh | A warning appears if storage is unavailable or invalid; current tab remains usable |
| Accessibility | Native controls, labels, focus outlines, keyboard navigation | Supports keyboard operation and semantic labels | Responsive layout fits the tested mobile viewport |
