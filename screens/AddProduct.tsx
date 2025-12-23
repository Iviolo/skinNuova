
import React, { useState } from 'react';
import { Product } from '../types';

interface AddProductProps {
  onAdd: (p: Product) => void;
  onBack: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onAdd, onBack }) => {
  const [form, setForm] = useState({
    brand: '',
    name: '',
    category: 'TRATTAMENTO',
    image: '',
    usageNotes: '',
    safetyWarnings: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brand || !form.name) return;
    
    const newProduct: Product = {
      ...form,
      id: `prod_${Date.now()}`,
      color: 'text-neon-pink'
    };
    onAdd(newProduct);
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-32 overflow-y-auto no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="h-10 w-10 glass-panel rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-display font-black italic uppercase tracking-tighter">Nuovo Tesoro</h2>
        <div className="w-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10">
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-display font-black text-neon-pink uppercase tracking-widest block mb-2 ml-1">Brand</label>
              <input 
                type="text" 
                value={form.brand}
                onChange={e => setForm({...form, brand: e.target.value})}
                placeholder="es: The Ordinary"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none focus:border-neon-pink/50 font-display font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-display font-black text-neon-cyan uppercase tracking-widest block mb-2 ml-1">Nome Prodotto</label>
              <input 
                type="text" 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="es: Retinolo 0.5%"
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none focus:border-neon-cyan/50 font-display font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] font-display font-black text-neon-lime uppercase tracking-widest block mb-2 ml-1">URL Immagine</label>
              <input 
                type="text" 
                value={form.image}
                onChange={e => setForm({...form, image: e.target.value})}
                placeholder="https://..."
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none focus:border-neon-lime/50 text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-display font-black text-white/40 uppercase tracking-widest block mb-2 ml-1">Categoria</label>
              <select 
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none font-display font-bold appearance-none"
              >
                <option value="PULIZIA">PULIZIA</option>
                <option value="ESFOLIANTE">ESFOLIANTE</option>
                <option value="RINNOVO">RINNOVO</option>
                <option value="IDRATAZIONE">IDRATAZIONE</option>
                <option value="PROTEZIONE">PROTEZIONE</option>
                <option value="BOOSTER">BOOSTER</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10">
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-display font-black text-white/40 uppercase tracking-widest block mb-2 ml-1">Note d'Uso</label>
              <textarea 
                value={form.usageNotes}
                onChange={e => setForm({...form, usageNotes: e.target.value})}
                rows={3}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-5 text-white outline-none focus:border-white/20 font-medium text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-display font-black text-red-500 uppercase tracking-widest block mb-2 ml-1">Avvertenze</label>
              <textarea 
                value={form.safetyWarnings}
                onChange={e => setForm({...form, safetyWarnings: e.target.value})}
                rows={2}
                className="w-full bg-black/40 border border-red-500/10 rounded-2xl py-4 px-5 text-white outline-none focus:border-red-500/30 font-medium text-sm"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full h-16 bg-white text-black font-display font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 transition-all"
        >
          ARCHIVIA TESORO
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
