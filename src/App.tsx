import { FormEvent, useEffect, useMemo, useState } from 'react'
import { aggregate, calculate, changePoints, Counts, csvFor, FilterSegment, largestMovement, metricMeta, MetricKey, Period, periodWindows, stakeholderSummary } from './metrics'

const STORAGE_KEY = 'northstar.metric-dashboard.v1'
const MAX_INSIGHT_LENGTH = 500
const metricKeys = Object.keys(metricMeta) as MetricKey[]
type Page = 'dashboard' | 'definitions' | 'case-study'
type SavedInsight = { id: string; text: string; scope: string; origin?: 'Sample prompt' | 'My interpretation' }
type StorageWarning = 'invalid' | 'unavailable' | null

function currentPage(): Page {
  const hash = window.location.hash.slice(1)
  return hash === 'definitions' || hash === 'case-study' ? hash : 'dashboard'
}

function savedFilters(scope: string): { segment: FilterSegment; period: Period } | null {
  const [savedSegment, savedPeriod, extra] = scope.split(' · ')
  if (extra || !['All', 'SMB', 'Mid-market', 'Enterprise', 'Early access'].includes(savedSegment) || !['30 days', '90 days'].includes(savedPeriod)) return null
  return { segment: savedSegment as FilterSegment, period: savedPeriod as Period }
}

function loadInsights(): { values: SavedInsight[]; warning: StorageWarning } {
  let raw: string | null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return { values: [], warning: 'unavailable' }
  }
  if (!raw) return { values: [], warning: null }
  try {
    const parsed = JSON.parse(raw) as { version: number; insights: SavedInsight[] }
    const valid = parsed.version === 1 && Array.isArray(parsed.insights) && parsed.insights.every((item) => item && typeof item.id === 'string' && item.id.trim() && typeof item.text === 'string' && item.text.trim() && item.text.length <= MAX_INSIGHT_LENGTH && typeof item.scope === 'string' && savedFilters(item.scope) && (item.origin === undefined || item.origin === 'Sample prompt' || item.origin === 'My interpretation')) && new Set(parsed.insights.map((item) => item.id.trim().toLowerCase())).size === parsed.insights.length
    return valid ? { values: parsed.insights, warning: null } : { values: [], warning: 'invalid' }
  } catch {
    return { values: [], warning: 'invalid' }
  }
}

const pct = (value: number) => `${(value * 100).toFixed(1)}%`
const delta = (current: number, previous: number) => `${changePoints(current, previous) >= 0 ? '+' : ''}${changePoints(current, previous).toFixed(1)} pp`
const comparableInsight = (value: string) => value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US')

