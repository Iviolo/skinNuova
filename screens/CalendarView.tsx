
import React from 'react';
import { DailyLog, NightType } from '../types';
import { NIGHT_THEMES } from '../constants';
import { calculateStreak } from '../utils/storage';

interface CalendarViewProps {
  logs: Record<string, DailyLog>;
  onBack: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ logs, onBack }) => {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

  // Offset per il calendario (0=Domenica, lo trasformiamo per iniziare da Lunedì)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: adjustedFirstDay }, (_, i) => i);

  const completedCount = Object.values(logs).filter((l: DailyLog) => l.amCompleted && l.pmCompleted).length;
  const currentStreak = calculateStreak(logs);

  return (
    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-panel p-6 rounded-[2.5rem] mb-8 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
           <h3 className="font-display font-black text-lg italic uppercase tracking-widest text-white/90">
             {now.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
           </h3>
           <div className="flex gap-1.5">
             <div className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse"></div>
             <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan/20"></div>
           </div>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-4">
          {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(d => (
            <div key={d} className="text-[10px] text-white/20 font-display font-black text-center mb-2">{d}</div>
          ))}
          {blanks.map(b => <div key={`b-${b}`} />)}
          {days.map(d => {
            const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const log = logs[dateStr];
            const nightTheme = log ? NIGHT_THEMES[log.nightType] : null;
            const isToday = d === now.getDate() && now.getMonth() === new Date().getMonth();
            
            return (
              <div 
                key={d} 
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-display font-bold transition-all relative
                  ${log?.pmCompleted ? `${nightTheme?.color} shadow-[0_0_10px_rgba(255,255,255,0.2)] text-black scale-105 z-10` : 'bg-black/20 text-white/40'}
                  ${isToday ? 'ring-2 ring-neon-cyan ring-offset-2 ring-offset-quest-dark' : ''}
                `}
              >
                {d}
                {log?.amCompleted && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_5px_rgba(250,204,21,0.5)]"></div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-[2rem] border border-white/5 bg-gradient-to-br from-quest-card/50 to-black/50">
          <p className="text-[10px] uppercase font-display font-bold tracking-widest text-white/30 mb-1">Costanza</p>
          <h4 className="text-3xl font-display font-black text-neon-cyan italic leading-none">
            {daysInMonth > 0 ? Math.round((completedCount/daysInMonth)*100) : 0}%
          </h4>
          <p className="text-[8px] uppercase font-bold text-white/10 mt-1">Target Mensile</p>
        </div>
        
        <div className="glass-panel p-5 rounded-[2rem] border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-black/50">
          <p className="text-[10px] uppercase font-display font-bold tracking-widest text-neon-pink mb-1">Serie Attiva</p>
          <h4 className="text-3xl font-display font-black text-white text-glow-pink italic leading-none">
            {currentStreak}
          </h4>
          <p className="text-[8px] uppercase font-bold text-white/20 mt-1">Giorni consecutivi</p>
        </div>
      </div>
      
      <div className="mt-8 glass-panel p-6 rounded-[2.5rem] border border-white/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-lime">
          <span className="material-symbols-outlined text-3xl">workspace_premium</span>
        </div>
        <div>
          <h5 className="text-[10px] uppercase font-display font-black tracking-widest text-white/40 mb-0.5">Prossimo Obiettivo</h5>
          <p className="text-xs font-medium text-white/80">Raggiungi 5 giorni di serie per +500 XP bonus!</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
