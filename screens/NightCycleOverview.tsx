
import React from 'react';
import { NightType, NightTheme } from '../types';

interface NightCycleOverviewProps {
  activeNight: NightType;
  themes: Record<number, NightTheme>;
  onSelectNight: (type: NightType) => void;
  onActivateNight: (type: NightType) => void;
  onBack: () => void;
}

const NightCycleOverview: React.FC<NightCycleOverviewProps> = ({ activeNight, themes, onSelectNight, onActivateNight, onBack }) => {
  return (
    <div className="flex-1 px-6 pt-12 pb-32 overflow-y-auto no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
      <header className="flex items-center justify-between mb-10">
         <button onClick={onBack} className="h-10 w-10 glass-panel rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
           <span className="material-symbols-outlined">arrow_back</span>
         </button>
         <h2 className="text-xl font-display font-black uppercase tracking-tighter italic text-transparent bg-clip-text holo-gradient">Mappa del Ciclo</h2>
         <div className="h-10 w-10" />
      </header>

      <div className="relative">
         <div className="absolute left-[2.25rem] top-10 bottom-10 w-px bg-white/10"></div>

         <div className="flex flex-col gap-10">
            {[NightType.EXFOLIATION, NightType.RENEWAL, NightType.REPAIR, NightType.DEEP_REPAIR].map((type) => {
              const theme = themes[type];
              if (!theme) return null;
              const isActive = activeNight === type;

              return (
                <div 
                  key={type}
                  className={`flex items-start gap-6 transition-all duration-500 ${isActive ? 'scale-105' : 'opacity-40'}`}
                >
                  <div 
                    onClick={() => onActivateNight(type)}
                    className={`z-10 h-[4.5rem] w-[4.5rem] glass-panel rounded-[2rem] flex items-center justify-center border-2 transition-all shrink-0 cursor-pointer ${isActive ? `${theme.border} ${theme.glow}` : 'border-white/5 active:border-white/30'}`}
                  >
                     <span className={`text-2xl font-display font-black italic ${isActive ? theme.text : 'text-white/20'}`}>{type}</span>
                  </div>
                  
                  <div className={`flex-1 glass-panel p-6 rounded-[2.5rem] border relative overflow-hidden ${isActive ? theme.border : 'border-white/5'}`}>
                     <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-[10px] font-display font-black uppercase tracking-widest ${isActive ? theme.text : 'text-white/40'}`}>{theme.label}</h4>
                        <button 
                          onClick={() => onSelectNight(type)}
                          className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 active:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                     </div>
                     <h3 className="font-display font-black text-lg leading-tight mb-2 italic uppercase">{theme.title.split(': ')[1] || theme.title}</h3>
                     <p className="text-[11px] text-white/40 leading-relaxed italic">{theme.desc}</p>
                     
                     {!isActive && (
                        <button 
                          onClick={() => onActivateNight(type)}
                          className="mt-4 text-[8px] font-display font-black text-white/20 uppercase tracking-[0.2em] hover:text-white transition-colors"
                        >
                          Seleziona come attivo
                        </button>
                     )}
                  </div>
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
};

export default NightCycleOverview;
