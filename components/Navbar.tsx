'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useScrollSpy } from '@/lib/useScrollSpy';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const sections = ['home', 'services', 'pricing', 'reservation', 'contact'];

export default function Navbar() {
  const { t } = useLanguage();
  const active = useScrollSpy(sections, 120);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '/' },
    { id: 'services', label: t('nav.services'), href: '/services' },
    { id: 'pricing', label: t('nav.pricing'), href: '/#pricing' },
    { id: 'reservation', label: t('nav.reservation'), href: '/#reservation' },
    { id: 'contact', label: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    setOpen(false);
  }, [active]);

  // Logo logic:
  // Not mounted (SSR) -> Default white (assuming initial load is top of page)
  // Top of page (!scrolled) -> White
  // Scrolled + Dark Mode -> White
  // Scrolled + Light Mode -> Colored/Black

  const isDark = mounted && resolvedTheme === 'dark';
  const logoSrc = (!mounted || !scrolled || isDark)
    ? '/images/logo/logo_latest_white_svg.svg'
    : '/images/logo/logo_latest_svg.svg';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition ${scrolled ? 'bg-base shadow-soft' : 'bg-transparent text-white'
        }`}
    >
      <nav className="container flex h-20 items-center justify-between">
        <Link href='/' className="flex flex-col items-start leading-none justify-center items-center">
          <Image
            className='header-logo '
            src={logoSrc}
            alt='logo'
            width={120}
            height={40}
          />
          <span className="text-[6px] md:text-[8px] pl-2 md:pl-0 mb-0.5 font-[var(--font-poppins)] font-extrabold tracking-tight opacity-90 whitespace-nowrap uppercase">
            {t('nav.slogan')}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`text-sm uppercase tracking-wide ${active === item.id ? 'text-brand' : 'hover:text-brand'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4 mr-2">
            <div className="flex items-center gap-2">
              <FiPhone className="text-brand" size={18} />
              <a href="tel:+33684406126" className="text-sm font-semibold hover:text-brand transition-colors whitespace-nowrap">
                +33 (0)6 84 40 61 26
              </a>
            </div>
            <a
              href="https://wa.me/33684406126"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors"
              aria-label="Contact on WhatsApp"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <ThemeToggle />

          <button
            aria-label="Toggle menu"
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden bg-base border-t border-base-border text-ink">
          <ul className="container py-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`block py-3 text-base font-medium transition-colors ${active === item.id ? 'text-brand' : 'text-ink hover:text-brand'
                    }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 border-t border-base-border flex items-center justify-between bg-base-light/30">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-softer">{t('nav.select_language')}</span>
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
