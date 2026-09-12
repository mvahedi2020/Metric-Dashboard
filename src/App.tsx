import { FormEvent, useEffect, useMemo, useState } from 'react'
import { aggregate, calculate, changePoints, Counts, csvFor, FilterSegment, metricMeta, MetricKey, Period, periodWindows, stakeholderSummary } from './metrics'

const STORAGE_KEY = 'northstar.metric-dashboard.v1'
const metricKeys = Object.keys(metricMeta) as MetricKey[]
type Page = 'dashboard' | 'definitions' | 'case-study'
type SavedInsight = { id: string; text: string; scope: string }

function currentPage(): Page {
  const hash = window.location.hash.slice(1)
  return hash === 'definitions' || hash === 'case-study' ? hash : 'dashboard'
}

function loadInsights(): { values: SavedInsight[]; warning: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { values: [], warning: false }
    const parsed = JSON.parse(raw) as { version: number; insights: SavedInsight[] }
    const valid = parsed.version === 1 && Array.isArray(parsed.insights) && parsed.insights.every((item) => item && typeof item.id === 'string' && typeof item.text === 'string' && typeof item.scope === 'string')
    return valid ? { values: parsed.insights, warning: false } : { values: [], warning: true }
  } catch {
    return { values: [], warning: true }
  }
}

const pct = (value: number) => `${(value * 100).toFixed(1)}%`
const delta = (current: number, previous: number) => `${changePoints(current, previous) >= 0 ? '+' : ''}${changePoints(current, previous).toFixed(1)} pp`

