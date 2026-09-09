export type Segment = 'SMB' | 'Mid-market' | 'Enterprise'
export type Period = '30 days' | '90 days'
export type FilterSegment = Segment | 'All' | 'Early access'

export interface Counts {
  signups: number
  activated: number
  paid: number
  eligiblePaid: number
  retained: number
  activeAccounts: number
  featureUsers: number
}

export interface DataRow {
  segment: Segment
  period: Period
  current: Counts
  previous: Counts
}

export type MetricKey = 'activation' | 'conversion' | 'retention' | 'adoption'

export const rows: DataRow[] = [
  { segment: 'SMB', period: '30 days', current: { signups: 240, activated: 154, paid: 79, eligiblePaid: 79, retained: 61, activeAccounts: 188, featureUsers: 96 }, previous: { signups: 228, activated: 137, paid: 69, eligiblePaid: 69, retained: 50, activeAccounts: 176, featureUsers: 80 } },
  { segment: 'Mid-market', period: '30 days', current: { signups: 150, activated: 110, paid: 66, eligiblePaid: 66, retained: 56, activeAccounts: 126, featureUsers: 77 }, previous: { signups: 145, activated: 101, paid: 61, eligiblePaid: 61, retained: 49, activeAccounts: 119, featureUsers: 65 } },
  { segment: 'Enterprise', period: '30 days', current: { signups: 62, activated: 49, paid: 34, eligiblePaid: 34, retained: 31, activeAccounts: 54, featureUsers: 39 }, previous: { signups: 58, activated: 43, paid: 29, eligiblePaid: 29, retained: 25, activeAccounts: 50, featureUsers: 32 } },
  { segment: 'SMB', period: '90 days', current: { signups: 682, activated: 430, paid: 215, eligiblePaid: 215, retained: 164, activeAccounts: 512, featureUsers: 251 }, previous: { signups: 641, activated: 385, paid: 188, eligiblePaid: 188, retained: 137, activeAccounts: 478, featureUsers: 210 } },
  { segment: 'Mid-market', period: '90 days', current: { signups: 421, activated: 306, paid: 185, eligiblePaid: 185, retained: 153, activeAccounts: 361, featureUsers: 217 }, previous: { signups: 402, activated: 278, paid: 165, eligiblePaid: 165, retained: 132, activeAccounts: 340, featureUsers: 179 } },
  { segment: 'Enterprise', period: '90 days', current: { signups: 176, activated: 139, paid: 96, eligiblePaid: 96, retained: 84, activeAccounts: 151, featureUsers: 109 }, previous: { signups: 164, activated: 121, paid: 81, eligiblePaid: 81, retained: 68, activeAccounts: 140, featureUsers: 89 } },
]

const countKeys: (keyof Counts)[] = ['signups', 'activated', 'paid', 'eligiblePaid', 'retained', 'activeAccounts', 'featureUsers']

export function aggregate(period: Period, segment: FilterSegment): { current: Counts; previous: Counts } {
  const selected = rows.filter((row) => row.period === period && (segment === 'All' || row.segment === segment))
  if (!selected.length) throw new Error('No sample data matches this filter.')
  const sum = (side: 'current' | 'previous') => countKeys.reduce((acc, key) => ({ ...acc, [key]: selected.reduce((total, row) => total + row[side][key], 0) }), {} as Counts)
  return { current: sum('current'), previous: sum('previous') }
}

export function calculate(counts: Counts): Record<MetricKey, number> {
  return {
    activation: counts.signups ? counts.activated / counts.signups : 0,
    conversion: counts.activated ? counts.paid / counts.activated : 0,
    retention: counts.eligiblePaid ? counts.retained / counts.eligiblePaid : 0,
    adoption: counts.activeAccounts ? counts.featureUsers / counts.activeAccounts : 0,
  }
}

export function changePoints(current: number, previous: number): number {
  return (current - previous) * 100
}

export const metricMeta: Record<MetricKey, { label: string; numerator: keyof Counts; denominator: keyof Counts; description: string }> = {
  activation: { label: 'Activation', numerator: 'activated', denominator: 'signups', description: 'Accounts completing the setup milestone ÷ new signups.' },
  conversion: { label: 'Conversion', numerator: 'paid', denominator: 'activated', description: 'New paid accounts ÷ activated accounts in the window.' },
  retention: { label: '30-day retention', numerator: 'retained', denominator: 'eligiblePaid', description: 'Paid cohort accounts active 30 days after acquisition ÷ paid cohort accounts eligible for a full 30-day observation.' },
  adoption: { label: 'Feature adoption', numerator: 'featureUsers', denominator: 'activeAccounts', description: 'Active accounts using role templates ÷ active accounts.' },
}

export function stakeholderSummary(period: Period, segment: FilterSegment, current: Record<MetricKey, number>, previous: Record<MetricKey, number>): string {
  const scope = `${segment} · ${period}`
  const entries = (Object.keys(metricMeta) as MetricKey[]).map((key) => `${metricMeta[key].label} ${(current[key] * 100).toFixed(1)}% (${changePoints(current[key], previous[key]) >= 0 ? '+' : ''}${changePoints(current[key], previous[key]).toFixed(1)} pp)`).join('; ')
  return `Northstar sample product signals — ${scope}: ${entries}. These figures come from fictional sample counts and are not live business results.`
}

export function csvFor(period: Period, segment: FilterSegment, current: Counts, previous: Counts): string {
  const cur = calculate(current)
  const prev = calculate(previous)
  const header = 'dataset,period,segment,metric,numerator,denominator,current_rate,previous_rate,change_percentage_points,current_cohort,prior_cohort,observation_date'
  const lines = (Object.keys(metricMeta) as MetricKey[]).map((key) => {
    const meta = metricMeta[key]
    return ['Northstar fictional sample',period, segment, meta.label, current[meta.numerator], current[meta.denominator], (cur[key] * 100).toFixed(1), (prev[key] * 100).toFixed(1), changePoints(cur[key], prev[key]).toFixed(1),periodWindows[period].cohort,periodWindows[period].priorCohort,periodWindows[period].observed].map(value=>{const text=String(value);return /[,"\n]/.test(text)?'"'+text.replaceAll('"','""')+'"':text}).join(',')
  })
  return [header, ...lines].join('\n')
}

export const periodWindows: Record<Period, { cohort: string; observed: string; priorCohort: string; priorObserved: string }> = {
  '30 days': { cohort: 'Jul 10–Aug 8, 2026', observed: 'Sep 8, 2026', priorCohort: 'Jun 10–Jul 9, 2026', priorObserved: 'Aug 9, 2026' },
  '90 days': { cohort: 'May 11–Aug 8, 2026', observed: 'Sep 8, 2026', priorCohort: 'Feb 10–May 10, 2026', priorObserved: 'Jun 10, 2026' },
}
