
import React from 'react';
import { Player, TeamType } from '../types';

interface PlayerTableProps {
  players: Player[];
  title: string;
  icon: string;
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players, title, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 mb-8">
      <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-white font-bold text-xl flex items-center gap-3">
          <i className={`fa-solid ${icon}`}></i>
          {title}
        </h2>
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
          {players.length} Joueurs
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50 text-emerald-800 border-b border-emerald-100">
              <th className="px-6 py-4 font-semibold text-sm">Rang</th>
              <th className="px-6 py-4 font-semibold text-sm">Joueur</th>
              <th className="px-6 py-4 font-semibold text-sm">Donations</th>
              <th className="px-6 py-4 font-semibold text-sm">Note Force</th>
              <th className="px-6 py-4 font-semibold text-sm">Note VS</th>
              <th className="px-6 py-4 font-semibold text-sm">Score Final</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Unité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {players.map((player) => (
              <tr key={player.rank} className="hover:bg-emerald-50 transition-colors duration-150 group">
                <td className="px-6 py-4 text-emerald-600 font-bold">#{player.rank}</td>
                <td className="px-6 py-4 font-medium text-emerald-900 group-hover:text-emerald-700">{player.name}</td>
                <td className="px-6 py-4 text-emerald-800">{player.donations.toLocaleString('fr-FR')}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-emerald-700">{player.noteForce.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4 text-emerald-600">{player.noteVS.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-mono text-sm">
                    {player.finalScore.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${player.team === TeamType.ALPHA ? 'bg-orange-100 text-orange-700 border border-orange-200' : ''}
                    ${player.team === TeamType.BRAVO ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                    ${player.team.includes('REMPLAÇANT') ? 'bg-slate-100 text-slate-500 border border-slate-200' : ''}
                  `}>
                    {player.team === TeamType.ALPHA ? 'ALPHA' : player.team === TeamType.BRAVO ? 'BRAVO' : 'SUB'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerTable;
