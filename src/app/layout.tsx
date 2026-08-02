import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/src/app/globals.css';
import Header from '@/src/widgets/header/ui/Header';
import Footer from '@/src/widgets/footer/ui/Footer';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'The World We Knew — Leon Gray',
  description:
    'Интерактивный сайт-книга с главами, архивом, картой и новостями',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full overflow-x-hidden bg-zinc-50 font-sans antialiased dark:bg-[#010407]`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
