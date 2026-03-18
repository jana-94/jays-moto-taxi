'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiMapPin, FiClock, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main>
        {/* Contact Hero */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/home/hero6.png"
              alt={t('contact_page.alts.contact_us')}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container text-center">
             <motion.h1 
                className="heading-hero text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
             >
                {t('contact_page.hero_title')}
             </motion.h1>
             <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                {t('contact_page.hero_subtitle')}
             </p>
          </div>
        </section>

        {/* Info Grid Section */}
        <section className="bg-base">
          <div className="container mx-auto">
             <div className="flex flex-col md:flex-row shadow-lg mt-16 relative z-10 bg-card rounded-xl overflow-hidden border border-card">
                {/* Left Side - Brand Color Background */}
                <div className="md:w-1/3 bg-brand p-12 flex items-center">
                   <h2 className="text-3xl my-14 font-bold text-black leading-tight">
                      {t('contact_page.questions_title')}
                      
                   </h2>
                </div>
                
                {/* Right Side - Info Grid */}
                <div className="md:w-2/3 p-8 grid grid-cols-1 sm:grid-cols-2 gap-8 bg-card">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                       <div className="p-3 rounded-full border border-base-border bg-base-light">
                          <FiMapPin className="text-2xl text-brand" />
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-ink mb-1">{t('contact_page.info.address_title')}</h3>
                          <p className="text-ink-softer text-sm leading-relaxed">
                             {t('contact_page.info.address_text')}
                          </p>
                       </div>
                    </div>

                    {/* Hourly */}
                    <div className="flex items-start gap-4">
                       <div className="p-3 rounded-full border border-base-border bg-base-light">
                          <FiClock className="text-2xl text-brand" />
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-ink mb-1">{t('contact_page.info.hourly_title')}</h3>
                          <p className="text-ink-softer text-sm">
                             {t('contact_page.info.hourly_text')}
                          </p>
                       </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-4">
                       <div className="p-3 rounded-full border border-base-border bg-base-light">
                          <FaWhatsapp className="text-2xl text-brand" />
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-ink mb-1">{t('contact_page.info.whatsapp_title')}</h3>
                          <p className="text-ink-softer text-sm">
                             {t('contact_page.info.whatsapp_text')}
                          </p>
                       </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex items-start gap-4">
                       <div className="p-3 rounded-full border border-base-border bg-base-light">
                          <FiMail className="text-2xl text-brand" />
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-ink mb-1">{t('contact_page.info.email_title')}</h3>
                          <p className="text-ink-softer text-sm">
                             {t('contact_page.info.email_text')}
                          </p>
                       </div>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section container">
           <div className="max-w-3xl mx-auto">
              <h2 className="heading-section text-center mb-12">{t('contact_page.form_section_title')}</h2>
              <div className="bg-card p-8 rounded-2xl shadow-soft border border-card">
                 <ContactForm />
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
