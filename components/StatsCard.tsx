
import React from 'react';
import { TeamStats } from '../types';

interface StatsCardProps {
  title: string;
  stats: TeamStats;
  colorClass: string;
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats, colorClass, icon }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border-l-4 ${colorClass} p-6 flex items-start gap-4 transition-transform hover:scale-[1.02]`}>
      <div className={`p-3 rounded-lg bg-opacity-10 bg-current flex items-center justify-center`}>
        <i className={`fa-solid ${icon} text-xl ${colorClass.replace('border-', 'text-')}`}></i>
      </div>
      <div className="flex-1">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black text-slate-800">{stats.totalForce.toLocaleString('fr-FR')} pts</span>
          <span className={`text-lg font-bold ${colorClass.replace('border-', 'text-')}`}>{stats.percentage}%</span>
        </div>
        <div className="mt-3 flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-1 text-slate-600">
            <i className="fa-solid fa-users text-slate-400"></i>
            {stats.playerCount} Joueurs
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <i className="fa-solid fa-hand-holding-heart text-slate-400"></i>
            {stats.avgDonations.toLocaleString('fr-FR')} dons (avg)
          </div>
        </div>
        <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full ${colorClass.replace('border-', 'bg-')}`} 
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
