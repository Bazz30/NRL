import React, { useState } from 'react';
import { TeamOverview } from './components/TeamOverview';
import { UpcomingRounds } from './components/UpcomingRounds';
import { myTeam as initialTeam, currentRound, teamStats } from './data/myTeam';
import { MyPlayer } from './types';
import { Users, Calendar, Trophy, Sparkles } from 'lucide-react';
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState<'team' | 'rounds'>('team');
  const [players, setPlayers] = useState<MyPlayer[]>(initialTeam);
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCaptainChange = (playerId: string) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({
        ...player,
        isCaptain: player.id === playerId,
        // Remove captain status from others
        ...(player.id !== playerId && player.isCaptain ? { isCaptain: false } : {})
      }))
    );
  };

  const handleViceCaptainChange = (playerId: string) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({
        ...player,
        isViceCaptain: player.id === playerId,
        // Remove vice captain status from others
        ...(player.id !== playerId && player.isViceCaptain ? { isViceCaptain: false } : {})
      }))
    );
  };

  const handlePositionSwap = (playerId: string) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => {
        if (player.id === playerId && player.secondaryPosition && player.secondaryPosition.length > 0) {
          return {
            ...player,
            position: player.secondaryPosition,
            secondaryPosition: player.position
          };
        }
        return player;
      })
    );
  };

  const getLineupAdvice = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/lineup-advice', {
        teamData: players,
      });
      setAdvice(response.data.advice);
    } catch (error) {
      console.error('Error getting lineup advice:', error);
      setAdvice('Failed to get advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8" />
              <h1 className="text-2xl font-bold">My NRL Fantasy</h1>
            </div>
            
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('team')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'team'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">My Team</span>
              </button>
              <button
                onClick={() => setActiveTab('rounds')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'rounds'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Rounds</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'team' ? (
          <>
            <TeamOverview 
              players={players} 
              stats={teamStats}
              onCaptainChange={handleCaptainChange}
              onViceCaptainChange={handleViceCaptainChange}
              onPositionSwap={handlePositionSwap}
            />

            {/* GPT Advice Button + Output */}
            <div className="mt-6 flex flex-col items-start gap-4">
              <button
                onClick={getLineupAdvice}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
              >
                <Sparkles className="w-5 h-5" />
                Get Lineup Advice
              </button>

              {loading && <p className="text-gray-600">Getting advice from the Fantasy gods...</p>}

              {advice && (
                <div className="bg-white p-4 rounded-lg shadow-md w-full mt-4 whitespace-pre-wrap border border-gray-200">
                  <h2 className="text-lg font-semibold mb-2">Lineup Advice:</h2>
                  <p>{advice}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <UpcomingRounds currentRound={currentRound} />
        )}
      </main>
    </div>
  );
}

export default App;
