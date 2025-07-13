import { MyPlayer, Round, TeamStats } from '../types';
import React from 'react';
import roundsData from '../data/rounds.json'; // Import the rounds data

// Function to get current round (you can adjust this logic as needed)
export const getCurrentRound = (): number => {
  try {
    const now = new Date();
    const currentTime = now.getTime();
    
    // Find the current round based on date ranges
    for (const round of roundsData) {
      const startDate = new Date(round.start);
      const endDate = new Date(round.end);
      
      // Check if current time falls within this round's date range
      if (currentTime >= startDate.getTime() && currentTime <= endDate.getTime()) {
        return round.id;
      }
    }
    
    // If no current round found, find the next upcoming round
    for (const round of roundsData) {
      const startDate = new Date(round.start);
      if (currentTime < startDate.getTime()) {
        return round.id;
      }
    }
    
    // Fallback to the last round if we're past all rounds
    return roundsData[roundsData.length - 1]?.id || 19;
  } catch (error) {
    console.error('Error calculating current round:', error);
    // Fallback to round 19 if there's an error
    return 19;
  }
};

// Bye rounds data
const byeRounds = {
  5: ['Warriors'],
  6: ['Bulldogs'],
  7: ['Cowboys'],
  8: ['Eels'],
  9: ['Manly'],
  10: ['Roosters'],
  11: ['Panthers'],
  12: ['Cowboys', 'Storm', 'Dragons', 'Titans', 'Rabbitohs', 'Tigers', 'Broncos'],
  13: ['Sharks','Bulldogs', 'Dolphins'],
  14: ['Roosters'],
  15: ['Warriors', 'Storm', 'Raiders', 'Tigers', 'Eels', 'Broncos', 'Panthers'],
  16: ['Manly', 'Dragons', 'Bulldogs'],
  17: ['Roosters'],
  18: ['Warriors', 'Knights', 'Titans', 'Sharks', 'Eels', 'Dolphins', 'Panthers'],
  19: ['Manly','Raiders','Rabbitohs'],
  20: ['Broncos'],
  21: ['Dolphins'],
  22: ['Knights'],
  23: ['Tigers'],
  24: ['Raiders'],
  25: ['Sharks'],
  26: ['Rabbitohs'],
  27: ['Cowboys']
};

// Function to determine player status based on current round
const getPlayerStatus = (team: string, selectedForOrigin: boolean): 'Playing' | 'Bye' | 'ORIGIN' => {
  const currentRound = getCurrentRound();
  
  // Check if player is selected for Origin first (highest priority)
  if (selectedForOrigin) {
    return 'ORIGIN';
  }
  
  // Check if team has a bye in current round
  const teamsOnBye = byeRounds[currentRound as keyof typeof byeRounds] || [];
  if (teamsOnBye.includes(team)) {
    return 'Bye';
  }
  
  // Default to Playing
  return 'Playing';
};

