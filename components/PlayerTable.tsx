import React from 'react';
import { Player } from '../types';

interface PlayerTableProps {
  players: Player[];
  title: string;
  icon: string;
  variant?: 'alpha' | 'bravo';
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players, title, icon, variant }) => {
  const isAlpha = variant === 'alpha';
  const accentColor = isAlpha ? 'text-orange-500' : 'text-sky-500';
  const borderColor = isAlpha ? 'border-orange-500/20' : 'border-sky-500/20';
  const headerBg = isAlpha ? 'bg-orange-500/5' : 'bg-sky-500/5';
  const itemHover = isAlpha ? 'hover:bg-orange-500/5' : 'hover:bg-sky-500/5';
  const scoreBg = isAlpha ? 'bg-orange-500/10' : 'bg-sky-500/10';

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-slate-800/80 mb-1 md:mb-2 transition-all">
      <div className={`${headerBg} px-4 py-3 md:px-5 md:py-4 flex items-center justify-between border-b border-slate-800`}>
        <h2 className="text-slate-100 font-black text-[11px] md:text-[12px] flex items-center gap-2 md:gap-3 uppercase tracking-wider">
          <i className={`fa-solid ${icon} ${accentColor}`}></i>
          {title}
        </h2>
        <span className={`px-2 py-0.5 rounded-full ${isAlpha ? 'bg-orange-500/20 text-orange-400' : 'bg-sky-500/20 text-sky-400'} text-[9px] md:text-[10px] font-black`}>
          {players.length} UNITS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-slate-800/50">
        {players.map((player) => (
          <div 
            key={player.rank} 
            className={`flex items-center justify-between px-4 py-2.5 ${itemHover} transition-colors group min-w-0`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[9px] font-black text-slate-700 w-4 md:w-5 flex-shrink-0">#{player.rank}</span>
              <div className="flex flex-col min-w-0">
                 <span className="font-black text-slate-300 text-[11px] uppercase truncate tracking-tight">
                   {player.name}
                 </span>
                 <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest hidden md:block">Combat Ready</span>
              </div>
            </div>
            <div className={`flex-shrink-0 ml-2 px-2 py-1 rounded-lg ${scoreBg} border ${borderColor}`}>
              <span className={`font-black font-mono text-[10px] ${accentColor}`}>
                {Math.floor(player.power / 1000).toLocaleString('fr-FR')}k
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerTable;