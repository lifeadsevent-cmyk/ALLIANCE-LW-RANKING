
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
  const headerBg = variant === 'alpha' ? 'bg-orange-950/40' : variant === 'bravo' ? 'bg-blue-950/40' : 'bg-slate-800';
  const itemHover = variant === 'alpha' ? 'hover:bg-orange-500/5' : variant === 'bravo' ? 'hover:bg-blue-500/5' : 'hover:bg-cyan-500/5';

  return (
    <div className={`bg-slate-900 rounded-md shadow-lg overflow-hidden border ${borderColor} mb-2`}>
      {/* Header compact */}
      <div className={`${headerBg} px-3 py-1.5 flex items-center justify-between border-b ${borderColor}`}>
        <h2 className="text-slate-100 font-black text-[11px] flex items-center gap-1.5 uppercase tracking-tight">
          <i className={`fa-solid ${icon} ${accentColor}`}></i>
          {title}
        </h2>
        <span className="text-slate-500 text-[8px] font-black uppercase">
          {players.length}U
        </span>
      </div>

      {/* Grid Display: 2 Players per row */}
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-800/30">
        {players.map((player) => (
          <div 
            key={player.rank} 
            className={`flex items-center justify-between px-2 py-1.5 ${itemHover} transition-colors group min-w-0`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[7px] font-mono text-slate-700 flex-shrink-0">#{player.rank}</span>
              <span className="font-bold text-slate-300 text-[9px] uppercase truncate group-hover:text-white transition-colors">
                {player.name}
              </span>
            </div>
            <div className="flex-shrink-0 pl-1 text-right">
              <span className={`font-bold font-mono text-[9px] ${accentColor}`}>
                {Math.floor(player.power / 1000)}k
              </span>
            </div>
          </div>
        ))}
        {/* Fill empty grid spot if odd number of players */}
        {players.length % 2 !== 0 && (
          <div className="bg-slate-900/50"></div>
        )}
      </div>
    </div>
  );
};

export default PlayerTable;
