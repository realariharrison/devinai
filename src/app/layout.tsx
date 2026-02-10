import type { Metadata } from 'next';
import { IBM_Plex_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-serif',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DevinAI | Outcome Architecture for Software',
  description:
    'Transform your software vision into deployed reality. DevinAI delivers outcome-guaranteed development through AI-augmented architecture and execution.',
  keywords: [
    'outcome architecture',
    'AI development',
    'software engineering',
    'guaranteed delivery',
    'system architecture',
    'technical consulting',
  ],
  authors: [{ name: 'DevinAI' }],
  openGraph: {
    title: 'DevinAI | Outcome Architecture for Software',
    description:
      'Transform your software vision into deployed reality. Outcome-guaranteed development through AI-augmented architecture.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevinAI | Outcome Architecture for Software',
    description:
      'Transform your software vision into deployed reality. Outcome-guaranteed development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
