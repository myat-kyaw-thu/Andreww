"use client"

import type React from "react"
import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Github, LinkIcon, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

import { Space_Grotesk, Space_Mono, Archivo } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })
const archivo = Archivo({ subsets: ["latin"], display: "swap" })


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
    personal: boolean
  }
}

// Tech stack color mapping
const techStackColors: { [key: string]: { color: string; bgColor: string } } = {
  // Frontend
  React: { color: "#61DAFB", bgColor: "rgba(97, 218, 251, 0.1)" },
  "Next.js": { color: "#000000", bgColor: "rgba(0, 0, 0, 0.05)" },
  Vue: { color: "#4FC08D", bgColor: "rgba(79, 192, 141, 0.1)" },
  Pinia: { color: "#FFE873", bgColor: "rgba(255, 232, 115, 0.1)" },
  Angular: { color: "#DD0031", bgColor: "rgba(221, 0, 49, 0.1)" },
  Svelte: { color: "#FF3E00", bgColor: "rgba(255, 62, 0, 0.1)" },
  TailwindCSS: { color: "#06B6D4", bgColor: "rgba(6, 182, 212, 0.1)" },
  Bootstrap: { color: "#7952B3", bgColor: "rgba(121, 82, 179, 0.1)" },
  ShadcnUi: { color: "#000000", bgColor: "rgba(0, 0, 0, 0.1)" }, // Adjust this color as needed
  "Framer-Motion": { color: "#00C3FF", bgColor: "rgba(236,	58,	182, 0.1)" }, // Adjust this color as needed
  GSAP: { color: "#88CCF1", bgColor: "rgba(53, 235, 88, 0.1)" }, // Adjust this color as needed

  // Backend
  "Node.js": { color: "#339933", bgColor: "rgba(51, 153, 51, 0.1)" },
  Express: { color: "#000000", bgColor: "rgba(0, 0, 0, 0.05)" },
  NestJS: { color: "#E0234E", bgColor: "rgba(224, 35, 78, 0.1)" },
  Django: { color: "#092E20", bgColor: "rgba(9, 46, 32, 0.1)" },
  Laravel: { color: "#FF2D20", bgColor: "rgba(255, 45, 32, 0.1)" },
  Spring: { color: "#6DB33F", bgColor: "rgba(109, 179, 63, 0.1)" },
  FastAPI: { color: "#009688", bgColor: "rgba(0, 150, 136, 0.1)" },

  // Languages
  TypeScript: { color: "#3178C6", bgColor: "rgba(49, 120, 198, 0.1)" },
  JavaScript: { color: "#F7DF1E", bgColor: "rgba(247, 223, 30, 0.1)" },
  Python: { color: "#3776AB", bgColor: "rgba(55, 118, 171, 0.1)" },
  PHP: { color: "#777BB4", bgColor: "rgba(119, 123, 180, 0.1)" },
  Java: { color: "#007396", bgColor: "rgba(0, 115, 150, 0.1)" },
  Go: { color: "#00ADD8", bgColor: "rgba(0, 173, 216, 0.1)" },
  Rust: { color: "#000000", bgColor: "rgba(183, 65, 14, 0.1)" },
  Swift: { color: "#F05138", bgColor: "rgba(240, 81, 56, 0.1)" },

  // Databases
  MongoDB: { color: "#47A248", bgColor: "rgba(71, 162, 72, 0.1)" },
  MySQL: { color: "#4479A1", bgColor: "rgba(68, 121, 161, 0.1)" },
  PostgreSQL: { color: "#4169E1", bgColor: "rgba(65, 105, 225, 0.1)" },
  SQLite: { color: "#003B57", bgColor: "rgba(0, 59, 87, 0.1)" },
  Redis: { color: "#DC382D", bgColor: "rgba(220, 56, 45, 0.1)" },

  // Tools & Infrastructure
  Docker: { color: "#2496ED", bgColor: "rgba(36, 150, 237, 0.1)" },
  Kubernetes: { color: "#326CE5", bgColor: "rgba(50, 108, 229, 0.1)" },
  Firebase: { color: "#FFCA28", bgColor: "rgba(255, 202, 40, 0.1)" },
  AWS: { color: "#FF9900", bgColor: "rgba(255, 153, 0, 0.1)" },
  Vercel: { color: "#000000", bgColor: "rgba(0, 0, 0, 0.05)" },

  // Libraries & Frameworks
  Zod: { color: "#3E67B1", bgColor: "rgba(62, 103, 177, 0.1)" },
  Redux: { color: "#764ABC", bgColor: "rgba(118, 74, 188, 0.1)" },
  GraphQL: { color: "#E10098", bgColor: "rgba(225, 0, 152, 0.1)" },
  Prisma: { color: "#2D3748", bgColor: "rgba(45, 55, 72, 0.1)" },
  Bun: { color: "#FBF0DF", bgColor: "rgba(251, 240, 223, 0.25)" },
  Webpack: { color: "#8DD6F9", bgColor: "rgba(141, 214, 249, 0.1)" },

  // Default color for unknown tech stacks
  default: { color: "#718096", bgColor: "rgba(113, 128, 150, 0.1)" },
}