function App() {
  const [stored] = useState(loadInsights)
  const [page, setPage] = useState<Page>(currentPage)
  const [period, setPeriod] = useState<Period>('30 days')
  const [segment, setSegment] = useState<FilterSegment>('All')
  const [insights, setInsights] = useState(stored.values)
  const [previousInsights, setPreviousInsights] = useState<SavedInsight[] | null>(null)
  const [storageWarning, setStorageWarning] = useState(stored.warning)
  const [note, setNote] = useState('')
  const [notice, setNotice] = useState('')
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    const onHash = () => setPage(currentPage())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, insights }))
    } catch {
      queueMicrotask(() => setStorageWarning(true))
    }
  }, [insights])

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
    const ranked = metricKeys.map((key) => ({ key, change: changePoints(result.current![key], result.previous![key]) })).sort((a, b) => b.change - a.change)
    const best = ranked[0]
    return `${metricMeta[best.key].label} shows the largest change at ${best.change >= 0 ? '+' : ''}${best.change.toFixed(1)} percentage points. Check its numerator movement and segment mix before treating the change as evidence for a product decision.`
  })()

  function saveInsight(text: string) {
    const cleaned = text.trim()
    if (!cleaned) { setActionError('Write an interpretation before saving it.'); return }
    const scope = `${segment} · ${period}`
    if (insights.some((item) => item.text === cleaned && item.scope === scope)) { setNotice('That insight is already saved for this view.'); return }
    setPreviousInsights(insights)
    setInsights((current) => [{ id: `${Date.now()}`, text: cleaned, scope }, ...current])
    setNote('')
    setNotice('Insight saved locally.')
  }

  function addNote(event: FormEvent) {
    event.preventDefault()
    saveInsight(note)
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
      setNotice('CSV exported.')
      setActionError('')
    } catch {
      setActionError('The CSV could not be exported in this browser.')
    }
  }

  async function copySummary() {
    if (!result.current || !result.previous) return
    try {
      await navigator.clipboard.writeText(stakeholderSummary(period, segment, result.current, result.previous))
      setNotice('Stakeholder summary copied.')
      setActionError('')
    } catch {
      setActionError('Clipboard access is unavailable. Try exporting the CSV instead.')
    }
  }

  function resetSample() {
    setPreviousInsights(insights)
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
    {storageWarning && <div className="warning" role="status">Browser storage is unavailable. Saved insights will last only until this tab closes.</div>}

    <main>
      {page === 'dashboard' && <>
        <section className="intro" aria-labelledby="dashboard-title">
          <div><p className="eyebrow">FICTIONAL B2B SAAS · SAMPLE COUNTS</p><h1 id="dashboard-title">Read the signal,<br/><i>then</i> shape the story.</h1><p>Explore activation, conversion, retention, and adoption through transparent counts and consistent denominators.</p></div>
          <div><div className="filters" aria-label="Dashboard filters"><label>Period<select value={period} onChange={(event) => setPeriod(event.target.value as Period)}><option>30 days</option><option>90 days</option></select></label><label>Segment<select value={segment} onChange={(event) => setSegment(event.target.value as FilterSegment)}><option>All</option><option>SMB</option><option>Mid-market</option><option>Enterprise</option><option>Early access</option></select></label><button className="reset-filter" onClick={resetSample}>Reset sample</button></div><p className="date-window"><b>Current cohort:</b> {periodWindows[period].cohort} · observed {periodWindows[period].observed}<br/><b>Prior cohort:</b> {periodWindows[period].priorCohort} · observed {periodWindows[period].priorObserved}</p></div>
        </section>

        {result.error || !result.current || !result.previous || !result.counts ? <section className="error-panel" role="alert"><h2>No observations for this segment</h2><p>{result.error || 'The selected view could not be calculated.'} Rates are not shown as 0% because there is no denominator.</p><button className="primary" onClick={() => setSegment('All')}>View all segments</button></section> : <>
          <section className="metric-grid" aria-label="Key metrics">{metricKeys.map((key, index) => <MetricCard key={key} metricKey={key} current={result.current![key]} previous={result.previous![key]} counts={result.counts!.current} index={index} />)}</section>
          <div className="analysis-grid">
            <section className="chart-card" aria-labelledby="comparison-title"><div className="section-heading"><div><p className="eyebrow">PERIOD COMPARISON</p><h2 id="comparison-title">Current versus prior window</h2></div><div className="legend"><span><i className="dot current"/>Current</span><span><i className="dot previous"/>Previous</span></div></div><ComparisonChart current={result.current} previous={result.previous}/><p className="chart-note">Percentage rates from the selected segment. The prior window is equal in length and immediately precedes the selected sample window.</p></section>
            <aside className="insight-card" aria-labelledby="insight-title"><p className="eyebrow">INTERPRETATION PROMPT</p><h2 id="insight-title">A grounded starting point</h2><p className="suggested">{suggestedInsight}</p><button className="primary" onClick={() => saveInsight(suggestedInsight)}>Save this insight</button><form onSubmit={addNote}><label htmlFor="insight-note">Add your interpretation</label><textarea id="insight-note" value={note} onChange={(event) => { setNote(event.target.value); setActionError('') }} rows={3} placeholder="What would you investigate next?"/><button type="submit" className="secondary">Save note</button></form></aside>
          </div>
          <section className="source-strip"><div><p className="eyebrow">SOURCE COUNTS</p><h2>Trace every rate to its inputs.</h2></div><div className="count-list"><span><b>{result.counts.current.signups}</b>New accounts</span><span><b>{result.counts.current.activated}</b>Activated accounts</span><span><b>{result.counts.current.paid}</b>New paid accounts</span><span><b>{result.counts.current.eligiblePaid}</b>Retention-eligible accounts</span><span><b>{result.counts.current.retained}</b>Retained accounts</span><span><b>{result.counts.current.activeAccounts}</b>Active accounts</span><span><b>{result.counts.current.featureUsers}</b>Adopting accounts</span></div><div className="export-actions"><button className="secondary" onClick={copySummary}>Copy stakeholder summary</button><button className="primary" onClick={exportCsv}>Export CSV</button></div></section>
        </>}

        {(notice || actionError) && <div className={actionError ? 'toast error' : 'toast'} role="status">{actionError || notice}<button onClick={() => { setNotice(''); setActionError('') }} aria-label="Dismiss message">×</button></div>}

        <section className="saved" aria-labelledby="saved-title"><div className="section-heading"><div><p className="eyebrow">LOCAL NOTEBOOK</p><h2 id="saved-title">Saved insights</h2></div><div className="notebook-actions"><button className="text-button" onClick={undoNotebookChange} disabled={!previousInsights} title={previousInsights ? 'Undo the most recent notebook save, removal, clear, or reset.' : 'There is no notebook change to undo yet.'}>Undo notebook change</button>{insights.length > 0 && <button className="text-button" onClick={() => { setPreviousInsights(insights); setInsights([]); setNotice('All saved insights were cleared. You can undo this change.'); }}>Clear all</button>}</div></div>{insights.length === 0 ? <div className="empty"><span>✎</span><h3>No insights saved yet</h3><p>Save the grounded prompt above or add your own interpretation.</p></div> : <div className="insight-list">{insights.map((item) => <article key={item.id}><small>{item.scope}</small><p>{item.text}</p><button onClick={() => { setPreviousInsights(insights); setInsights((current) => current.filter((saved) => saved.id !== item.id)); setNotice('Insight removed. You can undo this change.'); }} aria-label={`Delete insight: ${item.text}`}>Remove</button></article>)}</div>}</section>
      </>}
      {page === 'definitions' && <Definitions />}
      {page === 'case-study' && <CaseStudy />}
    </main>
    <footer><span>Northstar and all data are fictional. Independent demo; no synchronization with the other portfolio projects.</span><a href="#case-study">Read the product case study →</a></footer>
  </div>
}

