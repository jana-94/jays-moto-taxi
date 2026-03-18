'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heroImage = isMobile
    ? '/images/home/shero33-mobile.png'
    : '/images/home/hero3.png';

  const equipments = [
    {
      title: t('equipments.headset.title'),
      description: t('equipments.headset.desc'),
      image: '/images/connectedHelmet.png'
    },
    {
      title: t('equipments.charlottes.title'),
      description: t('equipments.charlottes.desc'),
      image: '/images/cap.png' // Generic clean image
    },
    {
      title: t('equipments.gloves.title'),
      description: t('equipments.gloves.desc'),
      image: '/images/protectiveGloves.png'
    },
    {
      title: t('equipments.apron.title'),
      description: t('equipments.apron.desc'),
      image: '/images/apron.png' // Using jacket image as proxy
    },
    {
      title: t('equipments.jacket.title'),
      description: t('equipments.jacket.desc'),
      image: '/images/jacket.png'
    },
    {
      title: t('equipments.airbag.title'),
      description: t('equipments.airbag.desc'),
      image: '/images/airbag.png' // Motorcycle gear
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Service Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroImage}
              alt={t('services_page.alts.taxi_service')}
              fill
              priority
              className="object-cover object-center md:object-top"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container text-center">
            <motion.h1
              className="heading-hero text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('services_page.hero_title')}
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {t('services_page.hero_subtitle')}
            </p>
          </div>
        </section>

        {/* Introduction Content */}

        <section className="section container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-soft border border-card">
              <Image
                src="/images/services/bmw.jpg"
                alt={t('services_page.alts.vehicle_maintenance')}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              {/* <h2 className="heading-section text-brand">{t('services_page.speed_flexibility_title')}</h2> */}
              <p className="text-base md:text-lg text-ink-softer">
                {t('services_page.speed_flexibility_text_1')}
              </p>
              <p className="text-base md:text-lg text-ink-softer">
                {t('services_page.speed_flexibility_text_2')}
              </p>
              <p className="text-base md:text-lg text-ink-softer">
                {t('services_page.speed_flexibility_text_3')}
              </p>
              <p className="text-base md:text-lg text-ink font-semibold">
                {t('services_page.speed_flexibility_text_4')}
              </p>

            </div>
          </div>
        </section>

        {/* Equipements Section */}
        <section className="section bg-base-light">
          <div className="container">
            <h2 className="heading-section text-center mb-10 md:mb-12">{t('services_page.equipment_title')}</h2>
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {equipments.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all border border-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative mt-6 md:mt-10 h-40 md:h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-5 md:p-6 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold text-ink mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-ink-softer">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Maintenance Section */}
        <section className="section container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-soft border border-card md:order-last">
              <Image
                src="/images/repair.jpg"
                alt={t('services_page.alts.vehicle_maintenance')}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="heading-section">{t('services_page.maintenance_title')}</h2>
              <p className="text-base md:text-lg text-ink-softer">
                {t('services_page.maintenance_text')}
              </p>
            </div>
          </div>
        </section>

        {/* Luggage Option Section */}
        <section className="section bg-base-light">
  <div className="container max-w-5xl">
    <div className="flex flex-col md:flex-row gap-10 md:gap-8">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-4 md:gap-6">
        <h2 className="heading-section flex items-center gap-3">
          <FiShoppingBag className="text-brand shrink-0" /> {t('services_page.luggage_title')}
        </h2>
        <div className="flex-1 space-y-3 md:space-y-4 text-base md:text-lg text-ink-softer">
          <p>{t('services_page.luggage_text_1')}</p>
          <p className="font-medium text-ink">{t('services_page.luggage_text_2')}</p>
        </div>
        <div className="relative h-[280px] md:h-[380px] w-full rounded-xl overflow-hidden shadow-sm border border-card">
          <Image
            src="/images/services/portable.png"
            alt={t('services_page.alts.luggage_option')}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-4 md:gap-6">
        <h2 className="heading-section flex items-center gap-3">
          <FiPackage className="text-brand shrink-0" /> {t('services_page.parcel_title')}
        </h2>
        <div className="flex-1 space-y-3 md:space-y-4 text-base md:text-lg text-ink-softer">
          <p>{t('services_page.parcel_text_1')}</p>
          <p>{t('services_page.parcel_text_2')}</p>
        </div>
        <div className="relative h-[280px] md:h-[380px] w-full rounded-xl overflow-hidden shadow-sm border border-card">
          <Image
            src="/images/services/parcel.jpeg"
            alt={t('services_page.alts.parcel_delivery')}
            fill
            className="object-cover"
          />
        </div>
      </div>

    </div>
  </div>
</section>

        {/* Contact CTA */}
        <section className="section container text-center">
          <div className="bg-brand/10 rounded-2xl md:rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="heading-section mb-4 md:mb-6">{t('services_page.cta_title')}</h2>
            <p className="text-lg md:text-xl text-ink-softer mb-6 md:mb-8">
              {t('services_page.cta_subtitle')}
            </p>
            <a
              href="/#contact"
              className="btn btn-primary px-8 py-3 md:py-4 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
            >
              {t('services_page.cta_button')}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
