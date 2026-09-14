# Sample Walkthrough

This is a tutorial for the working Northstar sample. Northstar and every figure are fictional. The walkthrough shows how the product exposes a decision context; it does not prove a customer problem, a causal explanation, or a business result.

## Inspect a defined segment

1. Open the dashboard and leave the default **30 days / All** view visible. The date strip establishes the current and prior acquisition cohorts and their observation dates before a rate is interpreted.
2. Set **Period** to **90 days** and **Segment** to **Enterprise**. The filter changes the whole scope: cards, source counts, comparison chart, dates, copied summary, and CSV. The current cohort reads **May 11–Aug 8, 2026**, observed **Sep 8, 2026**.
3. Check Activation. The card shows **79.0%** and the source-count strip shows **176** new accounts and **139** activated accounts. That is 139 ÷ 176, not an average of other segment percentages. The prior Enterprise window is available in the card comparison; the movement is descriptive percentage points, not evidence that a product change caused it.
4. Read the other cards before choosing a follow-up. In this scope, conversion is 96 ÷ 139 (69.1%), 30-day retention is 84 ÷ 96 eligible paid accounts (87.5%), and feature adoption is 109 ÷ 151 active accounts (72.2%). Retention uses a separate eligible-paid denominator even though the complete sample cohorts make it equal paid here.

## Form a scoped handoff

5. Use the grounded prompt as a starting question, or write an interpretation such as “Check whether the Enterprise activation numerator changed with segment mix before treating the rate movement as a product signal.” Select **Save note**. The saved item is labeled **Enterprise · 90 days**, so a later reviewer can distinguish it from the currently selected view. It is stored only in this browser.
6. Select **Copy stakeholder summary** to create a concise scoped summary with its fictional-data disclosure. If clipboard access is unavailable, the interface explains the failure and offers **Export CSV** as the fallback. The CSV includes the chosen segment, period, counts, rates, percentage-point changes, cohorts, observation date, and fictional sample label.

## Check the boundary

7. Change Segment to **Early access**. The dashboard shows an unavailable state because there are no observations. It does not render a 0% rate. Choose **View all segments** to recover.

The PM tradeoff is deliberate: the product asks a reviewer to inspect population, timing, and counts before sharing an interpretation. That adds a step compared with a headline-only dashboard, but it avoids turning an unexplained rate into a recommendation or an enforced causal-review gate.
