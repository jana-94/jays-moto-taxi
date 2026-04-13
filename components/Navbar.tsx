'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useScrollSpy } from '@/lib/useScrollSpy';
import { FiMenu, FiX, FiPhone, FiChevronDown } from 'react-icons/fi';
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '/' },
    { id: 'services', label: t('nav.services'), href: '/services' },
    // { id: 'pricing', label: t('nav.pricing'), href: '/#pricing' },
    { id: 'reservation', label: t('nav.reservation'), href: '/#reservation' },
    { id: 'contact', label: t('nav.contact'), href: '/contact' },
  ];

  const dropdownItems = [
    {
      id: 'airports',
      label: t('nav.airports'),
      subItems: [
        { label: t('CDG'), href: '/airports/cdg' },
        { label: t('ORLY'), href: '/airports/orly' },
      ],
    },
    {
      id: 'stations',
      label: t('nav.stations'),
      subItems: [
        { label: t('nav.gare_du_nord'), href: '/stations/gare-du-nord' },
        { label: t('nav.gare_de_lyon'), href: '/stations/gare-de-lyon' },
        { label: t('nav.gare_de_l_est'), href: '/stations/gare-de-l-est' },
        { label: t('nav.montparnasse'), href: '/stations/gare-montparnasse' },
      ],
    },
  ];

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [active]);

  const isDark = mounted && resolvedTheme === 'dark';
  const logoSrc = (!mounted || !scrolled || isDark)
    ? '/images/logo/logonew3.png'
    : '/images/logo/logonew4.png';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition ${scrolled ? 'bg-base shadow-soft' : 'bg-transparent text-white'
        }`}
    >
      <nav className="container flex h-20 items-center justify-between">
        <Link href='/' className="flex flex-col items-start leading-none justify-center items-center">
         <Image
  className='header-logo'
  src={logoSrc}
  alt='logo'
  width={200}      // ← increase this from 90 — it's the intrinsic max width
  height={60}      // ← match your tallest CSS height
  style={{ width: 'auto' }}   // ← this is the key fix
/>
          {/* <span className="text-[6px] md:text-[8px] pl-2 md:pl-0 mb-0.5 font-[var(--font-poppins)] font-extrabold tracking-tight opacity-90 whitespace-nowrap uppercase">
            {t('nav.slogan')}
          </span> */}
        </Link>

        <div className="flex items-center gap-4" ref={dropdownRef}>
          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-4">
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
            {/* Dropdown nav items */}
            {dropdownItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  className="flex items-center gap-1 text-sm uppercase tracking-wide hover:text-brand transition-colors cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  aria-expanded={openDropdown === item.id}
                  aria-haspopup="true"
                >
                  {item.label}
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === item.id && (
                  <div
                    className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-base border border-base-border shadow-lg overflow-hidden z-50"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-3 text-sm text-ink hover:bg-brand/10 hover:text-brand transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden xl:flex items-center gap-4 mr-2">
            <div className="flex items-center gap-2">
              <FiPhone className="text-brand" size={18} />
              <a href="tel:+33684406126" className="text-sm font-semibold hover:text-brand transition-colors whitespace-nowrap">
                06 84 40 61 26
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

          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          <ThemeToggle />

          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-base border-t border-base-border text-ink">
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

            {/* Mobile dropdown items */}
            {dropdownItems.map((item) => (
              <li key={item.id}>
                <button
                  className="flex items-center justify-between w-full py-3 text-base font-medium text-ink hover:text-brand transition-colors"
                  onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                >
                  <span>{item.label}</span>
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileExpanded === item.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileExpanded === item.id && (
                  <ul className="pl-4 pb-2 space-y-1 border-l-2 border-brand/30 ml-2">
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block py-2 text-sm text-ink-softer hover:text-brand transition-colors"
                          onClick={() => { setOpen(false); setMobileExpanded(null); }}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
