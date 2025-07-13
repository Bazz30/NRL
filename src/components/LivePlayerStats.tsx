import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import playersData from '../data/players.json';
import currentRoundStatsData from '../data/CurrentRoundStats.json';
import squadsData from '../data/squads.json';
import { getCurrentRound } from '../data/myTeam';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  squad_id: number;
  cost: number;
  status: string;
  stats: {
    scores: Record<string, number>;
    avg_points: number;
    total_points: number;
    games_played: number;
  };
  positions: number[];
}

interface RoundStats {
  T: number;
  TS: number;
  G: number;
  FG: number;
  TA: number;
  LB: number;
  LBA: number;
  TCK: number;
  TB: number;
  MT: number;
  OFH: number;
  OFG: number;
  ER: number;
  FTF: number;
  MG: number;
  KM: number;
  KD: number;
  PC: number;
  SB: number;
  SO: number;
  TOG: number;
  FDO: number;
  TO: number;
  SAI: number;
  EFIG: number;
}

interface Squad {
  id: number;
  name: string;
  full_name: string;
}

export const LivePlayerStats: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedRound, setSelectedRound] = useState<number>(getCurrentRound());
  const [sortBy, setSortBy] = useState<'cost' | 'fantasyPoints' | 'name' | 'avgPoints'>('fantasyPoints');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Create squad ID to name mapping
  const squadMap = new Map<number, string>();
  squadsData.forEach((squad: Squad) => {
    squadMap.set(squad.id, squad.name);
  });

  // Calculate fantasy points from stats
  const calculateFantasyPoints = (stats: RoundStats): number => {
    return (
      stats.T * 4 + // Try
      stats.TS * 4 + // Try Save
      stats.G * 2 + // Goal
      stats.FG * 1 + // Field Goal
      stats.TA * 4 + // Try Assist
      stats.LB * 4 + // Line Break
      stats.LBA * 2 + // Line Break Assist
      stats.TCK * 1 + // Tackle
      stats.TB * 2 + // Tackle Break
      stats.MT * -2 + // Missed Tackle
      stats.OFH * 1 + // Offload
      stats.OFG * 1 + // Offload Forced
      stats.ER * -2 + // Error
      stats.PC * -2 + // Penalty Conceded
      stats.SB * -4 + // Sin Bin
      stats.SO * -8 + // Send Off
      stats.MG * 0.1 + // Metres Gained
      stats.KM * 0.05 + // Kick Metres
      stats.KD * 1 + // Kick Drop Outs
      stats.FDO * 1 + // Forced Drop Out
      stats.TOG * 0.1 // Time on Ground
    );
  };

  // Get unique teams from players
  const teams = ['All', ...Array.from(new Set(players.map(p => squadMap.get(p.squad_id) || 'Unknown'))).sort()];

  useEffect(() => {
    loadPlayers();
  }, [selectedRound]);

  useEffect(() => {
    filterAndSortPlayers();
  }, [players, searchTerm, selectedTeam, sortBy, sortOrder]);

  const loadPlayers = () => {
    try {
      setLoading(true);
      setError(null);
      
      // Filter players to only include those with valid data
      const validPlayers = playersData.filter((player: Player) => 
        player.first_name && 
        player.last_name && 
        player.squad_id && 
        squadMap.has(player.squad_id)
      );

      setPlayers(validPlayers);
    } catch (err) {
      setError('Failed to load player data. Please try again.');
      console.error('Error loading players:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPlayers = () => {
    let filtered = players.filter(player => {
      const playerName = `${player.first_name} ${player.last_name}`.toLowerCase();
      const teamName = squadMap.get(player.squad_id) || 'Unknown';
      
      const matchesSearch = playerName.includes(searchTerm.toLowerCase()) ||
                           teamName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === 'All' || teamName === selectedTeam;
      
      return matchesSearch && matchesTeam;
    });

    // Sort players
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'cost':
          aValue = a.cost;
          bValue = b.cost;
          break;
        case 'fantasyPoints':
          const aStats = currentRoundStatsData[a.id.toString()] as RoundStats;
          const bStats = currentRoundStatsData[b.id.toString()] as RoundStats;
          aValue = aStats ? calculateFantasyPoints(aStats) : 0;
          bValue = bStats ? calculateFantasyPoints(bStats) : 0;
          break;
        case 'avgPoints':
          aValue = a.stats.avg_points;
          bValue = b.stats.avg_points;
          break;
        case 'name':
          aValue = `${a.first_name} ${a.last_name}`;
          bValue = `${b.first_name} ${b.last_name}`;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPlayers(filtered);
  };

  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}k`;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'playing':
        return 'bg-green-100 text-green-800';
      case 'injured':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserve':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (field: 'cost' | 'fantasyPoints' | 'name' | 'avgPoints') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading player data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={loadPlayers}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Live Player Stats - Round {selectedRound}</h2>
        <button
          onClick={loadPlayers}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="flex-grow min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search players or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 27 }, (_, i) => i + 1).map(round => (
              <option key={round} value={round}>Round {round}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-gray-600">Sort by:</span>
        <button
          onClick={() => handleSort('fantasyPoints')}
          className={`px-3 py-1 rounded ${
            sortBy === 'fantasyPoints' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Fantasy Points {sortBy === 'fantasyPoints' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('avgPoints')}
          className={`px-3 py-1 rounded ${
            sortBy === 'avgPoints' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Avg Points {sortBy === 'avgPoints' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('cost')}
          className={`px-3 py-1 rounded ${
            sortBy === 'cost' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Price {sortBy === 'cost' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('name')}
          className={`px-3 py-1 rounded ${
            sortBy === 'name' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {/* Player Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map(player => {
          const playerName = `${player.first_name} ${player.last_name}`;
          const teamName = squadMap.get(player.squad_id) || 'Unknown';
          const currentStats = currentRoundStatsData[player.id.toString()] as RoundStats;
          const fantasyPoints = currentStats ? calculateFantasyPoints(currentStats) : 0;
          const roundScore = player.stats.scores[selectedRound.toString()] || 0;

          return (
            <div key={player.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{playerName}</h3>
                  <p className="text-sm text-gray-600">{teamName}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(player.status)}`}>
                  {player.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Price:</span>
                  <span className="ml-1 font-medium">{formatPrice(player.cost)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Live Points:</span>
                  <span className="ml-1 font-medium text-green-600">
                    {fantasyPoints.toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Avg Points:</span>
                  <span className="ml-1 font-medium">{player.stats.avg_points.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Round {selectedRound}:</span>
                  <span className="ml-1 font-medium">{roundScore}</span>
                </div>
              </div>

              {currentStats && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Live Stats:</h4>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div>T: {currentStats.T || 0}</div>
                    <div>TA: {currentStats.TA || 0}</div>
                    <div>LB: {currentStats.LB || 0}</div>
                    <div>TCK: {currentStats.TCK || 0}</div>
                    <div>TB: {currentStats.TB || 0}</div>
                    <div>MG: {currentStats.MG || 0}</div>
                    <div>G: {currentStats.G || 0}</div>
                    <div>ER: {currentStats.ER || 0}</div>
                    <div>TOG: {currentStats.TOG || 0}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredPlayers.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No players found matching your criteria.
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredPlayers.length} of {players.length} players
      </div>
    </div>
  );
}; 