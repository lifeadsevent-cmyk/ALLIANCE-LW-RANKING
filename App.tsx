
import React, { useState, useEffect, useMemo } from 'react';
import { RAW_PLAYERS_DATA } from './constants';
import { Player, TeamType, ViewType } from './types';
import { distributeTeams, calculateStats } from './utils';
import PlayerTable from './components/PlayerTable';
import RankingTable from './components/RankingTable';
import StatsCard from './components/StatsCard';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('RANKING');

  useEffect(() => {
    const distributed = distributeTeams(RAW_PLAYERS_DATA);
    setPlayers(distributed);
    setIsLoaded(true);
  }, []);

  const alphaStats = useMemo(() => calculateStats(players, TeamType.ALPHA), [players]);
  const bravoStats = useMemo(() => calculateStats(players, TeamType.BRAVO), [players]);
  
  const alphaPlayers = players.filter(p => p.team === TeamType.ALPHA);
  const bravoPlayers = players.filter(p => p.team === TeamType.BRAVO);
  const alphaSubs = players.filter(p => p.team === TeamType.SUBSTITUTE_ALPHA);
  const bravoSubs = players.filter(p => p.team === TeamType.SUBSTITUTE_BRAVO);

  if (!isLoaded) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-cyan-500 text-2xl animate-pulse font-black flex flex-col items-center gap-4 tracking-tighter">
        <i className="fa-solid fa-microchip fa-spin text-5xl mb-2"></i>
        SYNCING...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-4 bg-slate-950 text-slate-100">
      {/* Header Section Compact */}
      <header className="bg-slate-900 text-white pt-6 pb-12 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-900/5 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
              Tactical <span className="text-cyan-500">Neural</span> Hub
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Deployment: Alpha (55%) | Bravo (45%) • Grid View Matrix
            </p>
          </div>
          <div className="flex gap-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
             <button 
              onClick={() => setActiveView('RANKING')}
              className={`px-4 py-2 rounded font-black text-[9px] uppercase tracking-widest transition-all ${
                activeView === 'RANKING' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Ranking
            </button>
            <button 
              onClick={() => setActiveView('UNITS')}
              className={`px-4 py-2 rounded font-black text-[9px] uppercase tracking-widest transition-all ${
                activeView === 'UNITS' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Units
            </button>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 mt-4 relative z-20">
        
        {activeView === 'RANKING' ? (
          <div className="animate-in fade-in duration-500">
            <RankingTable players={players} />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* Stats Summary Compact */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatsCard 
                title="ALPHA (STRIKE - 55%)" 
                stats={alphaStats} 
                colorClass="border-orange-500" 
                icon="fa-fire-flame-curved"
              />
              <StatsCard 
                title="BRAVO (DEFENSE - 45%)" 
                stats={bravoStats} 
                colorClass="border-blue-500" 
                icon="fa-shield-halved"
              />
            </div>

            {/* High Density Grid Layout */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 min-w-0 space-y-4">
                <PlayerTable title="UNITÉ ALPHA (20p)" icon="fa-bolt" players={alphaPlayers} variant="alpha" />
                <PlayerTable title="SUB ALPHA" icon="fa-clock" players={alphaSubs} variant="alpha" />
              </div>
              <div className="flex-1 min-w-0 space-y-4">
                <PlayerTable title="UNITÉ BRAVO (20p)" icon="fa-shield" players={bravoPlayers} variant="bravo" />
                <PlayerTable title="SUB BRAVO" icon="fa-clock" players={bravoSubs} variant="bravo" />
              </div>
            </div>
          </div>
        )}

        {/* Global Footer Stats Minimal */}
        <div className="mt-8 flex justify-center gap-12 text-center opacity-40">
            <div>
              <p className="text-cyan-500 text-[8px] font-black uppercase tracking-widest">Global Force</p>
              <p className="text-lg font-black text-slate-300">{(alphaStats.totalForce + bravoStats.totalForce).toLocaleString('fr-FR')}</p>
            </div>
            <div>
              <p className="text-cyan-500 text-[8px] font-black uppercase tracking-widest">Active Ops</p>
              <p className="text-lg font-black text-slate-300">40</p>
            </div>
        </div>
      </main>

      <footer className="mt-8 text-center">
        <p className="text-slate-800 font-bold text-[7px] uppercase tracking-[0.4em]">
          &copy; MMXXIV NEURAL-OPS // STRATEGIC ALLIANCE // HIGH-DENSITY GRID
        </p>
      </footer>
    </div>
  );
};

export default App;
