"use client";

import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { AchievementCard } from "./achievement-card";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

interface Achievement {
  id: number;
  title: string;
  type: string;
  date: Date;
  description: string;
  category: string;
  imageUrl?: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}
export const sampleAchievements = [
  {
    id: 1,
    title: "Legacy Front End Developer Certification",
    type: "Certification",
    date: new Date("2025-05-26"),
    description:
      "Successfully completed the Legacy Front End Developer Certification from freeCodeCamp.org, representing approximately 300 hours of hands-on project work and foundational web development knowledge.",
    category: "Development",
    imageUrl: "/certificates/2.png",
    link: "https://freecodecamp.org/certification/myat-kyaw-thu/legacy-front-end",
  },
  {
    id: 2,
    title: "Front End Development Libraries Certification",
    type: "Certification",
    date: new Date("2025-05-25"),
    description:
      "Earned the Front End Development Libraries Certification from freeCodeCamp.org. Covered React, Redux, Bootstrap, jQuery, and SASS in depth over 300 hours of practical development work.",
    category: "Development",
    imageUrl: "/certificates/1.png",
    link: "https://freecodecamp.org/certification/myat-kyaw-thu/front-end-development-libraries",
  },
  {
    id: 3,
    title: "Responsive Web Design Certification",
    type: "Certification",
    date: new Date("2025-05-21"),
    description:
      "Awarded the Responsive Web Design Certification by freeCodeCamp.org after completing 300 hours of HTML, CSS, Flexbox, Grid, and responsive design principles in real-world projects.",
    category: "Development",
    imageUrl: "/certificates/3.png",
    link: "https://freecodecamp.org/certification/myat-kyaw-thu/responsive-web-design",
  },
  {
    id: 4,
    title: "Professional Web Developer Certification",
    type: "Certification",
    date: new Date("2025-06-30"), // Update if there's an exact date
    description:
      "Completed a comprehensive Pro Web Developer course covering frontend (HTML, CSS, Bootstrap, JavaScript), backend (PHP, Laravel, MySQL), modern JavaScript frameworks (React, Redux, Next.js), and backend APIs with Node.js, Express, and MongoDB. Mastered over 70 detailed lessons including security, OOP, and deployment.",
    category: "F.S.D",
    imageUrl: "/certificates/pro-web-dev.png",
  },

];
export function AchievementsSection({ achievements = sampleAchievements }: AchievementsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-10 md:py-16" id="achievements">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-24"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-slate-900 dark:text-white`}>
            Achievements
          </h2>

          <motion.div
            className="h-px bg-gradient-to-r from-slate-300/40 via-slate-400/60 to-slate-300/40 dark:from-slate-700/40 dark:via-slate-600/60 dark:to-slate-700/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Achievement Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              className="group"
            >
              <AchievementCard achievement={achievement} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-24"
          >
            <p className={`${spaceGrotesk.className} text-lg text-slate-500 dark:text-slate-400`}>
              No achievements to display.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Sample data for demonstration
