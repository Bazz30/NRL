# NRL Fantasy App

A comprehensive NRL Fantasy management application with real-time data integration from the official NRL Fantasy API.

## Features

- **Real-time Player Data**: Live player statistics, prices, and performance data
- **Team Management**: Manage your fantasy team with captain/vice-captain selection
- **Round-by-Round Stats**: View player performance for any round
- **AI-Powered Advice**: Get lineup suggestions using GPT-4
- **Bye Round Planning**: Track team bye schedules and Origin selections
- **Live Updates**: Refresh data to get the latest information

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: Axios
- **AI**: OpenAI GPT-4

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (for lineup advice feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NRL
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```

6. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## API Endpoints

The backend provides the following endpoints that fetch real-time data from the NRL Fantasy API:

### Players
- `GET /api/players` - Get all players with current prices
- `GET /api/players-with-stats/:round` - Get players with stats for a specific round

### Rounds & Ladder
- `GET /api/rounds` - Get all rounds data
- `GET /api/ladder` - Get current ladder standings

### Stats
- `GET /api/stats/:round` - Get player stats for a specific round

### AI Advice
- `POST /api/lineup-advice` - Get AI-powered lineup suggestions

## Data Sources

The app fetches real-time data from the official NRL Fantasy API:

- **Players**: `https://fantasy.nrl.com/data/nrl/players.json`
- **Rounds**: `https://fantasy.nrl.com/data/nrl/rounds.json`
- **Ladder**: `https://fantasy.nrl.com/data/nrl/ladder.json`
- **Stats**: `https://fantasy.nrl.com/data/nrl/stats/{round}.json`

## Fantasy Points Calculation

The app calculates fantasy points based on the following scoring system:

- **Try**: 4 points
- **Try Save**: 4 points
- **Goal**: 2 points
- **Field Goal**: 1 point
- **Try Assist**: 4 points
- **Line Break**: 4 points
- **Line Break Assist**: 2 points
- **Tackle**: 1 point
- **Tackle Break**: 2 points
- **Missed Tackle**: -2 points
- **Offload**: 1 point
- **Offload Forced**: 1 point
- **Error**: -2 points
- **Penalty Conceded**: -2 points
- **Sin Bin**: -4 points
- **Send Off**: -8 points
- **Metres Gained**: 0.1 points per metre
- **Kick Metres**: 0.05 points per metre
- **Kick Drop Outs**: 1 point
- **Forced Drop Out**: 1 point
- **Time on Ground**: 0.1 points per minute

## Team Mapping

The app maps squad IDs to team names:

- 500001: Sydney Roosters
- 500002: South Sydney Rabbitohs
- 500003: Manly Sea Eagles
- 500004: Melbourne Storm
- 500005: Newcastle Knights
- 500006: Canberra Raiders
- 500007: Brisbane Broncos
- 500008: North Queensland Cowboys
- 500009: Cronulla Sharks
- 500010: Penrith Panthers
- 500011: Parramatta Eels
- 500012: Canterbury Bulldogs
- 500013: St George Illawarra Dragons
- 500014: Wests Tigers
- 500015: Gold Coast Titans
- 500016: Warriors
- 500017: Dolphins

## Usage

### My Team Tab
- View your current fantasy team
- Set captain and vice-captain
- Swap player positions
- Get AI-powered lineup advice
- Track bye rounds and Origin selections

### Live Stats Tab
- Browse all players with real-time data
- Filter by team and round
- Sort by fantasy points, price, or name
- View detailed round statistics
- Search for specific players

### Rounds Tab
- View upcoming rounds
- Track bye schedules
- Plan for Origin periods

## Development

### Project Structure
```
NRL/
├── src/
│   ├── components/          # React components
│   ├── services/           # API services
│   ├── data/              # Static data files
│   ├── types/             # TypeScript type definitions
│   └── App.tsx            # Main application component
├── backend/
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
└── package.json           # Frontend dependencies
```

### Adding New Features

1. **New API Endpoints**: Add to `backend/server.js`
2. **New Components**: Create in `src/components/`
3. **New Services**: Add to `src/services/`
4. **Type Definitions**: Update `src/types/index.ts`

## Troubleshooting

### Common Issues

1. **Backend not starting**: Check if port 5000 is available
2. **API errors**: Verify network connection and NRL Fantasy API availability
3. **CORS errors**: Ensure backend CORS is properly configured
4. **OpenAI errors**: Check your API key in the `.env` file

### Data Refresh

If data seems stale:
1. Click the "Refresh" button in the Live Stats tab
2. Restart the backend server
3. Check the browser console for error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please respect the NRL Fantasy terms of service when using their API data.

## Disclaimer

This app is not affiliated with the NRL or NRL Fantasy. It uses publicly available data for educational and personal use only. 