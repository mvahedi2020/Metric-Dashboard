# GTM Strategy: Test the review workflow, not a market claim

## Positioning hypothesis

Metric Dashboard is a fictional portfolio sample for the moment before a team decides what to investigate. Its proposed value is a review view where a rate remains connected to source counts, cohort and observation dates, a prior-window comparison, and a scoped interpretation. It is not a general-purpose BI replacement, an automated roadmap engine, or a product with observed market demand.

## User, buyer, and alternatives

The likely day-to-day user is a product lead preparing an operating review with product, analytics, and go-to-market partners. A hypothetical sponsor is the leader accountable for a governed metric-review process, such as product operations or data leadership. The user needs to explain a signal; the sponsor needs ownership, definitions, lineage, and controls before repeated use.

The viable alternatives are an existing spreadsheet, BI dashboard, review template with a data partner, or no additional review layer. A team might reasonably choose an existing tool if its metric definitions are already inspectable and the incremental coordination cost is lower than introducing another surface.

## Cost of adoption

Even a small pilot has costs: agreeing on metric contracts and cohort calendars; mapping source events and late-arriving-data rules; selecting accountable data and product owners; training reviewers to read scope and uncertainty; and fitting an additional step into the operating-review cadence. A production version would also need authentication, permissions, auditability, data lineage, privacy review, configurable calendars, and support ownership. These are adoption costs, not work already completed.

## Proposed learning path

1. Hold a metric-contract workshop using a fictional or governed sandbox dataset. Confirm each rate’s numerator, denominator, cohort window, observation rule, and owner before a review exercise.
2. Run the five-participant comprehension study in the [discovery plan](Discovery_Plan.md). Compare whether participants can trace a KPI and prepare a correctly scoped handoff; do not ask whether Northstar has gained users.
3. If the boundary and comprehension hold, run one design-partner exercise that recreates a single existing review in a governed sandbox. Observe setup time, definition disputes, handoff completion, and the work required to maintain the contract.

## Experiment signals and stop criteria

The first leading signals are independent explanation of the denominator, cohort and observation date, unavailable-state meaning, fictional-data boundary, and a scoped handoff. A later governed-sandbox exercise could track whether reviewers can reconcile an exported summary to the visible view and whether adoption work exceeds the value of clearer review context. No target value or outcome is asserted for these future signals.

Stop or pause before adding live connections, shared notes, or external release if the five-participant study shows recurring denominator or disclosure confusion; if the traceable view adds effort without clearer explanations; if owners cannot agree on a metric contract; or if permissions, lineage, and privacy responsibilities remain unresolved. Do not infer willingness to pay, recurring use, retention, or commercial success from this portfolio sample or a small usability exercise.

## A bounded adoption decision

For a future design-partner exercise, choose **one recurring review**, **one accountable sponsor**, and **one agreed metric contract** before discussing pricing. Compare the current method with the prototype using the same governed sandbox inputs. Agree the review cadence, acceptable setup effort, and stop conditions before the exercise. Do not connect production data to this public sample.

Keep the evidence in three separate buckets:

- **One-time adoption effort:** definition agreement, source mapping, permissions review, and participant training. Record actual person-hours by activity.
- **Recurring effort per review:** data preparation, resolving definition disputes, building the handoff, and correcting scope errors. Record both the current method and the proposed method; include failed or abandoned attempts.
- **Decision quality:** whether someone can reconstruct the counts, dates, and uncertainty behind the selected investigation. A faster but incorrectly scoped handoff is not an improvement.

For discussion, a break-even estimate is `one-time setup hours / net recurring hours saved per review`. Calculate it only if net savings are positive and the quality guardrails hold. If savings are zero or negative, there is no time-based break-even; another benefit would need independent evidence. Do not populate this formula with invented results or call a small usability study ROI.

Continue only if the sponsor identifies a recurring decision, accepts the maintenance responsibility, and finds the measured tradeoff worthwhile against the existing method. Stop if the apparent benefit depends on ignoring setup/support work, exporting confidential information, or assuming that comprehension implies willingness to pay. This is a proposed commercial decision test, not a validated business model.
