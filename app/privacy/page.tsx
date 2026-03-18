'use client';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();
  return (
    <div className="container section">
      <h1 className="heading-section">{t('privacy.title')}</h1>
      <p className="mt-4 text-ink-softer">
        {t('privacy.content')}
      </p>
    </div>
  );
}
