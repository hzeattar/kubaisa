import { useAppStore } from '../stores/useAppStore';
import { translations } from '../i18n/translations';

type TranslationSection = keyof typeof translations.ar;

export const useTranslation = () => {
  const language = useAppStore(state => state.language);

  const t = (section: TranslationSection, key: string): string => {
    const values = translations[language][section] as Record<string, string>;
    return values[key] ?? key;
  };

  return { t, language };
};
