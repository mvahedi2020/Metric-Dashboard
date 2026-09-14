# Product Decisions: Make the review inspectable

Northstar is a fictional portfolio scenario. These are design decisions for the prototype, not customer requests, research findings, or production outcomes.

## 1. Keep source counts visible beside rates

**Alternatives considered:** a dense KPI strip; rates with hover-only definitions; or visible counts and named numerator/denominator contracts.

**Choice:** visible counts and definitions on the review surface.

**Cost:** the dashboard uses more horizontal space and supports fewer metrics at once. That can slow a reviewer who only wants a headline.

**Evidence that would reverse it:** in the proposed study, participants can correctly explain a compact definition treatment at least as reliably as the visible-count treatment while completing the same review task faster. Until then, density is a less important risk than an unknown population.

## 2. Prefer completed retention follow-up to the freshest cohort

**Alternatives considered:** show the newest acquisition cohort; blend mature and immature paid accounts; or show a cohort observed after a full 30-day follow-up.

**Choice:** a fully observed cohort with a distinct `eligiblePaid` denominator.

**Cost:** retention is intentionally less current and may delay a discussion that a team wants to have immediately.

**Evidence that would reverse it:** an accountable production data contract can distinguish preliminary from mature retention, define late-event handling, and users need both views for a time-sensitive decision without confusing their populations. The change would require explicit labeling and validation, not a fixture update.

## 3. Prompt an investigation instead of ranking roadmap work

**Alternatives considered:** automatically score the largest change; display a presumed explanation; or show a grounded prompt and scoped note.

**Choice:** prompt investigation and preserve the reviewer’s scope locally.

**Cost:** the product team still has to determine priority, gather evidence, and make the roadmap decision outside this screen. There is no shortcut from a percentage-point change to action.

**Evidence that would reverse it:** a governed prioritization model with accountable owners, defined inputs beyond this dashboard, and evidence that it improves decisions without turning descriptive variation into a causal claim. A study that merely shows a participant likes a score would not meet that bar.

## 4. Treat unavailable observations as a state, not a zero

**Alternatives considered:** omit Early access; render a zero-filled card; or show an unavailable state with recovery to All.

**Choice:** show the unavailable state and explain that no denominator exists.

**Cost:** the view contains an interruption rather than a uniform chart, and it cannot satisfy someone seeking a numeric comparison for that segment.

**Evidence that would reverse it:** a governed source establishes a real, applicable denominator and the product contract defines how zero observations differ from zero performance. Until then, a numeric placeholder would misstate the evidence.

## 5. Keep notes local before designing collaboration

**Alternatives considered:** a browser-only notebook; shared notes with identity and permissions; or no persisted interpretation.

**Choice:** scoped local notes, reset, and one-step undo.

**Cost:** colleagues cannot rely on a note being available across devices, and the prototype does not test a team handoff.

**Evidence that would reverse it:** repeated sessions show that participants understand the local boundary but cannot complete the intended handoff without shared state. Any shared solution would require named ownership, permissions, auditability, retention rules, and a production data boundary.
