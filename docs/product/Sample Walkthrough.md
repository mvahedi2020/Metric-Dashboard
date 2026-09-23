# Sample Walkthrough

This is a tutorial for the working Northstar sample. Northstar and every figure are fictional. The walkthrough shows how the product exposes a decision context; it does not prove a customer problem, a causal explanation, or a business result.

## Inspect a defined segment

1. Start from **30 days / All**. If a prior browser session has local notes or another filter selected, choose **Reset sample** first. Read the confirmation: it names the saved notes, filters, and draft note that will be cleared. Choose **Reset notes and filters** only when that impact is intended; **Keep working** or Escape leaves the notebook unchanged. The date strip then establishes the current and prior acquisition cohorts and their observation dates before a rate is interpreted.
2. Set **Period** to **90 days** and **Segment** to **Enterprise**. The filter changes the whole scope: cards, source counts, comparison chart, dates, copied summary, and CSV. The current cohort reads **May 11–Aug 8, 2026**, observed **Sep 8, 2026**. The freshness label calculates the fixture age from the viewing clock; before the observation timestamp it says the observation date is upcoming. It is a sample-age cue, not a live pipeline status.
3. Check Activation. The card shows **79.0%** and the source-count strip shows **176** new accounts and **139** activated accounts. That is 139 ÷ 176, not an average of other segment percentages. The prior Enterprise window is available in the card comparison; the movement is descriptive percentage points, not evidence that a product change caused it.
4. Read the other cards before choosing a follow-up. In this scope, conversion is 96 ÷ 139 (69.1%), 30-day retention is 84 ÷ 96 eligible paid accounts (87.5%), and feature adoption is 109 ÷ 151 active accounts (72.2%). Retention uses a separate eligible-paid denominator even though the complete sample cohorts make it equal paid here.

## Form a scoped handoff

5. Use the grounded prompt as a starting question, or write an interpretation such as “Check whether the Enterprise activation numerator changed with segment mix before treating the rate movement as a product signal.” Select **Save note**. The saved item is labeled **Enterprise · 90 days**, so a later reviewer can distinguish it from the currently selected view. It is stored only in this browser.
6. Select **Copy stakeholder summary** to create a concise scoped summary with its fictional-data disclosure. The completion message repeats **Enterprise · 90 days**; confirm that it matches the selected filters. If clipboard access is unavailable, the interface explains the failure and offers **Export CSV** as the fallback. Export completion also repeats the scope and states that notebook text was excluded. Both outputs include current and prior numerator/denominator counts and both observation dates. The CSV separates each metric into a row. For Enterprise conversion, confirm current 96/139, prior 81/121, and +2.1 pp; do not subtract the rounded 69.1% and 66.9% labels. Neither output includes your saved interpretation; copy that text separately if you want to hand it off.

## Check the boundary

7. Change Segment to **Early access**. The dashboard shows an unavailable state because there are no observations. It does not render a 0% rate. Choose **View all segments** to recover.

## Check what the notebook actually preserves

8. Return to **90 days / Enterprise** and save a short note if none is present. Change Segment to **SMB**. The saved note retains **Enterprise · 90 days**, while the cards and a new export describe SMB. Choose **View saved scope** to restore the Enterprise / 90 days filters. This recalculates the current fictional fixture; it does not restore a snapshot of the data or attach that note to an export.
9. Select **Reset sample**, then **Undo notebook change**. The note returns, but filters stay at **30 days / All**. Undo restores notebook content only; it does not restore the previous filter selection. The next notebook change replaces the single undo snapshot.
10. Refresh. Valid saved notes survive when browser storage is available, but filters start at **30 days / All** and the undo snapshot is gone. Notes retain text and a scope label, not an immutable copy of the counts or dates. The notebook accepts at most 50 notes and 500 characters per note; an oversized or malformed saved payload remains in the browser until the reviewer explicitly chooses the reset action. This is a local notebook, not a shared analysis archive.

The PM tradeoff is deliberate: the product asks a reviewer to inspect population, timing, and counts before sharing an interpretation. That adds a step compared with a headline-only dashboard, but it avoids turning an unexplained rate into a recommendation or an enforced causal-review gate.
# Evidence contract: export and recovery (September 21, 2026)

The dashboard treats the selected period and segment as an export boundary. A CSV contains only the four derived metrics, their current and prior numerators and denominators, both cohort windows, and the sample disclaimer; saved notebook text never enters the file. Unsupported or empty scopes stop before export. Changing either filter clears the prior action message so a copied or downloaded result cannot be mistaken for the new scope.

The Reset sample dialog clears filters, the draft note, and saved insights only after the explicit confirmation. The existing notebook can be restored once through Undo notebook change, while invalid browser data remains untouched until reset. This walkthrough is a local fictional demonstration; it is not evidence of live business performance.
