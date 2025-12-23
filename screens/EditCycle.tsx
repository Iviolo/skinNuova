
import React, { useState } from 'react';
import { NightType, Product } from '../types';
import { NIGHT_THEMES } from '../constants';

interface EditCycleProps {
  type: NightType | 'AM';
  currentProducts: string[];
  allProducts: Record<string, Product>;
  onSave: (type: NightType | 'AM', productIds: string[]) => void;
  onBack: () => void;
}

const EditCycle: React.FC<EditCycleProps> = ({ type, currentProducts, allProducts, onSave, onBack }) => {
  const [selected, setSelected] = useState<string[]>(currentProducts);
  
  const isAM = type === 'AM';
  const theme = !isAM ? NIGHT_THEMES[type as number] : {
    label: 'Mattino',
    text: 'text-neon-lime',
    border: 'border-neon-lime'
  };

  const toggleProduct = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSelected = [...selected];
    [newSelected[index - 1], newSelected[index]] = [newSelected[index], newSelected[index - 1]];
    setSelected(newSelected);
  };

  const moveDown = (index: number) => {
    if (index === selected.length - 1) return;
    const newSelected = [...selected];
    [newSelected[index + 1], newSelected[index]] = [newSelected[index], newSelected[index + 1]];
    setSelected(newSelected);
  };

  const availableProducts = Object.values(allProducts).filter(p => !selected.includes(p.id));

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="h-10 w-10 glass-panel rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center">
            <h2 className="text-[10px] font-display font-black text-white/40 uppercase tracking-[0.3em] mb-1 italic">Protocollo {isAM ? 'Giorno' : `Notte ${type}`}</h2>
            <h3 className={`text-xl font-display font-black italic uppercase ${theme.text}`}>{theme.label}</h3>
        </div>
        <div className="w-10"></div>
      </div>

      {/* PRODOTTI SELEZIONATI (CON ORDINAMENTO) */}
      <div className="glass-panel p-6 rounded-[2.5rem] border-2 dynamic-border mb-8 bg-gradient-to-br from-white/[0.05] to-transparent">
        <h4 className="text-[10px] font-display font-black text-white/80 uppercase tracking-widest mb-6 block ml-1 italic">Ordine di Applicazione</h4>
        
        {selected.length === 0 ? (
          <p className="text-center py-4 text-xs font-display font-bold text-white/20 uppercase tracking-widest">Nessun prodotto selezionato</p>
        ) : (
          <div className="flex flex-col gap-3">
            {selected.map((pid, index) => {
              const p = allProducts[pid];
              if (!p) return null;
              return (
                <div key={pid} className="flex items-center gap-4 p-4 rounded-2xl border border-white/20 bg-white/5 relative">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <img src={p.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-display font-black dynamic-accent uppercase truncate">{p.brand}</p>
                    <h5 className="text-xs font-display font-bold text-white uppercase truncate">{p.name}</h5>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${index === 0 ? 'opacity-10' : 'bg-white/10 text-white'}`}
                    >
                      <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                    </button>
                    <button 
                      onClick={() => moveDown(index)}
                      disabled={index === selected.length - 1}
                      className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${index === selected.length - 1 ? 'opacity-10' : 'bg-white/10 text-white'}`}
                    >
                      <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => toggleProduct(pid)}
                    className="h-8 w-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center ml-2"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* INVENTARIO DISPONIBILE */}
      <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 mb-8">
        <h4 className="text-[10px] font-display font-black text-white/40 uppercase tracking-widest mb-6 block ml-1 italic">Inventario Tesori</h4>
        <div className="flex flex-col gap-3">
          {availableProducts.length === 0 ? (
            <p className="text-center py-4 text-xs font-display font-bold text-white/10 uppercase tracking-widest">Tutti i prodotti sono già in uso</p>
          ) : (
            availableProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => toggleProduct(p.id)}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-black/20 opacity-60 hover:opacity-100 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <img src={p.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] font-display font-black text-white/40 uppercase truncate">{p.brand}</p>
                  <h5 className="text-xs font-display font-bold text-white/60 uppercase truncate">{p.name}</h5>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/5 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">add</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-10 left-6 right-6 z-50">
        <button 
          onClick={() => onSave(type as any, selected)}
          className="w-full h-16 bg-white text-black font-display font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
        >
          SALVA PROTOCOLLO
        </button>
      </div>
    </div>
  );
};

export default EditCycle;
