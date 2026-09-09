# Validation Plan

## Observed software checks — September 8, 2026

Node 24/macOS: lint, strict type checks, five logic tests, production build and four repository browser tests passed. A separate headless Chrome walkthrough verified filtered counts, scoped saved-note persistence, copied summary precision, CSV counts/sample labels, definitions and back navigation, empty segments, reset, mobile filtering at 390 × 844 with no overflow, and unavailable-storage fallback. No page errors were captured. npm audit reported zero vulnerabilities.

The first Lighthouse production-build mobile run scored 100 performance and 96 accessibility; identified contrast and accessible-name issues were subsequently corrected. Actual screenshots and workflow recording are in ../media. Full reports accompany the handoff. These are implementation checks, not human research results or evidence of business impact.

## Repository evidence

Logic tests verify segment aggregation, metric denominators, retention eligibility, percentage-point change, exports, the empty segment, and exact cohort windows. Browser workflows cover filtering, saved-insight scope, reset, no-data handling, and clipboard summary content. Lint, strict TypeScript checks, and a production build validate packaging.

## Human validation still required

Run six sessions with B2B SaaS product or analytics leads using only fictional data. Ask each participant to explain one metric, compare segments, identify what changed, challenge the suggested interpretation, save a note, and prepare a stakeholder update. Measure denominator comprehension, cohort-date comprehension, task completion, mistaken causal claims, and sharing confidence.

Redesign if participants treat unlike funnel percentages as directly rankable, overlook the observation lag, read no data as zero, or share a summary without noticing its fictional-data label. No participant study has been conducted for this sample.

## Latest implementation check

After the navy analytical-dashboard update, lint, strict type checking, five logic tests, a production build, five browser workflows, and `npm audit --audit-level=high` passed. A browser review confirmed desktop and 390 × 844 layouts, exact 90-day Enterprise filter recalculation, the empty-note error, and save/undo recovery for a scoped insight. Updated desktop screenshot, mobile screenshot, and workflow recording are in ../media. These checks do not establish usability, demand, or business impact.
