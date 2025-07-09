import React, { useEffect } from 'react';
import { create } from 'zustand'; 


interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: {
    name: string;
    logo: string; // URL to team logo
  };
  awayTeam: {
    name: string;
    logo: string; // URL to team logo
  };
  score: {
    home: number | null;
    away: number | null;
  };
  status: string; // e.g., "Match Finished", "Not Started", "Live"
  league: {
    name: string;
    logo: string; // URL to league logo
  };
}


interface FootsyState {
  matches: Match[];
  loading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
}

const useFootsyStore = create<FootsyState>((set) => ({
  matches: [],
  loading: false,
  error: null,

 
  fetchMatches: async () => {
    set({ loading: true, error: null });

    
    const API_KEY = process.env.REACT_APP_API_FOOTBALL_KEY || '107946386fea4475b0f97b5f22d42ae3';
    const API_BASE_URL = 'https://v3.football.api-sports.io/';

    
    const leagueId = 39; 
    const season = 2024; 

    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      set({
        error: "API Key is missing or not configured.",
        loading: false,
      });
      console.error("API Key is missing.");
      return; 
    }

    try {
      
      const response = await fetch(`${API_BASE_URL}fixtures?league=${leagueId}&season=${season}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io', 
          'x-rapidapi-key': API_KEY, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.errors ? JSON.stringify(errorData.errors) : (errorData.message || 'Unknown API error');
        throw new Error(`API Request Failed: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();

      if (data.errors && Object.keys(data.errors).length > 0) {
        throw new Error(`API Error: ${JSON.stringify(data.errors)}`);
      }

      
      const fetchedMatches: Match[] = data.response.map((item: any) => ({
        id: item.fixture.id,
        date: new Date(item.fixture.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date(item.fixture.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        homeTeam: {
          name: item.teams.home.name,
          logo: item.teams.home.logo,
        },
        awayTeam: {
          name: item.teams.away.name,
          logo: item.teams.away.logo,
        },
        score: {
          home: item.goals.home,
          away: item.goals.away,
        },
        status: item.fixture.status.long,
        league: {
          name: item.league.name,
          logo: item.league.logo,
        },
      }));

      set({ matches: fetchedMatches, loading: false });

    } catch (error: any) {
      console.error("Failed to fetch matches:", error);
      set({ error: error.message || "An unexpected error occurred while loading football data.", loading: false });
    }
  },
}));

const FootsyHomePage: React.FC = () => {
  const { matches, loading, error, fetchMatches } = useFootsyStore();

  
  const backgroundImageURL = '/Ball.png'; 

 
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]); 

  return (
   
      <div
        className="relative bg-gray-900 text-white flex-grow p-4 md:p-8
                   bg-cover bg-center bg-no-repeat overflow-hidden
                   animate-subtle-zoom" 
        style={{ backgroundImage: `url('${backgroundImageURL}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div> 

        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-sm md:text-sm font-extrabold text-center mb-8 text-green-400">
            Footsy: Your Football Hub
          </h2>

          <div className="flex justify-center mb-8">
            <button
              onClick={fetchMatches} 
              className="
                px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                hover:bg-blue-700 transition-colors duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                transform hover:scale-105 active:scale-95
              "
            >
              Refresh Matches
            </button>
          </div>

          
          {loading && (
            <div className="text-center text-xl text-gray-400 p-4">
              <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading football data<span className='dots text-red-400'></span>
            </div>
          )}

          
          {error && (
            <div className="text-center text-xl text-red-300 p-4 bg-red-900 rounded-md shadow-lg">
              <p className="font-bold mb-2">Failed to load data!</p>
              <p className="text-base">{error}</p>
              <p className="text-sm mt-2 text-red-400">
                 Ensure you have an active internet connection.
              </p>
            </div>
          )}

          
          {!loading && !error && matches.length === 0 && (
            <div className="text-center text-xl text-gray-400 p-4 bg-gray-800 rounded-md shadow">
              No matches found for the selected criteria. Try refreshing or adjust fetch parameters.
            </div>
          )}

          
          <div className="grid grid-cols-1 gap-6">
           
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 border border-gray-700 hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 flex-shrink-0">
                  {match.league.logo && (
                    <img src={match.league.logo} alt={match.league.name} className="w-8 h-8 rounded-full object-contain" />
                  )}
                  <span className="text-gray-300 text-sm font-medium">{match.league.name}</span>
                </div>

                <div className="flex flex-col items-center flex-grow text-center">
                  <p className="text-gray-400 text-xs mb-1">{match.date} - {match.time}</p>
                  <div className="flex items-center space-x-4 w-full justify-center">

                    <div className="flex flex-col items-center w-1/3">
                      {match.homeTeam.logo && (
                        <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-10 h-10 mb-2 object-contain" />
                      )}
                      <span className="text-lg font-semibold">{match.homeTeam.name}</span>
                    </div>

                    <div className="text-2xl font-bold text-green-400 flex items-center space-x-2">
                      
                      {match.score.home !== null ? match.score.home : '-'}
                      <span className="text-gray-500 mx-1">-</span>
                      {match.score.away !== null ? match.score.away : '-'}
                    </div>

                    <div className="flex flex-col items-center w-1/3">
                      {match.awayTeam.logo && (
                        <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-10 h-10 mb-2 object-contain" />
                      )}
                      <span className="text-lg font-semibold">{match.awayTeam.name}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{match.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default FootsyHomePage;
