import { MyPlayer, Round, TeamStats } from '../types';

// Function to get current round (you can adjust this logic as needed)
const getCurrentRound = (): number => {
  // For now, we'll set it to 17 as mentioned
  return 17;
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
    name: 'E.Clark',
    team: 'Warriors',
    position: ['HOK'],
    secondaryPosition: ['MID'],
    price: 787000,
    lastScore: 57,
    averageScore: 58,
    selectedRound: 17,
    selectedForOrigin: false,
    status: getPlayerStatus('Warriors', false),
    weekInTopic: 18
  },
  {
    id: '2',
    name: 'I.King-Togia',
    team: 'Dragons',
    position: ['HLF'],
    secondaryPosition: [],
    price: 344000,
    lastScore: 43,
    averageScore: 28.5,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Dragons', false),
    weekInTopic: 12
  },
  {
    id: '3',
    name: 'C.Tracey',
    team: 'Bulldogs',
    position: ['WFB'],
    secondaryPosition: [],
    price: 507000,
    lastScore: 68,
    averageScore: 41.6,
    selectedRound: 18,
    selectedForOrigin: false,
    status: getPlayerStatus('Bulldogs', false),
    weekInTopic: 8
  },
  {
    id: '4',
    name: 'P.Haas',
    team: 'Broncos',
    position: ['MID'],
    secondaryPosition: [],
    price: 890000,
    lastScore: 49,
    averageScore: 43.1,
    selectedRound: 15,
    selectedForOrigin: true,
    status: getPlayerStatus('Broncos', true),
    weekInTopic: 15
  },
  {
    id: '5',
    name: 'T.May',
    team: 'Tigers',
    position: ['MID'],
    secondaryPosition: [],
    price: 981000,
    lastScore: 152,
    averageScore: 32.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Tigers', false),
    weekInTopic: 10,
    isCaptain: true
  },
  {
    id: '7',
    name: 'R.Garrick',
    team: 'Manly',
    position: ['CTR'],
    secondaryPosition: ['WFB'],
    price: 575000,
    lastScore: 48,
    averageScore: 41.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Manly', false),
    weekInTopic: 14
  },
  {
    id: '8',
    name: 'A.Reynolds',
    team: 'Broncos',
    position: ['HLF'],
    secondaryPosition: [],
    price: 656000,
    lastScore: 53,
    averageScore: 45.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Broncos', false),
    weekInTopic: 16
  },
  {
    id: '9',
    name: 'N.Cleary',
    team: 'Panthers',
    position: ['HLF'],
    secondaryPosition: [],
    price: 820000,
    lastScore: 79,
    averageScore: 54.1,
    selectedRound: 15,
    selectedForOrigin: true,
    status: getPlayerStatus('Panthers', true),
    weekInTopic: 18
  },
  {
    id: '10',
    name: 'D.Lucas',
    team: 'Knights',
    position: ['CTR'],
    secondaryPosition: ['EDG'],
    price: 722000,
    lastScore: 45,
    averageScore: 25.4,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Knights', false),
    weekInTopic: 6
  },
  {
    id: '11',
    name: 'E.Katoa',
    team: 'Storm',
    position: ['EDG'],
    secondaryPosition: [],
    price: 695000,
    lastScore: 66,
    averageScore: 54.7,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Storm', false),
    weekInTopic: 4
  },
  {
    id: '12',
    name: 'L.Fainu',
    team: 'Tigers',
    position: ['HLF'],
    secondaryPosition: [],
    price: 298000,
    lastScore: 35,
    averageScore: 16.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Tigers', false),
    weekInTopic: 3
  },
  {
    id: '14',
    name: 'Hughes',
    team: 'Storm',
    position: ['HLF'],
    secondaryPosition: [],
    price: 641000,
    lastScore: 80,
    averageScore: 46.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Storm', false),
    weekInTopic: 15
  },
  {
    id: '15',
    name: 'S.Drinkwater',
    team: 'Cowboys',
    position: ['WFB'],
    secondaryPosition: [],
    price: 549000,
    lastScore: 48,
    averageScore: 39.6,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Cowboys', false),
    weekInTopic: 13
  },
  {
    id: '16',
    name: 'H.Farnworth',
    team: 'Dolphins',
    position: ['CTR'],
    secondaryPosition: [],
    price: 839000,
    lastScore: 66,
    averageScore: 32.4,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Dolphins', false),
    weekInTopic: 9
  },
  {
    id: '17',
    name: 'N.Whyte',
    team: 'Roosters',
    position: ['MID'],
    secondaryPosition: ['EDG'],
    price: 582000,
    lastScore: 25,
    averageScore: 21.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Roosters', false),
    weekInTopic: 5
  },
  {
    id: '18',
    name: 'D.Cook',
    team: 'Dragons',
    position: ['HOK'],
    secondaryPosition: [],
    price: 619000,
    lastScore: 50,
    averageScore: 38.9,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Dragons', false),
    weekInTopic: 14
  },
  {
    id: '19',
    name: 'R.Walsh',
    team: 'Broncos',
    position: ['WFB'],
    secondaryPosition: [],
    price: 497000,
    lastScore: 45,
    averageScore: 52.3,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Broncos', false),
    weekInTopic: 17
  },
  {
    id: '20',
    name: 'E.Aitken',
    team: 'Rabbitohs',
    position: ['EDG'],
    secondaryPosition: [],
    price: 552000,
    lastScore: 42,
    averageScore: 26.8,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Rabbitohs', false),
    weekInTopic: 7
  },
  {
    id: '21',
    name: 'T.Koula',
    team: 'Manly',
    position: ['WFB'],
    secondaryPosition: ['CTR'],
    price: 516000,
    lastScore: 32,
    averageScore: 35.6,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Manly', false),
    weekInTopic: 11
  },
  // Reserve bench players
  {
    id: '22',
    name: 'J.Brailey',
    team: 'Knights',
    position: ['HOK'],
    secondaryPosition: [],
    price: 375000,
    lastScore: 58,
    averageScore: 35.2,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Knights', false),
    weekInTopic: 8
  },
  {
    id: '23',
    name: 'K.Koloamatangi',
    team: 'Rabbitohs',
    position: ['MID'],
    secondaryPosition: ['EDG'],
    price: 842000,
    lastScore: 37,
    averageScore: 42.1,
    selectedRound: 15,
    selectedForOrigin: false,
    status: getPlayerStatus('Rabbitohs', false),
    weekInTopic: 12
  }
];

export const currentRound: Round = {
  number: 17,
  name: 'Round 17',
  startDate: '2024-07-05',
  endDate: '2024-07-07',
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