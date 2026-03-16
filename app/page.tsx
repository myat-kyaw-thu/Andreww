"use client";

import AboutSection from './components/About';
import { AchievementsSection, sampleAchievements } from './components/achievements-section';
import { BlurFade } from './components/BlurFade';
import ContactSection from './components/ContactSeciton';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { PageLoader } from './components/PageLoader';
import ProjectsSection from './components/projects';
import SkillsSection from './components/Skills';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Myat Kyaw Thu - Full Stack Developer | Portfolio',
  description: 'Full Stack Developer based in Yangon, Myanmar. Specializing in React, Next.js, Vue.js, Express.js, and Laravel. Crafting digital experiences with modern web technologies.',
  keywords: ['Myat Kyaw Thu', 'Full Stack Developer', 'React', 'Next.js', 'Vue.js', 'Express.js', 'Laravel', 'Web Developer', 'Myanmar'],
  authors: [{ name: 'Myat Kyaw Thu' }],
  creator: 'Myat Kyaw Thu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myatkyawthu.com',
    siteName: 'Myat Kyaw Thu - Full Stack Developer',
    title: 'Myat Kyaw Thu - Full Stack Developer | Portfolio',
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
    title: 'Myat Kyaw Thu - Full Stack Developer',
    description: 'Full Stack Developer based in Yangon, Myanmar. Specializing in React, Next.js, Vue.js, Express.js, and Laravel.',
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

export default function Home() {

  return (
    <div className="relative">

      <PageLoader minDuration={4000}>
        <div id="top">
          <main className="min-h-screen bg-background font-sans max-w-2xl mx-auto py-12 sm:py-24 px-6 gap-y-9 pb-24">
            <BlurFade delay={0.25} inView direction="up">
              <Hero />
            </BlurFade>

            <BlurFade delay={0.45} inView direction="up">
              <AboutSection />
            </BlurFade>
            <BlurFade delay={0.65} inView direction="up">
              <ProjectsSection />
            </BlurFade>
            <SkillsSection />
            <AchievementsSection achievements={sampleAchievements} />
            <ContactSection />
            <Footer />
          </main>
          <Navbar />
        </div>
      </PageLoader>
    </div>

  );
}
