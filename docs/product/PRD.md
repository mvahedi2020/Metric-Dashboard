# Product Requirements Document

## Decision and user problem

A B2B SaaS product lead preparing an operating review needs to choose a signal or segment to investigate and explain the basis for that choice. A headline rate can hide its population, cohort timing, comparison scope, and uncertainty. This independent portfolio sample demonstrates a transparent metric-review workflow with fictional, internally coherent counts.

The product supports an investigation decision and a scoped handoff. It does not select a roadmap item, diagnose a cause, approve an analysis, or claim a business outcome.

## Current product contract

### Notebook capacity and reset contract

Saved interpretations are capped at 50 records and each record is capped at 500 characters. A payload that exceeds either bound is treated as incompatible browser data and remains untouched until the reviewer explicitly resets the sample. The reset confirmation names its impact before action: saved notes are cleared, filters return to All · 30 days, and the draft note is discarded. Escape and the Keep working action close the confirmation without changing state; after either outcome, keyboard focus returns to the reset control so the reviewer can continue without losing their place.

These limits keep local recovery reviewable and prevent an accidentally copied browser payload from becoming an unbounded notebook. The product does not claim that a saved note is a data snapshot: scope is retained, while counts and dates are recalculated from the current fictional fixture.

| Area | Required behavior | Boundary or edge case |
|---|---|---|
| Scope | Filter 30- or 90-day acquisition cohorts by All, SMB, Mid-market, Enterprise, or Early access. | A selection updates cards, counts, date windows, comparison, summary, and CSV together. |
| Calculations | Show activation (activated ÷ new accounts), conversion (new paid ÷ activated), retention (retained ÷ eligible paid), and adoption (role-template users ÷ active accounts). | All aggregates counts before calculating rates; retention uses `eligiblePaid`, even where complete fixtures make it equal paid. |
| Timing | Display exact current and prior cohort windows and observation dates. | Fixtures represent completed 30-day follow-up; the app does not validate event-level eligibility or ingest immature cohorts. Acquisition-window comparison is descriptive. |
| Interpretation | Offer a grounded prompt and save nonblank interpretations of at most 500 characters with the current scope in versioned browser storage. | Equivalent scoped notes remain one entry despite case or repeated-space differences; notes are local to one browser and one device. |
| Sharing | Copy a scoped stakeholder summary and export a CSV with current/prior counts, rates, both cohort and observation dates, and fictional-data label. | Both actions use current filters and exclude saved notebook text; the resulting message repeats the segment and period. If clipboard access fails, direct the reviewer to CSV export. |
| Recovery | Support reset and one-step notebook undo; maintain keyboard-operable native controls and hash navigation. | Invalid or unavailable local storage shows a warning while the current tab remains usable. |

### Acceptance examples

| Trigger | Expected result | Why it matters |
|---|---|---|
| Select **90 days / Enterprise** | Show 176 new accounts, 139 activated accounts, 79.0% activation, and May 11–Aug 8, 2026 as the current cohort. | The measurement scope must be inspectable end to end. |
| Inspect the Enterprise activation card | Show **current 139 ÷ 176** and **prior 121 ÷ 164** beside the independently rounded +5.2 pp change. | A reviewer can check both populations before exporting or interpreting a comparison. |
| Select **Early access** | Show no observations and provide **View all segments**; never substitute 0%. | No observed population is different from poor performance. |
| Save an SMB note, then select Enterprise | Preserve the original **SMB · period** label on the saved note. | A handoff must retain the context that produced it. |
| Submit whitespace as a note | Request an interpretation and create no notebook entry. | A saved artifact must contain reviewable content. |
| Save the same scoped interpretation with casing or spacing changes | Keep one notebook entry and explain that it is already saved for that view. | Formatting differences should not imply distinct evidence. |
| Clipboard permission is unavailable | Explain the failure and point to CSV export. | A sharing failure needs a usable local fallback. |

## Auditable calculation examples

For **30 days / All**, activation is `(154 + 110 + 49) / (240 + 150 + 62) = 313 / 452 = 69.2%`. An unweighted average of the three segment rates would be **72.2%** and would give the 62-account Enterprise segment the same influence as the 240-account SMB segment. The product sums counts first; it does not average percentages or add the 30- and 90-day views, whose windows overlap.

For **90 days / Enterprise**, conversion is `96 / 139 = 69.1%`, compared with `81 / 121 = 66.9%`. The reported change is **+2.1 percentage points**, calculated from the unrounded ratios. Subtracting displayed values gives 2.2, which is a rounding artifact. Rates and deltas are rounded independently to one decimal place; percentage-point movement is not relative percentage growth.

The unavailable-state guarantee applies to **Early access**, which has no matching rows. The calculation helper returns zero for a zero denominator in a supplied count object; it is not a general missing-data validator. Any future data source needs an explicit invalid/zero/missing population contract before use. See [source calculations](../../src/metrics.ts) and [logic checks](../../src/metrics.test.ts).

## Product judgment

The prototype favors traceability over metric breadth: four contracts, explicit current/prior windows, visible counts, and an unavailable state are more useful for this review task than a larger unexplained KPI catalog. A large percentage-point change is a prompt to inspect counts and segment mix, then choose evidence to collect. It is never an automated priority score or causal conclusion.

## Recommendations versus enforced constraints

**Enforced by the sample:** scoped recalculation, named numerator/denominator fields, aggregate-then-rate math, fixed fixture observation dates, unavailable Early access behavior, local note scope, fictional-data labels, and the clipboard-to-CSV fallback.

**Recommended review practice:** inspect counts and dates before interpreting a change; challenge a proposed explanation; and record the next evidence-gathering step. The interface prompts these practices but does not enforce a causal-review gate, require a note before export, or block a roadmap decision.

The suggested prompt selects the largest **absolute percentage-point movement** among the four displayed metrics. It may surface a decline ahead of a smaller increase. In **All**, it invites a check of numerator movement and segment mix; in an individual segment, it directs attention to that segment's current and prior numerator/denominator counts. This is a conversation starter, not an automated priority ranking or a statement of cause.

## Scope and limitations

Northstar is fictional. The sample has no live data, authentication, alerts, analytics, external sharing, production workflow, customer research result, experiment result, causal inference, or automated prioritization. AI tools assisted implementation and verification. PM ownership covers problem framing, metric contracts, workflow requirements, sample data, evidence rules, prioritization, and evaluation.

## Evaluation and next decision

The next question is whether the workflow can be understood before more capability is added. The [measurement plan](Measurement%20Plan.md), [discovery plan](Discovery_Plan.md), and [validation protocol](Validation.md) define the future five-participant study and its decision thresholds. No human sessions have occurred; implementation checks are not user outcomes or business evidence.
# Product integrity update · September 21, 2026

The metric dashboard must preserve traceability when a stakeholder moves from a rate to an export. Retention eligibility is a subset of paid accounts, so the calculation contract rejects any sample payload that violates that relationship. The export action also owns a deterministic filename and clears stale action feedback when scope changes.

These safeguards support review of the fictional sample workflow. They do not connect the artifact to production data or establish an outcome beyond the checked local behavior.
