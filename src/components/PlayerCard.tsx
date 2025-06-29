import React from 'react';
import { Player } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onSelect?: (player: Player) => void;
  isSelectable?: boolean;
  showForm?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  onSelect, 
  isSelectable = false,
  showForm = true 
}) => {
  const formatPrice = (price: number) => {
    return `$${(price / 1000).toFixed(0)}k`;
  };

  const getFormTrend = () => {
    if (player.form.length < 2) return 'stable';
    const recent = player.form.slice(-2);
    if (recent[1] > recent[0]) return 'up';
    if (recent[1] < recent[0]) return 'down';
    return 'stable';
  };

  const trend = getFormTrend();
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 border-2 transition-all duration-200 ${
        player.isSelected 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 hover:border-blue-300'
      } ${isSelectable ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={() => isSelectable && onSelect?.(player)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{player.name}</h3>
          <p className="text-sm text-gray-600">{player.team}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
            {player.position}
          </span>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-gray-900">{formatPrice(player.price)}</p>
          <p className="text-sm text-gray-600">{player.averagePoints.toFixed(1)} avg</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {player.points} pts
          </span>
          {showForm && (
            <div className="flex items-center space-x-1">
              <TrendIcon 
                className={`w-4 h-4 ${
                  trend === 'up' ? 'text-green-500' : 
                  trend === 'down' ? 'text-red-500' : 'text-gray-400'
                }`} 
              />
              <div className="flex space-x-1">
                {player.form.slice(-3).map((score, index) => (
                  <div
                    key={index}
                    className={`w-2 h-6 rounded-sm ${
                      score >= 50 ? 'bg-green-400' :
                      score >= 35 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    title={`${score} points`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {player.isSelected && (
          <span className="text-green-600 font-medium text-sm">Selected</span>
        )}
      </div>
    </div>
  );
};