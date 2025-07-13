# NRL Fantasy Data Updater

This directory contains scripts to automatically update your NRL Fantasy application data by fetching it directly from the official NRL Fantasy JSON API endpoints. No web scraping or selector configuration is required.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd scripts
   npm install
   ```

2. **Update all data:**
   ```bash
   npm run update:all
   ```

3. **Update specific data types:**
   ```bash
   npm run update:players
   npm run update:rounds
   npm run update:ladder
   ```

## 📋 How It Works
- The script `update-data.js` fetches the latest data directly from the NRL Fantasy JSON API endpoints (no HTML scraping).
- Data is saved to the `src/data/` directory for use in your app.
- No selector configuration or manual inspection of the NRL website is needed.

## 🤖 Automating Updates

### Option 1: Windows Task Scheduler
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger to daily at your preferred time
4. Action: Start a program
5. Program: `node`
6. Arguments: `update-data.js all`
7. Start in: `C:\path\to\your\project\scripts`

### Option 2: GitHub Actions (if using GitHub)
Create `.github/workflows/update-data.yml`:
```yaml
name: Update NRL Data
on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM UTC
  workflow_dispatch:  # Manual trigger

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: |
          cd scripts
          npm install
          node update-data.js all
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add src/data/*.json
          git commit -m "Auto-update NRL data" || exit 0
          git push
```

## 📊 Data Structure
The scripts will update these files in `src/data/`:
- `players.json` - Player information and stats
- `rounds.json` - Round schedules and status
- `ladder.json` - Team ladder positions
- `squads.json` - Team squad information
- `CurrentRoundStats.json` - Current round statistics

## 🔒 Legal Considerations
- Respect the NRL Fantasy website's robots.txt and terms of service
- Don't overload their servers with too many requests
- Consider adding delays between requests if automating

## 🛠️ Customization
If you need to fetch additional data types, add a new method to `update-data.js` that fetches the relevant JSON endpoint and saves it to `src/data/`.

## 📞 Support
If you encounter issues:
1. Check your internet connection
2. Make sure the NRL Fantasy API endpoints are still accessible
3. If the API changes, update the URLs in `update-data.js` 