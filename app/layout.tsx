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
        {/* Google tag (gtag.js) */}
        <Script
          id="gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-QD1D1BCRPV"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QD1D1BCRPV');`,
          }}
        />
        {/* End Google tag (gtag.js) */}
      </head>
      <body className="font-[var(--font-inter)]">
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
            __html: `window.addEventListener('load', function() {
  if (window.location.href.indexOf('/contact') != -1) {
    var x = 0;
    var myVar = setInterval(function() {
      if (x == 0) {
        if (document.querySelector('.text-sm.text-green-500') && document.querySelector('.text-sm.text-green-500').innerText.includes('Merci !')) {
          gtag('event', 'conversion', {'send_to': 'AW-18123000597/ea5oCKHepKwcEJWW3MFD'});
          clearInterval(myVar);
          x = 1;
        }
      }
    }, 1000);
  }
});`,
          }}
        />
      </body>
    </html>
  );
}