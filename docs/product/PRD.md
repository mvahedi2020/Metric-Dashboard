# Product Requirements Document

## User and problem

A B2B SaaS product lead needs one compact place to compare funnel and usage signals, understand how each is calculated, preserve interpretations, and share a scoped summary. A rate without its population or observation rule can lead to the wrong decision.

## Goal

Demonstrate a transparent metric-review workflow using fictional, internally coherent account counts.

## PM decision framework

### Primary decision

During an operating review, a product lead needs to select the next signal or segment to investigate and communicate why. The product supports that decision by keeping each rate connected to its source counts, cohort window, comparison, and saved interpretation. It does not select a roadmap item or claim to identify a cause.

### User outcomes to design for

- A PM can explain what changed and which population the rate represents.
- A PM can distinguish a measurement limitation from a product signal.
- A PM can preserve a hypothesis with the exact filter scope that produced it.
- A stakeholder can review the summary without mistaking fictional sample data for a business result.

### Prioritization and tradeoffs

The prototype prioritizes traceability over breadth: four decision-relevant metrics, two explicit cohort windows, and four segments are more useful for review than a large catalog of unexplained KPIs. When signals conflict, the PM workflow is to inspect counts and segment mix first, then choose the next evidence-gathering step. A large percentage-point change is a reason to investigate, not an automatic priority score. Full retention follow-up is preferred over freshness, and honest unavailable states are preferred over fabricated zeros.

### Product boundary

This is an independent portfolio sample. It has no live data, authentication, analytics, automated prioritization, causal inference, external sharing, or production workflow. Antigravity/AI assisted with implementation and verification. PM ownership is the problem framing, metric contracts, workflow requirements, sample data, evidence rules, and evaluation plan.

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

## Reviewable acceptance examples

| Scenario | Expected sample behavior | PM reason |
|---|---|---|
| Select 90 days and Enterprise | Show 176 new accounts, 79.0% activation, and the May 11–Aug 8 acquisition window. | A filter must change the entire measurement scope coherently. |
| Select Early access | Explain that observations are unavailable and offer a return to All; do not substitute a 0% rate. | Missing evidence must not be mistaken for poor performance. |
| Save a note under SMB and change the filter | The saved note retains its original SMB and period label. | A reviewer needs to distinguish the note's context from the current view. |
| Attempt to save whitespace as a note | Show a request to write an interpretation; do not add an empty notebook entry. | A saved item should communicate something to review. |
| Remove a note and choose Undo notebook change | Restore the most recent notebook state. | Recovery helps a reviewer correct an accidental edit. |
| Clipboard permission is unavailable | Explain the failure and suggest CSV export. | A failed handoff needs an understandable alternative. |

These examples describe current controls. The study's request to explain a next investigation is a facilitation practice, not a required field or automated roadmap approval.

## Evaluation plan

Before production use, validate the workflow with product or analytics leads using only fictional data. Ask participants to explain one metric, compare two segments, identify what changed, challenge the suggested interpretation, save a scoped note, and prepare a stakeholder update. Track denominator comprehension, cohort-date comprehension, correct identification of fictional data, task completion time, unsupported causal claims, and confidence in the exported summary. A successful result would be a measurable reduction in interpretation errors during review; this prototype has no human-session results and makes no business-impact claim.

## Proposed measures, not observed user outcomes

In five consenting PM task sessions, target 4/5 participants correctly identifying a rate's population and denominator without help, and 5/5 identifying the data as fictional. Measure correct answers divided by all participants. Target completion of filter → interpretation → export in under five minutes among successful participants; guard against unsupported causal conclusions. Automated reconciliation should match 100% of exported metric rows to visible rates at the same precision. No human sessions have occurred.
