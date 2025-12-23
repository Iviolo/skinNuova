
import { NightType, Product, Achievement } from './types';
import { calculateStreak } from './utils/storage';

/**
 * Database prodotti sincronizzato con le immagini fornite dall'utente.
 * Utilizziamo link Amazon diretti che sono i più stabili per evitare blocchi CORS.
 */
export const PRODUCTS: Record<string, Product> = {
  neutrogena_gel: {
    id: 'neutrogena_gel',
    brand: 'Neutrogena',
    name: 'Hydro Boost Acqua-Gel Detergente',
    image: 'https://i.imgur.com/12sm0av.jpg',
    category: 'PULIZIA',
    activeIngredient: 'Acido Ialuronico',
    texture: 'Gel a base acquosa',
    technicalFunction: 'Detersione delicata. Rimuove le impurità senza seccare la pelle.',
    usageNotes: 'Mattina e Sera. Massaggiare su pelle umida.',
    safetyWarnings: 'Evitare il contatto diretto con gli occhi.',
    color: 'text-neon-cyan'
  },
  to_multi_peptide: {
    id: 'to_multi_peptide',
    brand: 'The Ordinary',
    name: 'Multi-Peptide + HA Serum',
    image: 'https://i.imgur.com/Fk6x9M1.jpg',
    category: 'BOOSTER',
    activeIngredient: 'Peptidi + Acido Ialuronico',
    texture: 'Siero acquoso leggero',
    technicalFunction: 'Supporto collagene e idratazione profonda.',
    usageNotes: '3-4 gocce. Mattina (prima della crema) e Notti 3-4.',
    safetyWarnings: 'Non usare nella stessa routine di acidi forti.',
    color: 'text-neon-cyan'
  },
  vichy_liftactiv: {
    id: 'vichy_liftactiv',
    brand: 'Vichy',
    name: 'Liftactiv Collagen Specialist',
    image: 'https://i.imgur.com/UiSBuVw.jpg',
    category: 'IDRATAZIONE',
    activeIngredient: 'Biopeptidi + Vitamina Cg',
    texture: 'Crema vellutata',
    technicalFunction: 'Crema base per stimolare il collagene.',
    usageNotes: 'Mattina. Base ideale per la protezione solare.',
    safetyWarnings: 'Nessuna.',
    color: 'text-gem-amethyst'
  },
  spf_shield: {
    id: 'spf_shield',
    brand: 'La Roche-Posay',
    name: 'Anthelios UVMune 400 SPF 50+',
    image: 'https://i.imgur.com/nZaqquY.jpg',
    category: 'PROTEZIONE',
    activeIngredient: 'Mexoryl 400',
    texture: 'Fluido invisibile',
    technicalFunction: 'Protezione solare estrema UVA/UVB.',
    usageNotes: 'OBBLIGATORIO ogni mattina (2 dita).',
    safetyWarnings: 'Riapplicare in caso di esposizione prolungata.',
    color: 'text-neon-lime'
  },
  gg_bha: {
    id: 'gg_bha',
    brand: 'Geek & Gorgeous',
    name: '101 Porefectly Clear 2% BHA',
    image: 'https://i.imgur.com/pdWCOxL.jpg',
    category: 'ESFOLIANTE',
    activeIngredient: 'Acido Salicilico 2%',
    texture: 'Siero fluido',
    technicalFunction: 'Pulizia profonda dei pori e controllo del sebo.',
    usageNotes: 'Notte 1. Applicare su pelle ASCIUTTA.',
    safetyWarnings: 'Può causare leggero pizzicore.',
    color: 'text-neon-pink'
  },
  roc_eyes: {
    id: 'roc_eyes',
    brand: 'RoC',
    name: 'Retinol Correxion Eye Cream',
    image: 'https://i.imgur.com/xpGTVJs.jpg',
    category: 'OCCHI',
    activeIngredient: 'Retinolo Puro RoC',
    texture: 'Crema specifica contorno occhi',
    technicalFunction: 'Trattamento mirato per occhiaie e rughe.',
    usageNotes: 'Ogni sera. Solo sull\'OSSO ORBITALE.',
    safetyWarnings: 'Evitare la palpebra mobile.',
    color: 'text-gem-ruby'
  },
  loreal_collagen: {
    id: 'loreal_collagen',
    brand: 'L\'Oréal Paris',
    name: 'Attiva Anti-Rughe Collagene',
    image: 'https://i.imgur.com/loJX5gJ.jpg',
    category: 'IDRATAZIONE',
    activeIngredient: 'Biosfere di Collagene',
    texture: 'Crema idratante intensiva',
    technicalFunction: 'Azione rimpolpante e levigante sulle prime rughe.',
    usageNotes: 'Ogni sera come step finale idratante.',
    safetyWarnings: 'Nessuna.',
    color: 'text-neon-cyan'
  },
  to_retinal: {
    id: 'to_retinal',
    brand: 'The Ordinary',
    name: 'Retinal 0.2% Emulsion',
    image: 'https://i.imgur.com/TXw6nDy.jpg',
    category: 'RINNOVO',
    activeIngredient: 'Retinale 0.2%',
    texture: 'Emulsione gialla',
    technicalFunction: 'Rinnova la grana della pelle.',
    usageNotes: 'Notte 2. Piccola perla su pelle ASCIUTTA.',
    safetyWarnings: 'Usare SPF il mattino dopo.',
    color: 'text-gem-ruby'
  },
  to_squalane: {
    id: 'to_squalane',
    brand: 'The Ordinary',
    name: '100% Plant-Derived Squalane',
    image: 'https://m.media-amazon.com/images/I/51G+yV2O2iL._AC_SL1500_.jpg',
    category: 'BOOSTER',
    activeIngredient: 'Squalano puro',
    texture: 'Olio non untuoso',
    technicalFunction: 'Idratazione idro-lipidica.',
    usageNotes: 'Notti 2-3-4. Aggiungere 2-3 gocce alla crema finale.',
    safetyWarnings: 'Nessuna.',
    color: 'text-neon-lime'
  },
  pc_ectoin: {
    id: 'pc_ectoin',
    brand: 'Paula\'s Choice',
    name: '7% Ectoin Repair Booster',
    image: 'https://i.imgur.com/p8nljzk.jpg',
    category: 'RECUPERO',
    activeIngredient: 'Ectoina 7%',
    texture: 'Fluido riparatore',
    technicalFunction: 'Calma istantaneamente rossori.',
    usageNotes: 'Notti 3-4. Mescolare con siero Multi-Peptide.',
    safetyWarnings: 'Ideale per pelli stressate.',
    color: 'text-neon-lime'
  },
  gerovital_h3: {
    id: 'gerovital_h3',
    brand: 'Gerovital',
    name: 'H3 Classic Crema Hyaluron',
    image: 'https://m.media-amazon.com/images/I/61x0H6n2p6L._AC_SL1000_.jpg',
    category: 'IDRATAZIONE',
    activeIngredient: 'Acido Ialuronico + Complesso H3',
    texture: 'Crema ricca rigenerante',
    technicalFunction: 'Rigenerazione cellulare profonda per pelli mature.',
    usageNotes: 'Mattina. Alternativa a Vichy per extra nutrimento.',
    safetyWarnings: 'Nessuna.',
    color: 'text-gem-sapphire'
  }
};

