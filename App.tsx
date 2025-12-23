
import React, { useState, useCallback, useMemo } from 'react';
import { Screen, UserProfile, DailyLog, NightType, Product, NightTheme } from './types';
import { 
  getProfile, saveProfile, getLogs, updateTodayLog, getTodayKey, 
  getProducts, saveProducts, getThemes, saveThemes, getAMRoutine, saveAMRoutine, getAutoNightType, resetProductsToDefault, resetProgressOnly 
} from './utils/storage';

// Screens
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import AMRoutine from './screens/AMRoutine';
import NightCycleOverview from './screens/NightCycleOverview';
import NightDetail from './screens/NightDetail';
import Dossier from './screens/Dossier';
import ProductsList from './screens/ProductsList';
import Saggezza from './screens/Saggezza';
import ProductDetail from './screens/ProductDetail';
import AddProduct from './screens/AddProduct';
import EditCycle from './screens/EditCycle';
import Lab from './screens/Lab';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => getProfile());
  const [logs, setLogs] = useState<Record<string, DailyLog>>(() => getLogs());
  const [products, setProducts] = useState<Record<string, Product>>(() => getProducts());
  const [themes, setThemes] = useState<Record<number, NightTheme>>(() => getThemes());
  const [amRoutine, setAmRoutine] = useState<string[]>(() => getAMRoutine());
  
  const [currentScreen, setCurrentScreen] = useState<Screen>(profile.onboarded ? 'HOME' : 'WELCOME');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedNightToEdit, setSelectedNightToEdit] = useState<NightType | 'AM' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const accentColors = {
    'neon-pink': '#FF0099',
    'neon-cyan': '#00F0FF',
    'neon-lime': '#CCFF00',
    'gem-amethyst': '#9D00FF',
    'gem-ruby': '#FF003C'
  };

  const currentAccent = accentColors[profile.settings.hudColor] || accentColors['neon-cyan'];

  const handleUpdateProfile = (newProfile: UserProfile) => {
    saveProfile(newProfile);
    setProfile(newProfile);
  };

  // Funzione di eliminazione profonda
  const handleDeleteProduct = (id: string) => {
    // 1. Rimuovi dall'inventario prodotti
    const newProducts = { ...products };
    delete newProducts[id];
    setProducts(newProducts);
    saveProducts(newProducts);

    // 2. Rimuovi dalla routine AM
    const newAm = amRoutine.filter(pid => pid !== id);
    setAmRoutine(newAm);
    saveAMRoutine(newAm);

    // 3. Rimuovi da tutti i cicli notte (PM)
    const newThemes = { ...themes };
    Object.keys(newThemes).forEach(key => {
      const nightType = parseInt(key);
      newThemes[nightType].products = newThemes[nightType].products.filter(pid => pid !== id);
    });
    setThemes(newThemes);
    saveThemes(newThemes);

    if (profile.settings.hapticFeedback && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const handleResetProducts = () => {
    const { products: p, themes: t, amRoutine: am } = resetProductsToDefault();
    setProducts(p);
    setThemes(t);
    setAmRoutine(am);
    alert("Database Foto Sincronizzato!");
  };

  const handleHardReset = () => {
    resetProgressOnly();
    setLogs({});
    const resetProfile = { ...profile, xp: 0 };
    setProfile(resetProfile);
    setCurrentScreen('HOME');
    if (profile.settings.hapticFeedback && window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100]);
    }
    alert("Protocollo Tabula Rasa Eseguito: XP e Cicli azzerati.");
  };

  const completeRoutine = (type: 'am' | 'pm') => {
    const xpReward = 100;
    const newLogs = updateTodayLog({ [type === 'am' ? 'amCompleted' : 'pmCompleted']: true });
    setLogs(newLogs);
    const newProfile = { ...profile, xp: (profile.xp || 0) + xpReward };
    handleUpdateProfile(newProfile);
    if (profile.settings.hapticFeedback && window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'WELCOME': return <Welcome onStart={(name) => { handleUpdateProfile({...profile, name, onboarded: true}); setCurrentScreen('HOME'); }} />;
      case 'HOME': return <Home profile={profile} logs={logs} onNavigate={setCurrentScreen} onComplete={completeRoutine} onProductClick={(id) => { setSelectedProductId(id); setCurrentScreen('PRODUCT_DETAIL'); }} onCycleSwitch={() => { if(profile.settings.hapticFeedback) window.navigator.vibrate?.(50); }} />;
      case 'AM': return <AMRoutine amProducts={amRoutine} allProducts={products} onComplete={() => completeRoutine('am')} onBack={() => setCurrentScreen('HOME')} onProductClick={(id) => { setSelectedProductId(id); setCurrentScreen('PRODUCT_DETAIL'); }} onEdit={() => { setSelectedNightToEdit('AM'); setCurrentScreen('EDIT_CYCLE'); }} />;
      case 'PM_OVERVIEW': return <NightCycleOverview activeNight={logs[getTodayKey()]?.nightType || getAutoNightType()} themes={themes} onSelectNight={(n) => { setSelectedNightToEdit(n); setCurrentScreen('EDIT_CYCLE'); }} onActivateNight={(n) => { updateTodayLog({ nightType: n }); setLogs(getLogs()); setCurrentScreen('HOME'); }} onBack={() => setCurrentScreen('HOME')} />;
      case 'NIGHT_DETAIL': 
        const todayNight = logs[getTodayKey()]?.nightType || getAutoNightType();
        return <NightDetail nightType={todayNight} theme={themes[todayNight]} products={products} onComplete={() => completeRoutine('pm')} onBack={() => setCurrentScreen('HOME')} onProductClick={(id) => { setSelectedProductId(id); setCurrentScreen('PRODUCT_DETAIL'); }} />;
      case 'DOSSIER': return <Dossier profile={profile} logs={logs} onBack={() => setCurrentScreen('HOME')} />;
      case 'PRODUCTS': return (
        <ProductsList 
          products={products} 
          onProductClick={(id) => { setSelectedProductId(id); setCurrentScreen('PRODUCT_DETAIL'); }} 
          onDeleteProduct={(id) => handleDeleteProduct(id)} 
          onAdd={() => setCurrentScreen('ADD_PRODUCT')} 
          onBack={() => setCurrentScreen('HOME')} 
        />
      );
      case 'SAGGEZZA': return <Saggezza profile={profile} logs={logs} products={products} onUpdateProfile={handleUpdateProfile} onResetProducts={handleResetProducts} onHardReset={handleHardReset} onBack={() => setCurrentScreen('HOME')} />;
      case 'PRODUCT_DETAIL': return (
        <ProductDetail 
          product={products[selectedProductId!]} 
          onBack={() => setCurrentScreen('PRODUCTS')} 
          onDelete={() => {
            handleDeleteProduct(selectedProductId!);
            setCurrentScreen('PRODUCTS');
          }} 
        />
      );
      case 'ADD_PRODUCT': return <AddProduct onAdd={(p) => { setProducts(prev => ({...prev, [p.id]: p})); saveProducts({...products, [p.id]: p}); setCurrentScreen('PRODUCTS'); }} onBack={() => setCurrentScreen('PRODUCTS')} />;
      case 'EDIT_CYCLE': return <EditCycle type={selectedNightToEdit!} currentProducts={selectedNightToEdit === 'AM' ? amRoutine : themes[selectedNightToEdit as number].products} allProducts={products} onSave={(t, pids) => {
        if(t === 'AM') { saveAMRoutine(pids); setAmRoutine(pids); setCurrentScreen('HOME'); }
        else { const nt = {...themes}; nt[t as number].products = pids; saveThemes(nt); setThemes(nt); setCurrentScreen('PM_OVERVIEW'); }
      }} onBack={() => setCurrentScreen('HOME')} />;
      case 'LAB': return <Lab profile={profile} onBack={() => setCurrentScreen('HOME')} />;
      default: return null;
    }
  };

  return (
    <div 
      className={`min-h-screen max-w-md mx-auto relative bg-quest-dark overflow-hidden flex flex-col shadow-2xl border-x border-white/5 ${profile.settings.compactMode ? 'text-sm' : ''}`}
      style={{ '--accent-color': currentAccent } as React.CSSProperties}
    >
      <style>{`
        .dynamic-accent { color: var(--accent-color); }
        .dynamic-bg { background-color: var(--accent-color); }
        .dynamic-border { border-color: var(--accent-color); }
        .dynamic-glow { box-shadow: 0 0 15px var(--accent-color); }
      `}</style>
      
      {renderScreen()}
      
      {profile.onboarded && !['WELCOME', 'PRODUCT_DETAIL', 'ADD_PRODUCT', 'EDIT_CYCLE'].includes(currentScreen) && (
        <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-panel border-t border-white/5 flex items-center justify-around px-1 z-[60] safe-area-bottom ${profile.settings.compactMode ? 'h-16' : 'h-20'}`}>
          <NavItem active={currentScreen === 'HOME'} icon="home_app_logo" label="Home" onClick={() => setCurrentScreen('HOME')} color={profile.settings.hudColor} compact={profile.settings.compactMode} />
          <NavItem active={currentScreen === 'DOSSIER'} icon="folder_open" label="Dossier" onClick={() => setCurrentScreen('DOSSIER')} color={profile.settings.hudColor} compact={profile.settings.compactMode} />
          <NavItem active={currentScreen === 'LAB'} icon="biotech" label="Lab" onClick={() => setCurrentScreen('LAB')} color={profile.settings.hudColor} compact={profile.settings.compactMode} />
          <NavItem active={currentScreen === 'PRODUCTS'} icon="diamond" label="Tesori" onClick={() => setCurrentScreen('PRODUCTS')} color={profile.settings.hudColor} compact={profile.settings.compactMode} />
          <NavItem active={currentScreen === 'SAGGEZZA'} icon="menu_book" label="Saggezza" onClick={() => setCurrentScreen('SAGGEZZA')} color={profile.settings.hudColor} compact={profile.settings.compactMode} />
        </nav>
      )}
      
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-quest-card/90 backdrop-blur-3xl border-2 dynamic-border p-10 rounded-[3rem] shadow-[0_0_50px_rgba(var(--accent-color),0.6)] text-center">
            <h2 className="text-4xl font-display font-black text-white mb-2 italic uppercase">SPLENDI! ✨</h2>
            <div className="h-1 w-20 dynamic-bg mx-auto mb-4 rounded-full"></div>
            <p className="dynamic-accent font-bold text-xl">+100 XP</p>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ active: boolean, icon: string, label: string, onClick: () => void, color: string, compact?: boolean }> = ({ active, icon, label, onClick, color, compact }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center transition-all duration-300 w-14 group ${active ? 'scale-110' : 'opacity-40 grayscale'}`}>
    <div className="relative mb-0.5">
      <span className={`material-symbols-outlined transition-colors ${compact ? 'text-[22px]' : 'text-[26px]'} ${active ? 'dynamic-accent' : 'text-white'}`}>{icon}</span>
      {active && <span className="absolute -inset-2 bg-current opacity-10 rounded-full blur-lg animate-pulse dynamic-accent"></span>}
    </div>
    {!compact && <span className={`text-[7px] font-display font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>}
  </button>
);

export default App;
