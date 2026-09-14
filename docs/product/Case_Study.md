# Case Study: Traceable product signals

## Executive decision brief

**Scenario.** Northstar is a fictional B2B SaaS company. A product lead preparing an operating review needs to choose one signal to investigate and explain why the choice is credible. A percentage alone obscures the population, time window, and limits needed for that decision.

**Decision supported.** Select the next investigation, not a roadmap item. The dashboard keeps a rate beside its numerator, denominator, selected segment, acquisition window, observation date, prior-window comparison, and a scoped local note. The lead can then say what changed, what the view cannot establish, and what evidence should come next.

**Concrete evidence path.** For example, selecting **90 days** and **Enterprise** shows 176 new accounts and 139 activated accounts: 79.0% activation for the May 11–Aug 8, 2026 cohort, observed Sep 8. The preceding cohort is shown alongside it. The reviewer can compare the counts and percentage-point movement, then record a question such as whether the numerator movement or segment mix warrants a deeper check. This is a fictional sample, not evidence about a real business.

**Choice and cost.** I chose four traceable metrics over a broader KPI catalog. I also chose a fully observed retention cohort over a fresher partial one. Those choices make the screen less dense and retention less current, but they prevent an unweighted rate or incomplete follow-up from appearing more decisive than it is. The dashboard prompts an investigation; it neither diagnoses a cause nor ranks roadmap work.

**Product boundary.** Northstar has no live pipeline, account connection, customer research result, experiment result, authentication, analytics feed, or shared notebook. “Early access” deliberately has no observations and is labeled unavailable rather than 0%. Notes remain in versioned browser storage on one device. CSV export and the copied summary label the figures as fictional.

## PM ownership and implementation

I owned the product problem, metric contracts, cohort and segmentation model, analysis workflow, requirements, sample-data design, evidence boundaries, prioritization tradeoffs, and evaluation plan. AI tools assisted implementation and verification. This portfolio sample does not claim manual code authorship, customer findings, business outcomes, or an AI-made product decision.

## Next investment decision

Do not add metrics yet. First run five consenting, fictional-data comprehension sessions using the [discovery plan](Discovery_Plan.md) and [scoring protocol](Validation.md). The investment decision is whether reviewers can identify a denominator, cohort observation date, unavailable state, and fictional-data boundary while completing a scoped handoff.

- If denominator or unavailable-state confusion repeats, simplify the explanation before adding scope.
- If comprehension holds but handoff fails, test whether the scoped-note workflow needs a lighter alternative.
- If reviewers treat a percentage-point change as causal proof, strengthen the evidence prompt before considering automation.
- Commercial demand remains a separate, untested question in the [GTM strategy](GTM_Strategy.md).