export const myTeam: MyPlayer[] = [
  {
    id: '1',
    name: 'Erin Clark',
    team: 'Warriors',
    position: ['HOK'],
    secondaryPosition: ['MID'],
    price: 787000,
    lastScore: 57,
    averageScore: 58,
    selectedRound: 17,
    selectedForOrigin: false,
    status: getPlayerStatus('Warriors', false)
  },
  {
    id: '2',
    name: 'Lyhkan King-Togia',
    team: 'Dragons',
    position: ['HLF'],
    secondaryPosition: [],
    price: 344000,
    lastScore: 43,
    averageScore: 28.5,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Dragons', false)
  },
  {
    id: '3',
    name: 'Connor Tracey',
    team: 'Bulldogs',
    position: ['WFB'],
    secondaryPosition: [],
    price: 507000,
    lastScore: 68,
    averageScore: 41.6,
    selectedRound: 18,
    selectedForOrigin: false,
    status: getPlayerStatus('Bulldogs', false)
  },
  {
    id: '4',
    name: 'Payne Haas',
    team: 'Broncos',
    position: ['MID'],
    secondaryPosition: [],
    price: 890000,
    lastScore: 49,
    averageScore: 43.1,
    selectedRound: 15,
    selectedForOrigin: true,
    status: getPlayerStatus('Broncos', true)
  },
  {
    id: '5',
    name: 'Tyrell May',
    team: 'Tigers',
    position: ['MID'],
    secondaryPosition: [],
    price: 981000,
    lastScore: 152,
    averageScore: 32.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Tigers', false),
    isCaptain: true
  },
  {
    id: '7',
    name: 'Reuben Garrick',
    team: 'Manly',
    position: ['CTR'],
    secondaryPosition: ['WFB'],
    price: 575000,
    lastScore: 48,
    averageScore: 41.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Manly', false)
  },
  {
    id: '8',
    name: 'Adam Reynolds',
    team: 'Broncos',
    position: ['HLF'],
    secondaryPosition: [],
    price: 656000,
    lastScore: 53,
    averageScore: 45.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Broncos', false)
  },
  {
    id: '9',
    name: 'Nathan Cleary',
    team: 'Panthers',
    position: ['HLF'],
    secondaryPosition: [],
    price: 820000,
    lastScore: 79,
    averageScore: 54.1,
    selectedRound: 15,
    selectedForOrigin: true,
    status: getPlayerStatus('Panthers', true)
  },
  {
    id: '10',
    name: 'Dylan Lucas',
    team: 'Knights',
    position: ['CTR'],
    secondaryPosition: ['EDG'],
    price: 722000,
    lastScore: 45,
    averageScore: 25.4,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Knights', false)
  },
  {
    id: '11',
    name: 'Eliesa Katoa',
    team: 'Storm',
    position: ['EDG'],
    secondaryPosition: [],
    price: 695000,
    lastScore: 66,
    averageScore: 54.7,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Storm', false)
  },
  {
    id: '12',
    name: 'Latu Fainu',
    team: 'Tigers',
    position: ['HLF'],
    secondaryPosition: [],
    price: 298000,
    lastScore: 35,
    averageScore: 16.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Tigers', false)
  },
  {
    id: '14',
    name: 'Jahrome Hughes',
    team: 'Storm',
    position: ['HLF'],
    secondaryPosition: [],
    price: 641000,
    lastScore: 80,
    averageScore: 46.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Storm', false)
  },
  {
    id: '15',
    name: 'Scott Drinkwater',
    team: 'Cowboys',
    position: ['WFB'],
    secondaryPosition: [],
    price: 549000,
    lastScore: 48,
    averageScore: 39.6,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Cowboys', false)
  },
  {
    id: '16',
    name: 'Herbie Farnworth',
    team: 'Dolphins',
    position: ['CTR'],
    secondaryPosition: [],
    price: 839000,
    lastScore: 66,
    averageScore: 32.4,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Dolphins', false)
  },
  {
    id: '17',
    name: 'Naufahu Whyte',
    team: 'Roosters',
    position: ['MID'],
    secondaryPosition: ['EDG'],
    price: 582000,
    lastScore: 25,
    averageScore: 21.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Roosters', false)
  },
  {
    id: '18',
    name: 'Damien Cook',
    team: 'Dragons',
    position: ['HOK'],
    secondaryPosition: [],
    price: 619000,
    lastScore: 50,
    averageScore: 38.9,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Dragons', false)
  },
  {
    id: '19',
    name: 'Reece Walsh',
    team: 'Broncos',
    position: ['WFB'],
    secondaryPosition: [],
    price: 497000,
    lastScore: 45,
    averageScore: 52.3,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Broncos', false)
  },
  {
    id: '20',
    name: 'Salesi Foketi',
    team: 'Roosters',
    position: ['EDG','MID'],
    secondaryPosition: [],
    price: 552000,
    lastScore: 42,
    averageScore: 26.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Rabbitohs', false)
  },
  {
    id: '21',
    name: 'Tolutau Koula',
    team: 'Manly',
    position: ['WFB'],
    secondaryPosition: ['CTR'],
    price: 516000,
    lastScore: 32,
    averageScore: 35.6,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Manly', false)
  },
  {
    id: '22',
    name: 'Jayden Brailey',
    team: 'Knights',
    position: ['HOK'],
    secondaryPosition: [],
    price: 375000,
    lastScore: 58,
    averageScore: 35.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Knights', false)
  },
  {
    id: '23',
    name: 'Keaon Koloamatangi',
    team: 'Rabbitohs',
    position: ['MID'],
    secondaryPosition: ['EDG'],
    price: 842000,
    lastScore: 37,
    averageScore: 42.1,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Rabbitohs', false)
  }
];

export const currentRound: Round = {
  number: getCurrentRound(),
  name: `Round ${getCurrentRound()}`,
  startDate: '2024-07-07',
  endDate: '2024-07-14',
  isLive: false,
  isCompleted: false,
  matches: [
    {
      id: '1',
      homeTeam: 'Broncos',
      awayTeam: 'Storm',
      venue: 'Suncorp Stadium',
      kickoffTime: '2024-07-05T19:50:00',
      isCompleted: false
    },
    {
      id: '2',
      homeTeam: 'Panthers',
      awayTeam: 'Warriors',
      venue: 'BlueBet Stadium',
      kickoffTime: '2024-07-06T17:30:00',
      isCompleted: false
    },
    {
      id: '3',
      homeTeam: 'Rabbitohs',
      awayTeam: 'Sea Eagles',
      venue: 'ANZ Stadium',
      kickoffTime: '2024-07-06T19:35:00',
      isCompleted: false
    },
    {
      id: '4',
      homeTeam: 'Raiders',
      awayTeam: 'Bulldogs',
      venue: 'GIO Stadium',
      kickoffTime: '2024-07-07T14:00:00',
      isCompleted: false
    }
  ]
};

export const teamStats: TeamStats = {
  totalValue: 12200000,
  projectedScore: 680,
  rank: 15847,
  totalPoints: 12456,
  roundScore: 0
};