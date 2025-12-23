
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

const IvioloAvatar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" fill="#1E1035" stroke="#00F0FF" strokeWidth="2" />
    <path d="M40 160 Q100 140 160 160 L170 200 L30 200 Z" fill="#1A2B48" />
    <path d="M55 90 Q55 40 100 40 Q145 40 145 90 Q145 140 100 140 Q55 140 55 90" fill="#FFDBAC" />
    <path d="M58 105 Q58 145 100 150 Q142 145 142 105 L135 105 Q135 130 100 135 Q65 130 65 105 Z" fill="#4B3621" />
    <rect x="62" y="85" width="32" height="20" rx="4" fill="rgba(255, 165, 0, 0.8)" stroke="#333" strokeWidth="2" />
    <rect x="106" y="85" width="32" height="20" rx="4" fill="rgba(255, 165, 0, 0.8)" stroke="#333" strokeWidth="2" />
    <path d="M94 95 L106 95" stroke="#333" strokeWidth="3" />
  </svg>
);

interface SettingsProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ profile, onUpdateProfile, onBack }) => {
  // Usiamo uno stato locale per gestire l'input in modo fluido senza ricaricare l'App ad ogni tasto
  const [formData, setFormData] = useState({
    name: profile.name,
    skinType: profile.skinType
  });

  // Aggiorna il profilo globale quando l'utente cambia i valori locali
  const handleChange = (field: 'name' | 'skinType', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    onUpdateProfile({ ...profile, [field]: value });
  };

  return (
    <div className="flex-1 px-6 pt-12 pb-32 overflow-y-auto no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-display font-black italic tracking-tighter uppercase">Saggezza</h2>
        <div className="w-14 h-14 rounded-full border border-neon-cyan/30 p-1 bg-black/40">
           <IvioloAvatar className="w-full h-full" />
        </div>
      </div>

      <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="material-symbols-outlined text-6xl">settings_accessibility</span>
         </div>

         <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/40 mb-8 italic">Profilo Operativo</h3>
         
         <div className="flex flex-col gap-6">
            <div className="relative">
               <label className="text-[10px] uppercase font-display font-black text-neon-pink ml-2 mb-2 block tracking-widest">Codice Identificativo</label>
               <input 
                 type="text"
                 value={formData.name} 
                 onChange={(e) => handleChange('name', e.target.value)}
                 placeholder="Inserisci nome..."
                 className="w-full bg-black/40 py-5 px-6 rounded-2xl border border-white/5 outline-none focus:border-neon-pink/50 transition-all font-display font-bold text-xl text-white placeholder:text-white/10"
               />
               <div className="absolute right-4 bottom-4 opacity-20">
                  <span className="material-symbols-outlined">fingerprint</span>
               </div>
            </div>

            <div className="relative">
               <label className="text-[10px] uppercase font-display font-black text-neon-cyan ml-2 mb-2 block tracking-widest">Analisi Tessutale (Pelle)</label>
               <input 
                 type="text"
                 value={formData.skinType} 
                 onChange={(e) => handleChange('skinType', e.target.value)}
                 placeholder="Esempio: Mista, Secca..."
                 className="w-full bg-black/40 py-5 px-6 rounded-2xl border border-white/5 outline-none focus:border-neon-cyan/50 transition-all font-display font-bold text-xl text-white placeholder:text-white/10"
               />
               <div className="absolute right-4 bottom-4 opacity-20">
                  <span className="material-symbols-outlined">biotech</span>
               </div>
            </div>
         </div>
      </div>

      <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 mb-8">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/40 italic">Configurazione HUD</h3>
            <span className="material-symbols-outlined text-neon-lime text-sm">notifications_active</span>
         </div>
         <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
            <span className="font-display font-bold text-xs uppercase tracking-widest text-white/80">Notifiche Sync</span>
            <div className="w-12 h-6 bg-neon-lime/20 rounded-full relative flex items-center px-1 border border-neon-lime/50">
               <div className="w-4 h-4 bg-neon-lime rounded-full shadow-[0_0_10px_#ccff00]"></div>
            </div>
         </div>
      </div>

      <div className="glass-panel p-6 rounded-[2.5rem] border border-red-500/20 bg-red-500/[0.03] mb-12">
         <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-red-500/50 mb-6 italic">Protocollo Tabula Rasa</h3>
         <button 
           onClick={() => {
             if(window.confirm("Sei sicuro di voler resettare tutti i progressi XP e i log?")) {
               localStorage.clear();
               window.location.reload();
             }
           }}
           className="w-full py-5 rounded-2xl border border-red-500/30 text-red-500 font-display font-black uppercase text-xs tracking-[0.2em] active:bg-red-500 active:text-white transition-all shadow-lg hover:bg-red-500/10"
         >
            Resetta Dati Sistema
         </button>
      </div>
      
      <p className="text-center text-[10px] font-display font-bold text-white/10 uppercase tracking-[0.5em] pb-10">
        Glam Quest v2.0.4 - Agente Iviolo
      </p>
    </div>
  );
};

export default Settings;
