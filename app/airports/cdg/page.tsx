'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FiCheck, FiMapPin, FiClock, FiCalendar, FiCreditCard, FiSmartphone, FiUser, FiSend, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

export default function CDGPage() {
  const { t } = useLanguage();

  const details = t('airports_page.cdg.details') as { label: string; value: string; subtext: string }[];
  const whyPoints = t('airports_page.cdg.why_points') as string[];
  const bookingSteps = t('airports_page.cdg.booking_steps') as { step: string; title: string; desc: string }[];
  const terminalData = t('airports_page.cdg.terminals') as { name: string; desc: string; price: string }[];
  const terminalsTitle = t('airports_page.cdg.terminals_title');
  const terminalsSubtitle = t('airports_page.cdg.terminals_subtitle');

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
            {/* Price badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-brand text-black font-bold text-lg md:text-xl px-6 py-2 rounded-full mb-6"
            >
              {t('airports_page.cdg.price_badge')}
            </motion.div>
            <motion.h1
              className="heading-hero text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {(() => {
                const titleStr = t('airports_page.cdg.hero_title') as string;
                const highlight = titleStr.includes('CDG Roissy') ? 'CDG Roissy' : null;
                if (highlight) {
                  const parts = titleStr.split(highlight);
                  return (
                    <>
                      {parts[0]}
                      <span className="text-brand">{highlight}</span>
                      {parts[1]}
                    </>
                  );
                }
                return titleStr;
              })()}
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t('airports_page.cdg.hero_subtitle')}
            </p>
            <p className="mt-4 text-brand font-semibold text-base md:text-lg">
              {t('airports_page.cdg.price_label')}
            </p>
          </div>
        </section>
        {/* Quick info cards */}
        <section className="bg-transparent py-12 -mt-10 relative z-20">
          <div className="container overflow-x-auto pb-4 no-scrollbar lg:overflow-visible">
            <div className="flex gap-4 lg:grid lg:grid-cols-5 min-w-max lg:min-w-0">
              {Array.isArray(details) && details.map((item, i) => {
                const icons = [FiCreditCard, FiMapPin, FiClock, FiClock, FiSend];
                const iconColors = ['text-blue-500', 'text-red-500', 'text-slate-400', 'text-sky-500', 'text-blue-600'];
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
          <div className="grid md:grid-cols-1 items-start">
            {/* Why Book */}
            <div>
              <motion.h2
                className="heading-section mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('airports_page.cdg.why_title')}
              </motion.h2>
              <ul className="space-y-4">
                {Array.isArray(whyPoints) && whyPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
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

              {/* Pickup info */}
              {/* <div className="mt-8 p-5 rounded-xl bg-brand/10 border border-brand/20">
                <h3 className="font-bold text-ink mb-2 flex items-center gap-2">
                  <FiMapPin className="text-brand" />
                  {t('airports_page.cdg.pickup_title')}
                </h3>
                <p className="text-ink-softer text-sm">{t('airports_page.cdg.pickup_text')}</p>
              </div> */}
            </div>
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
              {t('airports_page.cdg.booking_title')}
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
        {/* Served Terminals */}
        <section className="section bg-white dark:bg-transparent">
          <div className="container">
            <div className="text-center mb-12">
              <motion.h2
                className="heading-section mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {terminalsTitle.split('CDG').map((part: string, i: number) => (
                  <span key={i}>
                    {part}
                    {i === 0 && <span className="text-brand">CDG</span>}
                  </span>
                ))}
              </motion.h2>
              <motion.p
                className="text-ink-softer text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {terminalsSubtitle}
              </motion.p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.isArray(terminalData) && terminalData.map((terminal, i) => {
                const isCurrent = i === 0; // Terminal 1 is current for this example
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`
                      relative flex flex-col p-6 rounded-2xl border transition-all duration-300 text-center
                      ${isCurrent 
                        ? 'bg-white dark:bg-slate-900 border-brand shadow-[0_0_20px_rgba(242,169,0,0.2)]' 
                        : 'bg-card border-card hover:shadow-lg'
                      }
                    `}
                  >
                    {isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {t('nav.select_language') === 'Choisir la langue' ? 'Vous êtes ici' : 'You are here'}
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-2 text-ink mt-2">
                      {terminal.name}
                    </h3>
                    <p className="text-sm text-ink-softer mb-6 min-h-[40px]">
                      {terminal.desc}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="text-3xl font-black text-brand mb-6">
                        {terminal.price}
                      </div>
                      
                      <Link
                        href={`/?pickup=Paris&dropoff=CDG ${terminal.name}&fare=${terminal.price}&luggage=1#reservation`}
                        className={`
                          w-full btn py-2 px-4 text-sm flex items-center justify-center gap-2 group
                          ${isCurrent 
                            ? 'btn-primary' 
                            : 'btn-outline border-slate-200 dark:border-slate-700 text-ink-softer hover:text-white hover:border-brand'
                          }
                        `}
                      >
                        {isCurrent ? terminal.name : (t('nav.reservation') === 'Réservation' ? 'Réserver' : 'Book')}
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section container text-center">
          <div className="bg-brand/10 rounded-2xl md:rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="heading-section mb-4">{t('airports_page.cdg.hero_title')}</h2>
            <p className="text-ink-softer text-lg mb-8">{t('airports_page.cdg.hero_subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#reservation"
                className="btn btn-primary px-8 py-3 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('airports_page.cdg.cta_button')}
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
