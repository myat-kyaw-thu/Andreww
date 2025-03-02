import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Andrew Gallagher - Full-Stack Developer | React & Node.js Specialist',
  description: 'Award-winning software engineer showcasing 5+ years of full-stack development experience with modern web technologies. Explore my open-source projects, technical blogs, and client success stories.',
  keywords: [
    'web development portfolio',
    'React.js projects',
    'Node.js expert',
    'TypeScript developer',
    'REST API development',
    'cloud architecture',
    'AWS certified solutions',
    'agile development process'
  ],
  openGraph: {
    title: 'Andrew Gallagher | Full-Stack Development Portfolio',
    description: 'View my latest projects in fintech SaaS solutions and AI-powered applications. 4x Hackathon winner with expertise in scalable system design.',
    url: 'https://andrewdevportfolio.com',
    siteName: 'AndrewDevPortfolio',
    images: [
      {
        url: 'https://andrewdevportfolio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Andrew Gallagher Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrew Gallagher - Tech Portfolio',
    description: 'Open-source contributor | Cloud-native solutions architect | Follow my development journey with weekly technical deep-dives',
    creator: '@andrew_dev',
    images: ['https://andrewdevportfolio.com/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://andrewdevportfolio.com',
  },
  generator: 'Next.js 14.1.3',
  applicationName: 'Developer Portfolio',
  authors: [{ name: 'Andrew Gallagher', url: 'https://linkedin.com/in/andrew-dev' }],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
