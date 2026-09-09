# Product Requirements Document

## User and problem

A B2B SaaS product lead needs one compact place to compare funnel and usage signals, understand how each is calculated, preserve interpretations, and share a scoped summary. A rate without its population or observation rule can lead to the wrong decision.

## Goal

Demonstrate a transparent metric-review workflow using fictional, internally coherent account counts.

## Requirements

1. Calculate activation, conversion, 30-day retention, and adoption from named numerator and denominator counts.
2. Filter 30- and 90-day acquisition cohorts by All, SMB, Mid-market, and Enterprise.
3. Display exact current and prior cohort dates and their observation dates.
4. Aggregate counts before calculating the All-segment rate.
5. Use a distinct retention-eligible paid denominator with a complete 30-day follow-up.
6. Show comparisons in percentage points and expose definitions in the product.
7. Support scoped saved insights, CSV export, and copied stakeholder summaries.
8. Label empty data as unavailable; provide action failure, empty notebook, storage warning, and render error states.
9. Persist insights locally under a versioned key and offer a sample reset.
10. Provide hash navigation and responsive, keyboard-operable controls.

## Non-goals

Live data, authentication, alerts, analytics, causal inference, automated prioritization, Slack, and production claims are out of scope.

## Acceptance criteria

All calculations match the documented counts and denominators; segment totals reconcile to All; filters update scope and dates; retention cohorts have full follow-up; empty data does not appear as 0%; saved notes restore locally and reset cleanly; CSV and copied text preserve the sample boundary; all quality checks pass.

Every acquisition cohort in this sample has completed follow-up by its stated observation date. Therefore eligiblePaid equals paid in these fixtures; the separate field supports future exclusion of immature cohorts. Retained accounts cannot exceed eligible paid accounts. Acquisition-window comparisons are descriptive, not causal evidence.

## Proposed measures, not observed user outcomes

In five consenting PM task sessions, target 4/5 participants correctly identifying a rate's population and denominator without help, and 5/5 identifying the data as fictional. Measure correct answers divided by all participants. Target completion of filter → interpretation → export in under five minutes among successful participants; guard against unsupported causal conclusions. Automated reconciliation should match 100% of exported metric rows to visible rates at the same precision. No human sessions have occurred.
