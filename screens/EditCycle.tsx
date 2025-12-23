
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

  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="h-10 w-10 glass-panel rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center">
            <h2 className="text-[10px] font-display font-black text-white/40 uppercase tracking-[0.3em] mb-1 italic">Protocollo {isAM ? 'Giorno' : `Notte ${type}`}</h2>
            <h3 className={`text-xl font-display font-black italic uppercase ${theme.text}`}>{theme.label}</h3>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 mb-8">
        <h4 className="text-[10px] font-display font-black text-white/60 uppercase tracking-widest mb-6 block ml-1 italic">Inventario Disponibile</h4>
        
        <div className="flex flex-col gap-3">
            {Object.values(allProducts).map((p: Product) => {
                const isSelected = selected.includes(p.id);
                return (
                    <div 
                        key={p.id}
                        onClick={() => toggle(p.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/5 opacity-50'}`}
                    >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                            <img src={p.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[8px] font-display font-black text-neon-cyan uppercase truncate">{p.brand}</p>
                            <h5 className="text-xs font-display font-bold text-white uppercase truncate">{p.name}</h5>
                        </div>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-neon-lime border-neon-lime' : 'border-white/10'}`}>
                            {isSelected && <span className="material-symbols-outlined text-black text-sm font-black">check</span>}
                        </div>
                    </div>
                );
            })}
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
