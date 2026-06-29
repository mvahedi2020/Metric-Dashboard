<div align="center">
  <h1>VantageMetrics</h1>
  <p><strong>Agile Performance Dashboard for Engineering Leaders</strong></p>
  <a href="https://vantage-metrics.vercel.app"><b>🌍 View Live Demo</b></a> • 
  <a href="#features">Features</a> • 
  <a href="#tech-stack">Tech Stack</a>
</div>

<br />

## 📖 Overview
VantageMetrics is a high-level operational command center designed for Product Managers and Engineering Leaders. It aggregates data to track sprint velocity, bug burn-down trajectories, and team capacity in real-time. The goal is to move away from fragmented reporting across Jira and GitHub into a single unified view.

> **💡 Guest Access Available:** You can view the live demo immediately without any configuration. Simply click the Live Demo link above and select **"Sign in as Guest (Demo)"**.

## ✨ Features
- **Sprint Command Center:** High-contrast, real-time metrics on team efficiency and velocity.
- **Burndown Trajectory:** Interactive `recharts` data visualization predicting delivery confidence.
- **Developer Capacity Heatmap:** Visually identifies overloaded team members instantly.
- **Automated Insights Feed:** Custom algorithm scans active metrics to generate actionable alerts.
- **Executive Export:** Native one-click CSV export functionality for reporting.
- **Micro-Animations:** Seamless `framer-motion` staggered loading and physics-based interactions.
- **Secure Authentication:** Built-in OAuth2 integration via GitHub and Auth.js (NextAuth).

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS & Lucide React Icons
- **Authentication:** Auth.js (NextAuth) with GitHub & Credentials Providers
- **Deployment:** Vercel

---

## 💻 Local Development

If you'd like to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mvahedi2020/Metric-Dashboard.git
   cd Metric-Dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   If you want to test the full GitHub integration, copy the example environment file and add your credentials. Otherwise, the Guest login works out of the box!
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Updates (20260628_172025)
- Introduced custom hooks for local state and debouncing.
- Established baseline Error Boundary component.
- Centralized shared types and utilities.
