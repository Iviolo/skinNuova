
import React from 'react';
import { UserProfile, DailyLog, Screen, NightType } from '../types';
import { getTodayKey, getAutoNightType } from '../utils/storage';
import { NIGHT_THEMES } from '../constants';

const IvioloAvatar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" fill="#1E1035" stroke="currentColor" strokeWidth="2" className="dynamic-accent" />
    <path d="M40 160 Q100 140 160 160 L170 200 L30 200 Z" fill="#1A2B48" />
    <path d="M55 90 Q55 40 100 40 Q145 40 145 90 Q145 140 100 140 Q55 140 55 90" fill="#FFDBAC" />
    <path d="M58 105 Q58 145 100 150 Q142 145 142 105 L135 105 Q135 130 100 135 Q65 130 65 105 Z" fill="#4B3621" />
    <rect x="62" y="85" width="32" height="20" rx="4" fill="rgba(255, 165, 0, 0.8)" stroke="#333" strokeWidth="2" />
    <rect x="106" y="85" width="32" height="20" rx="4" fill="rgba(255, 165, 0, 0.8)" stroke="#333" strokeWidth="2" />
    <path d="M94 95 L106 95" stroke="#333" strokeWidth="3" />
  </svg>
);

interface HomeProps {
  profile: UserProfile;
  logs: Record<string, DailyLog>;
  onNavigate: (s: Screen) => void;
  onComplete: (type: 'am' | 'pm') => void;
  onProductClick: (id: string) => void;
  onCycleSwitch: () => void;
}

