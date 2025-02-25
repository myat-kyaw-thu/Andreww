"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Github, LinkIcon } from "lucide-react"
import Image from "next/image" // Changed import
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  SiPython,
  SiDjango,
  SiVuedotjs,
  SiAngular,
  SiFirebase,
  SiDocker,
  SiExpress,
  SiNestjs,
} from "react-icons/si"

interface ProjectCardProps {
  project: {
    project_id: string
    project_title: string
    project_subtitle: string
    project_cover_img: string
    project_tech_stacks: string[]
    project_link?: string
    github_link?: string
    project_status: "Completed" | "In Progress"
  }
}

const techStackIcons: { [key: string]: { icon: React.ElementType; color: string } } = {
  React: { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TailwindCSS: { icon: SiTailwindcss, color: "#06B6D4" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Python: { icon: SiPython, color: "#3776AB" },
  Django: { icon: SiDjango, color: "#092E20" },
  Vue: { icon: SiVuedotjs, color: "#4FC08D" },
  Angular: { icon: SiAngular, color: "#DD0031" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Express: { icon: SiExpress, color: "#000000" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-row bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-[380px]"
    >
      {/* Project Image */}
      <div className="w-[120px] h-[140px] relative">
        <Image
          src={project.project_cover_img || "/placeholder.svg"}
          alt={project.project_title}
          fill
          className="object-cover"
          sizes="120px"
          priority={false}
        />
      </div>

      {/* Project Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Title and Status Badge */}
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
              {project.project_title}
            </h3>
            <Badge variant={project.project_status === "Completed" ? "default" : "secondary"} className="ml-2 scale-90">
              {project.project_status}
            </Badge>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.project_subtitle}</p>

          {/* Tech Stack Icons */}
          <TooltipProvider>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.project_tech_stacks.slice(0, 8).map((tech) => {
                const techStack = techStackIcons[tech]
                if (!techStack) return null

                const Icon = techStack.icon
                return (
                  <Tooltip key={tech}>
                    <TooltipTrigger asChild>
                      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                        <Icon className="w-5 h-5 transition-colors duration-200" style={{ color: techStack.color }} />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{tech}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>

        {/* Links and Detail Button */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-400">
            {project.project_link && (
              <Link
                href={project.project_link}
                className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 hover:underline transition-all"
                target="_blank"
              >
                <LinkIcon className="w-3 h-3" />
                <span>Demo</span>
              </Link>
            )}
            {project.github_link && (
              <Link
                href={project.github_link}
                className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 hover:underline transition-all"
                target="_blank"
              >
                <Github className="w-3 h-3" />
                <span>Source</span>
              </Link>
            )}
          </div>

          <motion.button
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

