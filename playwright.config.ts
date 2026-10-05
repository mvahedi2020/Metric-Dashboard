import { defineConfig, devices } from '@playwright/test'

const capture = process.env.CAPTURE_MEDIA === '1'

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:42771/Metric-Dashboard/',
    trace: 'retain-on-failure',
    screenshot: capture ? 'on' : 'only-on-failure',
    video: capture ? 'on' : 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'chrome' } }],
  webServer: { command: 'npm run build && npx vite preview --host 127.0.0.1 --port 42771 --strictPort', url: 'http://127.0.0.1:42771/Metric-Dashboard/', reuseExistingServer: false},
})
