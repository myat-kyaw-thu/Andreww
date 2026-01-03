import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from './components/theme-provider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  // You can use specific weights if needed
  // weight: ['300', '400', '500', '600', '700']
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
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/profile2.png" className="rounded-full" />
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
