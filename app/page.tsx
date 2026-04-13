'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ServicesCard } from '@/components/ServicesCard';
import PricingTable from '@/components/PricingTable';
import ReservationSection from '@/components/ReservationSection';
import TestimonialSlider from '@/components/TestimonialSlider';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { FiClock, FiCompass, FiDroplet, FiShield, FiSmile, FiAward, FiNavigation, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import ProvisionSection from '@/components/ProvisionSection';
import ProcessSection from '@/components/ProcessSection';
import ZonesSection from '@/components/ZonesSection';

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: FiNavigation,
      title: t('home_page.services.items.airports.title'),
      description: t('home_page.services.items.airports.desc'),
      price: t('home_page.services.items.airports.price')
    },
    {
      icon: FiCompass,
      title: t('home_page.services.items.stations.title'),
      description: t('home_page.services.items.stations.desc'),
      price: t('home_page.services.items.stations.price')
    },
    {
      icon: FiMapPin,
      title: t('home_page.services.items.paris.title'),
      description: t('home_page.services.items.paris.desc'),
      price: t('home_page.services.items.paris.price')
    }
  ];

  const portfolio = [
    {
      title: 'E-commerce Redesign',
      category: 'Design',
      imageUrl:
        'https://images.unsplash.com/photo-1529333166437-7750f19b353d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Fintech Dashboard',
      category: 'Product',
      imageUrl:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Health App',
      category: 'App',
      imageUrl:
        'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const team = [
    {
      name: 'Sarah Kim',
      role: 'Head of Design',
      imageUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Liam Parker',
      role: 'Lead Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Ava Nguyen',
      role: 'Product Manager',
      imageUrl:
        'https://images.unsplash.com/photo-1520974658441-4e8430b45c3a?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProcessSection />
        <ZonesSection />

        <section id="services" className="section container">
          <motion.h2
            className="heading-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home_page.services.title')}
          </motion.h2>
          <div className="mt-6 flex flex-col gap-3 max-w-4xl">
            {t('home_page.services.subtitle').split('\n\n').map((point: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <FiCheckCircle className="text-brand shrink-0 mt-1.5" size={18} />
                <p className="text-ink-softer text-base md:text-lg leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServicesCard 
                key={s.title} 
                icon={s.icon} 
                title={s.title} 
                description={s.description} 
                price={s.price}
              />
            ))}
          </div>
        </section>

        <PricingTable />

        <ReservationSection />

        <ProvisionSection />

        <section id="testimonials" className="section container">
          <motion.h2
            className="heading-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home_page.testimonials.title')}
          </motion.h2>
          <p className="mt-2 subheading">{t('home_page.testimonials.subtitle')}</p>
          <div className="mt-8">
            <TestimonialSlider />
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container grid gap-10 md:grid-cols-1">
            <div>
              <motion.h2
                className="heading-section"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('home_page.contact.title')}
              </motion.h2>
              <p className="mt-2 subheading">
                {t('home_page.contact.subtitle')}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
            {/* <div className="rounded-xl border border-card bg-card shadow-soft">
              <iframe
                title={t('home_page.contact.google_map_title')}
                width="100%"
                height="100%"
                className="min-h-[350px] rounded-xl"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.110514982845!2d-122.41941568468085!3d37.77492927975924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085814d1f2a3f4b%3A0x4c2e50d9d2a456df!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1672533653546!5m2!1sen!2sus"
              />
            </div> */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}