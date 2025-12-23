
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductsListProps {
  products: Record<string, Product>;
  onProductClick: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onAdd: () => void;
  onBack: () => void;
}

const ImageWithFallback: React.FC<{ src: string, alt: string, brand: string, className?: string }> = ({ src, alt, brand, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-quest-card to-black ${className} border border-white/5`}>
        <div className="relative">
          <span className="material-symbols-outlined text-5xl dynamic-accent opacity-20 animate-pulse">biotech</span>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-[14px] font-display font-black text-white/40">{brand[0]}</span>
          </div>
        </div>
        <span className="text-[8px] font-display font-black text-white/20 uppercase tracking-[0.3em] mt-2">Dossier Immagine</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className} bg-quest-card/20 overflow-hidden`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
           <div className="w-8 h-8 border-2 border-white/10 border-t-neon-cyan rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-80'}`} 
        onLoad={handleLoad}
        onError={handleError}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const ProductsList: React.FC<ProductsListProps> = ({ products, onProductClick, onDeleteProduct, onAdd, onBack }) => {
  const [isManageMode, setIsManageMode] = useState(false);

  const productArray = Object.values(products);

  return (
    <div className="flex-1 px-6 pt-12 pb-32 overflow-y-auto relative no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-display font-black italic tracking-tighter uppercase text-transparent bg-clip-text holo-gradient">Tesori</h2>
        <button 
          onClick={() => setIsManageMode(!isManageMode)}
          className={`h-10 px-4 rounded-xl font-display font-black text-[10px] uppercase tracking-widest transition-all ${isManageMode ? 'bg-neon-pink text-white shadow-neon-pink' : 'glass-panel text-white/40'}`}
        >
          {isManageMode ? 'Fine' : 'Gestisci'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* SCHEDA AGGIUNGI */}
        <div 
          onClick={onAdd}
          className="h-52 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 bg-white/5 active:scale-95 transition-all group hover:border-neon-cyan/50 hover:bg-neon-cyan/5"
        >
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:rotate-90 transition-transform duration-500">
            <span className="material-symbols-outlined text-3xl font-black">add</span>
          </div>
          <span className="text-[10px] font-display font-black uppercase tracking-widest text-white/40 group-hover:text-neon-cyan transition-colors">Nuovo Tesoro</span>
        </div>

        {/* LISTA PRODOTTI */}
        {productArray.map((p: Product) => (
          <div 
            key={p.id} 
            onClick={() => !isManageMode && onProductClick(p.id)}
            className={`glass-panel rounded-[2rem] border border-white/5 overflow-hidden transition-all group relative h-52 shadow-xl ${!isManageMode ? 'active:scale-95 cursor-pointer' : 'opacity-90'}`}
          >
            <div className="h-full w-full relative">
               <ImageWithFallback 
                 src={p.image} 
                 alt={p.name} 
                 brand={p.brand}
                 className="w-full h-full" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
               
               {isManageMode && (
                 <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onDeleteProduct(p.id);
                  }}
                  className="absolute top-3 right-3 h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white/20 active:scale-75 transition-transform z-20"
                 >
                    <span className="material-symbols-outlined text-xl font-black">close</span>
                 </button>
               )}

               <div className="absolute bottom-4 left-4 right-4">
                 <p className="text-[8px] uppercase font-display font-black tracking-[0.2em] text-neon-cyan mb-1">{p.brand}</p>
                 <h4 className="text-xs font-display font-bold leading-tight uppercase truncate text-white">{p.name}</h4>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {productArray.length === 0 && !isManageMode && (
         <div className="col-span-2 text-center py-20 opacity-20">
            <span className="material-symbols-outlined text-6xl mb-4">inventory_2</span>
            <p className="font-display font-black text-xs uppercase tracking-[0.3em]">Inventario Vuoto</p>
         </div>
      )}
    </div>
  );
};

export default ProductsList;
