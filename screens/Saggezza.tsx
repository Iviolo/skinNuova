
import React, { useState } from 'react';
import { UserProfile, DailyLog, Product, AppSettings } from '../types';
import { ACHIEVEMENTS } from '../constants';

const IvioloAvatar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" fill="#1E1035" stroke="currentColor" strokeWidth="2" className="dynamic-accent" />
    <path d="M40 160 Q100 140 160 160 L170 200 L30 200 Z" fill="#1A2B48" />
    <circle cx="100" cy="100" r="40" fill="#FFDBAC" />
    <rect x="70" y="85" width="20" height="10" fill="orange" opacity="0.8" />
    <rect x="110" y="85" width="20" height="10" fill="orange" opacity="0.8" />
  </svg>
);

interface SaggezzaProps {
  profile: UserProfile;
  logs: Record<string, DailyLog>;
  products: Record<string, Product>;
  onUpdateProfile: (p: UserProfile) => void;
  onResetProducts: () => void;
  onHardReset: () => void;
  onBack: () => void;
}

const Saggezza: React.FC<SaggezzaProps> = ({ profile, logs, products, onUpdateProfile, onResetProducts, onHardReset, onBack }) => {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'CONFIG' | 'ACHIEVEMENTS'>('PROFILE');
  const [resetStep, setResetStep] = useState<0 | 1>(0); // 0 = Iniziale, 1 = Conferma richiesta

  const updateSettings = (updates: Partial<AppSettings>) => {
    onUpdateProfile({
      ...profile,
      settings: { ...profile.settings, ...updates }
    });
    if (profile.settings.hapticFeedback && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  const handleResetAction = () => {
    if (resetStep === 0) {
      setResetStep(1);
      if (profile.settings.hapticFeedback) window.navigator.vibrate?.([50, 50, 50]);
    } else {
      onHardReset();
    }
  };

  const isCompact = profile.settings.compactMode;

  return (
    <div className={`flex-1 flex flex-col no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10 ${isCompact ? 'px-4 pt-6 pb-20' : 'px-6 pt-10 pb-32'}`}>
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className={`${isCompact ? 'text-3xl' : 'text-4xl'} font-display font-black italic tracking-tighter uppercase text-transparent bg-clip-text holo-gradient`}>Saggezza</h2>
        <div className={`${isCompact ? 'w-10 h-10' : 'w-14 h-14'} rounded-full border dynamic-border p-1 bg-black/40`}>
           <IvioloAvatar className="w-full h-full" />
        </div>
      </div>

      <div className="flex mb-8 glass-panel rounded-2xl p-1 border border-white/5 shrink-0">
        <TabNav active={activeTab === 'PROFILE'} label="Profilo" onClick={() => { setActiveTab('PROFILE'); setResetStep(0); }} />
        <TabNav active={activeTab === 'CONFIG'} label="Config" onClick={() => { setActiveTab('CONFIG'); setResetStep(0); }} />
        <TabNav active={activeTab === 'ACHIEVEMENTS'} label="Imprese" onClick={() => { setActiveTab('ACHIEVEMENTS'); setResetStep(0); }} />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {activeTab === 'PROFILE' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
              <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                  <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/40 mb-8 italic">Anagrafica Agente</h3>
                  <div className="flex flex-col gap-6">
                      <div>
                        <label className="text-[10px] uppercase font-display font-black dynamic-accent ml-2 mb-2 block tracking-widest">Codice Identificativo</label>
                        <input 
                            type="text"
                            value={profile.name} 
                            onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                            className="w-full bg-black/40 py-5 px-6 rounded-2xl border border-white/5 outline-none focus:border-current dynamic-accent transition-all font-display font-bold text-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-display font-black dynamic-accent ml-2 mb-2 block tracking-widest">Analisi Tessutale</label>
                        <input 
                            type="text"
                            value={profile.skinType} 
                            onChange={(e) => onUpdateProfile({ ...profile, skinType: e.target.value })}
                            className="w-full bg-black/40 py-5 px-6 rounded-2xl border border-white/5 outline-none focus:border-current dynamic-accent transition-all font-display font-bold text-xl text-white"
                        />
                      </div>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] font-display font-black text-white/40 uppercase tracking-widest mb-1 italic">Grado</h4>
                    <p className="text-2xl font-display font-black text-white italic tracking-tighter">LVL {Math.floor(profile.xp / 500) + 1}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[10px] font-display font-black text-white/40 uppercase tracking-widest mb-1 italic">Esperienza</h4>
                    <p className="text-2xl font-display font-black dynamic-accent italic tracking-tighter">{profile.xp} XP</p>
                  </div>
              </div>
          </div>
        )}

        {activeTab === 'CONFIG' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10">
                  <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/40 mb-6 italic">HUD Color Sync</h3>
                  <div className="flex justify-between px-2">
                    <ColorCircle color="bg-neon-pink" active={profile.settings.hudColor === 'neon-pink'} onClick={() => updateSettings({hudColor: 'neon-pink'})} />
                    <ColorCircle color="bg-neon-cyan" active={profile.settings.hudColor === 'neon-cyan'} onClick={() => updateSettings({hudColor: 'neon-cyan'})} />
                    <ColorCircle color="bg-neon-lime" active={profile.settings.hudColor === 'neon-lime'} onClick={() => updateSettings({hudColor: 'neon-lime'})} />
                    <ColorCircle color="bg-gem-amethyst" active={profile.settings.hudColor === 'gem-amethyst'} onClick={() => updateSettings({hudColor: 'gem-amethyst'})} />
                    <ColorCircle color="bg-gem-ruby" active={profile.settings.hudColor === 'gem-ruby'} onClick={() => updateSettings({hudColor: 'gem-ruby'})} />
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 space-y-4">
                  <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/40 mb-4 italic">Manutenzione Sistema</h3>
                  <button 
                    onClick={onResetProducts}
                    className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-[10px] font-display font-black uppercase tracking-[0.2em] dynamic-accent flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">sync</span> Sincronizza Foto Prodotti
                  </button>
                  <div className="h-px bg-white/5 my-2"></div>
                  <ConfigToggle label="Feedback Audio" active={profile.settings.audioEnabled} onClick={() => updateSettings({audioEnabled: !profile.settings.audioEnabled})} />
                  <ConfigToggle label="Vibrazione Tattile" active={profile.settings.hapticFeedback} onClick={() => updateSettings({hapticFeedback: !profile.settings.hapticFeedback})} />
                  <ConfigToggle label="Interfaccia Compatta" active={profile.settings.compactMode} onClick={() => updateSettings({compactMode: !profile.settings.compactMode})} />
              </div>

              <div className="glass-panel p-6 rounded-[2.5rem] border border-red-500/20 bg-red-500/[0.03] mb-12">
                <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-red-500/50 mb-6 italic">Protocollo Tabula Rasa</h3>
                <button 
                  onClick={handleResetAction}
                  className={`w-full py-5 rounded-2xl border-2 font-display font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg
                    ${resetStep === 0 
                      ? 'border-red-500/30 text-red-500 hover:bg-red-500/10' 
                      : 'border-red-500 bg-red-600 text-white animate-pulse'
                    }`}
                >
                    <span className="material-symbols-outlined">{resetStep === 0 ? 'restart_alt' : 'priority_high'}</span>
                    {resetStep === 0 ? 'Resetta Cicli e Punti' : 'CONFERMA RESET XP'}
                </button>
                {resetStep === 1 && (
                  <button 
                    onClick={() => setResetStep(0)}
                    className="w-full mt-2 text-[8px] text-white/30 uppercase font-black tracking-widest py-2"
                  >
                    Annulla Operazione
                  </button>
                )}
                <p className="text-[8px] text-center text-red-500/40 uppercase font-black mt-3 tracking-widest">
                  {resetStep === 0 ? 'Resetta solo XP e Cronologia. I prodotti rimarranno.' : 'STAI PER AZZERARE XP E CICLI. PROCEDERE?'}
                </p>
              </div>
          </div>
        )}

        {activeTab === 'ACHIEVEMENTS' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
              <div className="flex flex-col gap-4">
                  {ACHIEVEMENTS.map(ach => {
                      const isUnlocked = ach.condition(profile, logs, products);
                      return (
                          <div key={ach.id} className={`glass-panel p-4 rounded-[1.5rem] border transition-all duration-500 flex items-center gap-4 ${isUnlocked ? 'border-current dynamic-accent bg-white/[0.02]' : 'border-white/5 opacity-30 grayscale'}`}>
                              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl shadow-2xl ${isUnlocked ? 'dynamic-bg text-black' : 'bg-white/5 text-white/20'}`}>
                                  <span className="material-symbols-outlined">{ach.icon}</span>
                              </div>
                              <div className="flex-1">
                                  <h4 className={`font-display font-black italic uppercase leading-tight text-xs ${isUnlocked ? 'text-white' : 'text-white/40'}`}>{ach.title}</h4>
                                  <p className="text-[9px] text-white/30 font-medium leading-tight">{ach.desc}</p>
                              </div>
                              {isUnlocked && <span className="material-symbols-outlined dynamic-accent">verified</span>}
                          </div>
                      );
                  })}
              </div>
          </div>
        )}
      </div>
      
      <p className="text-center text-[9px] font-display font-bold text-white/10 uppercase tracking-[0.5em] shrink-0 mt-4">
        SYSTEM-CORE v5.0.0 // PROTOCOLLO SAGGEZZA
      </p>
    </div>
  );
};

const TabNav: React.FC<{ active: boolean, label: string, onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 text-[10px] font-display font-black uppercase tracking-widest transition-all rounded-xl ${active ? `dynamic-bg text-black shadow-lg scale-95` : 'text-white/30'}`}
  >
    {label}
  </button>
);

const ColorCircle: React.FC<{ color: string, active: boolean, onClick: () => void }> = ({ color, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`h-8 w-8 rounded-full ${color} transition-all border-2 ${active ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}
  />
);

const ConfigToggle: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <div className="flex items-center justify-between">
    <span className="text-[11px] font-display font-bold text-white/80 uppercase tracking-widest">{label}</span>
    <button 
      onClick={onClick}
      className={`h-5 w-10 rounded-full transition-all relative border border-white/10 ${active ? 'bg-current dynamic-accent opacity-50' : 'bg-black/40'}`}
    >
      <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all ${active ? 'left-6 dynamic-bg' : 'left-0.5 bg-white/20'}`} />
    </button>
  </div>
);

export default Saggezza;
