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
})

test('saves an insight with scope and resets local sample state', async ({ page }) => {
  await page.getByLabel('Segment').selectOption('SMB')
  await page.getByRole('button', { name: 'Save this insight' }).click()
  await expect(page.getByText('SMB · 30 days', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Reset sample' }).click()
  await expect(page.getByText('No insights saved yet')).toBeVisible()
  await expect(page.getByLabel('Segment')).toHaveValue('All')
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
  await page.getByRole('button', { name: 'Copy stakeholder summary' }).click()
  await expect(page.getByRole('status')).toContainText('Stakeholder summary copied')
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied).toContain('fictional sample counts')
})
