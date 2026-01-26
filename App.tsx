import React, { useState, useEffect, useMemo } from 'react';
import { RAW_PLAYERS_DATA, WEEKLY_ARCHIVE } from './constants';
import { Player, TeamType, ViewType, ArchiveEntry } from './types';
import { distributeTeams, calculateStats } from './utils';
import PlayerTable from './components/PlayerTable';
import RankingTable from './components/RankingTable';
import StatsCard from './components/StatsCard';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('RANKING');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const distributed = distributeTeams(RAW_PLAYERS_DATA);
    setPlayers(distributed);
    setIsLoaded(true);
  }, []);

  const alphaStats = useMemo(() => calculateStats(players, TeamType.ALPHA), [players]);
  const bravoStats = useMemo(() => calculateStats(players, TeamType.BRAVO), [players]);
  
  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return players;
    const query = searchQuery.toLowerCase().trim();
    return players.filter(p => p.name.toLowerCase().includes(query));
  }, [players, searchQuery]);

  const alphaPlayers = useMemo(() => filteredPlayers.filter(p => p.team === TeamType.ALPHA), [filteredPlayers]);
  const bravoPlayers = useMemo(() => filteredPlayers.filter(p => p.team === TeamType.BRAVO), [filteredPlayers]);
  const alphaSubs = useMemo(() => filteredPlayers.filter(p => p.team === TeamType.SUBSTITUTE_ALPHA), [filteredPlayers]);
  const bravoSubs = useMemo(() => filteredPlayers.filter(p => p.team === TeamType.SUBSTITUTE_BRAVO), [filteredPlayers]);

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-emerald-500 text-2xl animate-pulse font-black flex flex-col items-center gap-4 tracking-tighter">
        <i className="fa-solid fa-microchip fa-spin text-5xl mb-2"></i>
        INITIALISATION...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12 bg-[#020617] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <header className="bg-slate-900/50 backdrop-blur-md text-white pt-6 pb-16 px-4 md:pt-8 md:pb-14 md:px-6 border-b border-emerald-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none flex items-center justify-center md:justify-start gap-3 md:gap-4">
              Tactical <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Ops</span>
            </h1>
            <p className="text-emerald-500/50 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
              Neural Matrix Balance
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <nav className="flex w-full md:w-auto gap-1 bg-slate-950/40 p-1 rounded-xl border border-slate-800 shadow-inner overflow-x-auto no-scrollbar">
               <button 
                onClick={() => setActiveView('RANKING')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeView === 'RANKING' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-emerald-400'
                }`}
              >
                Ranking
              </button>
              <button 
                onClick={() => setActiveView('UNITS')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeView === 'UNITS' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-emerald-400'
                }`}
              >
                Units
              </button>
              <button 
                onClick={() => setActiveView('ARCHIVES')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeView === 'ARCHIVES' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-amber-400'
                }`}
              >
                Archives
              </button>
            </nav>

            <div className="relative w-full sm:w-80 group">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 text-xs transition-colors group-focus-within:text-emerald-400"></i>
              <input 
                type="text" 
                placeholder="RECHERCHER..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-[10px] font-bold tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-all uppercase"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 md:px-4 mt-[-45px] relative z-20">
        
        {activeView === 'RANKING' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <RankingTable players={filteredPlayers} />
          </div>
        )}

        {activeView === 'UNITS' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
              <StatsCard title="UNITÉ ALPHA" stats={alphaStats} colorClass="border-orange-500" icon="fa-fire-flame-curved" />
              <StatsCard title="UNITÉ BRAVO" stats={bravoStats} colorClass="border-sky-500" icon="fa-shield-halved" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex-1 min-w-0 space-y-4 md:space-y-6">
                <PlayerTable title="UNITÉ ALPHA" icon="fa-bolt-lightning" players={alphaPlayers} variant="alpha" />
                <PlayerTable title="RÉSERVE ALPHA" icon="fa-clock-rotate-left" players={alphaSubs} variant="alpha" />
              </div>
              <div className="flex-1 min-w-0 space-y-4 md:space-y-6">
                <PlayerTable title="UNITÉ BRAVO" icon="fa-shield-heart" players={bravoPlayers} variant="bravo" />
                <PlayerTable title="RÉSERVE BRAVO" icon="fa-clock-rotate-left" players={bravoSubs} variant="bravo" />
              </div>
            </div>
          </div>
        )}

        {activeView === 'ARCHIVES' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="bg-amber-950/10 border border-amber-500/20 p-10 md:p-12 rounded-2xl md:rounded-[2rem] text-center backdrop-blur-sm">
              <i className="fa-solid fa-box-archive text-3xl text-amber-500/40 mb-4 block"></i>
              <h2 className="text-amber-500 font-black text-xl mb-2 uppercase tracking-tighter italic">Archives Tactiques</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto">
                Compilation des données en cours. Disponible au prochain cycle.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center pt-8 border-t border-slate-900 px-4">
        <p className="text-slate-800 font-bold text-[7px] md:text-[8px] uppercase tracking-[0.4em] leading-relaxed">
          &copy; MMXXIV NEURAL-OPS // SYSTEM OPERATIONAL
        </p>
      </footer>
    </div>
  );
};

export default App;