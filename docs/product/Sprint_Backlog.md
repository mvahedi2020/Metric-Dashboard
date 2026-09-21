# Sprint Backlog

## Completed in the sample

- Coherent account-count dataset by period and segment
- Four documented calculated rates and source-count display
- Exact current/prior cohort and observation dates
- Percentage-point comparison chart
- Saved scoped insights, empty state, storage warning, and reset
- CSV export and copied stakeholder summary
- Sample observation-age label and impossible-count validation
- Explicit no-data and action-error states
- Hash navigation, case study, responsive layout, and logic/browser tests

## Prioritized next investments

### 1. Test comprehension of the existing metric contract

**Decision supported:** whether the visible numerator, denominator, dates, and unavailable state are sufficient for an operating review. **Evidence needed:** five fictional-data sessions from the [discovery plan](Discovery_Plan.md), including successful explanation of a rate, its observation window, and the Early access empty state. **Dependency:** consenting participants and an accessible test script. Defer any new visualization until this evidence exists.

### 2. Test whether the existing aggregation explanation resolves confusion

**Decision supported:** whether inline segment detail is worth its visual cost. The PRD now includes the exact 313/452 weighted example; test that explanation first. **Evidence needed:** repeated failure to reconstruct All from the available counts, with case and assistance recorded. **Dependency:** the first comprehension study. Prefer improving the explanation over adding a new visualization if it resolves the problem.

### 3. Establish definition ownership only with a real governance context

**Decision supported:** whether the prototype could move beyond a fictional, single-owner sample. **Evidence needed:** an accountable data and product owner, agreed change-review process, and production data-contract requirements. **Dependency:** a governed environment; therefore no prototype metadata feature is scheduled.

## Explicit deferrals

Confidence intervals, alerts, a larger KPI catalog, live data connections, and automated priority scoring are deferred. They would imply provenance, operating ownership, or causal confidence that this portfolio sample does not have.

## Admission and closure rules

A candidate enters implementation only with a recorded problem observation, a specific acceptance scenario, and a named proposed decision owner. The PM compares the smallest explanation change, a workflow change, and leaving the sample alone. No staffing, sprint dates, or engineering capacity is implied.

Close a candidate when its acceptance scenario passes software checks **and**, where it concerns comprehension, fresh participant evidence addresses the original confusion. Passing the current automated suite cannot close the human-comprehension question. If the study shows no recurring need beyond the existing spreadsheet/review process, stop product expansion rather than filling the backlog. See [risk response priorities](Product_Risks.md#decisions-to-make-when-a-risk-appears).
