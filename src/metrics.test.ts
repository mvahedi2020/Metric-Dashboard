import { describe, expect, it } from 'vitest'
import { aggregate, calculate, changePoints, csvFor, largestMovement, periodWindows, stakeholderSummary } from './metrics'

describe('metric calculations', () => {
  it('aggregates selected segments from coherent counts', () => {
    const all = aggregate('30 days', 'All')
    expect(all.current.signups).toBe(452)
    expect(all.current.activated).toBe(313)
  })

  it('uses documented denominators', () => {
    const metrics = calculate({ signups: 100, activated: 60, paid: 30, eligiblePaid: 32, retained: 24, activeAccounts: 80, featureUsers: 40 })
    expect(metrics).toEqual({ activation: 0.6, conversion: 0.5, retention: 0.75, adoption: 0.5 })
    expect(changePoints(0.6, 0.55)).toBeCloseTo(5)
  })

  it('exports traceable metrics and a sample disclaimer', () => {
    const data = aggregate('30 days', 'SMB')
    expect(csvFor('30 days', 'SMB', data.current, data.previous)).toContain('Activation,154,240')
    expect(stakeholderSummary('30 days', 'SMB', data.current, data.previous)).toContain('fictional sample counts')
  })

  it('handles an empty segment and exposes exact cohort windows', () => {
    expect(() => aggregate('30 days', 'Early access')).toThrow('No sample data matches this filter.')
    expect(periodWindows['30 days'].observed).toBe('Sep 8, 2026')
    expect(periodWindows['30 days'].cohort).toBe('Jul 10–Aug 8, 2026')
  })
})


describe('stakeholder handoff', () => {
  it('carries counts and both observation windows so a copied rate is auditable', () => {
    const { current, previous } = aggregate('90 days', 'Enterprise')
    const summary = stakeholderSummary('90 days', 'Enterprise', current, previous)
    expect(summary).toContain('Enterprise · 90 days')
    expect(summary).toContain('Activation 79.0% (139 / 176; prior 121 / 164; +5.2 pp)')
    expect(summary).toContain('Current cohort: May 11–Aug 8, 2026, observed Sep 8, 2026')
    expect(summary).toContain('Prior cohort: Feb 10–May 10, 2026, observed Jun 10, 2026')
    expect(summary).toContain('fictional sample counts')
    expect(summary).toContain('do not establish a cause')
  })
})


describe('CSV audit trail', () => {
  it('preserves existing columns and appends the inputs needed to recompute prior rates', () => {
    const { current, previous } = aggregate('90 days', 'Enterprise')
    const [header, activation, conversion, retention, adoption] = csvFor('90 days', 'Enterprise', current, previous).split('\n')
    expect(header).toBe('dataset,period,segment,metric,numerator,denominator,current_rate,previous_rate,change_percentage_points,current_cohort,prior_cohort,observation_date,previous_numerator,previous_denominator,prior_observation_date')
    expect(activation).toBe('Northstar fictional sample,90 days,Enterprise,Activation,139,176,79.0,73.8,5.2,"May 11–Aug 8, 2026","Feb 10–May 10, 2026","Sep 8, 2026",121,164,"Jun 10, 2026"')
    expect(conversion).toContain(',96,139,69.1,66.9,2.1,')
    expect(retention).toContain(',84,96,87.5,84.0,3.5,')
    expect(adoption).toContain(',109,151,72.2,63.6,8.6,')
  })
})

describe('interpretation prompt ranking', () => {
  it('surfaces a larger decline ahead of a smaller increase', () => {
    const current = { activation: 0.7, conversion: 0.4, retention: 0.8, adoption: 0.3 }
    const previous = { activation: 0.6, conversion: 0.4, retention: 0.8, adoption: 0.5 }
    expect(largestMovement(current, previous)).toEqual({ key: 'adoption', change: expect.closeTo(-20) })
  })
})