const Home: React.FC<HomeProps> = ({ profile, logs, onNavigate, onComplete, onProductClick, onCycleSwitch }) => {
  const todayKey = getTodayKey();
  const todayNightType = logs[todayKey]?.nightType || getAutoNightType();
  const todayLog = logs[todayKey] || { amCompleted: false, pmCompleted: false, nightType: todayNightType };

  const currentNight = NIGHT_THEMES[todayNightType];
  const currentLevel = Math.floor(profile.xp / 500) + 1;
  const xpInCurrentLevel = profile.xp % 500;
  const progressToNextLevel = (xpInCurrentLevel / 500) * 100;

  // Calcolo progresso verso l'obiettivo giornaliero
  const dailyXpEarned = (todayLog.amCompleted ? 100 : 0) + (todayLog.pmCompleted ? 100 : 0);
  const goalProgress = Math.min((dailyXpEarned / profile.settings.dailyXpGoal) * 100, 100);

  const isCompact = profile.settings.compactMode;

  return (
    <div className={`flex-1 overflow-y-auto no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10 ${isCompact ? 'px-4 pt-6 pb-24' : 'px-6 pt-10 pb-32'}`}>
      {/* HEADER */}
      <header className={`flex items-center justify-between ${isCompact ? 'mb-4' : 'mb-8'}`}>
        <div className="flex flex-col">
          <span className="dynamic-accent text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-1">
            SISTEMA: {profile.settings.audioEnabled ? 'ONLINE' : 'SILENT'}
          </span>
          <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-display font-black uppercase tracking-tighter italic leading-none`}>
            {profile.name} <span className="text-white/20">/ HUD</span>
          </h2>
        </div>
        <div className="relative group cursor-pointer" onClick={() => onNavigate('SAGGEZZA')}>
          <div className="absolute -inset-1 dynamic-bg rounded-full opacity-40 blur animate-pulse"></div>
          <div className={`${isCompact ? 'w-12 h-12' : 'w-16 h-16'} relative rounded-full bg-quest-dark border border-white/20 overflow-hidden`}>
            <IvioloAvatar className="w-full h-full" />
          </div>
        </div>
      </header>

      {/* MISSION GOAL TRACKER (NUOVO) */}
      <div className="mb-6 glass-panel rounded-2xl p-4 border border-white/5 flex items-center gap-4">
        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center dynamic-bg text-black`}>
           <span className="material-symbols-outlined font-black">target</span>
        </div>
        <div className="flex-1">
           <div className="flex justify-between items-end mb-1">
             <span className="text-[9px] font-display font-black text-white/40 uppercase tracking-widest">Target Giornaliero</span>
             <span className="text-[10px] font-display font-black text-white italic">{dailyXpEarned} / {profile.settings.dailyXpGoal} XP</span>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full dynamic-bg transition-all duration-1000" style={{ width: `${goalProgress}%` }}></div>
           </div>
        </div>
      </div>

      {/* LEVEL HUD */}
      <section className={isCompact ? 'mb-4' : 'mb-8'}>
        <div className={`glass-panel rounded-3xl ${isCompact ? 'p-4' : 'p-6'} border-2 dynamic-border shadow-[0_0_20px_rgba(var(--accent-color),0.1)] bg-gradient-to-br from-quest-card/90 to-black`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl dynamic-bg flex items-center justify-center text-black shadow-lg`}>
                <span className="material-symbols-outlined font-black">military_tech</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest">Rango Operativo</span>
                <span className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-display font-black text-white italic tracking-tighter leading-none`}>
                  LVL {currentLevel}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-display font-bold text-white/40 uppercase tracking-widest">Totali</span>
              <div className="text-xl font-display font-black dynamic-accent italic">{profile.xp} XP</div>
            </div>
          </div>
          <div className="relative h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
            <div className="h-full dynamic-bg transition-all duration-1000" style={{ width: `${progressToNextLevel}%` }}></div>
          </div>
        </div>
      </section>

      {/* CYCLE CARD */}
      <section className={isCompact ? 'mb-4' : 'mb-8'}>
        <div className={`relative overflow-hidden rounded-3xl glass-panel ${isCompact ? 'p-4' : 'p-6'} shadow-2xl border-white/5`}>
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-8xl font-black italic">CYCLE</span>
           </div>
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4].map(n => (
                  <div key={n} className={`h-1 flex-1 rounded-full transition-all ${todayNightType === n ? 'dynamic-bg dynamic-glow' : 'bg-white/5'}`}></div>
                ))}
              </div>
              <h3 className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-display font-black leading-none mb-2 uppercase italic`}>
                 NOTTE <span className={`dynamic-accent ${isCompact ? 'text-3xl' : 'text-4xl'} transform -skew-x-12 inline-block`}>{todayNightType}</span>
              </h3>
              <p className="text-text-dim text-xs font-medium italic opacity-70 mb-4">{currentNight.label}</p>
              <button onClick={() => onNavigate('PM_OVERVIEW')} className="text-[9px] font-display font-black text-white uppercase tracking-[0.3em] flex items-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all">
                Dettagli Ciclo <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
           </div>
        </div>
      </section>

      {/* QUEST BUTTONS */}
      <section className="space-y-3">
        <QuestButton 
          title="PROTOCOLLO AM" 
          status={todayLog.amCompleted ? 'COMPLETATO' : 'ATTIVO'} 
          completed={todayLog.amCompleted}
          icon="wb_sunny"
          onClick={() => onNavigate('AM')}
          isCompact={isCompact}
        />
        <QuestButton 
          title={`NOTTE ${todayNightType}: ${currentNight.label.toUpperCase()}`} 
          status={todayLog.pmCompleted ? 'COMPLETATO' : 'ATTIVO'} 
          completed={todayLog.pmCompleted}
          icon="nights_stay"
          onClick={() => onNavigate('NIGHT_DETAIL')}
          isCompact={isCompact}
        />
      </section>
    </div>
  );
};

const QuestButton: React.FC<{ title: string, status: string, completed: boolean, icon: string, onClick: () => void, isCompact: boolean }> = ({ title, status, completed, icon, onClick, isCompact }) => (
  <div 
    onClick={onClick}
    className={`glass-panel rounded-2xl flex items-center gap-4 transition-all active:scale-95 border-l-4 ${completed ? 'opacity-30 grayscale' : 'border-l-[var(--accent-color)] neon-border-cyan'} ${isCompact ? 'p-3' : 'p-5'}`}
  >
    <div className={`shrink-0 ${isCompact ? 'w-10 h-10 text-xl' : 'w-14 h-14 text-2xl'} rounded-xl bg-white/5 flex items-center justify-center dynamic-accent`}>
       <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
       <h4 className={`${isCompact ? 'text-xs' : 'text-sm'} font-display font-black truncate`}>{title}</h4>
       <p className="text-[9px] font-display font-black tracking-widest dynamic-accent italic">{status}</p>
    </div>
    {completed && <span className="material-symbols-outlined dynamic-accent">check_circle</span>}
  </div>
);

export default Home;
