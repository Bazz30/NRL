const puppeteer = require('puppeteer');
const path = require('path');

const urls = [
  { url: 'https://fantasy.nrl.com/data/nrl/players.json', name: 'players' },
  { url: 'https://fantasy.nrl.com/data/nrl/rounds.json?_=1752380214882', name: 'rounds' },
  { url: 'https://fantasy.nrl.com/data/nrl/ladder.json', name: 'ladder' }
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const { url, name } of urls) {
    console.log(`Visiting ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const screenshotPath = path.join(__dirname, `debug-${name}-api.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);
  }

  await browser.close();
  console.log('All screenshots complete!');
})(); 