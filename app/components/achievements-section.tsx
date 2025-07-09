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
    title: "Site of the Day",
    type: "Award",
    date: new Date("2023-06-15"),
    description:
      "Recognized for exceptional web design and user experience innovation. This project showcased cutting-edge design principles and received widespread acclaim from the international design community. The work demonstrated mastery of modern web technologies while maintaining accessibility and performance standards.",
    category: "Design",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Full Stack Certification",
    type: "Certification",
    date: new Date("2023-03-20"),
    description:
      "Completed comprehensive full-stack development program covering modern web technologies, database design, cloud deployment strategies, and advanced architectural patterns. Achieved top 5% performance in cohort of 200+ developers.",
    category: "Development",
  },
  {
    id: 3,
    title: "Team Leadership Excellence",
    type: "Recognition",
    date: new Date("2022-11-10"),
    description:
      "Led a cross-functional team of 12 developers and designers to deliver a complex enterprise application ahead of schedule and 15% under budget. Implemented agile methodologies that increased team velocity by 40%.",
    category: "Leadership",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Innovation Award",
    type: "Award",
    date: new Date("2022-08-05"),
    description:
      "Developed an AI-powered design tool that increased team productivity by 40% and was adopted company-wide across all design teams. The tool now serves over 500+ designers globally and has processed 10M+ design iterations.",
    category: "Innovation",
  },

  {
    id: 6,
    title: "UX Design Excellence",
    type: "Award",
    date: new Date("2022-12-18"),
    description:
      "Created user experience design for mobile application that achieved 4.9 star rating and 2M+ downloads in first quarter. Design system was adopted across 5 product lines.",
    category: "Design",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
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
