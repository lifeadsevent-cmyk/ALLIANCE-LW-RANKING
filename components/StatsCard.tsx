
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
  const accentColor = isAlpha ? 'text-orange-500' : 'text-blue-500';
  const progressColor = isAlpha ? 'bg-orange-500' : 'bg-blue-500';
  const borderColor = isAlpha ? 'border-orange-500' : 'border-blue-500';

  return (
    <div className={`bg-slate-900 rounded-lg border-t-2 ${borderColor} p-3 flex items-center gap-3 shadow-md`}>
      <div className={`p-2 rounded bg-slate-800 border border-slate-700 hidden sm:flex`}>
        <i className={`fa-solid ${icon} text-sm ${accentColor}`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="text-slate-500 text-[8px] font-black uppercase tracking-tighter truncate">{title}</h3>
          <span className={`text-[10px] font-black ${accentColor}`}>{stats.percentage}%</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-black text-slate-100">{stats.totalForce.toLocaleString('fr-FR')}</span>
          <span className="text-[8px] text-slate-600 uppercase font-bold">pts</span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
          <div 
            className={`h-full ${progressColor} transition-all duration-1000`} 
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
