
import React from 'react';
import { Player } from '../types';

interface PlayerTableProps {
  players: Player[];
  title: string;
  icon: string;
  variant?: 'alpha' | 'bravo';
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players, title, icon, variant }) => {
  const accentColor = variant === 'alpha' ? 'text-orange-500' : variant === 'bravo' ? 'text-blue-500' : 'text-cyan-500';
  const borderColor = variant === 'alpha' ? 'border-orange-500/30' : variant === 'bravo' ? 'border-blue-500/30' : 'border-slate-800';
  const headerBg = variant === 'alpha' ? 'bg-orange-950/20' : variant === 'bravo' ? 'bg-blue-950/20' : 'bg-slate-800';

  return (
    <div className={`bg-slate-900 rounded-xl shadow-lg overflow-hidden border ${borderColor} mb-8`}>
      <div className={`${headerBg} px-6 py-4 flex items-center justify-between border-b ${borderColor}`}>
        <h2 className="text-slate-100 font-bold text-xl flex items-center gap-3 text-sm md:text-xl">
          <i className={`fa-solid ${icon} ${accentColor}`}></i>
          {title}
        </h2>
        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">
          {players.length} ACTIFS
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 border-b border-slate-800">
              <th className="px-6 py-4 font-black text-[10px] uppercase tracking-[0.2em]">Pseudo</th>
              <th className="px-6 py-4 font-black text-[10px] uppercase tracking-[0.2em] text-right">Puissance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {players.map((player) => (
              <tr key={player.rank} className="hover:bg-slate-800/30 transition-colors duration-150 group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-600">#{player.rank}</span>
                    <span className="font-bold text-slate-200 group-hover:text-white transition-colors uppercase tracking-tight">
                      {player.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`font-black font-mono ${accentColor}`}>
                    {player.power.toLocaleString('fr-FR')}
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
