import React from 'react';
import { TeamStats } from '../types';

interface StatsCardProps {
  title: string;
  stats: TeamStats;
  colorClass: string;
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats, colorClass, icon }) => {
  const isAlpha = title.includes('ALPHA');
  const accentColor = isAlpha ? 'text-orange-500' : 'text-sky-400';
  const progressColor = isAlpha ? 'bg-orange-500' : 'bg-sky-500';
  const borderColor = isAlpha ? 'border-orange-500/40' : 'border-sky-500/40';
  const iconBg = isAlpha ? 'bg-orange-500/10' : 'bg-sky-500/10';

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-slate-800 p-4 md:p-5 flex items-center gap-3 md:gap-5 shadow-xl relative overflow-hidden group transition-all duration-300">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex-shrink-0 flex items-center justify-center border ${borderColor} ${iconBg}`}>
        <i className={`fa-solid ${icon} text-base md:text-lg ${accentColor}`}></i>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-end mb-1">
          <div className="space-y-0.5">
            <h3 className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">{title}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-black text-slate-100 tracking-tighter italic">
                {stats.totalForce.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-[9px] text-slate-600 font-black uppercase">Force</span>
            </div>
          </div>
          <div className="text-right">
             <span className={`text-lg md:text-xl font-black ${accentColor}`}>{stats.percentage}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 bg-slate-800 h-1 rounded-full overflow-hidden">
            <div 
              className={`h-full ${progressColor} transition-all duration-1000`} 
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase flex-shrink-0">
             {stats.playerCount}U
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;