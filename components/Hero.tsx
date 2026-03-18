'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';

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
    {
      id: 2,
      image: '/images/home/hero33.jpg',
      mobileImage: '/images/home/hero33-mobile.png',
      title: t('hero.slides.1.title'),
      subtitle: t('hero.slides.1.subtitle')
    },
    {
      id: 3,
      image: '/images/home/hero4.jpg',
      mobileImage: '/images/home/hero4-mobile.png',
      title: t('hero.slides.2.title'),
      subtitle: t('hero.slides.2.subtitle')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [slides.length]);

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

        <div className="container flex min-h-[500px] md:min-h-screen flex-col items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="heading-hero text-white">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl mt-6 max-w-2xl text-gray-300">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto"
          >
            <a href="#contact" className="btn btn-primary justify-center m-auto ">
              {t('hero.book_ride')}
            </a>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === current ? 'bg-brand w-6' : 'bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
}