"use client"

import { motion } from "framer-motion"
import { Code2, Database, PenToolIcon as Tool } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiExpress,
  SiVuedotjs,
  SiJquery,
  SiBootstrap,
  SiFramer,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiPostman,
  SiClickup,
  SiBun,
  SiSqlite,
} from "react-icons/si"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const skillsData = {
  Languages: {
    icon: Code2,
    description: "Core programming languages I use for both frontend and backend development.",
    skills: [
      { name: "PHP", icon: SiPhp },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
    gradient:
      "from-blue-500/10 via-blue-400/10 to-cyan-500/10 dark:from-blue-500/20 dark:via-blue-400/20 dark:to-cyan-500/20",
  },
  "Frontend Frameworks": {
    icon: SiReact,
    description: "Modern frameworks and libraries I use to build responsive and interactive user interfaces.",
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
    gradient:
      "from-purple-500/10 via-purple-400/10 to-pink-500/10 dark:from-purple-500/20 dark:via-purple-400/20 dark:to-pink-500/20",
  },
  "Backend Frameworks": {
    icon: SiNodedotjs,
    description: "Server-side technologies I use to build scalable and efficient backend systems.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Laravel", icon: SiLaravel },
      { name: "Bun.js", icon: SiBun },
    ],
    gradient:
      "from-amber-500/10 via-amber-400/10 to-orange-500/10 dark:from-amber-500/20 dark:via-amber-400/20 dark:to-orange-500/20",
  },
  "ORM & Databases": {
    icon: Database,
    description: "Database systems and ORMs I use for efficient data management and storage solutions.",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQLite", icon: SiSqlite },
      { name: "Firebase", icon: SiFirebase },
    ],
    gradient:
      "from-green-500/10 via-green-400/10 to-emerald-500/10 dark:from-green-500/20 dark:via-green-400/20 dark:to-emerald-500/20",
  },
  "Tools & Technologies": {
    icon: Tool,
    description: "Development tools and technologies I use to streamline the development workflow.",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "ClickUp", icon: SiClickup },
    ],
    gradient:
      "from-rose-500/10 via-rose-400/10 to-red-500/10 dark:from-rose-500/20 dark:via-rose-400/20 dark:to-red-500/20",
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function SkillsSection() {
  return (
    <TooltipProvider delayDuration={80}>
      <section className="w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          {/* Section Title */}
          <motion.div variants={itemVariants} className="space-y-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">What I Work With</span>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Skills & Technologies
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(skillsData).map(([category, { icon: CategoryIcon, description, skills, gradient }]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className={cn(
                  "group relative p-5 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-800",
                  "bg-gradient-to-br",
                  gradient,
                  "transition-all duration-300",
                )}
              >
                <div className="flex flex-col min-h-[140px]">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-white/40 dark:bg-gray-900/40 ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-colors group-hover:bg-white/60 dark:group-hover:bg-gray-900/60">
                      <CategoryIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{category}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
                    </div>
                  </div>

                  {/* Skills Icons */}
                  <div className="flex-1 flex items-start mt-3">
                    <div className="flex flex-wrap gap-2">
                      {skills.map(({ name, icon: Icon }) => (
                        <Tooltip key={name}>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-white/50 dark:bg-gray-900/50 
                                       backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
                                       transition-all duration-200 cursor-pointer
                                       hover:bg-white/70 dark:hover:bg-gray-900/70
                                       hover:border-gray-300 dark:hover:border-gray-600
                                       hover:shadow-sm"
                            >
                              <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-white/80 dark:bg-gray-900/80 text-gray-700 backdrop-blur-md border border-gray-200 dark:border-gray-700"
                          >
                            <p className="text-xs font-medium">{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
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

