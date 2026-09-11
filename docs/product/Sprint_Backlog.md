# Sprint Backlog

## Completed in the sample

- Coherent account-count dataset by period and segment
- Four documented calculated rates and source-count display
- Exact current/prior cohort and observation dates
- Percentage-point comparison chart
- Saved scoped insights, empty state, storage warning, and reset
- CSV export and copied stakeholder summary
- Explicit no-data and action-error states
- Hash navigation, case study, responsive layout, and logic/browser tests

## Prioritized next investments

### 1. Test comprehension of the existing metric contract

**Decision supported:** whether the visible numerator, denominator, dates, and unavailable state are sufficient for an operating review. **Evidence needed:** five fictional-data sessions from the [discovery plan](Discovery_Plan.md), including successful explanation of a rate, its observation window, and the Early access empty state. **Dependency:** consenting participants and an accessible test script. Defer any new visualization until this evidence exists.

### 2. Make the All-segment calculation easier to audit

**Decision supported:** whether a reviewer needs to see each segment's contribution before trusting an aggregate. **Evidence needed:** participants must identify aggregation as a real point of friction, not merely request more detail. **Dependency:** a settled disclosure pattern from the comprehension work. This remains ahead of adding more metrics because it strengthens an existing decision contract.

### 3. Establish definition ownership only with a real governance context

**Decision supported:** whether the prototype could move beyond a fictional, single-owner sample. **Evidence needed:** an accountable data and product owner, agreed change-review process, and production data-contract requirements. **Dependency:** a governed environment; therefore no prototype metadata feature is scheduled.

## Explicit deferrals

Confidence intervals, alerts, a larger KPI catalog, live data connections, and automated priority scoring are deferred. They would imply provenance, operating ownership, or causal confidence that this portfolio sample does not have.
