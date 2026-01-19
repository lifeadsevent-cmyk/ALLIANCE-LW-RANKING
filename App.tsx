
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
        SYNCING DATABASE...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12 bg-slate-950">
      {/* Header Section */}
      <header className="bg-slate-900 text-white pt-12 pb-24 px-6 border-b border-slate-800 relative overflow-hidden">
        {/* Background Decorative Tech Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full -mr-48 -mt-48 blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em]">Alpha-Bravo Protocol</span>
                <span className="text-slate-700">|</span>
                <span className="text-emerald-500 text-[10px] font-black font-mono animate-pulse">● SYSTEM ONLINE</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter leading-none uppercase">
                Tactical <span className="text-cyan-500">Neural</span> Hub
              </h1>
              <p className="text-slate-400 text-lg font-medium max-w-xl">
                Centre de commandement avancé. Analyse de puissance et déploiement stratégique des unités d'élite.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-2xl border border-slate-800 flex gap-2">
          <button 
            onClick={() => setActiveView('RANKING')}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              activeView === 'RANKING' 
              ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.3)] ring-1 ring-cyan-400/50' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fa-solid fa-list-ol"></i>
            Classement Général
          </button>
          <button 
            onClick={() => setActiveView('UNITS')}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              activeView === 'UNITS' 
              ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.3)] ring-1 ring-cyan-400/50' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fa-solid fa-users-gear"></i>
            Unités de Combat
          </button>
        </div>
      </nav>

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-6 mt-12 relative z-20">
        
        {activeView === 'RANKING' ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <RankingTable players={players} />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <StatsCard 
                title="UNITÉ ALPHA (STRIKE)" 
                stats={alphaStats} 
                colorClass="border-orange-500" 
                icon="fa-fire-flame-curved"
              />
              <StatsCard 
                title="UNITÉ BRAVO (DEFENSE)" 
                stats={bravoStats} 
                colorClass="border-blue-500" 
                icon="fa-shield-halved"
              />
            </div>

            {/* Units Tables */}
            <div className="space-y-12">
              <PlayerTable title="DÉPLOIEMENT ALPHA" icon="fa-person-military-pointing" players={alphaPlayers} variant="alpha" />
              <PlayerTable title="DÉPLOIEMENT BRAVO" icon="fa-user-shield" players={bravoPlayers} variant="bravo" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <PlayerTable title="SUB ALPHA" icon="fa-clock" players={alphaSubs} variant="alpha" />
                <PlayerTable title="SUB BRAVO" icon="fa-clock" players={bravoSubs} variant="bravo" />
              </div>
            </div>
          </div>
        )}

        {/* Global Stats Footer */}
        <div className="mt-24 bg-slate-900 rounded-[2.5rem] p-12 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 p-12 opacity-[0.02]">
            <i className="fa-solid fa-network-wired text-[15rem]"></i>
          </div>
          <div className="relative z-10 space-y-12">
            <h3 className="text-2xl font-black text-center uppercase tracking-[0.5em] text-slate-500">Alliance Analytics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="space-y-2 text-center">
                <p className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">Global Force</p>
                <p className="text-5xl font-black tracking-tighter text-slate-100">{(alphaStats.totalForce + bravoStats.totalForce).toLocaleString('fr-FR')}</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">Active Operatives</p>
                <p className="text-5xl font-black tracking-tighter text-slate-100">40</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">Reserve Pool</p>
                <p className="text-5xl font-black tracking-tighter text-slate-100">{players.length - 40}</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-cyan-500 text-[10px] font-black uppercase tracking-widest">Daily Contribution</p>
                <p className="text-5xl font-black tracking-tighter text-slate-100">{(players.reduce((acc, p) => acc + p.donations, 0)).toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-24 pb-12 text-center">
        <div className="flex justify-center gap-8 mb-6 text-slate-800">
          <i className="fa-solid fa-terminal hover:text-cyan-500 transition-colors cursor-help"></i>
          <i className="fa-solid fa-microchip hover:text-cyan-500 transition-colors cursor-help"></i>
          <i className="fa-solid fa-satellite-dish hover:text-cyan-500 transition-colors cursor-help"></i>
        </div>
        <p className="text-slate-600 font-bold text-[9px] uppercase tracking-[0.4em]">
          &copy; MMXXIV NEURAL-OPS // STRATEGIC ALLIANCE // ENCRYPTED CONNECTION
        </p>
      </footer>
    </div>
  );
};

export default App;
