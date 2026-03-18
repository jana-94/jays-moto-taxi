'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang: 'en' | 'fr') => {
    setLocale(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-brand/10 transition-colors"
        aria-label={t('nav.select_language')}
      >
        <span className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm">
          <Image
            src={locale === 'en' ? '/images/flags/gb.svg' : '/images/flags/fr.svg'}
            alt={locale === 'en' ? 'English' : 'Français'}
            fill
            className="object-cover"
          />
        </span>
        <span className="uppercase text-sm font-medium">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-32 bg-card rounded-md shadow-lg py-1 z-50 overflow-hidden text-ink border border-card">
          <button
            onClick={() => handleSelect('en')}
            className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-base-light transition-colors ${locale === 'en' ? 'bg-base-light font-semibold text-brand' : ''
              }`}
          >
            <span className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm flex-shrink-0">
              <Image
                src="/images/flags/gb.svg"
                alt="English"
                fill
                className="object-cover"
              />
            </span>
            <span>English</span>
          </button>
          <button
            onClick={() => handleSelect('fr')}
            className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-base-light transition-colors ${locale === 'fr' ? 'bg-base-light font-semibold text-brand' : ''
              }`}
          >
            <span className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm flex-shrink-0">
              <Image
                src="/images/flags/fr.svg"
                alt="Français"
                fill
                className="object-cover"
              />
            </span>
            <span>Français</span>
          </button>
        </div>
      )}
    </div>
  );
}
