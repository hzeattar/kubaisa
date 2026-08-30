import { useAppStore } from '../stores/useAppStore';
import { translations, TranslationKey } from '../i18n/translations';

export const useTranslation = () => {
  const language = useAppStore((state) => state.language);
  
  const t = (section: keyof typeof translations.ar, key: string): string => {
    try {
      // @ts-ignore
      return translations[language][section][key] || key;
    } catch (e) {
      return key;
    }
  };

  return { t, language };
};
