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
  const progressColor = isAlpha ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)]';
  const borderColor = isAlpha ? 'border-orange-500/40' : 'border-sky-500/40';
  const iconBg = isAlpha ? 'bg-orange-500/10' : 'bg-sky-500/10';

  return (
    <div className={`bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 flex items-center gap-5 shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300`}>
      {/* Background flare */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[40px] opacity-20 ${isAlpha ? 'bg-orange-500' : 'bg-sky-500'}`}></div>
      
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${borderColor} ${iconBg} transition-transform group-hover:rotate-12`}>
        <i className={`fa-solid ${icon} text-lg ${accentColor}`}></i>
      </div>
      
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex justify-between items-end mb-1">
          <div className="space-y-0.5">
            <h3 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">{title}</h3>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-100 tracking-tighter italic">
                {stats.totalForce.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Force</span>
            </div>
          </div>
          <div className="text-right">
             <span className={`text-xl font-black ${accentColor} italic`}>{stats.percentage}%</span>
             <p className="text-[7px] text-slate-600 font-bold uppercase leading-none">Ratio Total</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full ${progressColor} transition-all duration-1000 ease-out`} 
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <span className="text-[9px] font-black text-slate-500 uppercase flex-shrink-0">
             {stats.playerCount}U
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;