'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';

export default function PricingTable() {
  const { t } = useLanguage();
  const prices = [
    { route: t('pricing.routes.paris_paris'), price: ' €50' },
    { route: t('pricing.routes.paris_orly'), price: ' €80' },
    { route: t('pricing.routes.paris_cdg'), price: ' €95' },
    { route: t('pricing.routes.orly_cdg'), price: ' €120' },
    { route: t('pricing.routes.paris_bourget'), price: ' €90' },
    { route: t('pricing.routes.paris_inner_suburbs'), price: ' €65' },
    { route: t('pricing.routes.la_defense_cdg'), price: ' €115' },
    { route: t('pricing.routes.la_defense_orly'), price: ' €80' },
  ];

  return (
    <section id="pricing" className="section container">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="heading-section">{t('pricing.title')}</h2>
          <p className="mt-4 text-ink-softer">{t('pricing.subtitle')}</p>
        </div>

        <motion.div
          className="overflow-x-auto rounded-xl border border-card shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <table className="w-full min-w-[500px] md:min-w-full border-collapse bg-card text-center">
            <thead>
              <tr className="bg-brand text-black">
                <th className="py-4 md:py-5 px-4 md:px-6 font-bold text-base md:text-lg border-r border-black/10 w-1/2">{t('pricing.table_headers.route')}</th>
                <th className="py-4 md:py-5 px-4 md:px-6 font-bold text-base md:text-lg w-1/2">{t('pricing.table_headers.price')}</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, index) => (
                <tr
                  key={index}
                  className={`
                    border-b border-base-border last:border-0 
                    ${index % 2 === 0 ? 'bg-card' : 'bg-base-light'}
                    hover:bg-brand/5 transition-colors
                  `}
                >
                  <td className="py-3 md:py-4 px-4 md:px-6 text-sm md:text-base text-ink font-medium border-r border-base-border">{item.route}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-sm md:text-base text-ink-softer">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
