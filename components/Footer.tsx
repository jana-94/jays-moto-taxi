'use client';

import Link from 'next/link';
import './footer.css';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const address = "8 Avenue des Saules, 91390, Morsang-sur-Orge, France";
  const encodedAddress = encodeURIComponent(address);
  return (
    <div id="footer" className='footer-outline'>
      <div className='logo-container'>
        <Link className="flex flex-col items-start leading-none justify-center items-center" href='/'>
          <Image
            className='header-logo'
            src='/images/logo/logonew3.png'
            alt='logo'
            width={120}
            height={40}
          />
          {/* <span className="text-[8px] md:text-[10px] font-[var(--font-poppins)] font-extrabold tracking-tight opacity-90 whitespace-nowrap text-white uppercase">
            {t('nav.slogan')}
          </span> */}
        </Link>
        {/* <div className='social'>
          <Link href='/' className='social-icon-outer'>
            <img className='social-icon' src='/img/fb.svg' alt='facebook' />
          </Link>
          <Link href='/' className='social-icon-outer'>
            <img className='social-icon' src='/img/tw.svg' alt='twitter' />
          </Link>
          <Link href='/' className='social-icon-outer'>
            <img className='social-icon' src='/img/instagram.svg' alt='instagram' />
          </Link>
          <Link href='/' className='social-icon-outer'>
            <img className='social-icon' src='/img/linkedin.svg' alt='linkedin' />
          </Link>
        </div> */}
        <Link
          href={`https://www.google.com/maps?q=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="address-content"
        >
          <span className="address flex"><img className="mr-2 h-4 w-4" src="/images/marker.svg" /> <p className='hide-bottom-txt'> 8 Avenue des Saules, 91390, Morsang-sur-Orge, France </p></span>
        </Link>
        <Link href="tel:+33684406126" className="address-content">
          <span className="address flex"><img className="mr-2 h-4 w-4" src="/images/call_white.svg" /> <p className='hide-bottom-txt'> +33 (0)6 84 40 61 26 </p></span>
        </Link>
      </div>
      <div style={{ width: '100%' }}>
        <img className='h-36 md:mt-4 car-animation' src='/images/footerbike.png' />
      </div>
      <div className='divider' />
      <div className='footer-bottom'>
        <div className="address-content">
          <p className="address flex">
            {t('footer.footer_title')} &copy;{new Date().getFullYear()}.
          </p>
          <p className="address flex">
            {t('footer.rightsreserved')}
          </p>
        </div>
        <Link href="mailto:contact@jays-transport.fr" className="address-content">
          <span className="address flex"> <img className="mr-2 h-4 w-4" src="/images/mail.svg" /> <p className='hide-bottom-txt'> contact@jays-transport.fr </p></span>
        </Link>
        <Link className='address-content' href='https://wa.me/33684406126' target='_blank' rel='noopener noreferrer'>
          <span className="address flex"><img className='mr-2 h-4 w-4' src='/images/whatsapp.svg' /><p className='hide-bottom-txt'> {t('footer.whatsapp')}</p></span>
        </Link>
      </div>

    </div>
  );
};

export default Footer;
