
import React from 'react';
import { Player, TeamType } from '../types';

interface RankingTableProps {
  players: Player[];
}

const RankingTable: React.FC<RankingTableProps> = ({ players }) => {
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
      <div className="bg-slate-800/50 px-8 py-6 border-b border-slate-700">
        <h2 className="text-white text-2xl font-black flex items-center gap-3">
          <i className="fa-solid fa-trophy text-amber-500"></i>
          CLASSEMENT GÉNÉRAL DES SURVIVANTS
        </h2>
        <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-semibold">Registre de Guilde — {players.length} Unités Répertoriées</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/30 text-slate-400 border-b border-slate-700">
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Rang</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Pseudo</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Donation</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">VS</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Puissance</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest">Power Score</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-widest text-center">Unité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {players.map((player) => (
              <tr key={player.rank} className="hover:bg-slate-800/50 transition-all duration-100 group">
                <td className="px-6 py-3">
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm
                    ${player.rank <= 3 ? 'bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/50' : 'text-slate-500'}
                  `}>
                    {player.rank}
                  </span>
                </td>
                <td className="px-6 py-3">
                   <div className="flex flex-col">
                      <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{player.name}</span>
                      <span className="text-[10px] text-slate-600 font-mono uppercase">ID-{player.name.substring(0,2).toUpperCase()}-{player.rank}</span>
                   </div>
                </td>
                <td className="px-6 py-3 font-medium text-slate-300">{player.donations.toLocaleString('fr-FR')}</td>
                <td className="px-6 py-3 text-cyan-500 font-semibold">{player.noteVS.toFixed(1)}</td>
                <td className="px-6 py-3">
                  <span className="text-slate-400 font-mono text-xs">{player.power.toLocaleString('fr-FR')}</span>
                </td>
                <td className="px-6 py-3">
                  <span className="bg-indigo-600/30 text-indigo-400 px-3 py-1 rounded-lg font-black text-xs border border-indigo-500/20">
                    {player.finalScore.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-3 text-center">
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