function App() {
  const [stored] = useState(loadInsights)
  const [page, setPage] = useState<Page>(currentPage)
  const [period, setPeriod] = useState<Period>('30 days')
  const [segment, setSegment] = useState<FilterSegment>('All')
  const [insights, setInsights] = useState(stored.values)
  const [previousInsights, setPreviousInsights] = useState<SavedInsight[] | null>(null)
  const [storageWarning, setStorageWarning] = useState(stored.warning)
  const [preserveInvalid, setPreserveInvalid] = useState(stored.warning === 'invalid')
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    const onHash = () => setPage(currentPage())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (preserveInvalid) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, insights }))
    } catch {
      queueMicrotask(() => setStorageWarning('unavailable'))
    }
  }, [insights, preserveInvalid])

  const result = useMemo(() => {
    try {
      const counts = aggregate(period, segment)
      return { counts, current: calculate(counts.current), previous: calculate(counts.previous), error: '' }
    } catch (error) {
      return { counts: null, current: null, previous: null, error: error instanceof Error ? error.message : 'The sample data could not be calculated.' }
    }
  }, [period, segment])

  const suggestedInsight = (() => {
    if (!result.current || !result.previous) return ''
    const largest = largestMovement(result.current, result.previous)
    const followUp = segment === 'All' ? 'its numerator movement and segment mix' : 'the current and prior numerator/denominator counts'
    return `${metricMeta[largest.key].label} shows the largest movement at ${largest.change >= 0 ? '+' : ''}${largest.change.toFixed(1)} percentage points. Check ${followUp} before treating the change as evidence for a product decision.`
  })()

  function saveInsight(text: string, origin: 'Sample prompt' | 'My interpretation') {
    if (preserveInvalid) { setActionError('Reset the sample before saving a new note. Your incompatible saved data has not been replaced.'); return }
    const cleaned = text.trim()
    if (!cleaned) { setActionError('Write an interpretation before saving it.'); return }
    if (cleaned.length > MAX_INSIGHT_LENGTH) { setActionError(`Keep the interpretation to ${MAX_INSIGHT_LENGTH} characters or fewer.`); return }
    const scope = `${segment} · ${period}`
    if (insights.some((item) => comparableInsight(item.text) === comparableInsight(cleaned) && item.scope === scope)) { setActionError(''); setNotice('That insight is already saved for this view.'); return }
    setPreviousInsights(insights)
    setInsights((current) => [{ id: crypto.randomUUID(), text: cleaned, scope, origin }, ...current])
    setNote('')
    setActionError('')
    setNotice(storageWarning === 'unavailable' ? `${origin} saved for this tab only.` : `${origin} saved locally.`)
  }

  function addNote(event: FormEvent) {
    event.preventDefault()
    saveInsight(note, 'My interpretation')
  }

  function exportCsv() {
    if (!result.counts) return
    try {
      const blob = new Blob([csvFor(period, segment, result.counts.current, result.counts.previous)], { type: 'text/csv;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `northstar-sample-${period.replace(' ', '-')}-${segment.toLowerCase().replaceAll(' ', '-')}.csv`
      link.click()
      URL.revokeObjectURL(url)
      setNotice(`CSV exported for ${segment} · ${period}; saved notebook text excluded.`)
      setActionError('')
    } catch {
      setActionError('The CSV could not be exported in this browser.')
    }
  }

  async function copySummary() {
    if (!result.counts) return
    try {
      await navigator.clipboard.writeText(stakeholderSummary(period, segment, result.counts.current, result.counts.previous))
      setNotice(`Stakeholder summary copied for ${segment} · ${period}.`)
      setActionError('')
    } catch {
      setActionError('Clipboard access is unavailable. Try exporting the CSV instead.')
    }
  }

  function resetSample() {
    setPreviousInsights(insights)
    setPreserveInvalid(false)
    setStorageWarning(null)
    setPeriod('30 days')
    setSegment('All')
    setInsights([])
    setNote('')
    setActionError('')
    setNotice('Sample filters and saved insights were reset.')
  }

  function undoNotebookChange() {
    if (!previousInsights) return
    setInsights(previousInsights)
    setPreviousInsights(null)
    setNotice('Last notebook change undone.')
    setActionError('')
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#dashboard"><span className="brand-mark">N</span><span>Northstar</span><em>metric dashboard</em></a>
      <nav aria-label="Primary navigation"><a className={page === 'dashboard' ? 'active' : ''} href="#dashboard">Dashboard</a><a className={page === 'definitions' ? 'active' : ''} href="#definitions">Definitions</a><a className={page === 'case-study' ? 'active' : ''} href="#case-study">Product case study</a></nav>
      <span className="sample-badge">Independent sample demo</span>
    </header>
    {storageWarning && <div className="warning" role="status">{storageWarning === 'invalid' ? 'Saved insights could not be read. The existing browser data has been preserved; choose Reset sample to replace it.' : 'Browser storage is unavailable. Saved insights will last only until this tab closes.'}</div>}

    <main>
      {page === 'dashboard' && <>
        <section className="intro" aria-labelledby="dashboard-title">
          <div><p className="eyebrow">FICTIONAL B2B SAAS · SAMPLE COUNTS</p><h1 id="dashboard-title">Read the signal,<br/><i>then</i> shape the story.</h1><p>Explore activation, conversion, retention, and adoption through transparent counts and consistent denominators.</p></div>
          <div><div className="filters" aria-label="Dashboard filters"><label>Period<select value={period} onChange={(event) => setPeriod(event.target.value as Period)}><option>30 days</option><option>90 days</option></select></label><label>Segment<select value={segment} onChange={(event) => setSegment(event.target.value as FilterSegment)}><option>All</option><option>SMB</option><option>Mid-market</option><option>Enterprise</option><option>Early access</option></select></label><button className="reset-filter" onClick={resetSample}>Reset sample</button></div><p className="date-window"><b>Current cohort:</b> {periodWindows[period].cohort} · observed {periodWindows[period].observed}<br/><b>Prior cohort:</b> {periodWindows[period].priorCohort} · observed {periodWindows[period].priorObserved}</p></div>
        </section>

        {result.error || !result.current || !result.previous || !result.counts ? <section className="error-panel" role="alert"><h2>No observations for this segment</h2><p>{result.error || 'The selected view could not be calculated.'} Rates are not shown as 0% because there is no denominator.</p><button className="primary" onClick={() => setSegment('All')}>View all segments</button></section> : <>
          <section className="metric-grid" aria-label="Key metrics">{metricKeys.map((key, index) => <MetricCard key={key} metricKey={key} current={result.current![key]} previous={result.previous![key]} counts={result.counts!.current} previousCounts={result.counts!.previous} index={index} />)}</section>
          <div className="analysis-grid">
            <section className="chart-card" aria-labelledby="comparison-title"><div className="section-heading"><div><p className="eyebrow">PERIOD COMPARISON</p><h2 id="comparison-title">Current versus prior window</h2></div><div className="legend"><span><i className="dot current"/>Current</span><span><i className="dot previous"/>Previous</span></div></div><ComparisonChart current={result.current} previous={result.previous} segment={segment} period={period}/><p className="chart-note">Percentage rates from the selected segment. The prior window is equal in length and immediately precedes the selected sample window.</p></section>
            <aside className="insight-card" aria-labelledby="insight-title"><p className="eyebrow">INTERPRETATION PROMPT</p><h2 id="insight-title">A grounded starting point</h2><p className="suggested">{suggestedInsight}</p><button className="primary" onClick={() => saveInsight(suggestedInsight, 'Sample prompt')}>Save sample prompt</button><form onSubmit={addNote}><label htmlFor="insight-note">Add your interpretation</label><textarea id="insight-note" value={note} onChange={(event) => { setNote(event.target.value); setActionError('') }} maxLength={MAX_INSIGHT_LENGTH} rows={3} placeholder="What would you investigate next?"/><button type="submit" className="secondary">Save note</button></form></aside>
          </div>
          <section className="source-strip"><div><p className="eyebrow">SOURCE COUNTS</p><h2>Trace every rate to its inputs.</h2></div><div className="count-list"><span><b>{result.counts.current.signups}</b>New accounts</span><span><b>{result.counts.current.activated}</b>Activated accounts</span><span><b>{result.counts.current.paid}</b>New paid accounts</span><span><b>{result.counts.current.eligiblePaid}</b>Retention-eligible accounts</span><span><b>{result.counts.current.retained}</b>Retained accounts</span><span><b>{result.counts.current.activeAccounts}</b>Active accounts</span><span><b>{result.counts.current.featureUsers}</b>Adopting accounts</span></div><div className="export-actions"><button className="secondary" onClick={copySummary}>Copy stakeholder summary</button><button className="primary" onClick={exportCsv}>Export CSV</button><p className="export-boundary">Uses the current filters. Saved notebook text is not included.</p></div></section>
        </>}

        {(notice || actionError) && <div className={actionError ? 'toast error' : 'toast'} role="status">{actionError || notice}<button onClick={() => { setNotice(''); setActionError('') }} aria-label="Dismiss message">×</button></div>}

        <section className="saved" aria-labelledby="saved-title"><div className="section-heading"><div><p className="eyebrow">LOCAL NOTEBOOK</p><h2 id="saved-title">Saved insights</h2></div><div className="notebook-actions"><button className="text-button" onClick={undoNotebookChange} disabled={!previousInsights} title={previousInsights ? 'Undo the most recent notebook save, removal, clear, or reset.' : 'There is no notebook change to undo yet.'}>Undo notebook change</button>{insights.length > 0 && <button className="text-button" onClick={() => { setPreviousInsights(insights); setInsights([]); setActionError(''); setNotice('All saved insights were cleared. You can undo this change.'); }}>Clear all</button>}</div></div>{insights.length === 0 ? <div className="empty"><span>✎</span><h3>No insights saved yet</h3><p>Save the grounded prompt above or add your own interpretation.</p></div> : <div className="insight-list">{insights.map((item) => { const saved = savedFilters(item.scope); const differentScope = saved && (saved.segment !== segment || saved.period !== period); return <article key={item.id}><small>{item.scope} · {item.origin ?? 'Saved note'}</small><p>{item.text}</p><div className="insight-actions">{differentScope && <button className="view-scope" onClick={() => { setSegment(saved.segment); setPeriod(saved.period); setActionError(''); setNotice('Showing this note’s filter scope. Saved notes do not contain a data snapshot.'); }}>View saved scope</button>}<button onClick={() => { setPreviousInsights(insights); setInsights((current) => current.filter((entry) => entry.id !== item.id)); setActionError(''); setNotice('Insight removed. You can undo this change.'); }} aria-label={`Delete insight: ${item.text}`}>Remove</button></div></article> })}</div>}</section>
      </>}
      {page === 'definitions' && <Definitions />}
      {page === 'case-study' && <CaseStudy />}
    </main>
    <footer><span>Northstar and all data are fictional. Independent demo; no synchronization with the other portfolio projects.</span><a href="#case-study">Read the product case study →</a></footer>
  </div>
}

function MetricCard({ metricKey, current, previous, counts, previousCounts, index }: { metricKey: MetricKey; current: number; previous: number; counts: Counts; previousCounts: Counts; index: number }) {
  const meta = metricMeta[metricKey]
  const change = changePoints(current, previous)
  return <article className={`metric-card accent-${index}`}><div className="metric-index">0{index + 1}</div><p>{meta.label}</p><strong>{pct(current)}</strong><span className={change >= 0 ? 'positive' : 'negative'}>{delta(current, previous)}</span><small>Current {counts[meta.numerator]} ÷ {counts[meta.denominator]}<br/>Prior {previousCounts[meta.numerator]} ÷ {previousCounts[meta.denominator]}</small></article>
}

function ComparisonChart({ current, previous, segment, period }: { current: Record<MetricKey, number>; previous: Record<MetricKey, number>; segment: FilterSegment; period: Period }) {
  const windows = periodWindows[period]
  return <div className="chart" role="img" aria-label={`${segment}, ${period}. Current cohort ${windows.cohort}, observed ${windows.observed}; prior cohort ${windows.priorCohort}, observed ${windows.priorObserved}. ${metricKeys.map((key) => `${metricMeta[key].label}: ${pct(current[key])} current, ${pct(previous[key])} prior, ${delta(current[key], previous[key])}`).join('. ')}`}>
    {metricKeys.map((key) => <div className="chart-row" key={key}><span>{metricMeta[key].label}</span><div className="bar-track"><i className="bar previous" style={{ width: `${previous[key] * 100}%` }}/><i className="bar current" style={{ width: `${current[key] * 100}%` }}/></div><b>{pct(current[key])}</b></div>)}
  </div>
}

function Definitions() {
  return <article className="content-page"><p className="eyebrow">METRIC CONTRACT</p><h1>Definitions before interpretation.</h1><p className="lede">Each rate uses a named event or population and a visible denominator. The sample uses account-level counts.</p><div className="definition-list">{metricKeys.map((key, index) => { const meta = metricMeta[key]; return <section key={key}><span>0{index + 1}</span><div><h2>{meta.label}</h2><p>{meta.description}</p></div><code>{meta.numerator} / {meta.denominator}</code></section> })}</div><section className="method-note"><h2>Comparison method</h2><p>The 30-day view uses a Jul 10–Aug 8, 2026 acquisition cohort observed on Sep 8; its prior cohort is Jun 10–Jul 9, observed Aug 9. The 90-day view uses a May 11–Aug 8 cohort observed Sep 8; its prior cohort is Feb 10–May 10, observed Jun 10. This gives every retention-eligible account a full 30-day follow-up. Deltas are percentage-point changes. Segment “All” sums counts before calculating rates, avoiding an unweighted average of percentages.</p></section></article>
}

function CaseStudy() {
  return <article className="content-page"><p className="eyebrow">INDEPENDENT PRODUCT SAMPLE</p><h1>From metric theater to traceable decisions.</h1><p className="lede">This prototype explores a product dashboard where every headline number stays close to its definition and source counts.</p><div className="case-grid"><section><h2>The product question</h2><p>Can a compact operating view help PMs share a metric narrative while making denominators, comparison windows, and uncertainty easy to inspect?</p></section><section><h2>Product choices</h2><p>Filters recalculate from coherent segment counts. Each card shows its numerator and denominator. Definitions and comparison logic live in the product. Saved insights preserve scope, and exports identify the sample.</p></section><section><h2>Limits</h2><p>Northstar and all figures are fictional. There is no live data source, freshness claim, customer research result, experiment result, sprint status, or Slack integration.</p></section><section><h2>My role as Product Manager</h2><p>I own the product problem, metric contracts, segmentation, analysis flow, evidence boundaries, validation plan, and sample-data design. AI tools assisted with implementation and verification.</p></section><section><h2>Product artifacts</h2><p>Start with the <a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/Sample%20Walkthrough.md">sample walkthrough</a> to reproduce the visible decision. Then inspect the <a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/PRD.md">PRD</a>, <a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/Product_Decisions.md">product decisions</a>, and <a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/Validation.md">validation plan</a>.</p></section></div><a href="#dashboard" className="primary link-button">Explore the dashboard</a></article>
}

export default App
