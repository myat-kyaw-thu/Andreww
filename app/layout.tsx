import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next';
import { Space_Grotesk } from "next/font/google"
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import CursorDot from '@/components/ui/cursor-dot';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  // You can use specific weights if needed
  // weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
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
  generator: 'Next.js 15.1.7',
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
       <link rel="icon" href="/profile2.png" className="rounded-full" />
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
           <CursorDot />
          {children}
           <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
