'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    {
      id: 1,
      image: '/images/home/heroslide1.png',
      mobileImage: '/images/home/heroslide1-mobile1.png',
      title: t('hero.slides.0.title'),
      subtitle: t('hero.slides.0.subtitle')
    },
    // {
    //   id: 2,
    //   image: '/images/home/hero33.jpg',
    //   mobileImage: '/images/home/hero33-mobile.png',
    //   title: t('hero.slides.1.title'),
    //   subtitle: t('hero.slides.1.subtitle')
    // },
    // {
    //   id: 3,
    //   image: '/images/home/hero4.jpg',
    //   mobileImage: '/images/home/hero4-mobile.png',
    //   title: t('hero.slides.2.title'),
    //   subtitle: t('hero.slides.2.subtitle')
    // }
  ];

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % slides.length);
  //   }, 9000);
  //   return () => clearInterval(timer);
  // }, [slides.length]);

  const currentImage = isMobile
    ? slides[current].mobileImage
    : slides[current].image;

  return (
    <section id="home" className="relative min-h-[500px] md:min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={currentImage}
            alt={slides[current].title}
            fill
            priority
            className="object-cover object-center "
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="container flex min-h-[500px] md:min-h-screen flex-col items-start justify-center pt-28 pb-12 md:pt-0 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-brand/90 backdrop-blur-sm text-black font-bold text-[10px] sm:text-xs lg:text-sm px-3 sm:px-4 py-1 md:py-1.5 rounded-full mb-4 md:mb-6 border border-brand/20 shadow-lg"
              >
                {t('hero.top_badge')}
              </motion.div>
              <h1 className="heading-hero text-white">
                {(() => {
                  const title = slides[current].title;
                  if (current === 0) {
                    const highlightEn = 'in Paris';
                    const highlightFr = 'à Paris';
                    const highlight = title.includes(highlightEn) ? highlightEn : title.includes(highlightFr) ? highlightFr : null;
                    if (highlight) {
                      const parts = title.split(highlight);
                      return (
                        <>
                          {parts[0]}
                          <span className="text-brand">{highlight}</span>
                          {parts[1]}
                        </>
                      );
                    }
                  }
                  return title;
                })()}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mt-4 md:mt-6 max-w-2xl text-gray-300">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 md:mt-10 w-full"
          >
            {/* Info Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-5 md:mb-8">
              {[
                t('hero.badges.airports'),
                t('hero.badges.stations'),
                t('hero.badges.paris_idf')
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-2.5 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] sm:text-xs lg:text-sm font-medium transition-all hover:bg-white/20 whitespace-nowrap"
                >
                  {badge}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 md:gap-4 w-full sm:w-auto">
              <a href="#reservation" className="btn btn-primary !text-white justify-center text-[13px] sm:text-sm lg:text-base px-5 md:px-6 py-2.5 md:py-3">
                {t('hero.book_ride')}
              </a>
              <a
                href="https://wa.me/33684406126"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25D366] !text-white hover:bg-[#20bd5a] justify-center flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 shadow-lg text-[13px] sm:text-sm lg:text-base"
              >
                <FaWhatsapp size={16} className="md:w-5 md:h-5" />
                {t('hero.whatsapp')}
              </a>
              <a
                href="tel:+33684406126"
                className="btn btn-outline border-white !text-white hover:text-black justify-center flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 text-[13px] sm:text-sm lg:text-base"
              >
                <FiPhone size={16} className="md:w-5 md:h-5 text-white" />
                {t('hero.call')}
              </a>
            </div>
          </motion.div>

          {/* <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-all ${index === current ? 'bg-brand w-6' : 'bg-white/50 hover:bg-white'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </AnimatePresence>
    </section>
  );
}