function MetricCard({ metricKey, current, previous, counts, index }: { metricKey: MetricKey; current: number; previous: number; counts: Counts; index: number }) {
  const meta = metricMeta[metricKey]
  const change = changePoints(current, previous)
  return <article className={`metric-card accent-${index}`}><div className="metric-index">0{index + 1}</div><p>{meta.label}</p><strong>{pct(current)}</strong><span className={change >= 0 ? 'positive' : 'negative'}>{delta(current, previous)}</span><small>{counts[meta.numerator]} ÷ {counts[meta.denominator]}</small></article>
}

function ComparisonChart({ current, previous }: { current: Record<MetricKey, number>; previous: Record<MetricKey, number> }) {
  return <div className="chart" role="img" aria-label={`Metric comparison. ${metricKeys.map((key) => `${metricMeta[key].label}: ${pct(current[key])} current, ${pct(previous[key])} previous`).join('. ')}`}>
    {metricKeys.map((key) => <div className="chart-row" key={key}><span>{metricMeta[key].label}</span><div className="bar-track"><i className="bar previous" style={{ width: `${previous[key] * 100}%` }}/><i className="bar current" style={{ width: `${current[key] * 100}%` }}/></div><b>{pct(current[key])}</b></div>)}
  </div>
}

function Definitions() {
  return <article className="content-page"><p className="eyebrow">METRIC CONTRACT</p><h1>Definitions before interpretation.</h1><p className="lede">Each rate uses a named event or population and a visible denominator. The sample uses account-level counts.</p><div className="definition-list">{metricKeys.map((key, index) => { const meta = metricMeta[key]; return <section key={key}><span>0{index + 1}</span><div><h2>{meta.label}</h2><p>{meta.description}</p></div><code>{meta.numerator} / {meta.denominator}</code></section> })}</div><section className="method-note"><h2>Comparison method</h2><p>The 30-day view uses a Jul 10–Aug 8, 2026 acquisition cohort observed on Sep 8; its prior cohort is Jun 10–Jul 9, observed Aug 9. The 90-day view uses a May 11–Aug 8 cohort observed Sep 8; its prior cohort is Feb 10–May 10, observed Jun 10. This gives every retention-eligible account a full 30-day follow-up. Deltas are percentage-point changes. Segment “All” sums counts before calculating rates, avoiding an unweighted average of percentages.</p></section></article>
}

function CaseStudy() {
  return <article className="content-page"><p className="eyebrow">INDEPENDENT PRODUCT SAMPLE</p><h1>From metric theater to traceable decisions.</h1><p className="lede">This prototype explores a product dashboard where every headline number stays close to its definition and source counts.</p><div className="case-grid"><section><h2>The product question</h2><p>Can a compact operating view help PMs share a metric narrative while making denominators, comparison windows, and uncertainty easy to inspect?</p></section><section><h2>Product choices</h2><p>Filters recalculate from coherent segment counts. Each card shows its numerator and denominator. Definitions and comparison logic live in the product. Saved insights preserve scope, and exports identify the sample.</p></section><section><h2>Limits</h2><p>Northstar and all figures are fictional. There is no live data source, freshness claim, customer research result, experiment result, sprint status, or Slack integration.</p></section><section><h2>My role as Product Manager</h2><p>I own the product problem, metric contracts, segmentation, analysis flow, evidence boundaries, validation plan, and sample-data design. AI tools assisted with implementation and verification.</p></section><section><h2>Product artifacts</h2><p><a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/PRD.md">Read the PRD</a> · <a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/Case_Study.md">Read the case study</a> · <a href="https://github.com/mvahedi2020/Metric-Dashboard/blob/main/docs/product/Validation.md">Read the validation plan</a></p></section></div><a href="#dashboard" className="primary link-button">Explore the dashboard</a></article>
}

export default App