export const NIGHT_THEMES = {
  [NightType.EXFOLIATION]: {
    title: 'NOTTE 1: ESFOLIAZIONE',
    desc: 'Focus Pori: Dissolve il sebo e libera i pori con BHA.',
    color: 'bg-neon-pink',
    text: 'text-neon-pink',
    border: 'neon-border-pink',
    glow: 'shadow-neon-pink',
    label: 'Esfoliazione',
    products: ['neutrogena_gel', 'gg_bha', 'roc_eyes', 'loreal_collagen']
  },
  [NightType.RENEWAL]: {
    title: 'NOTTE 2: RINNOVO',
    desc: 'Focus Rughe: Stimola il collagene con il Retinale 0.2%.',
    color: 'bg-gem-ruby',
    text: 'text-gem-ruby',
    border: 'neon-border-pink',
    glow: 'shadow-neon-pink',
    label: 'Rinnovo',
    products: ['neutrogena_gel', 'to_retinal', 'roc_eyes', 'loreal_collagen', 'to_squalane']
  },
  [NightType.REPAIR]: {
    title: 'NOTTE 3: RIPARAZIONE',
    desc: 'Focus Barriera: Nutre e ripara con Peptidi ed Ectoina.',
    color: 'bg-neon-cyan',
    text: 'text-neon-cyan',
    border: 'neon-border-cyan',
    glow: 'shadow-neon-cyan',
    label: 'Riparazione',
    products: ['neutrogena_gel', 'to_multi_peptide', 'pc_ectoin', 'roc_eyes', 'loreal_collagen', 'to_squalane']
  },
  [NightType.DEEP_REPAIR]: {
    title: 'NOTTE 4: RECUPERO',
    desc: 'Focus Barriera: Ricostruisce le difese prima del nuovo ciclo.',
    color: 'bg-neon-lime',
    text: 'text-neon-lime',
    border: 'neon-border-lime',
    glow: 'shadow-neon-lime',
    label: 'Recupero',
    products: ['neutrogena_gel', 'to_multi_peptide', 'pc_ectoin', 'roc_eyes', 'loreal_collagen', 'to_squalane']
  }
};

