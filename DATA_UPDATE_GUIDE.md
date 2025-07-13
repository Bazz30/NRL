# NRL Fantasy Data Update Guide

## 🎯 Problem Solved
No more manual copying and pasting from the NRL Fantasy website! I've created several automated solutions to keep your data fresh.

## 🚀 Quick Start (Choose Your Method)

### Method 1: Basic Web Scraping
```bash
npm run update-data:scrape
```

### Method 2: Advanced Scraping (Recommended)
```bash
npm run update-data:advanced
```

### Method 3: Windows Batch File
Double-click `scripts/update-data.bat`

## 📁 What I Created

### 1. **Basic Scraper** (`scripts/update-data.js`)
- Uses Puppeteer to scrape the NRL Fantasy website
- Configurable selectors for different page structures
- Good starting point for data extraction

### 2. **Advanced Scraper** (`scripts/advanced-scraper.js`)
- Most intelligent scraping approach
- Automatically adapts to different website structures
- Handles multiple selector patterns
- Best for websites that change frequently

### 3. **Windows Batch Script** (`scripts/update-data.bat`)
- One-click solution for Windows users
- Installs dependencies automatically
- Runs the basic scraper

### 4. **Package Configuration**
- Added npm scripts to your main `package.json`
- Easy to run from project root
- Automatic dependency installation

## 🔧 Setup Instructions

### Step 1: Install Dependencies
```bash
cd scripts
npm install
```

### Step 2: Test the Scripts
```bash
# Try basic scraping first
npm run update-data:scrape

# If that doesn't work, try advanced scraping
npm run update-data:advanced
```

### Step 3: Configure Selectors (if needed)
If the scraping methods don't work, you'll need to inspect the NRL Fantasy website and update the selectors in the scraping scripts.

## 🤖 Automation Options

### Option 1: Manual Updates
Run whenever you need fresh data:
```bash
npm run update-data:scrape
```

### Option 2: Scheduled Updates (Windows)
1. Open Task Scheduler
2. Create Basic Task
3. Set to run daily at 6 AM
4. Program: `node`
5. Arguments: `update-data.js all`
6. Start in: `C:\path\to\your\project\scripts`

### Option 3: GitHub Actions (if using GitHub)
I've included a GitHub Actions workflow in the README that will automatically update your data daily and commit the changes.

## 🔍 Troubleshooting

### "Could not fetch data" Error
- The NRL website may have changed their structure
- Try the advanced scraper: `npm run update-data:advanced`
- Check if the website requires authentication
- Update the selectors in the scraping scripts

### "Puppeteer timeout" Error
- Increase timeout values in the scripts
- Check your internet connection
- Try running with `--no-sandbox` flag

### "Selector not found" Error
- The website structure has changed
- Use browser dev tools to find new selectors
- Update the selectors in the scraping scripts

## 📊 What Gets Updated

The scripts will update these files in `src/data/`:
- `players.json` - Player information and stats
- `rounds.json` - Round schedules and status  
- `ladder.json` - Team ladder positions
- `squads.json` - Team squad information
- `CurrentRoundStats.json` - Current round statistics

## 🎯 Recommended Workflow

1. **Start with basic scraper**: `npm run update-data:scrape`
2. **If that fails, try advanced scraper**: `npm run update-data:advanced`
3. **Set up automation** using Windows Task Scheduler or GitHub Actions
4. **Monitor the results** and adjust selectors if needed

## 🔒 Legal Considerations

- Respect the NRL Fantasy website's robots.txt
- Don't overload their servers with too many requests
- Consider adding delays between requests
- Check their terms of service regarding data scraping

## 🛠️ Customization

### Adding New Data Types
1. Create a new method in the updater class
2. Add the corresponding API endpoint or scraping logic
3. Update the CLI argument handling
4. Add to the `updateAll()` method

### Modifying Data Format
The scripts save data in the same format as your existing JSON files. If you need to transform the data, modify the `saveData()` method or add transformation logic before saving.

## 📞 Next Steps

1. **Test the scripts** with your current data
2. **Set up automation** for daily updates
3. **Monitor the results** and adjust selectors as needed
4. **Customize the scraping logic** for your specific needs

## 🎉 Benefits

- ✅ **No more manual copying and pasting**
- ✅ **Automated daily updates**
- ✅ **Multiple fallback methods**
- ✅ **Easy to customize and extend**
- ✅ **Cross-platform compatibility**
- ✅ **Error handling and logging**

Your NRL Fantasy application will now stay up-to-date automatically! 🏉 