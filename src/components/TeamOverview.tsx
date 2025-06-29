import React, { useState } from 'react';
import { MyPlayer, TeamStats, PositionCount } from '../types';
import { Crown, Shield, AlertTriangle, TrendingUp, DollarSign, Users, Star, ArrowLeftRight, Calendar, ChevronDown, ChevronUp, X, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamOverviewProps {
  players: MyPlayer[];
  stats: TeamStats;
  onCaptainChange?: (playerId: string) => void;
  onViceCaptainChange?: (playerId: string) => void;
  onPositionSwap?: (playerId: string) => void;
}

export const TeamOverview: React.FC<TeamOverviewProps> = ({ 
  players, 
  stats, 
  onCaptainChange, 
  onViceCaptainChange,
  onPositionSwap
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showCaptainMenu, setShowCaptainMenu] = useState(false);
  const [isByeRoundsCollapsed, setIsByeRoundsCollapsed] = useState(true);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string | null>(null);
  const [showRoundSelector, setShowRoundSelector] = useState(false);
  const [selectedRound, setSelectedRound] = useState<number>(17); // Default to current round

  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}k`;
  
  const formatPositions = (positions: string[]) => positions.join(', ');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Playing': return 'bg-green-100 text-green-800';
      case 'Bye': return 'bg-purple-100 text-purple-800';
      case 'ORIGIN': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Bye rounds data based on the image
  const byeRounds = {
    5: ['Warriors'],
    6: ['Bulldogs'],
    7: ['Cowboys'],
    8: ['Eels'],
    9: ['Manly'],
    10: ['Roosters'],
    11: ['Panthers'],
    12: ['Cowboys', 'Storm', 'Dragons', 'Titans', 'Rabbitohs', 'Tigers', 'Broncos'],
    13: ['Sharks','Bulldogs', 'Dolphins'],
    14: ['Roosters'],
    15: ['Warriors', 'Storm', 'Raiders', 'Tigers', 'Eels', 'Broncos', 'Panthers'],
    16: ['Manly', 'Dragons', 'Bulldogs'],
    17: ['Roosters'],
    18: ['Warriors', 'Knights', 'Titans', 'Sharks', 'Eels', 'Dolphins', 'Panthers'],
    19: ['Manly','Raiders','Rabbitohs'],
    20: ['Broncos'],
    21: ['Dolphins'],
    22: ['Knights'],
    23: ['Tigers'],
    24: ['Raiders'],
    25: ['Sharks'],
    26: ['Rabbitohs'],
    27: ['Cowboys']
  };

  // Function to get player status based on selected round
  const getPlayerStatusForRound = (team: string, selectedForOrigin: boolean, round: number): 'Playing' | 'Bye' | 'ORIGIN' => {
    // Check if player is selected for Origin first (highest priority)
    if (selectedForOrigin) {
      return 'ORIGIN';
    }
    
    // Check if team has a bye in selected round
    const teamsOnBye = byeRounds[round as keyof typeof byeRounds] || [];
    if (teamsOnBye.includes(team)) {
      return 'Bye';
    }
    
    // Default to Playing
    return 'Playing';
  };

  // Update players with status based on selected round
  const getPlayersWithUpdatedStatus = () => {
    return players.map(player => ({
      ...player,
      status: getPlayerStatusForRound(player.team, player.selectedForOrigin, selectedRound)
    }));
  };

  const playersWithUpdatedStatus = getPlayersWithUpdatedStatus();

  // Filter players based on selected team
  const getFilteredPlayers = () => {
    if (!selectedTeamFilter) {
      return playersWithUpdatedStatus;
    }
    return playersWithUpdatedStatus.filter(player => player.team === selectedTeamFilter);
  };

  const filteredPlayers = getFilteredPlayers();

  // Calculate position counts based on filtered players AND considering bye schedule
  const calculatePositionCounts = (): PositionCount[] => {
    const positions = ['HOK', 'MID', 'EDG', 'HLF', 'CTR', 'WFB'];
    const requirements = { HOK: 1, MID: 3, EDG: 2, HLF: 2, CTR: 2, WFB: 3 }; // Fixed HLF to 2
    
    return positions.map(pos => {
      // Count all players with this position (regardless of bye status)
      const allPrimaryCount = filteredPlayers.filter(p => p.position.includes(pos)).length;
      const allSecondaryCount = filteredPlayers.filter(p => p.secondaryPosition?.includes(pos)).length;
      
      // Count only PLAYING players with this position (excluding byes and origin)
      const playingPrimaryCount = filteredPlayers.filter(p => 
        p.position.includes(pos) && p.status === 'Playing'
      ).length;
      const playingSecondaryCount = filteredPlayers.filter(p => 
        p.secondaryPosition?.includes(pos) && p.status === 'Playing'
      ).length;
      
      const required = requirements[pos as keyof typeof requirements] || 0;
      
      return {
        position: pos,
        primary: playingPrimaryCount, // Show playing count for primary
        secondary: playingSecondaryCount, // Show playing count for secondary
        totalPrimary: allPrimaryCount, // Keep track of total for reference
        totalSecondary: allSecondaryCount, // Keep track of total for reference
        required,
        status: playingPrimaryCount >= required ? 'complete' : 'incomplete'
      };
    });
  };

  const positionCounts = calculatePositionCounts();
  const totalPrimary = positionCounts.reduce((sum, p) => sum + p.primary, 0);
  const totalSecondary = positionCounts.reduce((sum, p) => sum + p.secondary, 0);

  const handlePlayerClick = (playerId: string) => {
    setSelectedPlayer(playerId);
    setShowCaptainMenu(true);
  };

  const handleSetCaptain = () => {
    if (selectedPlayer) {
      onCaptainChange?.(selectedPlayer);
      setShowCaptainMenu(false);
      setSelectedPlayer(null);
    }
  };

  const handleSetViceCaptain = () => {
    if (selectedPlayer) {
      onViceCaptainChange?.(selectedPlayer);
      setShowCaptainMenu(false);
      setSelectedPlayer(null);
    }
  };

  const handleRemoveRole = () => {
    if (selectedPlayer) {
      const player = players.find(p => p.id === selectedPlayer);
      if (player?.isCaptain) {
        onCaptainChange?.(''); // Remove captain
      }
      if (player?.isViceCaptain) {
        onViceCaptainChange?.(''); // Remove vice captain
      }
      setShowCaptainMenu(false);
      setSelectedPlayer(null);
    }
  };

  const handlePositionSwap = (playerId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the player click
    onPositionSwap?.(playerId);
  };

  const handleTeamClick = (teamName: string) => {
    setSelectedTeamFilter(teamName === selectedTeamFilter ? null : teamName);
  };

  const clearTeamFilter = () => {
    setSelectedTeamFilter(null);
  };

  const handleRoundChange = (newRound: number) => {
    setSelectedRound(newRound);
  };

  const handlePreviousRound = () => {
    if (selectedRound > 1) {
      setSelectedRound(selectedRound - 1);
    }
  };

  const handleNextRound = () => {
    if (selectedRound < 27) {
      setSelectedRound(selectedRound + 1);
    }
  };

  // Filter bye rounds based on selected team
  const getFilteredByeRounds = () => {
    if (!selectedTeamFilter) {
      return byeRounds;
    }

    const filteredRounds: { [key: string]: string[] } = {};
    Object.entries(byeRounds).forEach(([round, teams]) => {
      if (teams.includes(selectedTeamFilter)) {
        filteredRounds[round] = [selectedTeamFilter];
      }
    });
    return filteredRounds;
  };

  const filteredByeRounds = getFilteredByeRounds();
  const selectedPlayerData = players.find(p => p.id === selectedPlayer);

  return (
    <div className="space-y-6">
      {/* Current Round Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {selectedRound === 17 ? 'Current Round: ' : 'Viewing Round: '}{selectedRound}
            </h2>
            <p className="text-indigo-100">
              NRL Season 2025 • Week {selectedRound} of 27
              {selectedRound !== 17 && (
                <span className="ml-2 px-2 py-1 bg-white/20 rounded text-sm">
                  Preview Mode
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => setShowRoundSelector(!showRoundSelector)}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Check Future Rounds
            </button>
          </div>
        </div>

        {/* Round Selector */}
        {showRoundSelector && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Select Round</h3>
              <button
                onClick={() => setShowRoundSelector(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousRound}
                disabled={selectedRound <= 1}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-grow">
                <input
                  type="range"
                  min="1"
                  max="27"
                  value={selectedRound}
                  onChange={(e) => handleRoundChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>Round 1</span>
                  <span className="font-semibold">Round {selectedRound}</span>
                  <span>Round 27</span>
                </div>
              </div>
              
              <button
                onClick={handleNextRound}
                disabled={selectedRound >= 27}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => handleRoundChange(17)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedRound === 17 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Current (17)
              </button>
              {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map(round => (
                <button
                  key={round}
                  onClick={() => handleRoundChange(round)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedRound === round 
                      ? 'bg-white text-indigo-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {round}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Team Value</p>
              <p className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}M</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Projected Score</p>
              <p className="text-2xl font-bold">{stats.projectedScore}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Overall Rank</p>
              <p className="text-2xl font-bold">#{stats.rank.toLocaleString()}</p>
            </div>
            <Crown className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Points</p>
              <p className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Collapsible Bye Rounds Section */}
      <div className="bg-white rounded-lg shadow-md">
        <button
          onClick={() => setIsByeRoundsCollapsed(!isByeRoundsCollapsed)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-purple-500" />
            <h3 className="text-xl font-bold text-gray-900">Team Bye Rounds</h3>
            {selectedTeamFilter && (
              <div className="flex items-center space-x-2 ml-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Filtered: {selectedTeamFilter}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearTeamFilter();
                  }}
                  className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors text-sm"
                  title="Clear filter"
                >
                  <X className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>
          {isByeRoundsCollapsed ? (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {!isByeRoundsCollapsed && (
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 mb-4">
              {selectedTeamFilter 
                ? `Showing bye rounds for ${selectedTeamFilter}. Only players from this team are shown in your squad below.`
                : 'Teams listed below are on bye for each round. Click on any team name to filter by that team.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(filteredByeRounds).map(([round, teams]) => (
                <div key={round} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Round {round}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      parseInt(round) === selectedRound ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {parseInt(round) === selectedRound ? 'Viewing' : ''}
                    </span>
                  </div>
                  
                  {teams.length === 0 ? (
                    <p className="text-sm text-green-600">No byes</p>
                  ) : (
                    <div className="space-y-1">
                      {teams.map((team, index) => (
                        <button
                          key={index}
                          onClick={() => handleTeamClick(team)}
                          className={`inline-block text-xs px-2 py-1 rounded mr-1 mb-1 transition-all duration-200 hover:shadow-md ${
                            selectedTeamFilter === team
                              ? 'bg-blue-500 text-white'
                              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                          }`}
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedTeamFilter && Object.keys(filteredByeRounds).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {selectedTeamFilter} has no bye rounds in the current season.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Team Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Bazzpakumara
              {selectedTeamFilter && (
                <span className="text-lg font-normal text-blue-600 ml-2">
                  - {selectedTeamFilter} Players ({filteredPlayers.length})
                </span>
              )}
            </h2>
            {selectedTeamFilter && (
              <button
                onClick={clearTeamFilter}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                <span>Show All Players</span>
              </button>
            )}
          </div>
          
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No players from {selectedTeamFilter} in your team.
              </p>
              <button
                onClick={clearTeamFilter}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show All Players
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold w-32">Player Name</th>
                    <th className="text-center py-2 font-semibold w-20">Position</th>
                    <th className="text-center py-2 font-semibold w-8"></th>
                    <th className="text-center py-2 font-semibold w-20">Secondary Position</th>
                    <th className="text-center py-2 font-semibold w-20">Chosen Position</th>
                    <th className="text-center py-2 font-semibold w-16">Team</th>
                    <th className="text-center py-2 font-semibold w-20">Selected for Origin</th>
                    <th className="text-center py-2 font-semibold w-16">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map(player => (
                    <tr key={player.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-2 font-medium w-32">
                        <button
                          onClick={() => handlePlayerClick(player.id)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <span>{player.name}</span>
                          {player.isCaptain && (
                            <Crown className="w-4 h-4 text-yellow-500" title="Captain" />
                          )}
                          {player.isViceCaptain && (
                            <Star className="w-4 h-4 text-blue-500" title="Vice Captain" />
                          )}
                        </button>
                      </td>
                      <td className="py-2 w-20 text-center">{formatPositions(player.position)}</td>
                      <td className="py-2 w-8">
                        <div className="flex justify-center">
                          {player.secondaryPosition && player.secondaryPosition.length > 0 && (
                            <button
                              onClick={(e) => handlePositionSwap(player.id, e)}
                              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200"
                              title="Swap primary and secondary positions"
                            >
                              <ArrowLeftRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-2 w-20 text-center text-red-600">{player.secondaryPosition ? formatPositions(player.secondaryPosition) : ''}</td>
                      <td className="py-2 w-20 text-center">{formatPositions(player.position)}</td>
                      <td className="py-2 w-16 text-center">
                        <button
                          onClick={() => handleTeamClick(player.team)}
                          className="text-gray-900 hover:text-blue-600 transition-all duration-200 hover:underline font-medium"
                        >
                          {player.team}
                        </button>
                      </td>
                      <td className="py-2 w-20 text-center">
                        <span className={player.selectedForOrigin ? 'text-red-600' : ''}>
                          {player.selectedForOrigin ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-2 w-16 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(player.status)}`}>
                          {player.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Position Counts */}
        <div className="space-y-4">
          {/* Primary Positions */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Primary Positions (Round {selectedRound})
              {selectedTeamFilter && (
                <span className="text-sm font-normal text-blue-600 ml-2">
                  ({selectedTeamFilter})
                </span>
              )}
            </h3>
            
            <div className="space-y-2">
              {positionCounts.map(pos => (
                <div key={pos.position} className="flex justify-between items-center">
                  <span className="font-medium">{pos.position}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-mono px-2 py-1 rounded ${
                      pos.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {pos.primary}/{pos.required}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${
                      pos.status === 'complete' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Playing:</span>
                  <span className="bg-yellow-200 px-2 py-1 rounded">{totalPrimary}</span>
                </div>
              </div>
              
              {/* Key/Legend moved to bottom */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">Key:</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span>Playing players / required for Round {selectedRound}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Complete</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-3"></div>
                    <span>Incomplete</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    * Numbers show only players available to play (excludes byes/origin)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Positions */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Secondary Position Count (Round {selectedRound})
              {selectedTeamFilter && (
                <span className="text-sm font-normal text-blue-600 ml-2">
                  ({selectedTeamFilter})
                </span>
              )}
            </h3>
            
            <div className="space-y-2">
              {positionCounts.map(pos => (
                <div key={pos.position} className="flex justify-between items-center">
                  <span className="font-medium">{pos.position}</span>
                  <span className="text-sm">{pos.secondary}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Playing:</span>
                  <span className="bg-blue-200 px-2 py-1 rounded">{totalSecondary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Captain Selection Modal */}
      {showCaptainMenu && selectedPlayerData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {selectedPlayerData.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedPlayerData.team} • {formatPositions(selectedPlayerData.position)}
            </p>
            
            <div className="space-y-2">
              {!selectedPlayerData.isCaptain && (
                <button
                  onClick={handleSetCaptain}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  <span>Set as Captain</span>
                </button>
              )}
              
              {!selectedPlayerData.isViceCaptain && (
                <button
                  onClick={handleSetViceCaptain}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Star className="w-4 h-4" />
                  <span>Set as Vice Captain</span>
                </button>
              )}
              
              {(selectedPlayerData.isCaptain || selectedPlayerData.isViceCaptain) && (
                <button
                  onClick={handleRemoveRole}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove Role
                </button>
              )}
              
              <button
                onClick={() => {
                  setShowCaptainMenu(false);
                  setSelectedPlayer(null);
                }}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};