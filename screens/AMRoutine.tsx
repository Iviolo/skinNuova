
import React, { useState } from 'react';
import { Product } from '../types';

interface AMRoutineProps {
  amProducts: string[];
  allProducts: Record<string, Product>;
  onComplete: () => void;
  onBack: () => void;
  onProductClick: (id: string) => void;
  onEdit: () => void;
}

const AMRoutine: React.FC<AMRoutineProps> = ({ amProducts, allProducts, onComplete, onBack, onProductClick, onEdit }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (id: string) => {
    const next = new Set(completedSteps);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompletedSteps(next);
  };

  const allDone = completedSteps.size === amProducts.length && amProducts.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-quest-dark overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20">
      <div className="p-6 pt-12 flex items-center justify-between z-10">
        <button onClick={onBack} className="h-10 w-10 glass-panel rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
           <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-sm font-display font-bold uppercase tracking-[0.3em] text-white/60 italic">Operazione Giorno</h2>
        <button onClick={onEdit} className="h-10 w-10 glass-panel rounded-full flex items-center justify-center text-neon-lime active:scale-90 transition-transform">
           <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-40 no-scrollbar">
        <header className="mb-10 p-8 glass-panel rounded-[2.5rem] text-center border-l-4 border-l-neon-lime relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5 font-display font-black italic text-9xl text-neon-lime">
            AM
          </div>
          <div className="text-4xl mb-4 animate-float">✨</div>
          <h1 className="text-3xl font-display font-black italic tracking-tighter uppercase leading-tight text-white text-glow-cyan">
            Risveglio <span className="text-neon-lime">Radioso</span>
          </h1>
          <p className="text-text-dim text-sm mt-3 leading-relaxed relative z-10 font-medium">Protezione e idratazione: i tuoi scudi attivi per la giornata.</p>
        </header>

        <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-4">
           EQUIPAGGIAMENTO <div className="flex-1 h-px bg-white/5"></div>
        </h3>

        {amProducts.length === 0 ? (
          <div className="text-center py-10 opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">inventory_2</span>
            <p className="font-display font-bold text-xs uppercase tracking-widest">Nessun prodotto nel protocollo</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {amProducts.map((pid, index) => {
              const product = allProducts[pid];
              if (!product) return null;
              const isDone = completedSteps.has(pid);
              return (
                <div 
                  key={pid}
                  onClick={() => toggleStep(pid)}
                  className={`glass-panel p-5 rounded-3xl border transition-all duration-500 flex items-center gap-5 cursor-pointer ${isDone ? 'opacity-50 border-white/5 scale-95' : 'hover:border-white/20 border-transparent'}`}
                >
                  <div className="relative shrink-0">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden bg-black/40 border border-white/10" onClick={(e) => { e.stopPropagation(); onProductClick(pid); }}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute -top-2 -left-2 h-7 w-7 bg-neon-lime text-quest-dark text-[10px] font-display font-black rounded-lg flex items-center justify-center shadow-lg shadow-neon-lime/20`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-[10px] font-display font-bold tracking-widest text-neon-lime mb-1 uppercase">{product.category}</h4>
                    <h3 className="font-display font-bold leading-tight text-white mb-1">{product.brand}</h3>
                    <p className="text-text-dim text-xs leading-tight mb-2 font-medium">{product.name}</p>
                  </div>

                  <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all ${isDone ? 'bg-neon-lime border-neon-lime' : 'border-white/10'}`}>
                    {isDone && <span className="material-symbols-outlined text-quest-dark text-xl font-black">check</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-6 z-50">
        <button 
          onClick={() => { if(allDone) { onComplete(); onBack(); } }}
          disabled={!allDone}
          className={`w-full h-16 rounded-2xl font-display font-black text-lg uppercase tracking-widest transition-all overflow-hidden relative shadow-2xl ${allDone ? 'bg-white text-black shadow-neon-cyan' : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'}`}
        >
          {allDone && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {allDone ? 'ARCHIVIA MATTINA ✨' : amProducts.length === 0 ? 'PROTOCOLLO VUOTO' : `${completedSteps.size} / ${amProducts.length} ATTIVATI`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AMRoutine;
