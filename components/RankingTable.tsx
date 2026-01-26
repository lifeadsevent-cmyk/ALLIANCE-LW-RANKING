import React, { useMemo } from 'react';
import { Player, TeamType } from '../types';

interface RankingTableProps {
  players: Player[];
}

const RankingTable: React.FC<RankingTableProps> = ({ players }) => {
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.finalScore - a.finalScore);
  }, [players]);

  const getTeamBadge = (team: TeamType) => {
    switch (team) {
      case TeamType.ALPHA:
        return <span className="bg-orange-500/10 text-orange-500 px-2 md:px-3 py-1 rounded-md text-[9px] font-black border border-orange-500/20 tracking-widest uppercase">ALPHA</span>;
      case TeamType.BRAVO:
        return <span className="bg-sky-500/10 text-sky-400 px-2 md:px-3 py-1 rounded-md text-[9px] font-black border border-sky-500/20 tracking-widest uppercase">BRAVO</span>;
      case TeamType.SUBSTITUTE_ALPHA:
      case TeamType.SUBSTITUTE_BRAVO:
        return <span className="bg-slate-800 text-slate-400 px-2 md:px-3 py-1 rounded-md text-[9px] font-black border border-slate-700 tracking-widest uppercase">REMP</span>;
      default:
        return <span className="bg-slate-800/30 text-slate-600 px-2 md:px-3 py-1 rounded-md text-[9px] font-black tracking-widest uppercase">RÉSERVE</span>;
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl md:rounded-[2rem] shadow-2xl overflow-hidden border border-slate-800/50">
      {/* Header adaptable */}
      <div className="bg-slate-800/20 px-4 md:px-10 py-6 md:py-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-white text-xl md:text-2xl font-black flex items-center justify-center md:justify-start gap-3 italic uppercase tracking-tighter">
            <i className="fa-solid fa-ranking-star text-emerald-400"></i>
            Analyse Comparative
          </h2>
          <p className="text-emerald-500/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black">
            Données Tactiques Consolidées // {players.length} Unités
          </p>
        </div>
        
        {/* Stats rapides en-tête */}
        <div className="bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800/50 shadow-inner w-full md:w-auto">
           <div className="flex items-center justify-around md:justify-start gap-4 md:divide-x md:divide-slate-800">
              <div className="text-center md:pr-4">
                 <span className="block text-[8px] font-black text-slate-500 uppercase mb-0.5">Moyenne</span>
                 <span className="text-emerald-400 font-black text-base md:text-lg tracking-tight">39 138</span>
              </div>
              <div className="text-center md:pl-4">
                 <span className="block text-[8px] font-black text-slate-500 uppercase mb-0.5">Top Score</span>
                 <span className="text-amber-400 font-black text-base md:text-lg tracking-tight">{sortedPlayers[0]?.finalScore.toFixed(0)}</span>
              </div>
           </div>
        </div>
      </div>

      {/* VUE MOBILE : Liste de cartes */}
      <div className="block md:hidden">
        <div className="divide-y divide-slate-800/50">
          {sortedPlayers.map((player, index) => (
            <div key={`${player.name}-${player.rank}`} className="p-4 flex items-center justify-between hover:bg-emerald-500/[0.03] active:bg-emerald-500/[0.05] transition-colors">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`
                    flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs
                    ${index === 0 ? 'bg-amber-500 text-amber-950 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 
                      index === 1 ? 'bg-slate-300 text-slate-950' : 
                      index === 2 ? 'bg-orange-400 text-orange-950' : 
                      'text-slate-600 border border-slate-800'}
                  `}>
                  {index + 1}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-black text-slate-200 uppercase text-xs truncate tracking-tight">{player.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-emerald-500/60 font-black tracking-widest">{player.finalScore.toFixed(1)} PTS</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">UID:{player.rank}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {getTeamBadge(player.team)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VUE DESKTOP : Tableau complet */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-950/30 text-slate-500 border-b border-slate-800">
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest">Rang</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest">Commandant</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest text-right">Donations</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest text-right">VS Value</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest text-right">Puissance</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest text-center bg-emerald-500/[0.02]">Notes (D/V/F)</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest text-center">Score Final</th>
              <th className="px-6 py-5 font-black text-[10px] uppercase tracking-widest text-center">Assignation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {sortedPlayers.map((player, index) => (
              <tr key={`${player.name}-${player.rank}`} className="hover:bg-emerald-500/[0.03] transition-all duration-150 group">
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs
                    ${index === 0 ? 'bg-amber-500 text-amber-950 ring-4 ring-amber-500/20' : 
                      index === 1 ? 'bg-slate-300 text-slate-950 ring-4 ring-slate-300/20' : 
                      index === 2 ? 'bg-orange-400 text-orange-950 ring-4 ring-orange-400/20' : 
                      'text-slate-600 border border-slate-800'}
                  `}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex flex-col">
                      <span className="font-black text-slate-200 uppercase text-xs group-hover:text-emerald-400 transition-colors tracking-tight">{player.name}</span>
                      <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">UID: {player.rank.toString().padStart(3, '0')}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-black text-slate-300 text-[11px] font-mono">{player.donations.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-black text-slate-300 text-[11px] font-mono">{player.vsValue.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-black text-slate-300 text-[11px] font-mono">{player.power.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-6 py-4 text-center bg-emerald-500/[0.01]">
                   <div className="flex items-center justify-center gap-2">
                      <span className="text-[9px] text-slate-500 font-bold">{player.noteDonations.toFixed(0)}</span>
                      <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                      <span className="text-[9px] text-slate-500 font-bold">{player.noteVS.toFixed(0)}</span>
                      <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                      <span className="text-[9px] text-slate-500 font-bold">{player.noteForce.toFixed(0)}</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-black text-xs shadow-sm">
                      {player.finalScore.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {getTeamBadge(player.team)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;