
import React from 'react';
import { TeamStats } from '../types';

interface StatsCardProps {
  title: string;
  stats: TeamStats;
  colorClass: string;
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats, colorClass, icon }) => {
  // Extract colors from tailwind classes provided
  const isAlpha = title.includes('ALPHA');
  const accentColor = isAlpha ? 'text-orange-500' : 'text-blue-500';
  const progressColor = isAlpha ? 'bg-orange-500' : 'bg-blue-500';
  const borderColor = isAlpha ? 'border-orange-500' : 'border-blue-500';

  return (
    <div className={`bg-slate-900 rounded-xl shadow-xl border-t-2 ${borderColor} p-6 flex items-start gap-4 transition-transform hover:translate-y-[-4px]`}>
      <div className={`p-3 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700`}>
        <i className={`fa-solid ${icon} text-xl ${accentColor}`}></i>
      </div>
      <div className="flex-1">
        <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</h3>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black text-slate-100">{stats.totalForce.toLocaleString('fr-FR')} <span className="text-xs text-slate-600 font-normal">PTS</span></span>
          <span className={`text-lg font-black ${accentColor}`}>{stats.percentage}%</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2 text-slate-400">
              <i className="fa-solid fa-users"></i>
              <span>{stats.playerCount} Membres</span>
            </div>
            <div className="text-slate-500">
              {stats.avgDonations.toLocaleString('fr-FR')} <span className="font-normal opacity-50">dons/avg</span>
            </div>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full ${progressColor} shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all duration-1000`} 
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
