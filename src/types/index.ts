export interface MyPlayer {
  id: string;
  name: string;
  team: string;
  position: string[];
  secondaryPosition?: string[];
  price: number;
  lastScore: number;
  averageScore: number;
  selectedRound: number;
  selectedForOrigin: boolean;
  status: 'Playing' | 'Bye' | 'ORIGIN';
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isEmergency?: boolean;
}

export interface Round {
  number: number;
  name: string;
  startDate: string;
  endDate: string;
  isLive: boolean;
  isCompleted: boolean;
  matches: Match[];
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  kickoffTime: string;
  isCompleted: boolean;
  homeScore?: number;
  awayScore?: number;
}

export interface TeamStats {
  totalValue: number;
  projectedScore: number;
  rank: number;
  totalPoints: number;
  roundScore: number;
}

export interface PositionCount {
  position: string;
  primary: number;
  secondary: number;
  totalPrimary?: number;
  totalSecondary?: number;
  required: number;
  status: 'complete' | 'incomplete';
}