export default function ProjectCard({ project }: ProjectCardProps) {
  let techStacks = []
  try {
    techStacks = Array.isArray(project.project_tech_stacks)
      ? project.project_tech_stacks // It's already an array
      : JSON.parse(project.project_tech_stacks) // Parse the string if it is not
    console.log("Tech stack:", techStacks)
  } catch (error) {
    console.error("Failed to parse tech stack:", error)
  }

  const [showAllTech, setShowAllTech] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  // Toggle showing all tech stacks
  const toggleTechStack = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowAllTech(!showAllTech)
  }

  // Toggle description expansion
  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="flex flex-col bg-white dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      {/* Project Image with enhanced zoom effect and gradient overlay */}
      <div className="w-full h-[160px] relative group overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={project.project_cover_img || "/placeholder.svg"}
            alt={project.project_title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </motion.div>
        {/* Improved gradient overlay with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Status badge with improved positioning and styling */}
        <motion.div
          className="absolute top-3 right-3 z-10"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge
            variant={project.project_status === "Completed" ? "default" : "secondary"}
            className={`text-xs font-medium pointer-events-none ${
              project.project_status === "Completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40"
            }`}
          >
            {project.project_status}
          </Badge>
        </motion.div>

        {/* Minimalist project type indicator */}
        <motion.div
          className="absolute top-3 left-3 z-10"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ delay: 0.1 }}
        >
          <div
            className={`h-5 pl-1.5 pr-2 flex items-center gap-1 rounded-sm ${
              project.personal
                ? "border-l-2 border-purple-400 bg-purple-50/80 dark:bg-purple-950/30"
                : "border-l-2 border-blue-400 bg-blue-50/80 dark:bg-blue-950/30"
            } backdrop-blur-sm`}
          >
            <span
              className={`text-xs font-medium ${
                project.personal ? "text-purple-700 dark:text-purple-300" : "text-blue-700 dark:text-blue-300"
              }`}
            >
              {project.personal ? "Personal" : "Work"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Project Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="space-y-3">
          {/* Title with enhanced animation */}
          <motion.h3
            className={`${spaceGrotesk.className} text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ x: 3 }}
          >
            {project.project_title}
          </motion.h3>

          {/* Expandable subtitle with animation */}
          <div className="relative">
            <AnimatePresence initial={false} mode="wait">
              {isDescriptionExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ height: "2.5rem", opacity: 0.8 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                      opacity: { duration: 0.25, ease: "easeInOut" },
                    },
                  }}
                  exit={{
                    height: "2.5rem",
                    opacity: 0.8,
                    transition: {
                      height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                      opacity: { duration: 0.2, ease: "easeInOut" },
                    },
                  }}
                >
                  <p className={`${archivo.className} text-sm text-gray-600 dark:text-gray-400 leading-relaxed`}>
                    {project.project_subtitle}
                    <button
                      onClick={toggleDescription}
                      className="ml-1 text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 inline-flex items-center"
                    >
                      <span className="underline">show less</span>
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  className="relative"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className={`${archivo.className} text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed`}>
                    {project.project_subtitle}
                  </p>
                  {project.project_subtitle.length > 80 && (
                    <motion.button
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      onClick={toggleDescription}
                      className="absolute bottom-0 right-0 text-xs font-medium bg-gradient-to-l from-white dark:from-gray-950 pl-5 inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <span className="underline">...more</span>
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tech Stack Badges with fixed height container to prevent layout shift */}
          <motion.div
            className="flex flex-wrap gap-1.5 pt-1 relative min-h-[28px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <AnimatePresence>
              {/* Show first 4 tech stacks or all if expanded */}
              {(showAllTech ? techStacks : techStacks.slice(0, 4)).map((tech: string, index: number) => {
                const techColor: { color: string; bgColor: string } = techStackColors[tech] || techStackColors.default

                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.2,
                      delay: showAllTech ? 0.05 * index : 0.05 * index,
                    }}
                  >
                    <Badge
                      variant="outline"
                      className={`${spaceMono.className} px-1.5 py-0.5 text-[10px] font-medium transition-colors duration-200`}
                      style={{
                        backgroundColor: techColor.bgColor,
                        color: techColor.color,
                        borderColor: `${techColor.color}30`,
                      }}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                )
              })}

              {/* Show +X badge if there are more tech stacks and not showing all */}
              {!showAllTech && techStacks.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                >
                  <Badge
                    variant="outline"
                    className="px-1.5 py-0.5 text-[10px] font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={toggleTechStack}
                  >
                    +{techStacks.length - 4}
                  </Badge>
                </motion.div>
              )}

              {/* Show close button when showing all tech stacks */}
              {showAllTech && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                  className="absolute -top-2 -right-2"
                >
                  <button
                    onClick={toggleTechStack}
                    className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close tech stack list"
                  >
                    <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Links section with improved styling */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-3">
            {project.project_link && project.project_link !== "" && (
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Link
                  href={project.project_link}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-all group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium group-hover:underline">Demo</span>
                </Link>
              </motion.div>
            )}
            {project.github_link && project.github_link && (
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Link
                  href={project.github_link}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-all group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium group-hover:underline">Source</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

