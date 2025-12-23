
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onDelete: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onDelete }) => {
  const [imgError, setImgError] = useState(false);
  if (!product) return null;

  return (
    <div className="flex-1 flex flex-col bg-quest-dark overflow-y-auto pb-40 no-scrollbar">
      <div className="relative h-[55vh]">
         {!imgError ? (
           <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
           />
         ) : (
           <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-quest-card to-black">
              <span className="material-symbols-outlined text-8xl opacity-10 mb-4 animate-pulse">biotech</span>
              <span className="text-2xl font-display font-black dynamic-accent opacity-30 uppercase tracking-[0.5em]">{product.brand}</span>
           </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-quest-dark via-quest-dark/20 to-transparent"></div>
         
         <div className="absolute top-12 left-6 right-6 flex justify-between">
            <button onClick={onBack} className="h-12 w-12 glass-panel rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={() => {
                if(window.confirm("Rimuovere questo tesoro dall'inventario?")) onDelete();
              }}
              className="h-12 w-12 glass-panel rounded-2xl flex items-center justify-center text-red-500 active:scale-90 transition-transform"
            >
                <span className="material-symbols-outlined">delete_forever</span>
            </button>
         </div>
         
         <div className="absolute bottom-8 left-6 right-6">
            <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-display font-black uppercase tracking-[0.2em] dynamic-accent mb-4 inline-block italic">
               {product.category}
            </span>
            <h1 className="text-4xl font-display font-black italic tracking-tighter leading-none mb-2 uppercase">{product.brand}</h1>
            <h2 className="text-xl font-body font-medium text-white/60 tracking-tight leading-tight">{product.name}</h2>
         </div>
      </div>

      <div className="px-6 flex flex-col gap-6 -mt-4">
         {/* DOSSIER TECNICO SECTION */}
         <section className="glass-panel p-6 rounded-[2.5rem] border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-5xl">biotech</span>
            </div>
            <h3 className="text-[10px] font-display font-black uppercase tracking-widest dynamic-accent mb-6 italic">Scheda Laboratorio</h3>
            
            <div className="space-y-4">
               {product.activeIngredient && (
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase font-display font-bold text-white/30 tracking-widest">Attivo Principale</span>
                    <p className="text-sm font-display font-bold text-white">{product.activeIngredient}</p>
                 </div>
               )}
               {product.texture && (
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase font-display font-bold text-white/30 tracking-widest">Texture</span>
                    <p className="text-xs text-white/70 italic font-medium">{product.texture}</p>
                 </div>
               )}
               {product.technicalFunction && (
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase font-display font-bold text-white/30 tracking-widest">Funzione Clinica</span>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">{product.technicalFunction}</p>
                 </div>
               )}
            </div>
         </section>

         {/* PROTOCOLLO SECTION */}
         <section className="glass-panel p-6 rounded-[2.5rem] border border-white/5">
            <h3 className="text-[10px] font-display font-black uppercase tracking-widest text-white/40 mb-3 italic">Istruzioni Operative</h3>
            <p className="text-text-dim italic leading-relaxed font-medium text-sm">{product.usageNotes || 'Nessuna specifica inserita.'}</p>
         </section>

         {/* SAFETY SECTION */}
         {product.safetyWarnings && (
          <section className="glass-panel p-6 rounded-[2.5rem] border border-red-500/20 bg-red-500/[0.03]">
              <h3 className="text-[10px] font-display font-black uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2 italic">
                <span className="material-symbols-outlined text-sm">warning</span> Direttive Sicurezza
              </h3>
              <p className="text-text-dim italic leading-relaxed font-medium text-xs">{product.safetyWarnings}</p>
          </section>
         )}
      </div>
    </div>
  );
};

export default ProductDetail;
