// Debug script to test round calculation
const fs = require('fs');
const path = require('path');

// Read the rounds data
const roundsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/rounds.json'), 'utf8'));

// Function to get current round (same as in myTeam.ts)
const getCurrentRound = () => {
  try {
    const now = new Date();
    const currentTime = now.getTime();
    
    console.log('Current time:', now.toISOString());
    console.log('Current time (local):', now.toString());
    
    // Find the current round based on date ranges
    for (const round of roundsData) {
      const startDate = new Date(round.start);
      const endDate = new Date(round.end);
      
      console.log(`\nRound ${round.id}:`);
      console.log(`  Start: ${round.start} -> ${startDate.toISOString()}`);
      console.log(`  End: ${round.end} -> ${endDate.toISOString()}`);
      console.log(`  Current time: ${currentTime}`);
      console.log(`  Start time: ${startDate.getTime()}`);
      console.log(`  End time: ${endDate.getTime()}`);
      console.log(`  Is current: ${currentTime >= startDate.getTime() && currentTime <= endDate.getTime()}`);
      
      // Check if current time falls within this round's date range
      if (currentTime >= startDate.getTime() && currentTime <= endDate.getTime()) {
        console.log(`  *** FOUND CURRENT ROUND: ${round.id} ***`);
        return round.id;
      }
    }
    
    // If no current round found, find the next upcoming round
    for (const round of roundsData) {
      const startDate = new Date(round.start);
      if (currentTime < startDate.getTime()) {
        console.log(`  *** FOUND NEXT ROUND: ${round.id} ***`);
        return round.id;
      }
    }
    
    // Fallback to the last round if we're past all rounds
    const lastRound = roundsData[roundsData.length - 1]?.id || 19;
    console.log(`  *** FALLBACK TO LAST ROUND: ${lastRound} ***`);
    return lastRound;
  } catch (error) {
    console.error('Error calculating current round:', error);
    // Fallback to round 19 if there's an error
    return 19;
  }
};

console.log('Testing round calculation...\n');
const currentRound = getCurrentRound();
console.log(`\nFinal result: Round ${currentRound}`); 