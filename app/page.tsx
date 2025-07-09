"use client";

import AboutSection from "./components/About";
import { AchievementsSection, sampleAchievements } from "./components/achievements-section";
import { BlurFade } from "./components/BlurFade";
import ContactSection from "./components/ContactSeciton";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { PageLoader } from "./components/PageLoader";
import ProjectsSection from "./components/projects";
import SkillsSection from "./components/Skills";

export default function Home() {

  return (
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
          {/* <ServicesGrid /> */}
          <AchievementsSection achievements={sampleAchievements} />
          <ContactSection />
          <Footer />
        </main>
        <Navbar />
      </div>
    </PageLoader>
  );
}
