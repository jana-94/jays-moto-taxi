'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { FiPhone, FiCalendar, FiSmartphone, FiUser, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = t('process.steps') as { title: string; desc: string }[];
  const icons = [FiCalendar, FiSmartphone, FiCheckCircle, FiUser];

  return (
    <section className="section bg-base-light/50">
      <div className="container">
        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-black/10 p-3 rounded-full">
              <FiPhone className="text-black" size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
              {t('process.urgency')}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+33684406126"
              className="bg-black text-white px-6 py-2.5 rounded-full font-bold hover:bg-black/80 transition-all text-sm"
            >
              06 84 40 61 26
            </a>
            <a
              href="https://wa.me/33684406126"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#20bd5a] transition-all flex items-center gap-2 text-sm"
            >
              <FaWhatsapp size={18} />
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(steps) && steps.map((step, idx) => {
            const Icon = icons[idx] || FiCheckCircle;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group h-full"
              >
                <div className="bg-card border border-card-border p-8 rounded-2xl shadow-soft h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                    <Icon className="text-brand" size={24} />
                  </div>
                  <div className="absolute top-8 right-8 text-4xl font-black text-brand/5 group-hover:text-brand/10 transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xl font-bold text-ink mb-3">{step.title}</h4>
                  <p className="text-ink-softer text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
