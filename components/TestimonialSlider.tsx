'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';

export default function TestimonialSlider() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  
  const testimonials = [
    {
      quote: t('home_page.testimonials.items.0.quote'),
      author: t('home_page.testimonials.items.0.author'),
      role: t('home_page.testimonials.items.0.role')
    },
    {
      quote: t('home_page.testimonials.items.1.quote'),
      author: t('home_page.testimonials.items.1.author'),
      role: t('home_page.testimonials.items.1.role')
    },
    {
      quote: t('home_page.testimonials.items.2.quote'),
      author: t('home_page.testimonials.items.2.author'),
      role: t('home_page.testimonials.items.2.role')
    }
  ];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-card bg-card p-8 shadow-soft">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xl md:text-2xl">“{testimonials[index].quote}”</p>
          <p className="mt-4 text-sm text-ink-softer">
            — {testimonials[index].author}, {testimonials[index].role}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-2 w-2 rounded-full ${
              i === index ? 'bg-brand' : 'bg-ink-softer'
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
