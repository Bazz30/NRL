import React from 'react';
import { Trophy, Users, Calendar, Star } from 'lucide-react';

export const Leagues: React.FC = () => {
  const leagues = [
    {
      id: '1',
      name: 'Work League',
      participants: 12,
      position: 3,
      points: 1247,
      prize: '$500',
      status: 'active'
    },
    {
      id: '2',
      name: 'Friends & Family',
      participants: 8,
      position: 1,
      points: 1389,
      prize: 'Bragging Rights',
      status: 'active'
    },
    {
      id: '3',
      name: 'Public League #4521',
      participants: 20,
      position: 7,
      points: 1156,
      prize: '$1000',
      status: 'active'
    }
  ];

  const upcomingMatches = [
    {
      id: '1',
      homeTeam: 'Brisbane Broncos',
      awayTeam: 'Melbourne Storm',
      time: 'Friday 7:50 PM',
      venue: 'Suncorp Stadium'
    },
    {
      id: '2',
      homeTeam: 'Sydney Roosters',
      awayTeam: 'Penrith Panthers',
      time: 'Saturday 5:30 PM',
      venue: 'Allianz Stadium'
    },
    {
      id: '3',
      homeTeam: 'South Sydney Rabbitohs',
      awayTeam: 'Manly Sea Eagles',
      time: 'Saturday 7:35 PM',
      venue: 'ANZ Stadium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Round */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Round 15</h2>
            <p className="text-purple-100">Current round in progress</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">2</p>
            <p className="text-purple-100">Days remaining</p>
          </div>
        </div>
      </div>

      {/* My Leagues */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          My Leagues
        </h3>
        
        <div className="space-y-4">
          {leagues.map(league => (
            <div key={league.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900">{league.name}</h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {league.participants} players
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {league.points} points
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    league.position === 1 ? 'bg-yellow-100 text-yellow-800' :
                    league.position <= 3 ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    #{league.position}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Prize: {league.prize}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Join New League
        </button>
      </div>

      {/* Upcoming Matches */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-500" />
          Upcoming Matches
        </h3>
        
        <div className="space-y-4">
          {upcomingMatches.map(match => (
            <div key={match.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">{match.homeTeam}</span>
                    <span className="text-gray-500">vs</span>
                    <span className="font-semibold text-gray-900">{match.awayTeam}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{match.venue}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{match.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* League Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <h4 className="font-bold text-gray-900 text-lg">Championships</h4>
          <p className="text-3xl font-bold text-yellow-600 mt-2">2</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Star className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h4 className="font-bold text-gray-900 text-lg">Best Finish</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">1st</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Users className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h4 className="font-bold text-gray-900 text-lg">Total Leagues</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">15</p>
        </div>
      </div>
    </div>
  );
};