'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ZonesSection() {
  const { t } = useLanguage();

  const zones = t('zones.cards') as { title: string; tags: string[] }[];
  const icons = ["✈️", "🚊", "🏙️"];

  return (
    <section className="section bg-base">
      <div className="container">
        <motion.h2
          className="heading-section text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('zones.title')}
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.isArray(zones) && zones.map((zone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-card-border p-6 rounded-2xl shadow-soft h-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{icons[idx]}</span>
                <h3 className="text-xl font-bold text-ink">{zone.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {zone.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="bg-brand/5 dark:bg-brand/10 text-ink-softer px-3 py-1.5 rounded-lg text-sm font-medium border border-brand/10 hover:border-brand/30 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
