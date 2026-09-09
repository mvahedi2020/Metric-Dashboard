import { describe, expect, it } from 'vitest'
import { aggregate, calculate, changePoints, csvFor, periodWindows, stakeholderSummary } from './metrics'

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
    expect(stakeholderSummary('30 days', 'SMB', calculate(data.current), calculate(data.previous))).toContain('fictional sample counts')
  })

  it('handles an empty segment and exposes exact cohort windows', () => {
    expect(() => aggregate('30 days', 'Early access')).toThrow('No sample data matches this filter.')
    expect(periodWindows['30 days'].observed).toBe('Sep 8, 2026')
    expect(periodWindows['30 days'].cohort).toBe('Jul 10–Aug 8, 2026')
  })
})
