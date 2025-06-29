import React, { useState, useMemo } from 'react';
import { Player } from '../types';
import { PlayerCard } from './PlayerCard';
import { Users as users, DollarSign, Star } from 'lucide-react';

interface TeamBuilderProps {
  players: Player[];
  selectedPlayers: Player[];
  onPlayerSelect: (player: Player) => void;
  budget: number;
}

export const TeamBuilder: React.FC<TeamBuilderProps> = ({
  players,
  selectedPlayers,
  onPlayerSelect,
  budget
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('points');

  const positions = ['All', 'Fullback', 'Winger', 'Centre', 'Five-eighth', 'Halfback', 'Lock', 'Second-row', 'Prop', 'Hooker'];

  const filteredPlayers = useMemo(() => {
    let filtered = players.filter(player => 
      selectedPosition === 'All' || player.position === selectedPosition
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.points - a.points;
        case 'average':
          return b.averagePoints - a.averagePoints;
        case 'price':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [players, selectedPosition, sortBy]);

  const totalSpent = selectedPlayers.reduce((sum, player) => sum + player.price, 0);
  const remainingBudget = budget - totalSpent;

  return (
    <div className="space-y-6">
      {/* Budget Display */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Budget</h2>
              <p className="text-green-100">Manage your salary cap</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">${(remainingBudget / 1000000).toFixed(2)}M</p>
            <p className="text-green-100">Remaining</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Spent: ${(totalSpent / 1000000).toFixed(2)}M</span>
            <span>Budget: ${(budget / 1000000).toFixed(2)}M</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(totalSpent / budget) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Team Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Your Team ({selectedPlayers.length}/17)</h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <Star className="w-5 h-5" />
            <span>{selectedPlayers.reduce((sum, p) => sum + p.points, 0)} total points</span>
          </div>
        </div>
        
        {selectedPlayers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No players selected yet. Start building your team!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPlayers.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onSelect={onPlayerSelect}
                isSelectable={true}
                showForm={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="points">Total Points</option>
              <option value="average">Average Points</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Players */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Available Players</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              onSelect={onPlayerSelect}
              isSelectable={!player.isSelected && remainingBudget >= player.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};