export const AM_PRODUCTS = ['neutrogena_gel', 'to_multi_peptide', 'vichy_liftactiv', 'spf_shield'];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'Primo Passaggio',
    desc: 'Completa la tua prima routine AM o PM.',
    icon: 'star',
    condition: (profile, logs) => Object.keys(logs).length > 0
  },
  {
    id: 'week_warrior',
    title: 'Guerriero della Settimana',
    desc: 'Raggiungi una serie di 7 giorni consecutivi.',
    icon: 'workspace_premium',
    condition: (profile, logs) => calculateStreak(logs) >= 7
  }
];

export interface SecretDossier {
  id: string;
  xpRequired: number;
  title: string;
  category: string;
  content: string;
  codeName: string;
}

export const SECRET_DOSSIERS: SecretDossier[] = [
  {
    id: 'd1',
    xpRequired: 0,
    title: 'IL PROTOCOLLO SKIN CYCLING',
    category: 'FONDAMENTI',
    codeName: 'PROJECT_4DAYS',
    content: "Il ciclo di 4 giorni è progettato per massimizzare i risultati degli attivi riducendo l'infiammazione. Notte 1: Esfoliazione per preparare il terreno. Notte 2: Retinolo per il rinnovo cellulare. Notti 3 e 4: Recupero e riparazione barriera. Saltare le notti di recupero è l'errore principale degli agenti inesperti."
  },
  {
    id: 'd2',
    xpRequired: 500,
    title: 'IL MURO DI DIFESA: LA BARRIERA',
    category: 'DIFESA',
    codeName: 'BARRIER_SHIELD',
    content: "La barriera cutanea è composta da ceramidi, colesterolo e acidi grassi. Quando è compromessa (rossori, bruciore), gli attivi penetrano troppo velocemente causando danni. In caso di breccia, sospendere ogni acido e usare solo agenti riparatori (Ectoina, Peptidi, Acido Ialuronico) finché il pH non torna a 5.5."
  },
  {
    id: 'd3',
    xpRequired: 1200,
    title: 'RETINOLO VS RETINALE',
    category: 'OFFENSIVA',
    codeName: 'VITAMIN_A_INTEL',
    content: "Il Retinolo deve subire due conversioni sulla pelle per diventare Acido Retinoico attivo. Il Retinale (Retinaldeide) ne deve subire solo una. Questo lo rende fino a 11 volte più veloce del retinolo classico, ma con un profilo di tollerabilità spesso superiore. È l'arma definitiva contro il tempo."
  },
  {
    id: 'd4',
    xpRequired: 2500,
    title: 'FOTO-INVECCHIAMENTO RADIANTE',
    category: 'INTELLIGENCE',
    codeName: 'SOLAR_STRIKE',
    content: "L'80% dei segni visibili dell'età non è genetico, ma causato dai raggi UV. Anche in ambienti chiusi o con nuvole, gli UVA penetrano nelle finestre e degradano il collagene 365 giorni l'anno. L'SPF non è un cosmetico, è un'armatura protettiva obbligatoria dopo ogni notte di tipo 1 o 2."
  }
];
