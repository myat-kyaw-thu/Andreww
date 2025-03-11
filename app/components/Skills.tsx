"use client"

import { motion } from "framer-motion"
import { Code2, Database, PenToolIcon as Tool } from "lucide-react"
import {
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiJquery,
  SiTailwindcss,
  SiBootstrap,
  SiFramer,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiBun,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiFirebase,
  SiGit,
  SiGithub,
  SiPostman,
  SiClickup,
} from "react-icons/si"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const skillsData = {
  Languages: {
    icon: Code2,
    skills: [
      { name: "PHP", icon: SiPhp },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  "Frontend Frameworks": {
    icon: SiReact,
    skills: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "jQuery", icon: SiJquery },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap CSS", icon: SiBootstrap },
      { name: "Framer Motion", icon: SiFramer },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
    ],
  },
  "Backend Frameworks": {
    icon: SiNodedotjs,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Laravel", icon: SiLaravel },
      { name: "Bun.js", icon: SiBun },
    ],
  },
  "ORM & Databases": {
    icon: Database,
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQLite", icon: SiSqlite },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  "Tools & Technologies": {
    icon: Tool,
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "ClickUp", icon: SiClickup },
    ],
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const skillIconVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.08,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
}

export default function SkillsSection() {
  return (
    <TooltipProvider>
      <section className="w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 my-10">
          {/* Section Title */}
          <motion.div variants={itemVariants} className="space-y-2 mb-6">
            <h2 className="text-3xl font-bold relative inline-block mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                Skills & Technologies
              </span>
            </h2>
             <motion.div 
                className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(skillsData).map(([category, { icon: CategoryIcon, skills }]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{
                  y: -2,
                  transition: { type: "spring", stiffness: 150, damping: 15 },
                }}
                className={cn(
                  "group relative p-5 rounded-xl backdrop-blur-sm",
                  "bg-white/50 dark:bg-gray-900/50",
                  "border border-gray-200/60 dark:border-gray-800/60",
                  "transition-all duration-200 hover:border-gray-300/80 dark:hover:border-gray-700/80",
                  "hover:shadow-sm",
                )}
              >
                <div className="absolute inset-0 rounded-xl opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                <div className="flex flex-col min-h-[120px] relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
                      <CategoryIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{category}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{skills.length} technologies</p>
                    </div>
                  </div>

                  {/* Skills Icons */}
                  <div className="flex-1 flex items-start mt-2">
                    <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
                      {skills.map(({ name, icon: Icon }) => (
                        <Tooltip key={name}>
                          <TooltipTrigger asChild>
                            <motion.div
                              variants={skillIconVariants}
                              whileHover="hover"
                              whileTap="tap"
                              className="p-2 rounded-lg bg-gray-50/80 dark:bg-gray-800/80 
                                       backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
                                       transition-all duration-150 cursor-pointer
                                       hover:bg-gray-50 dark:hover:bg-gray-800
                                       hover:border-gray-300/70 dark:hover:border-gray-600/70"
                            >
                              <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 
                                     backdrop-blur-md border border-gray-200/70 dark:border-gray-700/70 
                                     shadow-sm px-2.5 py-1"
                          >
                            <p className="text-xs font-medium">{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </TooltipProvider>
  )
}

