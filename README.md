# VantageMetrics: Agile Performance Dashboard

VantageMetrics is a high-level operational dashboard designed for Product Managers and Engineering Leaders to track sprint velocity, bug burn-down, and team capacity in real-time.

## Product Vision
The goal of this project is to move away from fragmented, multi-tool reporting (Jira, GitHub, Slack) and create a single, unified "Command Center" for sprint health.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional for Guests):**
   If you just want to preview the dashboard, you do NOT need to set up environment variables. Just run the app and click "Sign in as Guest (Demo)". 
   
   *If you want to test the full GitHub integration:*
   ```bash
   cp .env.example .env.local
   # Then add your GitHub OAuth Client ID and Secret to .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the Dashboard:**
   Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)
   Click **"Sign in as Guest (Demo)"** to instantly access the dashboard without needing any OAuth configuration!

## Features
- **Sprint Command Center:** Real-time metrics on team efficiency.
- **Burndown Trajectory:** Visual forecasting to predict delivery confidence.
- **Automated Reporting:** (Coming soon) Export weekly sprint health directly to PDF/CSV.

## PM Documentation
All product requirement documents (PRDs) and roadmaps can be found in the `/docs` folder of this repository.
