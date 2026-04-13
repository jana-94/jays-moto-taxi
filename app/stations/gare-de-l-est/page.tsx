'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FiCheck, FiMapPin, FiClock, FiCalendar, FiCreditCard, FiSmartphone, FiUser, FiSend, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

export default function GareDeLEstPage() {
  const { t } = useLanguage();
  const stationKey = 'gare_de_l_est';

  const details = t(`stations_page.${stationKey}.details`) as { label: string; value: string; subtext: string }[];
  const whyPoints = t(`stations_page.${stationKey}.why_points`) as string[];
  const bookingSteps = t(`stations_page.${stationKey}.booking_steps`) as { step: string; title: string; desc: string }[];

  const stepIcons = [FiCalendar, FiCreditCard, FiSmartphone, FiUser];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-brand/30" />
          </div>
          <div className="container text-center text-white py-24 pt-36">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-brand text-black font-bold text-lg md:text-xl px-6 py-2 rounded-full mb-6"
            >
              {t(`stations_page.${stationKey}.price_badge`)}
            </motion.div>
            <motion.h1
              className="heading-hero text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Taxi Moto <span className="text-brand">{t('nav.gare_de_l_est')}</span>
            </motion.h1>
            {/* <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t(`stations_page.${stationKey}.hero_subtitle`)}
            </p> */}
            <p className="mt-4 text-brand font-semibold text-base md:text-lg">
              {t(`stations_page.${stationKey}.price_label`)}
            </p>
          </div>
        </section>

        {/* Quick info cards */}
        <section className="bg-transparent py-12 -mt-10 relative z-20">
          <div className="container overflow-x-auto pb-4 no-scrollbar lg:overflow-visible">
            <div className="flex gap-4 lg:grid lg:grid-cols-4 min-w-max lg:min-w-0">
              {Array.isArray(details) && details.map((item, i) => {
                const icons = [FiCreditCard, FiClock, FiClock, FiMapPin];
                const iconColors = ['text-blue-500', 'text-slate-400', 'text-sky-500', 'text-orange-500'];
                const Icon = icons[i] || FiCheck;
                const IconColor = iconColors[i] || 'text-brand';
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 w-[200px] lg:w-auto bg-card border border-card rounded-2xl p-6 shadow-soft border-t-4 !border-t-brand flex flex-col items-center text-center transition-transform hover:-translate-y-1"
                  >
                    <div className="mb-4">
                      <Icon className={IconColor} size={32} />
                    </div>
                    <span className="text-[10px] font-bold text-ink-softer uppercase tracking-widest mb-2 px-2">
                      {item.label}
                    </span>
                    <span className="text-2xl font-black text-ink mb-1">
                      {item.value}
                    </span>
                    <span className="text-[11px] text-ink-softer leading-tight">
                      {item.subtext}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Journey Details */}
        <section className="section container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h2
                className="heading-section mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t(`stations_page.${stationKey}.why_title`)}
              </motion.h2>
              <ul className="space-y-4">
                {Array.isArray(whyPoints) && whyPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-brand/15 flex items-center justify-center">
                      <FiCheck className="text-brand" size={14} />
                    </span>
                    <span className="text-ink-softer">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* <div className="bg-card border border-card rounded-2xl p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                <FiMapPin className="text-brand" />
                {t(`stations_page.${stationKey}.meeting_title`)}
              </h3>
              <p className="text-ink-softer leading-relaxed mb-6">
                {t(`stations_page.${stationKey}.meeting_desc`)}
              </p>
              <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <FiMapPin size={48} className="text-brand/20" />
                <span className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded">Meeting Point Area</span>
              </div>
            </div> */}
          </div>
        </section>

        {/* 4-Step Booking */}
        <section className="section bg-base-light">
          <div className="container">
            <motion.h2
              className="heading-section text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t(`stations_page.${stationKey}.booking_title`)}
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.isArray(bookingSteps) && bookingSteps.map((step, i) => {
                const Icon = stepIcons[i] || FiCheck;
                return (
                  <motion.div
                    key={i}
                    className="bg-card border border-card rounded-2xl p-6 shadow-soft text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-brand/15 flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-brand" size={22} />
                    </div>
                    <div className="text-brand font-bold text-sm mb-1">Step {step.step}</div>
                    <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
                    <p className="text-ink-softer text-sm">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section container text-center">
          <div className="bg-brand/10 rounded-2xl md:rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="heading-section mb-4">{t(`stations_page.${stationKey}.hero_title`)}</h2>
            {/* <p className="text-ink-softer text-lg mb-8">{t(`stations_page.${stationKey}.hero_subtitle`)}</p> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/?pickup=Paris&dropoff=${t('nav.gare_de_l_est')}&fare=60&luggage=1#reservation`}
                className="btn btn-primary px-8 py-3 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t(`stations_page.${stationKey}.cta_button`)}
              </Link>
              <a
                href="https://wa.me/33684406126"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline px-8 py-3 text-base"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
