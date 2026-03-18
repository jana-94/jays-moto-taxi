import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';

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
        url: '/images/og-image.jpg', // Placeholder, ensure this path exists or use a valid one
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

import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/app/context/LanguageContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
