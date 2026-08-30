import { create } from 'zustand';

export type Language = 'ar' | 'en';
export type Quality = 'auto' | 'low' | 'medium' | 'high';
export type ActiveZone = 'exterior' | 'lobby' | 'living-modern' | 'living-neoclassic';
export type InteractionMode = 'explore' | 'guided-tour';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  quality: Quality;
  setQuality: (quality: Quality) => void;
  
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
  
  activeZone: ActiveZone;
  setActiveZone: (zone: ActiveZone) => void;
  
  mode: InteractionMode;
  setMode: (mode: InteractionMode) => void;
  
  showIntro: boolean;
  setShowIntro: (show: boolean) => void;
  
  selectedProduct: string | null;
  setSelectedProduct: (productId: string | null) => void;
  
  showFloorSelector: boolean;
  setShowFloorSelector: (show: boolean) => void;
  
  teleportTarget: [number, number, number] | null;
  setTeleportTarget: (target: [number, number, number] | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'ar',
  setLanguage: (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    set({ language: lang });
  },
  
  quality: 'auto',
  setQuality: (quality) => set({ quality }),
  
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  loadingProgress: 0,
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  
  activeZone: 'exterior',
  setActiveZone: (activeZone) => set({ activeZone }),
  
  mode: 'explore',
  setMode: (mode) => set({ mode }),
  
  showIntro: true,
  setShowIntro: (showIntro) => set({ showIntro }),
  
  selectedProduct: null,
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
  
  showFloorSelector: false,
  setShowFloorSelector: (showFloorSelector) => set({ showFloorSelector }),

  teleportTarget: null,
  setTeleportTarget: (teleportTarget) => set({ teleportTarget }),
}));
