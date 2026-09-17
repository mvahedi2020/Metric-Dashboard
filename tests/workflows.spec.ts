import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('./#dashboard')
  await page.getByRole('button', { name: 'Reset sample' }).click()
})

test('filters coherent counts and shows exact comparison windows', async ({ page }) => {
  await page.getByLabel('Period').selectOption('90 days')
  await page.getByLabel('Segment').selectOption('Enterprise')
  await expect(page.getByText('176', { exact: true })).toBeVisible()
  await expect(page.getByText(/Current cohort: May 11–Aug 8, 2026/)).toBeVisible()
  await expect(page.getByRole('article').filter({ hasText: 'Activation' })).toContainText('79.0%')
  await expect(page.getByRole('article').filter({ hasText: 'Activation' })).toContainText('Current 139 ÷ 176')
  await expect(page.getByRole('article').filter({ hasText: 'Activation' })).toContainText('Prior 121 ÷ 164')
  await expect(page.getByRole('img', { name: /Enterprise, 90 days.*Current cohort May 11.*prior cohort Feb 10.*Activation: 79.0% current, 73.8% prior, \+5.2 pp/ })).toBeVisible()
})

test('saves an insight with scope and resets local sample state', async ({ page }) => {
  await page.getByLabel('Segment').selectOption('SMB')
  await page.getByRole('button', { name: 'Save sample prompt' }).click()
  await expect(page.getByText('SMB · 30 days · Sample prompt', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Reset sample' }).click()
  await expect(page.getByText('No insights saved yet')).toBeVisible()
  await expect(page.getByLabel('Segment')).toHaveValue('All')
})

test('returns to a saved note scope without treating it as a data snapshot', async ({ page }) => {
  const segment = page.getByRole('combobox', { name: 'Segment', exact: true })
  await segment.selectOption('SMB')
  await page.getByRole('button', { name: 'Save sample prompt' }).click()
  await segment.selectOption('Enterprise')
  await page.getByRole('button', { name: 'View saved scope' }).click()
  await expect(segment).toHaveValue('SMB')
  await expect(page.getByRole('status')).toContainText('do not contain a data snapshot')
  await page.reload()
  await expect(segment).toHaveValue('All')
  await page.getByRole('button', { name: 'View saved scope' }).click()
  await expect(segment).toHaveValue('SMB')
})

test('shows an honest empty-data state instead of a zero rate', async ({ page }) => {
  await page.getByLabel('Segment').selectOption('Early access')
  await expect(page.getByRole('alert')).toContainText('No observations for this segment')
  await expect(page.getByRole('alert')).toContainText('Rates are not shown as 0%')
  await page.getByRole('button', { name: 'View all segments' }).click()
  await expect(page.getByRole('region', { name: 'Key metrics' })).toBeVisible()
})

test('copies a stakeholder summary with the sample boundary', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByLabel('Period').selectOption('90 days')
  await page.getByLabel('Segment').selectOption('Enterprise')
  await page.getByRole('button', { name: 'Copy stakeholder summary' }).click()
  await expect(page.getByRole('status')).toContainText('Stakeholder summary copied')
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied).toContain('fictional sample counts')
  expect(copied).toContain('139 / 176; prior 121 / 164')
  expect(copied).toContain('observed Jun 10, 2026')
})

test('keeps compact controls within the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('heading', { name: 'Read the signal, then shape the story.' })).toBeVisible()
  await page.getByLabel('Segment').selectOption('SMB')
  await expect(page.getByText('240', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})


test('exports both comparison populations for the selected view', async ({ page }) => {
  await page.getByLabel('Period').selectOption('90 days')
  await page.getByLabel('Segment').selectOption('Enterprise')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export CSV' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('northstar-sample-90-days-enterprise.csv')
  const stream = await download.createReadStream()
  if (!stream) throw new Error('The CSV download was not readable')
  let csv = ''
  for await (const chunk of stream) csv += chunk.toString()
  expect(csv).toContain('previous_numerator,previous_denominator,prior_observation_date')
  expect(csv).toContain('Enterprise,Activation,139,176,79.0,73.8,5.2')
  expect(csv).toContain('121,164,"Jun 10, 2026"')
  expect(csv).toContain('Northstar fictional sample')
})

test('preserves incompatible saved notes until an explicit reset', async ({ page }) => {
  const original = '{"version":2,"insights":[{"id":"older-note","text":"Keep me"}]}'
  await page.addInitScript((raw) => localStorage.setItem('northstar.metric-dashboard.v1', raw), original)
  await page.reload()
  await expect(page.getByRole('status')).toContainText('existing browser data has been preserved')
  await page.getByRole('button', { name: 'Save sample prompt' }).click()
  await expect(page.getByRole('status').last()).toContainText('Reset the sample before saving')
  expect(await page.evaluate(() => localStorage.getItem('northstar.metric-dashboard.v1'))).toBe(original)
  await page.getByRole('button', { name: 'Reset sample' }).click()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('northstar.metric-dashboard.v1')!))).toEqual({ version: 1, insights: [] })
  await page.getByRole('button', { name: 'Save sample prompt' }).click()
  await expect(page.getByText('All · 30 days · Sample prompt', { exact: true })).toBeVisible()
})

test('separates a reviewer interpretation from the sample prompt', async ({ page }) => {
  await page.getByRole('button', { name: 'Save sample prompt' }).click()
  await page.getByLabel('Add your interpretation').fill('Check whether activation changed by segment before deciding.')
  await page.getByRole('button', { name: 'Save note' }).click()
  await expect(page.getByText('All · 30 days · Sample prompt', { exact: true })).toBeVisible()
  await expect(page.getByText('All · 30 days · My interpretation', { exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByText('All · 30 days · Sample prompt', { exact: true })).toBeVisible()
  await expect(page.getByText('All · 30 days · My interpretation', { exact: true })).toBeVisible()
})

test('states the current-filter and notebook boundary before export', async ({ page }) => {
  await page.getByLabel('Add your interpretation').fill('Check the activation denominator.')
  await page.getByRole('button', { name: 'Save note' }).click()
  await expect(page.getByText('Uses the current filters. Saved notebook text is not included.')).toBeVisible()
})

test('shows the latest notebook result after an earlier note error', async ({ page }) => {
  await page.getByLabel('Add your interpretation').fill('   ')
  await page.getByRole('button', { name: 'Save note' }).click()
  await expect(page.getByRole('status')).toContainText('Write an interpretation')
  await page.getByRole('button', { name: 'Save sample prompt' }).click()
  await expect(page.getByRole('status')).toContainText('Sample prompt saved locally')
  await page.getByRole('button', { name: 'Clear all' }).click()
  await expect(page.getByRole('status')).toContainText('All saved insights were cleared')
})
