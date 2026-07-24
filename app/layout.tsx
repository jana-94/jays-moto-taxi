import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/app/context/LanguageContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'jays Taxi Moto — Paris & Île-de-France',
  description:
    'Fast, reliable, and secure motorcycle taxi services in Paris and Île-de-France. Available 24/7 for your daily commute and urgent travels.',
  metadataBase: new URL('https://jays-taxi-moto.com'),
  icons: {
    icon: '/images/logo/logonew3.png',
    shortcut: '/images/logo/logonew3.png',
    apple: '/images/logo/logonew3.png',
  },
  openGraph: {
    title: 'jays Taxi Moto — Paris & Île-de-France',
    description:
      'Fast, reliable, and secure motorcycle taxi services in Paris and Île-de-France. Available 24/7 for your daily commute and urgent travels.',
    url: 'https://jays-taxi-moto.com',
    siteName: 'jays Taxi Moto',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'jays Taxi Moto Hero'
      }
    ],
    locale: 'fr_FR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jays Taxi Moto — Paris & Île-de-France',
    description:
      'Fast, reliable, and secure motorcycle taxi services in Paris and Île-de-France. Available 24/7 for your daily commute and urgent travels.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MWZ9Z3MG');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-[var(--font-inter)]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MWZ9Z3MG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LanguageProvider>

        {/* Conversion tracking for contact form submission */}
        <Script
          id="contact-conversion-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('load', function() {if (window.location.href.indexOf('/contact') != -1) {var x = 0;var myVar = setInterval(function() {if (x == 0) {if (document.querySelector('.text-sm.text-green-500')&&document.querySelector('.text-sm.text-green-500').innerText.includes('Merci !')) {gtag('event', 'conversion', {'send_to': 'AW-18123000597/ea5oCKHepKwcEJWW3MFD'});clearInterval(myVar);x = 1;}}}, 1000);}});`,
          }}
        />
      </body>
    </html>
  );
}