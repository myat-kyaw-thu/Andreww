import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from './components/theme-provider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Myat Kyaw Thu – Full Stack Developer | React & Laravel Expert',
  description: 'Myat Kyaw Thu: Full Stack Developer specializing in React, Laravel, and JavaScript. Explore my projects and contact me for opportunities.',
  keywords: [
    'Myat Kyaw Thu',
    'React developer',
    'Laravel expert',
    'JavaScript developer',
    'Yangon software developer',
    'CMS websites',
    'REST API development',
    'KBZPay integration',
  ],
  generator: 'Next.js 15.1.7',
  applicationName: 'Myat Kyaw Thu – Developer Portfolio',
  authors: [
    {
      name: 'Myat Kyaw Thu',
      url: 'https://www.linkedin.com/in/myat-kyaw-thu-0b8177334/',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myatkyawthu.com',
    siteName: 'Myat Kyaw Thu - Full Stack Developer',
    title: 'Myat Kyaw Thu – Full Stack Developer | React & Laravel Expert',
    description: 'Full Stack Developer based in Yangon, Myanmar. Specializing in React, Next.js, Vue.js, Express.js, and Laravel.',
    images: [
      {
        url: 'https://myatkyawthu.com/profile2.png',
        width: 1200,
        height: 630,
        alt: 'Myat Kyaw Thu - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myat Kyaw Thu – Full Stack Developer',
    description: 'Full Stack Developer based in Yangon, Myanmar.',
    images: ['https://myatkyawthu.com/profile2.png'],
    creator: '@myatkyawthu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://myatkyawthu.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Myat Kyaw Thu',
    url: 'https://myatkyawthu.com',
    image: 'https://myatkyawthu.com/profile2.png',
    jobTitle: 'Full Stack Developer',
    location: {
      '@type': 'Place',
      name: 'Yangon, Myanmar',
    },
    sameAs: [
      'https://github.com/myat-kyaw-thu',
      'https://linkedin.com/in/myat-kyaw-thu-0b8177334',
      'https://leetcode.com/u/MyatKyawThu/',
    ],
    email: 'myatkyawthu4002@gmail.com',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/profile2.png" className="rounded-full" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
