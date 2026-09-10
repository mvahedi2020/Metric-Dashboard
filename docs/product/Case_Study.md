# Case Study: Traceable product signals

## Context

Northstar is a fictional B2B SaaS company. Product teams often receive KPI dashboards that compress a complex measurement contract into one large percentage, leaving the denominator and cohort timing hard to inspect.

## Product question

How might a product lead move from signal to stakeholder narrative while keeping definitions, source counts, comparison windows, and uncertainty visible?

## Prototype response

The Metric Dashboard calculates activation, conversion, 30-day retention, and role-template adoption from coherent account counts. Period and segment filters recalculate every value. Current and prior acquisition cohorts show exact dates and observation dates. Each card shows its fraction, definitions are in-product, and the comparison uses percentage-point change. Saved insights retain filter scope, while CSV and copied summaries identify the figures as fictional samples.

## Product judgment

The design puts the PM decision before the chart: choose what to investigate next, show the evidence behind that choice, and record the question that should be answered. I prioritized traceability and reviewability over a larger KPI catalog, and I made the retention window older so every eligible account has complete follow-up. The dashboard surfaces a meaningful change but leaves causal interpretation and roadmap prioritization to the accountable product team.

## Deliberate limits

There is no live pipeline, account connection, freshness claim, experiment, research finding, sprint state, or messaging integration. “Early access” demonstrates an honest empty-data state. The product does not infer causes or automatically recommend a roadmap action.

## Ownership and implementation

PM ownership includes problem framing, metric contracts, cohort method, segmentation, analysis flow, prioritization tradeoffs, sample data, evidence standards, requirements, and validation plan. Antigravity/AI assisted with implementation and verification; no manual coding authorship is claimed. The prototype requires human review before any production use.
