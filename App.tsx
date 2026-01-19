
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
  const [activeView, setActiveView] = useState<ViewType>('UNITS');

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
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
      <div className="text-emerald-600 text-2xl animate-pulse font-bold flex flex-col items-center gap-4">
        <i className="fa-solid fa-compass-drafting fa-spin text-4xl"></i>
        CHARGEMENT DES DONNÉES...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <header className="bg-emerald-950 text-white pt-12 pb-24 px-6 shadow-2xl relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-800/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500 text-emerald-950 px-3 py-1 rounded text-xs font-black uppercase tracking-widest">Opération Alpha-Bravo</span>
                <span className="text-emerald-500/50">|</span>
                <span className="text-emerald-400 text-xs font-bold font-mono">STATUS: OPTIMAL</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter leading-none uppercase">
                Tactique <span className="text-emerald-400 italic">Guilde</span>
              </h1>
              <p className="text-emerald-200/60 text-lg font-medium max-w-xl">
                Système avancé de répartition des forces et analyse de puissance en temps réel.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-emerald-100 flex gap-2">
          <button 
            onClick={() => setActiveView('UNITS')}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
              activeView === 'UNITS' 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <i className="fa-solid fa-users-gear"></i>
            UNITÉS DE COMBAT
          </button>
          <button 
            onClick={() => setActiveView('RANKING')}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
              activeView === 'RANKING' 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <i className="fa-solid fa-list-ol"></i>
            CLASSEMENT GÉNÉRAL
          </button>
        </div>
      </nav>

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-6 mt-12 relative z-20">
        
        {activeView === 'UNITS' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <StatsCard 
                title="UNITÉ ALPHA (A)" 
                stats={alphaStats} 
                colorClass="border-orange-500 bg-orange-500" 
                icon="fa-fire-flame-curved"
              />
              <StatsCard 
                title="UNITÉ BRAVO (B)" 
                stats={bravoStats} 
                colorClass="border-blue-500 bg-blue-500" 
                icon="fa-shield-halved"
              />
            </div>

            {/* Units Tables */}
            <div className="space-y-12">
              <PlayerTable title="UNITÉ ALPHA — FORCE DE FRAPPE" icon="fa-person-military-pointing" players={alphaPlayers} />
              <PlayerTable title="UNITÉ BRAVO — SOUTIEN TACTIQUE" icon="fa-user-shield" players={bravoPlayers} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <PlayerTable title="REMPLAÇANTS ALPHA" icon="fa-clock" players={alphaSubs} />
                <PlayerTable title="REMPLAÇANTS BRAVO" icon="fa-clock" players={bravoSubs} />
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RankingTable players={players} />
          </div>
        )}

        {/* Global Stats Footer */}
        <div className="mt-20 bg-emerald-950 rounded-[2rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-8 opacity-10">
            <i className="fa-solid fa-shield-cat text-9xl"></i>
          </div>
          <div className="relative z-10 text-center space-y-8">
            <h3 className="text-3xl font-black">ANALYSE GLOBALE DU RÉSEAU</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="space-y-2">
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Total Force</p>
                <p className="text-4xl font-black tracking-tighter">{(alphaStats.totalForce + bravoStats.totalForce).toLocaleString('fr-FR')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Membres Actifs</p>
                <p className="text-4xl font-black tracking-tighter">40</p>
              </div>
              <div className="space-y-2">
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Effectif Réserve</p>
                <p className="text-4xl font-black tracking-tighter">{players.length - 40}</p>
              </div>
              <div className="space-y-2">
                <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Donations 24h</p>
                <p className="text-4xl font-black tracking-tighter">{(players.reduce((acc, p) => acc + p.donations, 0)).toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-24 pb-12 text-center">
        <div className="flex justify-center gap-6 mb-4 text-emerald-800/30">
          <i className="fa-solid fa-terminal"></i>
          <i className="fa-solid fa-microchip"></i>
          <i className="fa-solid fa-satellite"></i>
        </div>
        <p className="text-emerald-900/40 font-black text-[10px] uppercase tracking-[0.3em]">
          &copy; 2024 OPS-CENTER // ALLIANCE STRATÉGIQUE // TOUS DROITS RÉSERVÉS
        </p>
      </footer>
    </div>
  );
};

export default App;
