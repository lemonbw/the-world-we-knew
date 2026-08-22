import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/src/app/globals.css';
import { Header, Panel } from '@/src/widgets/header';
import { Footer } from '@/src/widgets/footer';
import { Background } from '@/src/widgets/background';
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
          <Background />
          <div className="relative z-20 flex justify-center pt-32 pb-0 lg:pt-0">
            <Panel />
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
