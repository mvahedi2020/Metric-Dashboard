# Validation plan and evidence map

## Observed software checks — September 16, 2026

On Node 24/macOS, lint, strict types, **8 unit tests**, production build, **15 browser workflows**, and `npm audit --audit-level=high` passed; the audit reported zero vulnerabilities. Browser coverage now includes recovery of incompatible and conflicting saved notes, distinct reviewer and sample-prompt labels, saved-scope navigation, current/prior count visibility, scope-aware comparison text, and blocked-storage messaging. These are software checks using fictional fixtures. They do not demonstrate participant comprehension, adoption, or a business result.

## Previous software verification — September 15, 2026

On Node 24/macOS, installation, lint, strict types, **7 unit tests**, production build, **6 browser workflows**, and the dependency audit passed; the audit reported zero vulnerabilities. The browser suite includes copied summaries with counts and both observation dates, plus a downloaded CSV containing prior counts. A desktop visual check showed the expected controls and no captured page errors. These local checks do not establish live deployment parity; publication is checked separately.

Earlier September 8 checks and Lighthouse scores describe an older build. Lighthouse was **not rerun** for this revision. No human study has been conducted.

The current fixture also surfaces **Sample observed Sep 8, 2026 · 12 days old** against the September 20 walkthrough date. This makes the deliberate sample lag visible; it does not imply a live freshness SLA.

## Traceable verification coverage

| Product contract | Evidence in the repository | Limits of that evidence |
|---|---|---|
| Count aggregation, named denominators, equal-window dates | [Metric unit tests](../../src/metrics.test.ts) | Fixed fixtures do not validate a real event pipeline or every possible denominator. |
| Summary preserves comparison inputs and timing | `stakeholder handoff` unit test and [copied-summary browser workflow](../../tests/workflows.spec.ts) | Confirms output content, not whether a stakeholder understands it. |
| CSV carries prior counts and observation dates | `CSV audit trail` unit test and download browser workflow | Checks the selected Enterprise case; production data ingestion is absent. |
| Saved-note label, reset, empty segment, mobile filters | Browser workflows in the same test file | Does not establish assistive-technology usability or cross-device synchronization. |
| Retention eligibility is separate from new paid count | [Denominator test](../../src/metrics.test.ts) | A denominator rule, not evidence that real accounts completed follow-up. |

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit --audit-level=high`, and `npm run test:e2e` from the repository. The [workflow](../../.github/workflows/pages.yml) runs the publication checks. Passing software checks is independent of the human study below.

## Future participant protocol

Use the [discovery plan](Discovery_Plan.md) for case/condition allocation and neutral facilitation. The [measurement plan](Measurement%20Plan.md) owns thresholds, timing, paired denominators, withdrawal handling, and fallback scoring. Retain unsuccessful attempts with valid consent; do not retain withdrawn data. Keep assistance separate from independent success.

### Answer key for the fixed cases

| Probe | Correct explanation | Does not pass |
|---|---|---|
| Case A, 30 days / SMB activation | 154 activated accounts out of 240 new accounts; Jul 10–Aug 8 cohort, observed Sep 8, 2026 | “64.2% of all users” without the account population and scope |
| Case B, 90 days / Enterprise activation | 139 activated out of 176 new accounts; May 11–Aug 8 cohort, observed Sep 8, 2026 | Treating the acquisition window as the observation date |
| Early access | No matching observations; unavailable, not a measured 0% | Ranking it as the worst-performing segment |
| Saved interpretation | Text and segment/period label remain local; filters and exported output may now describe another view | Treating the note as a shared or immutable copy of the data |
| Handoff | Output and separately attached interpretation agree on scope, and the recipient can identify fictional data | An unlabeled business claim or mismatched note/export |

Record answers verbatim before scoring. Reading visible definitions or the provided reference sheet is ordinary use; it is not facilitator assistance. Repeating the task once without adding hints is allowed. Naming the denominator, pointing to the observation date, explaining Early access, or selecting a recovery control for the participant counts as assistance. Let participants correct themselves independently and retain the initial error as a recovery observation.

A second reviewer should independently score any ambiguous answer against this key before analysis. If reviewers disagree, preserve both interpretations and resolve against the recorded answer, not the desired pass rate. Report each dashboard measure separately; never combine denominator, timing, disclosure, and task completion into one success score.

## Decision after the study

Use the measurement plan's 4/5 denominator and 5/5 disclosure targets as prototype decision inputs. Investigate timing, unavailable-state, and scope confusion before expanding features even if the two targets pass. These five sessions can reveal misunderstandings; they cannot prove demand, time savings, commercial impact, or production readiness.
