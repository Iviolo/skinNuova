
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { SECRET_DOSSIERS, SecretDossier } from '../constants';

interface LabProps {
  profile: UserProfile;
  onBack: () => void;
}

const Lab: React.FC<LabProps> = ({ profile, onBack }) => {
  const [selectedDossier, setSelectedDossier] = useState<SecretDossier | null>(null);

  const isUnlocked = (xpReq: number) => profile.xp >= xpReq;

  return (
    <div className="flex-1 flex flex-col bg-quest-dark overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
      <header className="p-6 pt-12 shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display font-black italic tracking-tighter uppercase text-transparent bg-clip-text holo-gradient">INTELLIGENCE</h2>
          <p className="text-[10px] font-display font-bold text-white/30 uppercase tracking-[0.3em] mt-1">Sincronizzazione Lab...</p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center dynamic-accent">
           <span className="material-symbols-outlined text-3xl animate-pulse">biotech</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
        {!selectedDossier ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-panel p-5 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent mb-6">
                <p className="text-[9px] text-white/40 leading-relaxed font-mono">
                  [SYSTEM_INFO]: Benvenuto nel modulo Intelligence. Qui puoi consultare i dati tecnici decriptati in base al tuo Grado Operativo ({profile.xp} XP).
                </p>
            </div>

            {SECRET_DOSSIERS.map((d) => {
              const unlocked = isUnlocked(d.xpRequired);
              return (
                <div 
                  key={d.id}
                  onClick={() => unlocked && setSelectedDossier(d)}
                  className={`glass-panel p-6 rounded-[2rem] border transition-all relative overflow-hidden group ${unlocked ? 'border-white/10 active:scale-95 cursor-pointer hover:bg-white/[0.03]' : 'border-white/5 opacity-40'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[8px] font-display font-black tracking-[0.3em] uppercase ${unlocked ? 'dynamic-accent' : 'text-white/20'}`}>
                      {unlocked ? d.category : 'FILE_CRITTOGRAFATO'}
                    </span>
                    {!unlocked && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                         <span className="material-symbols-outlined text-[10px] text-red-500">lock</span>
                         <span className="text-[8px] font-display font-bold text-red-500">{d.xpRequired} XP</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`font-display font-black text-sm uppercase italic mb-1 ${unlocked ? 'text-white' : 'text-white/20'}`}>
                    {unlocked ? d.title : `DOSSIER_${d.codeName}`}
                  </h3>
                  <p className="text-[9px] font-mono text-white/20">IDENT_CODE: {d.codeName}</p>

                  {unlocked && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-10 group-hover:right-4 transition-all">
                       <span className="material-symbols-outlined text-5xl">terminal</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedDossier(null)}
              className="flex items-center gap-2 text-[10px] font-display font-bold text-white/40 uppercase tracking-widest mb-8 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xs">arrow_back</span> Torna all'Archivio
            </button>

            <div className="glass-panel p-8 rounded-[3rem] border-2 dynamic-border bg-black relative">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <span className="material-symbols-outlined text-7xl italic font-black">TOP_SECRET</span>
               </div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="h-2 w-2 rounded-full dynamic-bg animate-pulse"></div>
                   <h2 className="text-2xl font-display font-black italic tracking-tighter uppercase leading-tight text-white text-glow-cyan">
                     {selectedDossier.title}
                   </h2>
                 </div>

                 <div className="space-y-4 font-mono text-[11px] leading-relaxed text-text-dim text-justify border-t border-white/10 pt-6">
                    <p className="whitespace-pre-line">
                      <span className="dynamic-accent opacity-50 block mb-2">[BEGIN_DECRYPTION_LOG...]</span>
                      {selectedDossier.content}
                      <span className="dynamic-accent opacity-50 block mt-4">[END_OF_FILE]</span>
                    </p>
                 </div>

                 <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="flex flex-col">
                       <span className="text-[8px] text-white/20 uppercase font-black">Codice Operativo</span>
                       <span className="text-[10px] font-display font-black text-white">{selectedDossier.codeName}</span>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center opacity-40">
                       <span className="material-symbols-outlined text-sm">verified_user</span>
                    </div>
                 </div>
               </div>
            </div>
            
            <p className="mt-6 text-center text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
               AVVISO: La divulgazione di questo dossier è punibile con il ban dal sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lab;
