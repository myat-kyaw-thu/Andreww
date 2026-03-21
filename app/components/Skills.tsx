"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  SiBun,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs
} from "react-icons/si";

import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

const skillsData = {
  Languages: [
    { name: "PHP", icon: SiPhp },
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
  ],
  Frontend: [
    { name: "React.js", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Vue.js", icon: SiVuedotjs },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Framer Motion", icon: SiFramer },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express.js", icon: SiExpress },
    { name: "Laravel", icon: SiLaravel },
    { name: "Bun.js", icon: SiBun },
  ],
  Databases: [
    { name: "MySQL", icon: SiMysql },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Firebase", icon: SiFirebase },
  ],
  Tools: [
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "Postman", icon: SiPostman },
  ],
};

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section className="py-10 md:py-16" id="skills">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-slate-900 dark:text-white`}>
            Skills
          </h2>

          <motion.div
            className="h-px bg-gradient-to-r from-slate-300/40 via-slate-400/60 to-slate-300/40 dark:from-slate-700/40 dark:via-slate-600/60 dark:to-slate-700/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Skills Grid - Compact */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        >
          {Object.entries(skillsData).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="group"
            >
              {/* Category */}
              <div className="space-y-3">
                {/* Category Label */}
                <div className={cn(jetbrainsMono.className, "text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-slate-400")}>
                  {category}
                </div>

                {/* Skills - Horizontal Wrap */}
                <div className="flex flex-wrap gap-2">
                  {skills.map(({ name, icon: Icon }) => (
                    <motion.div
                      key={name}
                      onMouseEnter={() => setHoveredSkill(name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      {/* Skill Badge */}
                      <div
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md",
                          "border border-slate-200/30 dark:border-slate-800/30",
                          "bg-white/30 dark:bg-slate-950/30 backdrop-blur-sm",
                          "transition-all duration-200",
                          hoveredSkill === name
                            ? "bg-white/50 dark:bg-slate-900/50 border-slate-300/50 dark:border-slate-700/50 shadow-sm"
                            : "hover:bg-white/40 dark:hover:bg-slate-900/40",
                        )}
                      >
                        <Icon className={cn("w-3.5 h-3.5 transition-colors duration-200", hoveredSkill === name ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")} />
                        <span className={cn(jetbrainsMono.className, "text-xs font-medium text-slate-700 dark:text-slate-300")}>
                          {name}
                        </span>
                      </div>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={hoveredSkill === name ? { opacity: 1, y: -8 } : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none whitespace-nowrap"
                      >
                        <div className="px-2 py-1 rounded-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium">
                          {name}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
