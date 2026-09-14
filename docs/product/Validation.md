# Validation Plan

## Observed software checks — September 8, 2026

Node 24/macOS: lint, strict type checks, five logic tests, production build and four repository browser tests passed. A separate headless Chrome walkthrough verified filtered counts, scoped saved-note persistence, copied summary precision, CSV counts/sample labels, definitions and back navigation, empty segments, reset, mobile filtering at 390 × 844 with no overflow, and unavailable-storage fallback. No page errors were captured. npm audit reported zero vulnerabilities.

The first Lighthouse production-build mobile run scored 100 performance and 96 accessibility; identified contrast and accessible-name issues were subsequently corrected. Actual screenshots and workflow recording are in ../media. Full reports accompany the handoff. These are implementation checks, not human research results or evidence of business impact.

## Repository evidence

Logic tests verify segment aggregation, metric denominators, retention eligibility, percentage-point change, exports, the empty segment, and exact cohort windows. Browser workflows cover filtering, saved-insight scope, reset, no-data handling, and clipboard summary content. Lint, strict TypeScript checks, and a production build validate packaging.

## Human validation still required

Run five consenting sessions with B2B SaaS product or analytics leads using only fictional data. Follow the same script for each participant: explain one rate, compare segments, identify a cohort and observation date, say what evidence would be needed before naming a cause, save a scoped note, and prepare a stakeholder update. The [discovery plan](Discovery_Plan.md) defines order and neutral facilitation; the [measurement plan](Measurement%20Plan.md) owns the proposed targets.

### Practical scoring protocol

Prepare a one-row session record for each participant with the assigned condition order, selected period and segment, task completion status, time from first filter change to export, each answer, assistance used, causal statement if any, and facilitator notes. Score five independent yes/no measures: denominator comprehension, cohort-and-observation-date comprehension, Early access as unavailable rather than 0%, saved-note scope, and fictional-data identification in the export.

Use **all five enrolled participants** as the denominator for every measure. Mark an incomplete, abandoned, incorrect, or assisted answer as not correct for that independent-comprehension measure; keep it in the denominator. A facilitator may repeat the task instruction once, but may not name the numerator, denominator, cohort date, unavailable-state meaning, or fictional-data disclosure before the participant answers. Record the assistance rather than repairing the score after the fact.

The proposed decision thresholds are at least 4/5 independent denominator explanations and 5/5 fictional-data identifications. Cohort timing, unavailable-state interpretation, and scoped handoff are reported as `correct / 5` and investigated qualitatively before setting a pass threshold. Redesign the explanation if participants treat unlike funnel percentages as rankable, overlook observation lag, read no data as zero, or share a summary without its fictional-data label. No participant study has been conducted for this sample.

## Latest implementation check

After the navy analytical-dashboard update, lint, strict type checking, five logic tests, a production build, five browser workflows, and `npm audit --audit-level=high` passed. A browser review confirmed desktop and 390 × 844 layouts, exact 90-day Enterprise filter recalculation, the empty-note error, and save/undo recovery for a scoped insight. Updated desktop screenshot, mobile screenshot, and workflow recording are in ../media. These checks do not establish usability, demand, or business impact.
