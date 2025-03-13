import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Myat Kyaw Thu - Software Developer | React & Laravel Specialist',
  description:
    'Results-oriented software developer with hands-on experience building scalable web applications in JavaScript and PHP/Laravel. Explore my portfolio featuring CMS websites, wedding systems, and the ExamPlus Mini App on KBZPay.',
  keywords: [
    'web development portfolio',
    'React.js projects',
    'Laravel developer',
    'JavaScript developer',
    'REST API development',
    'agile development process',
    'production server management',
    'KBZPay integration',
    'CMS websites',
  ],
  openGraph: {
    title: 'Myat Kyaw Thu | Software Developer Portfolio',
    description:
      'View my latest projects, including two CMS websites, the MerryMarry Wedding System, and the ExamPlus Mini App on KBZPay. Follow my journey in building user-centric and high-performing solutions.',
    url: 'https://myatkyawthu.dev', // Replace with your actual domain when ready
    siteName: 'MyatKyawThuPortfolio',
    images: [
      {
        url: 'https://myatkyawthu.dev/og-image.png', // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: 'Myat Kyaw Thu Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myat Kyaw Thu - Tech Portfolio',
    description:
      'Open-source enthusiast | Production server experience with Plesk & Nginx | Follow my development journey from CMS websites to advanced mini-apps.',
    creator: '@myatkyawthu', // If you don't have Twitter, you can remove or replace
    images: ['https://myatkyawthu.dev/twitter-card.png'], // Replace with your actual image URL
  },
  alternates: {
    canonical: 'https://myatkyawthu.dev', // Replace with your domain
  },
  generator: 'Next.js 14.1.3',
  applicationName: 'Developer Portfolio',
  authors: [
    {
      name: 'Myat Kyaw Thu',
      url: 'https://www.linkedin.com/in/myat-kyaw-thu-0b8177334/', // Your LinkedIn profile
    },
  ],
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
