const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class NRLDataUpdater {
  constructor() {
    this.dataDir = path.join(__dirname, '../src/data');
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log('🚀 Starting NRL data updater...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Set user agent to avoid detection
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async updatePlayers() {
    console.log('📊 Updating players data...');
    
    try {
      // Initialize browser if not already done
      if (!this.browser || !this.page) {
        await this.init();
      }
      
      // Navigate to NRL Fantasy website
      await this.page.goto('https://fantasy.nrl.com/data/nrl/players.json', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Get the JSON response directly
      const response = await this.page.evaluate(() => {
        return document.body.textContent;
      });

      // Parse the JSON data
      const playersData = JSON.parse(response);

      // Save to file
      const filePath = path.join(this.dataDir, 'players.json');
      await fs.writeFile(filePath, JSON.stringify(playersData, null, 2));
      console.log(`✅ Players data updated: ${playersData.length} players`);
      
    } catch (error) {
      console.error('❌ Error updating players:', error);
    }
  }

  async updateRounds() {
    console.log('📅 Updating rounds data...');
    
    try {
      // Initialize browser if not already done
      if (!this.browser || !this.page) {
        await this.init();
      }
      
      await this.page.goto('https://fantasy.nrl.com/data/nrl/rounds.json?_=1752380214882', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const response = await this.page.evaluate(() => {
        return document.body.textContent;
      });

      const roundsData = JSON.parse(response);

      const filePath = path.join(this.dataDir, 'rounds.json');
      await fs.writeFile(filePath, JSON.stringify(roundsData, null, 2));
      console.log(`✅ Rounds data updated: ${roundsData.length} rounds`);
      
    } catch (error) {
      console.error('❌ Error updating rounds:', error);
    }
  }

  async updateLadder() {
    console.log('🏆 Updating ladder data...');
    
    try {
      // Initialize browser if not already done
      if (!this.browser || !this.page) {
        await this.init();
      }
      
      await this.page.goto('https://fantasy.nrl.com/data/nrl/ladder.json', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      const response = await this.page.evaluate(() => {
        return document.body.textContent;
      });

      const ladderData = JSON.parse(response);

      const filePath = path.join(this.dataDir, 'ladder.json');
      await fs.writeFile(filePath, JSON.stringify(ladderData, null, 2));
      console.log(`✅ Ladder data updated: ${ladderData.length} teams`);
      
    } catch (error) {
      console.error('❌ Error updating ladder:', error);
    }
  }

  async updateAll() {
    try {
      await this.init();
      await this.updatePlayers();
      await this.updateRounds();
      await this.updateLadder();
      console.log('🎉 All data updated successfully!');
    } catch (error) {
      console.error('❌ Error during update:', error);
    } finally {
      await this.close();
    }
  }
}

// CLI usage
if (require.main === module) {
  const updater = new NRLDataUpdater();
  
  const command = process.argv[2];
  
  const runUpdate = async () => {
    try {
      switch (command) {
        case 'players':
          await updater.updatePlayers();
          break;
        case 'rounds':
          await updater.updateRounds();
          break;
        case 'ladder':
          await updater.updateLadder();
          break;
        case 'all':
        default:
          await updater.updateAll();
          break;
      }
    } catch (error) {
      console.error('❌ Error running update:', error);
    } finally {
      await updater.close();
    }
  };
  
  runUpdate();
}

module.exports = NRLDataUpdater; 