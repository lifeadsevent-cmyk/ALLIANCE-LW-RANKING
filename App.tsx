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
    // Dispatch unique au chargement
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
        INITIALISATION DU SYSTÈME...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12 bg-[#020617] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      <header className="bg-slate-900/50 backdrop-blur-md text-white pt-8 pb-14 px-6 border-b border-emerald-900/20 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-900/10 rounded-full -ml-32 -mb-32 blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none flex items-center gap-4">
              Tactical <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Ops</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase font-black tracking-widest animate-pulse">
                v3.1 Online
              </span>
            </h1>
            <p className="text-emerald-500/50 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Neural Matrix Balance // {players.length} Commandants Synchronisés
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80 group">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 text-xs transition-colors group-focus-within:text-emerald-400"></i>
              <input 
                type="text" 
                placeholder="RECHERCHER UN COMMANDANT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-[11px] font-bold tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all uppercase"
              />
            </div>

            <nav className="flex gap-1.5 bg-slate-950/40 p-1.5 rounded-xl border border-slate-800 shadow-inner">
               <button 
                onClick={() => setActiveView('RANKING')}
                className={`px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  activeView === 'RANKING' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5'
                }`}
              >
                Ranking
              </button>
              <button 
                onClick={() => setActiveView('UNITS')}
                className={`px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  activeView === 'UNITS' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5'
                }`}
              >
                Units
              </button>
              <button 
                onClick={() => setActiveView('ARCHIVES')}
                className={`px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  activeView === 'ARCHIVES' ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'text-slate-500 hover:text-amber-400 hover:bg-amber-500/5'
                }`}
              >
                Archives
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-[-40px] relative z-20">
        
        {activeView === 'RANKING' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <RankingTable players={filteredPlayers} />
          </div>
        )}

        {activeView === 'UNITS' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <StatsCard title="UNITÉ ALPHA (STRIKE FORCE)" stats={alphaStats} colorClass="border-orange-500" icon="fa-fire-flame-curved" />
              <StatsCard title="UNITÉ BRAVO (DEFENSE FORCE)" stats={bravoStats} colorClass="border-sky-500" icon="fa-shield-halved" />
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0 space-y-6">
                <PlayerTable title="UNITÉ DE COMBAT ALPHA" icon="fa-bolt-lightning" players={alphaPlayers} variant="alpha" />
                <PlayerTable title="RÉSERVE TACTIQUE ALPHA" icon="fa-clock-rotate-left" players={alphaSubs} variant="alpha" />
              </div>
              <div className="flex-1 min-w-0 space-y-6">
                <PlayerTable title="UNITÉ DE COMBAT BRAVO" icon="fa-shield-heart" players={bravoPlayers} variant="bravo" />
                <PlayerTable title="RÉSERVE TACTIQUE BRAVO" icon="fa-clock-rotate-left" players={bravoSubs} variant="bravo" />
              </div>
            </div>
          </div>
        )}

        {activeView === 'ARCHIVES' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="bg-amber-950/10 border border-amber-500/20 p-12 rounded-[2rem] text-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                <i className="fa-solid fa-box-archive text-3xl text-amber-500"></i>
              </div>
              <h2 className="text-amber-500 font-black text-2xl mb-3 uppercase tracking-tighter italic">Historique de Campagne</h2>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                Les archives neurales sont en cours de compilation. Les données des saisons précédentes seront injectées au prochain cycle.
              </p>
            </div>
          </div>
        )}

        {filteredPlayers.length === 0 && activeView !== 'ARCHIVES' && (
          <div className="p-20 text-center text-slate-500 font-bold uppercase tracking-[0.3em] bg-slate-900/20 rounded-[2rem] border border-dashed border-slate-800/50">
            <i className="fa-solid fa-ghost text-5xl mb-6 opacity-10"></i>
            <p className="text-xs">Aucun commandant détecté dans ce secteur</p>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center pt-8 border-t border-slate-900">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/50 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">System Status: Operational</span>
        </div>
        <p className="text-slate-800 font-bold text-[8px] uppercase tracking-[0.5em]">
          &copy; MMXXIV NEURAL-OPS // HYPER-BALANCED DISPATCH SYSTEM
        </p>
      </footer>
    </div>
  );
};

export default App;