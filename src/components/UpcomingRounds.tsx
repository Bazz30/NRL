import React from 'react';
import { Round } from '../types';
import { Calendar, Clock, MapPin, Play } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface UpcomingRoundsProps {
  currentRound: Round;
}

export const UpcomingRounds: React.FC<UpcomingRoundsProps> = ({ currentRound }) => {
  // Use the dynamic current round
  const forcedRound = {
    ...currentRound,
    number: currentRound.number,
    name: currentRound.name
  };

  const formatMatchTime = (kickoffTime: string) => {
    try {
      return format(parseISO(kickoffTime), 'EEE h:mm a');
    } catch {
      return kickoffTime;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Round Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{forcedRound.name}</h2>
            <p className="text-indigo-100">
              {formatDate(forcedRound.startDate)} - {formatDate(forcedRound.endDate)}
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              forcedRound.isLive ? 'bg-red-500 text-white' :
              forcedRound.isCompleted ? 'bg-green-500 text-white' :
              'bg-yellow-500 text-white'
            }`}>
              {forcedRound.isLive ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  LIVE
                </>
              ) : forcedRound.isCompleted ? (
                'COMPLETED'
              ) : (
                'UPCOMING'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Matches */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-500" />
          Round {forcedRound.number} Fixtures
        </h3>
        
        <div className="space-y-4">
          {forcedRound.matches.map(match => (
            <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-gray-900 text-lg">{match.homeTeam}</span>
                      <span className="text-gray-500 font-medium">vs</span>
                      <span className="font-bold text-gray-900 text-lg">{match.awayTeam}</span>
                    </div>
                    {match.isCompleted && match.homeScore !== undefined && match.awayScore !== undefined && (
                      <div className="flex items-center space-x-2 text-sm font-bold">
                        <span className={match.homeScore > match.awayScore ? 'text-green-600' : 'text-gray-600'}>
                          {match.homeScore}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className={match.awayScore > match.homeScore ? 'text-green-600' : 'text-gray-600'}>
                          {match.awayScore}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatMatchTime(match.kickoffTime)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.venue}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    match.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {match.isCompleted ? 'Final' : 'Upcoming'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Update Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Import Team Data
          </button>
          <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Update Round Info
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Click these buttons to paste in your latest team data or round information from your fantasy provider.
        </p>
      </div>
    </div>
  );
};