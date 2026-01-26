import React, { useMemo } from 'react';
import { Player, TeamType } from '../types';

interface RankingTableProps {
  players: Player[];
}

const RankingTable: React.FC<RankingTableProps> = ({ players }) => {
  // Tri par Score Power (finalScore) descendant
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.finalScore - a.finalScore);
  }, [players]);

  const getTeamBadge = (team: TeamType) => {
    switch (team) {
      case TeamType.ALPHA:
        return <span className="bg-orange-950/50 text-orange-400 px-2 py-0.5 rounded text-[10px] font-bold border border-orange-500/30">ALPHA</span>;
      case TeamType.BRAVO:
        return <span className="bg-blue-950/50 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-500/30">BRAVO</span>;
      case TeamType.SUBSTITUTE_ALPHA:
      case TeamType.SUBSTITUTE_BRAVO:
        return <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-700">SUB</span>;
      default:
        return <span className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">RESERVE</span>;
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
      <div className="bg-slate-800/50 px-8 py-6 border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-white text-2xl font-black flex items-center gap-3">
            <i className="fa-solid fa-trophy text-amber-500"></i>
            TABLEAU D'ANALYSE TACTIQUE
          </h2>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-black tracking-tighter opacity-60">
            SYSTÈME NEURAL-OPS // MOYENNE HEBDO : 39 138 // {players.length} COMMANDANTS ACTIFS
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-800/30 text-slate-500 border-b border-slate-700">
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest">Rang</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest">Commandant</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-right">Donations</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-right">VS</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-right">Puissance</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-center bg-slate-800/20">Note Don.</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-center bg-slate-800/20">Note VS</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-center bg-slate-800/20">Note Force</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-center">Score Final</th>
              <th className="px-4 py-4 font-black text-[9px] uppercase tracking-widest text-center">Unité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sortedPlayers.map((player, index) => (
              <tr key={`${player.name}-${player.rank}`} className="hover:bg-slate-800/50 transition-all duration-100 group">
                <td className="px-4 py-3">
                  <span className={`
                    inline-flex items-center justify-center w-6 h-6 rounded font-black text-[10px]
                    ${index < 3 ? 'bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/50' : 'text-slate-600'}
                  `}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                   <div className="flex flex-col">
                      <span className="font-black text-slate-200 uppercase text-[11px] group-hover:text-cyan-400 transition-colors">{player.name}</span>
                      <span className="text-[7px] text-slate-600 font-bold uppercase tracking-tighter">ID: #{player.rank}</span>
                   </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-black text-slate-300 text-[10px]">{player.donations.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-black text-slate-300 text-[10px]">{player.vsValue.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-black text-slate-300 text-[10px]">{player.power.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-4 py-3 text-center bg-slate-800/10">
                  <span className="text-slate-400 font-bold text-[10px]">{player.noteDonations.toFixed(2)}</span>
                </td>
                <td className="px-4 py-3 text-center bg-slate-800/10">
                  <span className="text-slate-400 font-bold text-[10px]">{player.noteVS.toFixed(2)}</span>
                </td>
                <td className="px-4 py-3 text-center bg-slate-800/10">
                  <span className="text-slate-400 font-bold text-[10px]">{player.noteForce.toFixed(2)}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="inline-block px-2 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 font-black text-[10px] shadow-[0_0_10px_rgba(34,211,238,0.05)]">
                    {player.finalScore.toFixed(2)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
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