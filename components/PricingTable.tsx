'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { FiNavigation, FiMapPin, FiCompass } from 'react-icons/fi';

export default function PricingTable() {
  const { t } = useLanguage();
  
  const cards = t('pricing.cards') as { title: string; subtitle: string; price: string; footer: string }[];
  const icons = [FiNavigation, FiNavigation, FiNavigation, FiMapPin];

  return (
    <section id="pricing" className="section container">
      <div className="mb-12 text-center text-ink max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="heading-section mb-4"
        >
          {t('pricing.title')}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-brand mb-4"
        >
          {t('pricing.subtitle')}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-ink-softer text-lg"
        >
          {t('pricing.description')}
        </motion.p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.isArray(cards) && cards.map((card, idx) => {
          const Icon = icons[idx] || FiNavigation;
          const isHighlighted = idx === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`
                flex flex-col h-full rounded-2xl p-8 text-center border transition-all duration-300
                ${isHighlighted 
                  ? 'bg-[#0f172a] border-brand shadow-[0_0_20px_rgba(242,169,0,0.3)]' 
                  : 'bg-card border-card-border hover:shadow-lg'
                }
              `}
            >
              <div className="mb-6 flex justify-center">
                <Icon className={`w-12 h-12 ${isHighlighted ? 'text-brand' : 'text-brand'}`} />
              </div>
              
              <h4 className={`text-xl font-bold mb-1 ${isHighlighted ? 'text-white' : 'text-ink'}`}>
                {card.title}
              </h4>
              <p className={`text-sm mb-8 ${isHighlighted ? 'text-gray-400' : 'text-ink-softer'}`}>
                {card.subtitle}
              </p>
              
              <div className="mt-auto mb-8">
                <p className="text-4xl md:text-5xl font-black text-brand tracking-tight">
                  {card.price}
                </p>
              </div>
              
              <p className={`text-[10px] uppercase tracking-widest font-bold ${isHighlighted ? 'text-gray-500' : 'text-ink-softer'}`}>
                {card.footer}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
