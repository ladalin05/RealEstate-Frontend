import { useState } from 'react';
import { useTranslation } from 'react-i18next';


export function LanguageSwitcher({ showFullLabel = false }: { showFullLabel?: boolean }) {
  const { i18n, t } = useTranslation();
  const languages = [
    { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇺🇸', native: t('nav.language.en') },
    { code: 'km', label: 'Khmer',   shortLabel: 'KH', flag: '🇰🇭', native: t('nav.language.km') },
  ];
  const current = languages.find(l => i18n.language.startsWith(l.code)) ?? languages[0];

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center rounded-sm gap-0.5
                 bg-secondary border border-border/30"
    >
      {languages.map(lang => {
        const isActive = lang.code === current.code;
        return (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-pressed={isActive}
            className={`
              flex items-center gap-1.5 px-3.5 py-1 rounded-sm text-[13px] font-medium
              transition-all duration-200 select-none whitespace-nowrap
              ${isActive
                ? 'bg-background text-primary shadow-sm border border-border/20'
                : 'text-muted-foreground hover:text-primary'
              }
            `}
          > 
            <span>{showFullLabel ? lang.native : lang.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}