
import React from 'react';

const IvioloAvatar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Sfondo cerchio */}
    <circle cx="100" cy="100" r="95" fill="#1E1035" stroke="#FF0099" strokeWidth="2" />
    
    {/* Giacca Tattica */}
    <path d="M40 160 Q100 140 160 160 L170 200 L30 200 Z" fill="#1A2B48" />
    <path d="M85 155 L100 190 L115 155" fill="none" stroke="#FF0099" strokeWidth="1" opacity="0.5" />
    <circle cx="70" cy="175" r="3" fill="#CCFF00" />
    <circle cx="130" cy="175" r="3" fill="#CCFF00" />

    {/* Testa Calva */}
    <path d="M55 90 Q55 40 100 40 Q145 40 145 90 Q145 140 100 140 Q55 140 55 90" fill="#FFDBAC" />
    
    {/* Barba Folta */}
    <path d="M58 105 Q58 145 100 150 Q142 145 142 105 L135 105 Q135 130 100 135 Q65 130 65 105 Z" fill="#4B3621" />
    <path d="M90 120 Q100 130 110 120" fill="none" stroke="#3A2A1A" strokeWidth="3" />
    
    {/* Occhiali Neon Ambra */}
    <rect x="62" y="85" width="32" height="20" rx="4" fill="rgba(255, 165, 0, 0.8)" stroke="#333" strokeWidth="2" />
    <rect x="106" y="85" width="32" height="20" rx="4" fill="rgba(255, 165, 0, 0.8)" stroke="#333" strokeWidth="2" />
    <path d="M94 95 L106 95" stroke="#333" strokeWidth="3" />
    <path d="M55 95 L62 95 M138 95 L145 95" stroke="#333" strokeWidth="2" />
    
    {/* Riflesso occhiali */}
    <path d="M65 88 L80 88" stroke="white" strokeWidth="1" opacity="0.4" />
    <path d="M109 88 L124 88" stroke="white" strokeWidth="1" opacity="0.4" />
  </svg>
);

interface WelcomeProps {
  onStart: (name: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20">
      <div className="mb-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 animate-float">
        <span className="material-symbols-outlined text-neon-pink">security</span>
        <span className="text-white text-[10px] font-display font-bold tracking-[0.3em] uppercase italic">IDENTITÀ AGENTE CONFERMATA</span>
      </div>
      
      <div className="relative mb-12">
        {/* Aura olografica dietro */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/60 via-neon-cyan/40 to-neon-lime/30 rounded-full blur-[60px] animate-pulse"></div>
        
        <div className="relative z-10 w-56 h-56 group">
          <IvioloAvatar className="w-full h-full drop-shadow-[0_0_20px_rgba(255,0,153,0.5)] transition-transform duration-500 group-hover:scale-110" />
          
          {/* Cerchi orbitali */}
          <div className="absolute inset-0 border-2 border-dashed border-neon-cyan/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute -inset-4 border border-white/5 rounded-full"></div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-display font-black mb-6 leading-[1.1] tracking-tight italic">
        BENVENUTO, <br/>
        <span className="text-transparent bg-clip-text holo-gradient text-glow-pink uppercase">IVIOLO</span>
      </h1>
      
      <p className="text-text-dim text-lg mb-12 font-light leading-relaxed max-w-sm mx-auto">
        Il tuo avatar è pronto. La tua missione di <strong className="text-white font-medium italic">Skincare Quest</strong> inizia ora.
      </p>
      
      <button 
        onClick={() => onStart('IVIOLO')}
        className="group relative w-full max-w-[320px] h-16 rounded-2xl bg-white text-black font-display font-black text-lg uppercase tracking-widest transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          ACCEDI AL SISTEMA
          <span className="material-symbols-outlined">login</span>
        </span>
      </button>
    </div>
  );
};

export default Welcome;
