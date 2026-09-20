# Product risks: protecting interpretation

This register identifies prospective risks to the fictional metric-review workflow. It does not report incidents or completed research.

| Risk | Evidence to look for | Product response and decision trigger |
|---|---|---|
| Description is mistaken for causation | A reviewer says a percentage-point change proves why customers behaved differently. | In the proposed study, ask what evidence would test that explanation. This is a review practice, not a software gate. Revisit the prompt if the confusion repeats. |
| The population behind a rate is missed | A participant can read the percentage but cannot name its denominator. | Keep source counts and definitions visible; defer more KPI density until comprehension improves. |
| Retention is mistaken for a current-period result | A reviewer overlooks the observation date or follow-up window. | Preserve the completed cohort and explicit dates. Preliminary views require a separate data contract and clear labels before consideration. |
| No observations are read as zero performance | The Early access state is described as a 0% result. | Test the unavailable explanation and recovery path before introducing additional segments. |
| Exported sample data is presented as business evidence | A reviewer fails to identify the fictional-data disclosure. | Review the label in both CSV and copied summaries. Do not advance a real-data pilot until participants understand the boundary. |
| A handoff uses the wrong filter scope | A reviewer joins an Enterprise note to an SMB export or cannot state the period just shared. | Repeat segment and period after copy or export, and score note/output agreement in the proposed task. Any silent mismatch blocks shared-workflow investment. |
| Local notes are assumed to be shared | A participant expects a colleague or another device to see the notebook. | Keep the browser-only boundary explicit. Research the handoff before designing shared state and permissions. |
| A large or malformed browser payload overwhelms the notebook | A copied or hand-edited payload exceeds the record or character limit. | Preserve the raw data, explain that it is incompatible, and require an explicit reset. Do not silently truncate or overwrite it. |
| Reset clears more context than the reviewer expects | A reviewer resets while a note, non-default filter, or draft is still visible. | Show the notes, filter, and draft impact in the confirmation; verify Escape, cancellation, and focus recovery in keyboard testing. |

## Decisions to make when a risk appears

These are proposed responsibilities for a future study, not a claim that a team has been assigned. The PM owns the next scope decision; a study facilitator records the observation; a future data owner would own any production metric contract.

| Decision priority | Observable trigger | Immediate response | Evidence needed to reconsider |
|---|---|---|---|
| Stop the handoff exercise | A participant intends to present an output as real business evidence | Record the disclosure miss before explaining the fictional boundary; do not score a coached answer as independent | Retest the disclosure with fresh participants under the same scoring rule |
| Repair the existing workflow | A participant joins a saved Enterprise note to an SMB export without noticing | Inspect label placement and handoff instructions; do not assume more notebook features solve it | A revised task shows independent agreement between note and output scope |
| Defer metric expansion | Participants average segment percentages or subtract rounded labels to dispute a delta | Use the [worked calculation contract](PRD.md#auditable-calculation-examples); test whether explanation or layout is the problem | Correct explanation using raw counts, with failures retained in the denominator |
| Block real-data intake | Zero, missing, ineligible, or late-arriving observations lack distinct definitions | Require a data-owner-approved contract before import or automation | Defined ownership, missing-data states, eligibility and change rules, with test examples |

Saved notes are not a recovery archive: invalid stored data can be replaced with an empty notebook, the undo snapshot is memory-only, and a scope label does not freeze the data. Reviewers should keep any important fictional interpretation separately before reset or browser cleanup. A future archive would need versioned data snapshots, provenance, and retention design; the sample has none.

Review these decisions with the [backlog](Sprint_Backlog.md). Small studies can expose usability problems; they cannot establish demand or commercial impact.
