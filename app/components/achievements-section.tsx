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
const sampleAchievements = [
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
  {
    id: 6,
    title: "High-Velocity Feature Delivery",
    type: "Achievement",
    date: new Date("2025-03-20"),
    description: "Delivered ShweMin's critical Invoice Module and Pricing Import/Export tools within accelerated timelines as sole developer, completing 70+ tasks across full stack while maintaining zero backlog.",
    category: "Development",
  },
  {
    id: 7,
    title: "Emergency Timeline Recovery",
    type: "Achievement",
    date: new Date("2025-02-28"),
    description: "Successfully built and deployed ExamPlus Coupon Module in just 4 days after timeline was halved due to MerryMarry reprioritization, delivering both projects on schedule with zero production incidents.",
    category: "Project Management",
  },
  {
    id: 8,
    title: "Production System Stabilization",
    type: "Achievement",
    date: new Date("2025-06-01"),
    description: "Resolved critical production database and API issues in live healthcare systems through direct environment debugging, reducing system downtime by 40% and establishing new incident response protocols.",
    category: "DevOps",
  },
  {
    id: 9,
    title: "Cross-Functional Leadership",
    type: "Achievement",
    date: new Date("2025-05-30"),
    description: "Mentored junior developer through CNI project onboarding while simultaneously leading frontend development, resulting in 30% faster feature delivery and knowledge transfer documentation.",
    category: "Leadership",
  }
];
export function AchievementsSection({ achievements = sampleAchievements }: AchievementsSectionProps) {
  return (
    <section className="py-24" id="achievements">
      {/* Section Header */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={`${spaceGrotesk.className} text-4xl font-medium text-gray-900 dark:text-[hsl(0,0%,98%)] mb-8 tracking-tight`}>
          Achievements
        </h2>

        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            scaleX: { duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.8, delay: 0.6 },
          }}
        />
      </motion.div>

      {/* Achievement Cards Grid - Fixed 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <AchievementCard achievement={achievement} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {achievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center py-24"
        >
          <p className={`${spaceGrotesk.className} text-xl text-gray-400 dark:text-[hsl(0,0%,63.9%)]`}>No achievements to display.</p>
        </motion.div>
      )}
    </section>
  );
}

// Sample data for demonstration
