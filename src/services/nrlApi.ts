import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface NRLPlayer {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  squadId: number;
  cost: number;
  status: string;
  prices: Record<string, number>;
  team: string;
  currentRoundStats?: any;
  fantasyPoints?: number;
}

export interface NRLRound {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface NRLLadderEntry {
  team_id: number;
  team_name: string;
  position: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  points_for: number;
  points_against: number;
}

export interface PlayerStats {
  T?: number;    // Try
  TS?: number;   // Try Save
  G?: number;    // Goal
  FG?: number;   // Field Goal
  TA?: number;   // Try Assist
  LB?: number;   // Line Break
  LBA?: number;  // Line Break Assist
  TCK?: number;  // Tackle
  TB?: number;   // Tackle Break
  MT?: number;   // Missed Tackle
  OFH?: number;  // Offload
  OFG?: number;  // Offload Forced
  ER?: number;   // Error
  FTF?: number;  // Forced Touch Find
  MG?: number;   // Metres Gained
  KM?: number;   // Kick Metres
  KD?: number;   // Kick Drop Outs
  PC?: number;   // Penalty Conceded
  SB?: number;   // Sin Bin
  SO?: number;   // Send Off
  TOG?: number;  // Time on Ground
  FDO?: number;  // Forced Drop Out
  TO?: number;   // Turn Over
  SAI?: number;  // Set Attack Involvement
  EFIG?: number; // Effective First Involvement Goal
}

class NRLFantasyAPI {
  // Get all players
  async getPlayers(): Promise<NRLPlayer[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/players`);
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  }

  // Get rounds data
  async getRounds(): Promise<NRLRound[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/rounds`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rounds:', error);
      throw error;
    }
  }

  // Get ladder data
  async getLadder(): Promise<NRLLadderEntry[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/ladder`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ladder:', error);
      throw error;
    }
  }

  // Get stats for a specific round
  async getStats(round: number): Promise<Record<string, PlayerStats>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/${round}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching stats for round ${round}:`, error);
      throw error;
    }
  }

  // Get players with stats for a specific round
  async getPlayersWithStats(round: number): Promise<NRLPlayer[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/players-with-stats/${round}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching players with stats for round ${round}:`, error);
      throw error;
    }
  }

  // Get lineup advice
  async getLineupAdvice(teamData: any): Promise<string> {
    try {
      const response = await axios.post(`${API_BASE_URL}/lineup-advice`, {
        teamData
      });
      return response.data.advice;
    } catch (error) {
      console.error('Error getting lineup advice:', error);
      throw error;
    }
  }

  // Helper method to find player by name
  async findPlayerByName(name: string): Promise<NRLPlayer | null> {
    try {
      const players = await this.getPlayers();
      const player = players.find(p => 
        p.name.toLowerCase().includes(name.toLowerCase()) ||
        p.firstName.toLowerCase().includes(name.toLowerCase()) ||
        p.lastName.toLowerCase().includes(name.toLowerCase())
      );
      return player || null;
    } catch (error) {
      console.error('Error finding player:', error);
      return null;
    }
  }

  // Helper method to get players by team
  async getPlayersByTeam(teamName: string): Promise<NRLPlayer[]> {
    try {
      const players = await this.getPlayers();
      return players.filter(p => p.team === teamName);
    } catch (error) {
      console.error('Error getting players by team:', error);
      return [];
    }
  }

  // Helper method to get current round
  async getCurrentRound(): Promise<number> {
    try {
      const rounds = await this.getRounds();
      const currentRound = rounds.find(round => round.status === 'current');
      return currentRound ? currentRound.id : 1;
    } catch (error) {
      console.error('Error getting current round:', error);
      return 1;
    }
  }
}

export const nrlApi = new NRLFantasyAPI();
export default nrlApi; 