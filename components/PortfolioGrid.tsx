'use client';
import { useState } from 'react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { useLanguage } from '@/app/context/LanguageContext';

type Item = { title: string; category: string; imageUrl: string };

type Props = {
  items: Item[];
};

const filterKeys = ['all', 'design', 'product', 'app'];

export default function PortfolioGrid({ items }: Props) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  
  const filtered =
    filter === 'all' 
      ? items 
      : items.filter((i) => i.category.toLowerCase() === filter);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        {filterKeys.map((key) => (
          <button
            key={key}
            className={`btn ${filter === key ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(key)}
          >
            {t(`portfolio.filters.${key}`)}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PortfolioCard
            key={p.title}
            title={p.title}
            category={p.category}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </>
  );
}
