import React, { useState } from 'react';
import { Player } from '../types';
import { PlayerCard } from './PlayerCard';
import { Search, Filter } from 'lucide-react';

interface PlayerStatsProps {
  players: Player[];
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ players }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');

  const teams = ['All', ...Array.from(new Set(players.map(p => p.team))).sort()];
  const positions = ['All', 'Fullback', 'Winger', 'Centre', 'Five-eighth', 'Halfback', 'Lock', 'Second-row', 'Prop', 'Hooker'];

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'All' || player.team === selectedTeam;
    const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
    
    return matchesSearch && matchesTeam && matchesPosition;
  });

  const topScorers = [...players].sort((a, b) => b.points - a.points).slice(0, 5);
  const topAverages = [...players].sort((a, b) => b.averagePoints - a.averagePoints).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Players</h3>
          <p className="text-3xl font-bold">{players.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Highest Scorer</h3>
          <p className="text-2xl font-bold">{topScorers[0]?.name}</p>
          <p className="text-green-100">{topScorers[0]?.points} points</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Best Average</h3>
          <p className="text-2xl font-bold">{topAverages[0]?.name}</p>
          <p className="text-orange-100">{topAverages[0]?.averagePoints.toFixed(1)} avg</p>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Scorers</h3>
          <div className="space-y-3">
            {topScorers.map((player, index) => (
              <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">{player.name}</p>
                  <p className="text-sm text-gray-600">{player.team} • {player.position}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{player.points}</p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Best Averages</h3>
          <div className="space-y-3">
            {topAverages.map((player, index) => (
              <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">{player.name}</p>
                  <p className="text-sm text-gray-600">{player.team} • {player.position}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{player.averagePoints.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">avg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
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
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};