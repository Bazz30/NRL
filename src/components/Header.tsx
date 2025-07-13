import React from 'react';
import { Trophy, Users, BarChart3, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'players', label: 'Players', icon: BarChart3 },
    { id: 'leagues', label: 'Leagues', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onTabChange('team')}
          >
            <Trophy className="w-8 h-8" />
            <h1 className="text-2xl font-bold">My NRL Fantasy</h1>
          </div>
          
          <nav className="flex space-x-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};