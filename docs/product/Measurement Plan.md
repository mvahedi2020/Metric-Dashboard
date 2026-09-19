# Measurement Plan: Comprehension before expansion

Northstar is a fictional portfolio sample. This plan defines proposed measures for five future consenting sessions; it reports no research, adoption, revenue, retention, or business results.

## Decision this measurement informs

Decide whether to improve the explanation and handoff workflow before adding metrics, automation, or shared-state scope. The study tests whether a reviewer can read a metric contract and preserve its scope, not whether the fictional Northstar business is healthy.

## Session population and denominator

Recruit five B2B SaaS product or analytics leads who regularly participate in metric reviews. Each participant completes the same fictional-data session. For every participant-level measure, the denominator is **all five analyzed participants with retained consent**. Include incomplete, abandoned, and incorrect attempts as not correct; do not remove a participant because a task was difficult or a tool action failed.

Participants can withdraw and ask for their session data to be removed. Do not retain or score a withdrawn participant’s data without consent. Report the number and point of any withdrawals separately, explain any resulting denominator change, and recruit a replacement before analysis only if the study still intends five analyzed sessions.

## Proposed measures and thresholds

| Measure | Success definition | Denominator | Proposed threshold | Leading signal | Guardrail |
|---|---|---:|---:|---|---|
| Denominator comprehension | Correctly names the selected metric’s numerator and denominator without help. | 5 participants | At least 4/5 | Can explain the visible source-count contract. | Do not count a prompted answer as correct. |
| Cohort comprehension | Correctly identifies the relevant acquisition cohort and observation date. | 5 participants | Directional diagnostic; no pass rate set yet. | Notices timing before interpreting retention. | Record the exact missed field. |
| Unavailable-state interpretation | Identifies Early access as unavailable observations rather than 0%. | 5 participants | Directional diagnostic; no pass rate set yet. | Distinguishes missing evidence from performance. | Do not replace the scenario with a numeric rate. |
| Fictional-data boundary | Identifies the dashboard and exported summary as fictional sample data. | 5 participants | 5/5 | Notices the disclosure before sharing. | Any miss blocks claims that the handoff boundary is clear. |
| Scoped handoff | Completes scope selection → interpretation → copy or export while the note, output, and completion message agree on segment and period. | 5 participants | Directional diagnostic; completion time is reported separately. | Can state the shared scope from the completion message without reopening filters. | Do not score a note as scoped if the participant cannot identify its label or joins it to a different output. |

Record time from release of the task prompt to completion of the handoff for every attempt; this common start also works for the compact study material, which need not have interactive filters. Record actual time and endpoint for incomplete attempts without labeling them successful. The existing aspiration is under five minutes among successful attempts; report the count of successful attempts beside timing so it cannot hide failures. Separately record each unsupported causal statement as a qualitative event, without turning it into a success percentage.

## Software consistency guardrail

Before a session, reconcile the CSV and copied summary against the selected view: each metric must use the same numerator, denominator, and independently rounded rate/delta. Check both cohort and observation dates. The CSV supplies prior counts so its comparison can be recomputed without guessing from rounded labels. This is a fixture and implementation acceptance check, separate from the five-participant study. It does not count as a human-comprehension result or a business outcome.

## Keep the study units separate

Each person sees two conditions, so record results as **dashboard correct / 5** and **compact-view correct / 5** for comparable tasks. These are paired observations from five people, not ten independent participants. Apply the 4/5 denominator and 5/5 fictional-data targets to the dashboard condition; use the compact condition descriptively to identify whether inline context helps or adds friction. Report task case and condition order with the result. Early access is a dashboard-only boundary probe and has no compact-condition comparison.

For the scoped handoff, capture the selected scope, saved note label (or written scope in the compact material), completion message, and scope of the actual copied/exported output. A saved Enterprise note plus an SMB export fails scope agreement unless the participant explicitly identifies and corrects the mismatch before completion. A saved **Sample prompt** alone is not a participant interpretation; score the participant's **My interpretation** text separately. Score the final independent outcome and retain the initial mismatch as a recovery observation. Do not treat a scope label as a saved data snapshot.

Record copy and CSV as alternative handoff methods, with the chosen method beside the time. A clipboard failure followed by an unassisted CSV fallback can pass the handoff task; count the clipboard failure separately. Asking the facilitator which control to use is assistance. Copy/export does not include the notebook text; the participant must attach the interpretation separately for a complete narrative. A policy that chooses only CSV for comparability must be fixed before the sessions, not after seeing timings.

## Analysis and decision rules

Report each measure as `correct participants / 5`, plus a short description of the observed confusion. Do not combine unlike tasks into a composite score. A participant may contribute to every measure, and retained session records should preserve raw task notes, completion status, timing, and the displayed filter scope.

Revise the explanation before feature expansion if denominator confusion recurs, the observation lag is missed, Early access is read as 0%, or a fictional-data label is missed. Investigate a lighter handoff only if core comprehension holds while scoped handoff remains difficult. Do not infer demand, willingness to pay, or production readiness from this study.
