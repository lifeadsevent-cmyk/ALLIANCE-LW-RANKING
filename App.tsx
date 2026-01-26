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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-cyan-500 text-2xl animate-pulse font-black flex flex-col items-center gap-4 tracking-tighter">
        <i className="fa-solid fa-microchip fa-spin text-5xl mb-2"></i>
        INITIALISATION DES UNITÉS...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-4 bg-slate-950 text-slate-100">
      <header className="bg-slate-900 text-white pt-6 pb-12 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-900/5 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none flex items-center gap-3">
              Neural <span className="text-cyan-500">Ops</span> Dashboard
              <span className="bg-emerald-500/10 text-emerald-500 text-[8px] px-2 py-1 rounded border border-emerald-500/20 uppercase">Session Active</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Equilibrage Tactique : Alpha 55% / Bravo 45%
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]"></i>
              <input 
                type="text" 
                placeholder="RECHERCHER UN COMMANDANT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-[10px] font-bold tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all uppercase"
              />
            </div>

            <div className="flex gap-1 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
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
              <button 
                onClick={() => setActiveView('ARCHIVES')}
                className={`px-4 py-2 rounded font-black text-[9px] uppercase tracking-widest transition-all ${
                  activeView === 'ARCHIVES' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Archives
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-4 relative z-20">
        
        {activeView === 'RANKING' && (
          <div className="animate-in fade-in duration-500">
            <RankingTable players={filteredPlayers} />
          </div>
        )}

        {activeView === 'UNITS' && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <StatsCard title="UNITÉ ALPHA (STRIKE - 55%)" stats={alphaStats} colorClass="border-orange-500" icon="fa-fire-flame-curved" />
              <StatsCard title="UNITÉ BRAVO (DEFENSE - 45%)" stats={bravoStats} colorClass="border-blue-500" icon="fa-shield-halved" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 min-w-0 space-y-4">
                <PlayerTable title="COMMANDANTS ALPHA" icon="fa-bolt" players={alphaPlayers} variant="alpha" />
                <PlayerTable title="REMPLAÇANTS ALPHA" icon="fa-clock" players={alphaSubs} variant="alpha" />
              </div>
              <div className="flex-1 min-w-0 space-y-4">
                <PlayerTable title="COMMANDANTS BRAVO" icon="fa-shield" players={bravoPlayers} variant="bravo" />
                <PlayerTable title="REMPLAÇANTS BRAVO" icon="fa-clock" players={bravoSubs} variant="bravo" />
              </div>
            </div>
          </div>
        )}

        {activeView === 'ARCHIVES' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="bg-amber-900/10 border border-amber-500/20 p-6 rounded-2xl text-center">
              <i className="fa-solid fa-box-archive text-4xl text-amber-500/40 mb-4"></i>
              <h2 className="text-amber-500 font-black text-xl mb-2 uppercase">Historique des Campagnes</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Le système d'archivage automatique sera disponible lors de la prochaine mise à jour des données brutes.
              </p>
            </div>
          </div>
        )}

        {filteredPlayers.length === 0 && activeView !== 'ARCHIVES' && (
          <div className="p-12 text-center text-slate-500 font-bold uppercase tracking-widest">
            <i className="fa-solid fa-user-slash text-4xl mb-4 opacity-20"></i>
            <p>Aucun commandant trouvé</p>
          </div>
        )}
      </main>

      <footer className="mt-8 text-center border-t border-slate-900 pt-8 pb-4">
        <p className="text-slate-800 font-bold text-[7px] uppercase tracking-[0.4em]">
          &copy; MMXXIV NEURAL-OPS // HYPER-BALANCED DISPATCH SYSTEM
        </p>
      </footer>
    </div>
  );
};

export default App;