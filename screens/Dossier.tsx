
import React, { useState, useMemo } from 'react';
import { DailyLog, SkinPhoto, UserProfile } from '../types';
import { getGallery, saveGallery, calculateStreak, calculateBestStreak, getLast30DaysActivity } from '../utils/storage';
import { NIGHT_THEMES } from '../constants';
import CalendarView from './CalendarView';

interface DossierProps {
  profile: UserProfile;
  logs: Record<string, DailyLog>;
  onBack: () => void;
}

const Dossier: React.FC<DossierProps> = ({ profile, logs, onBack }) => {
  const [activeTab, setActiveTab] = useState<'CAL' | 'STATS' | 'GALLERY'>('CAL');
  const [photos, setPhotos] = useState<SkinPhoto[]>(() => getGallery());
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Calcoli statistici reali
  const stats = useMemo(() => {
    const activity = getLast30DaysActivity(logs);
    const bestStreak = calculateBestStreak(logs);
    // Add explicit type for 'l' to resolve unknown type error
    const totalAM = Object.values(logs).filter((l: DailyLog) => l.amCompleted).length;
    const totalPM = Object.values(logs).filter((l: DailyLog) => l.pmCompleted).length;
    
    // Calcoliamo la media di costanza degli ultimi 30 giorni
    const avg30Days = Math.round((activity.reduce((a, b) => a + b, 0) / (30 * 100)) * 100);

    return {
      activity,
      bestStreak,
      totalAM,
      totalPM,
      avg30Days,
      totalXp: profile.xp
    };
  }, [logs, profile.xp]);

  const handleAddPhoto = () => {
    if (!newPhotoUrl) return;
    const newPhoto: SkinPhoto = {
      id: `photo_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      url: newPhotoUrl,
      note: ''
    };
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    saveGallery(updated);
    setNewPhotoUrl('');
  };

  const handleDeletePhoto = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    saveGallery(updated);
  };

  return (
    <div className="flex-1 flex flex-col bg-quest-dark overflow-hidden">
      <header className="p-6 pt-12 shrink-0">
        <h2 className="text-4xl font-display font-black italic tracking-tighter uppercase text-transparent bg-clip-text holo-gradient">Dossier</h2>
        
        <div className="flex mt-6 glass-panel rounded-2xl p-1 border border-white/5">
          <TabButton active={activeTab === 'CAL'} label="Calendario" onClick={() => setActiveTab('CAL')} />
          <TabButton active={activeTab === 'STATS'} label="Analisi" onClick={() => setActiveTab('STATS')} />
          <TabButton active={activeTab === 'GALLERY'} label="Galleria" onClick={() => setActiveTab('GALLERY')} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
        {activeTab === 'CAL' && <CalendarView logs={logs} onBack={onBack} />}
        
        {activeTab === 'STATS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-4">
              RENDIMENTO REALE <div className="flex-1 h-px bg-white/5"></div>
            </h3>
            
            <div className="glass-panel p-8 rounded-[2.5rem] border border-neon-cyan/20 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-neon-cyan">query_stats</span>
              </div>
              <p className="text-xs font-display font-bold uppercase tracking-widest text-white/40 mb-4">Costanza Ultimi 30 Giorni ({stats.avg30Days}%)</p>
              
              <div className="h-32 flex items-end justify-between gap-1 mb-6">
                {stats.activity.map((score, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center group relative">
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-700 ${score === 100 ? 'bg-neon-cyan shadow-[0_0_8px_#00f0ff]' : score === 50 ? 'bg-neon-cyan/40' : 'bg-white/5'}`} 
                        style={{ height: `${score === 0 ? 5 : score}%` }}
                      >
                      </div>
                      {/* Tooltip opzionale su hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                         {score}%
                      </div>
                   </div>
                ))}
              </div>
              
              <div className="flex justify-between border-t border-white/5 pt-6">
                <div>
                  <span className="text-[10px] block text-white/40 uppercase mb-1">Miglior Serie</span>
                  <span className="text-2xl font-display font-black text-neon-cyan italic">{stats.bestStreak} GG</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] block text-white/40 uppercase mb-1">XP Totali Effettivi</span>
                  <span className="text-2xl font-display font-black text-neon-lime italic">
                    {(stats.totalXp / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <StatCard title="Mattino" value={`${stats.totalAM}`} sub="Sessioni" color="neon-lime" />
               <StatCard title="Notte" value={`${stats.totalPM}`} sub="Sessioni" color="neon-pink" />
            </div>

            <div className="mt-6 glass-panel p-6 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
               <h4 className="text-[10px] font-display font-black text-white/20 uppercase tracking-widest mb-4 italic text-center">Integrità Dati</h4>
               <p className="text-[10px] text-white/40 leading-relaxed text-center italic">
                 Le statistiche mostrate sono estratte direttamente dal tuo database locale. <br/>
                 Nessun dato è simulato.
               </p>
            </div>
          </div>
        )}

        {activeTab === 'GALLERY' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 mb-8">
                <h3 className="text-[10px] font-display font-black uppercase tracking-widest text-neon-cyan mb-4 italic">Acquisisci Progresso</h3>
                <div className="flex gap-2">
                   <input 
                    type="text" 
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="Incolla URL foto pelle..."
                    className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 text-xs outline-none focus:border-neon-cyan/50 text-white"
                   />
                   <button 
                    onClick={handleAddPhoto}
                    className="h-12 w-12 bg-white text-black rounded-xl flex items-center justify-center active:scale-90 transition-transform"
                   >
                      <span className="material-symbols-outlined">add_a_photo</span>
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                {photos.map(p => (
                  <div key={p.id} className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel border border-white/5 group">
                    <img src={p.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-3 left-3">
                       <p className="text-[10px] font-display font-bold text-white uppercase tracking-widest">{p.date}</p>
                    </div>
                    <button 
                      onClick={() => handleDeletePhoto(p.id)}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-600/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                       <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
                {photos.length === 0 && (
                   <div className="col-span-2 py-20 text-center opacity-20">
                      <span className="material-symbols-outlined text-6xl mb-4">no_photography</span>
                      <p className="font-display font-black text-xs uppercase tracking-widest">Nessun reperto visivo</p>
                   </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean, label: string, onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 text-[10px] font-display font-black uppercase tracking-widest transition-all rounded-xl ${active ? 'bg-white text-black shadow-lg scale-95' : 'text-white/40 hover:text-white'}`}
  >
    {label}
  </button>
);

const StatCard: React.FC<{ title: string, value: string, sub: string, color: string }> = ({ title, value, sub, color }) => (
  <div className={`glass-panel p-5 rounded-[2rem] border border-${color}/20`}>
    <p className={`text-[10px] uppercase font-display font-bold tracking-widest text-${color} mb-1`}>{title}</p>
    <h4 className="text-3xl font-display font-black text-white italic leading-none">{value}</h4>
    <p className="text-[8px] uppercase font-bold text-white/10 mt-1">{sub}</p>
  </div>
);

export default Dossier;
