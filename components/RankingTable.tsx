
import React from 'react';
import { Player, TeamType } from '../types';

interface RankingTableProps {
  players: Player[];
}

const RankingTable: React.FC<RankingTableProps> = ({ players }) => {
  const getTeamBadge = (team: TeamType) => {
    switch (team) {
      case TeamType.ALPHA:
        return <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold">ALPHA</span>;
      case TeamType.BRAVO:
        return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">BRAVO</span>;
      case TeamType.SUBSTITUTE_ALPHA:
      case TeamType.SUBSTITUTE_BRAVO:
        return <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">SUB</span>;
      default:
        return <span className="bg-emerald-50 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">RESERVE</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
      <div className="bg-emerald-800 px-8 py-6">
        <h2 className="text-white text-2xl font-black flex items-center gap-3">
          <i className="fa-solid fa-trophy text-yellow-400"></i>
          CLASSEMENT GÉNÉRAL DES SURVIVANTS
        </h2>
        <p className="text-emerald-200 text-sm mt-1 uppercase tracking-widest font-semibold">Base de données complète — {players.length} recrues</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50 text-emerald-900 border-b-2 border-emerald-100">
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Rang</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Joueur</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Donations</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Force</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Note VS</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Score Final</th>
              <th className="px-6 py-4 font-black text-xs uppercase tracking-tighter">Unité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {players.map((player) => (
              <tr key={player.rank} className="hover:bg-emerald-50/80 transition-all duration-100 group">
                <td className="px-6 py-3">
                  <span className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm
                    ${player.rank <= 3 ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-200' : 'text-emerald-600'}
                  `}>
                    {player.rank}
                  </span>
                </td>
                <td className="px-6 py-3">
                   <div className="flex flex-col">
                      <span className="font-bold text-emerald-950 group-hover:text-emerald-600 transition-colors">{player.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">ID-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                   </div>
                </td>
                <td className="px-6 py-3 font-medium text-emerald-800">{player.donations.toLocaleString('fr-FR')}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, player.noteForce / 2)}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-emerald-700">{player.noteForce.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-emerald-600 font-semibold">{player.noteVS.toFixed(1)}</td>
                <td className="px-6 py-3">
                  <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-black text-xs">
                    {player.finalScore.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-3">
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
