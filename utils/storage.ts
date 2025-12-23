
import { DailyLog, UserProfile, NightType, Product, NightTheme, SkinPhoto, AppSettings } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, NIGHT_THEMES as INITIAL_THEMES, AM_PRODUCTS as INITIAL_AM } from '../constants';

const STORAGE_KEY_PROFILE = 'glam_skincare_profile';
const STORAGE_KEY_LOGS = 'glam_skincare_logs';
const STORAGE_KEY_PRODUCTS = 'glam_skincare_products';
const STORAGE_KEY_THEMES = 'glam_skincare_themes';
const STORAGE_KEY_AM = 'glam_skincare_am';
const STORAGE_KEY_GALLERY = 'glam_skincare_gallery';

const DEFAULT_SETTINGS: AppSettings = {
  hudColor: 'neon-cyan',
  audioEnabled: true,
  hapticFeedback: true,
  dailyXpGoal: 200,
  reminderTime: '21:00',
  compactMode: false
};

export const resetProgressOnly = () => {
  const profileStr = localStorage.getItem(STORAGE_KEY_PROFILE);
  if (profileStr) {
    const profile = JSON.parse(profileStr);
    profile.xp = 0;
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }
  localStorage.removeItem(STORAGE_KEY_LOGS);
  localStorage.removeItem(STORAGE_KEY_GALLERY);
};

// --- PROFILO ---
export const getProfile = (): UserProfile => {
  const data = localStorage.getItem(STORAGE_KEY_PROFILE);
  if (!data) return {
    name: 'IVIOLO',
    skinType: 'Mista',
    allergies: 'Nessuna',
    onboarded: false,
    xp: 0,
    settings: DEFAULT_SETTINGS
  };
  const profile = JSON.parse(data);
  if (!profile.settings) profile.settings = DEFAULT_SETTINGS;
  return profile;
};

export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
};

// --- LOG E CRONOLOGIA ---
export const getLogs = (): Record<string, DailyLog> => {
  const data = localStorage.getItem(STORAGE_KEY_LOGS);
  return data ? JSON.parse(data) : {};
};

export const saveLogs = (logs: Record<string, DailyLog>) => {
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
};

// --- CALCOLI STATISTICI REALI ---

/**
 * Calcola la serie attuale (quanti giorni consecutivi fino ad oggi)
 */
export const calculateStreak = (logs: Record<string, DailyLog>): number => {
  let streak = 0;
  let checkDate = new Date();
  const today = getTodayKey();
  
  while (true) {
    const key = checkDate.toISOString().split('T')[0];
    const log = logs[key];
    if (log && log.amCompleted && log.pmCompleted) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      if (key === today) {
        checkDate.setDate(checkDate.getDate() - 1);
        continue;
      }
      break;
    }
  }
  return streak;
};

/**
 * Calcola la miglior serie di sempre (Record storico)
 */
export const calculateBestStreak = (logs: Record<string, DailyLog>): number => {
  const keys = Object.keys(logs).sort();
  if (keys.length === 0) return 0;

  let maxStreak = 0;
  let currentStreak = 0;
  
  // Creiamo un set di date "completate" per ricerca veloce
  const completedDates = new Set(
    keys.filter(k => logs[k].amCompleted && logs[k].pmCompleted)
  );

  if (completedDates.size === 0) return 0;

  const sortedCompleted = Array.from(completedDates).sort();
  
  for (let i = 0; i < sortedCompleted.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prev = new Date(sortedCompleted[i-1]);
      const curr = new Date(sortedCompleted[i]);
      const diffTime = Math.abs(curr.getTime() - prev.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
    maxStreak = Math.max(maxStreak, currentStreak);
  }
  
  return maxStreak;
};

/**
 * Genera i dati per il grafico degli ultimi 30 giorni
 * Ritorna un array di 30 valori (0, 50, o 100)
 */
export const getLast30DaysActivity = (logs: Record<string, DailyLog>): number[] => {
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const log = logs[key];
    
    if (!log) {
      result.push(0);
    } else {
      let score = 0;
      if (log.amCompleted) score += 50;
      if (log.pmCompleted) score += 50;
      result.push(score);
    }
  }
  return result;
};

// --- PRODOTTI E THEMES ---
export const getProducts = (): Record<string, Product> => {
  const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  return data ? JSON.parse(data) : { ...INITIAL_PRODUCTS };
};

export const saveProducts = (products: Record<string, Product>) => {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
};

export const resetProductsToDefault = () => {
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_THEMES);
    localStorage.removeItem(STORAGE_KEY_AM);
    const defaults = { ...INITIAL_PRODUCTS };
    saveProducts(defaults);
    saveThemes({ ...INITIAL_THEMES });
    saveAMRoutine([...INITIAL_AM]);
    return { products: defaults, themes: { ...INITIAL_THEMES }, amRoutine: [...INITIAL_AM] };
};

export const getGallery = (): SkinPhoto[] => {
    const data = localStorage.getItem(STORAGE_KEY_GALLERY);
    return data ? JSON.parse(data) : [];
};

export const saveGallery = (photos: SkinPhoto[]) => {
    localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(photos));
};

export const getThemes = (): Record<number, NightTheme> => {
  const data = localStorage.getItem(STORAGE_KEY_THEMES);
  return data ? JSON.parse(data) : { ...INITIAL_THEMES };
};

export const saveThemes = (themes: Record<number, NightTheme>) => {
  localStorage.setItem(STORAGE_KEY_THEMES, JSON.stringify(themes));
};

export const getAMRoutine = (): string[] => {
  const data = localStorage.getItem(STORAGE_KEY_AM);
  return data ? JSON.parse(data) : [...INITIAL_AM];
};

export const saveAMRoutine = (products: string[]) => {
  localStorage.setItem(STORAGE_KEY_AM, JSON.stringify(products));
};

export const getTodayKey = () => new Date().toISOString().split('T')[0];

export const getAutoNightType = (): NightType => {
  const logs = getLogs();
  const keys = Object.keys(logs).sort().reverse();
  const today = getTodayKey();
  if (logs[today]?.nightType) return logs[today].nightType;
  if (keys.length > 0) {
    const lastKey = keys[0];
    const lastNight = logs[lastKey].nightType;
    return (lastNight % 4) + 1 as NightType;
  }
  return NightType.EXFOLIATION;
};

export const updateTodayLog = (updates: Partial<DailyLog>) => {
  const logs = getLogs();
  const todayKey = getTodayKey();
  const existing = logs[todayKey] || {
    date: todayKey,
    amCompleted: false,
    pmCompleted: false,
    nightType: getAutoNightType(),
    notes: ''
  };
  const updated = { ...existing, ...updates };
  logs[todayKey] = updated;
  saveLogs(logs);
  return logs;
};
