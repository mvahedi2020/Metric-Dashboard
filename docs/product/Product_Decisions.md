# Product Decisions: Make the review inspectable

Northstar is a fictional portfolio scenario. These are design decisions for the prototype, not records of customer requests or production outcomes.

## 1. Show counts beside rates

**Options considered:** a dense KPI strip; rates with hover-only definitions; or visible source counts and definitions.

**Chosen:** visible counts and named numerator/denominator contracts.

**Compromise:** the dashboard gives up some visual density and more metrics. That cost is acceptable while the primary job is to make a review discussion auditable. Reconsider if research participants can reliably interpret a compact definition treatment without losing denominator comprehension.

## 2. Prefer completed retention follow-up

**Options considered:** report the newest acquisition cohort; blend mature and immature accounts; or show a cohort observed after a full 30-day follow-up.

**Chosen:** the fully observed cohort with a distinct `eligiblePaid` denominator.

**Compromise:** the retention view is deliberately less current. Reconsider if an accountable production data contract can separately label preliminary retention and users need both views for a time-sensitive decision.

## 3. Prompt investigation, do not rank roadmap work

**Options considered:** automatically score the largest change; flag a causal explanation; or provide a grounded investigation prompt plus a scoped note.

**Chosen:** a prompt and local note workflow.

**Compromise:** it leaves prioritization work with the product team. Reconsider only after evidence shows a governed prioritization model improves decisions without converting descriptive signals into unsupported recommendations.
