# Product Requirements Document

## Decision and user problem

A B2B SaaS product lead preparing an operating review needs to choose a signal or segment to investigate and explain the basis for that choice. A headline rate can hide its population, cohort timing, comparison scope, and uncertainty. This independent portfolio sample demonstrates a transparent metric-review workflow with fictional, internally coherent counts.

The product supports an investigation decision and a scoped handoff. It does not select a roadmap item, diagnose a cause, approve an analysis, or claim a business outcome.

## Current product contract

| Area | Required behavior | Boundary or edge case |
|---|---|---|
| Scope | Filter 30- or 90-day acquisition cohorts by All, SMB, Mid-market, Enterprise, or Early access. | A selection updates cards, counts, date windows, comparison, summary, and CSV together. |
| Calculations | Show activation (activated ÷ new accounts), conversion (new paid ÷ activated), retention (retained ÷ eligible paid), and adoption (role-template users ÷ active accounts). | All aggregates counts before calculating rates; retention uses `eligiblePaid`, even where complete fixtures make it equal paid. |
| Timing | Display exact current and prior cohort windows and observation dates. | Completed 30-day follow-up is required for every fixture; acquisition-window comparison is descriptive. |
| Interpretation | Offer a grounded prompt and save nonblank interpretations with the current scope in versioned browser storage. | Duplicate scoped notes are explained; notes are local to one browser and one device. |
| Sharing | Copy a scoped stakeholder summary and export a CSV with counts, rates, cohorts, observation date, and fictional-data label. | If clipboard access fails, explain the failure and direct the reviewer to CSV export. |
| Recovery | Support reset and one-step notebook undo; maintain keyboard-operable native controls and hash navigation. | Invalid or unavailable local storage shows a warning while the current tab remains usable. |

### Acceptance examples

| Trigger | Expected result | Why it matters |
|---|---|---|
| Select **90 days / Enterprise** | Show 176 new accounts, 139 activated accounts, 79.0% activation, and May 11–Aug 8, 2026 as the current cohort. | The measurement scope must be inspectable end to end. |
| Select **Early access** | Show no observations and provide **View all segments**; never substitute 0%. | No observed population is different from poor performance. |
| Save an SMB note, then select Enterprise | Preserve the original **SMB · period** label on the saved note. | A handoff must retain the context that produced it. |
| Submit whitespace as a note | Request an interpretation and create no notebook entry. | A saved artifact must contain reviewable content. |
| Clipboard permission is unavailable | Explain the failure and point to CSV export. | A sharing failure needs a usable local fallback. |

## Product judgment

The prototype favors traceability over metric breadth: four contracts, explicit current/prior windows, visible counts, and an unavailable state are more useful for this review task than a larger unexplained KPI catalog. A large percentage-point change is a prompt to inspect counts and segment mix, then choose evidence to collect. It is never an automated priority score or causal conclusion.

## Recommendations versus enforced constraints

**Enforced by the sample:** scoped recalculation, named numerator/denominator fields, aggregate-then-rate math, complete fixture follow-up, unavailable Early access behavior, local note scope, fictional-data labels, and the clipboard-to-CSV fallback.

**Recommended review practice:** inspect counts and dates before interpreting a change; challenge a proposed explanation; and record the next evidence-gathering step. The interface prompts these practices but does not enforce a causal-review gate, require a note before export, or block a roadmap decision.

## Scope and limitations

Northstar is fictional. The sample has no live data, authentication, alerts, analytics, external sharing, production workflow, customer research result, experiment result, causal inference, or automated prioritization. AI tools assisted implementation and verification. PM ownership covers problem framing, metric contracts, workflow requirements, sample data, evidence rules, prioritization, and evaluation.

## Evaluation and next decision

The next question is whether the workflow can be understood before more capability is added. The [measurement plan](Measurement%20Plan.md), [discovery plan](Discovery_Plan.md), and [validation protocol](Validation.md) define the future five-participant study and its decision thresholds. No human sessions have occurred; implementation checks are not user outcomes or business evidence.
