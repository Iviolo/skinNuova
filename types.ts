
export enum NightType {
  EXFOLIATION = 1,
  RENEWAL = 2,
  REPAIR = 3,
  DEEP_REPAIR = 4
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  usageNotes: string;
  safetyWarnings: string;
  color: string;
  // Nuovi campi tecnici dal Dossier
  activeIngredient?: string;
  texture?: string;
  technicalFunction?: string;
  price?: string;
  results?: string;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  condition: (profile: UserProfile, logs: Record<string, DailyLog>, products: Record<string, Product>) => boolean;
}

export interface SkinPhoto {
  id: string;
  date: string;
  url: string;
  note: string;
}

export interface AppSettings {
  hudColor: 'neon-pink' | 'neon-cyan' | 'neon-lime' | 'gem-amethyst' | 'gem-ruby';
  audioEnabled: boolean;
  hapticFeedback: boolean;
  dailyXpGoal: number;
  reminderTime: string;
  compactMode: boolean;
}

export interface UserProfile {
  name: string;
  skinType: string;
  allergies: string;
  onboarded: boolean;
  xp: number;
  settings: AppSettings;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  amCompleted: boolean;
  pmCompleted: boolean;
  nightType: NightType;
  notes: string;
}

export interface NightTheme {
  title: string;
  desc: string;
  color: string;
  text: string;
  border: string;
  glow: string;
  label: string;
  products: string[];
}

export type Screen = 'WELCOME' | 'HOME' | 'AM' | 'PM_OVERVIEW' | 'NIGHT_DETAIL' | 'DOSSIER' | 'PRODUCTS' | 'SAGGEZZA' | 'PRODUCT_DETAIL' | 'ADD_PRODUCT' | 'EDIT_CYCLE' | 'LAB';
