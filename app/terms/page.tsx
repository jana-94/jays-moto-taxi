'use client';
import { useLanguage } from '@/app/context/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();
  return (
    <div className="container section">
      <h1 className="heading-section">{t('terms.title')}</h1>
      <p className="mt-4 text-ink-softer">
        {t('terms.content')}
      </p>
    </div>
  );
}
