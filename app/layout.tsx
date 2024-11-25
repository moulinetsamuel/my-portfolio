import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { cn } from '@/lib/utils';
import { Anek_Telugu } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import Meteors from '@/components/magicui/meteors';
import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from '@/providers/next-auth-provider';
import { SWRProvider } from '@/providers/swr-provider';
import StructuredData from '@/components/StructuredData';

const AnekTelugu = Anek_Telugu({
  subsets: ['latin'],
  variable: '--font-caption',
});

export const metadata: Metadata = {
  title: 'Samuel Moulinet | Développeur Full Stack',
  description:
    'Portfolio de Samuel Moulinet, développeur web full stack spécialisé en Next.js, React et TypeScript. Découvrez mes projets et compétences en développement web moderne.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={cn(
          GeistSans.variable,
          AnekTelugu.variable,
          'font-sans overflow-x-hidden relative min-h-screen flex flex-col',
        )}
      >
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SWRProvider>
              <div className="grow">
                <Meteors number={75} />
                {children}
              </div>
              <Toaster />
            </SWRProvider>
          </ThemeProvider>
        </NextAuthProvider>
        <StructuredData />
      </body>
    </html>
  );
}
