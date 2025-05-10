"use client"

import { Badge } from "@/components/ui/badge"
import { safeFormatDate } from "@/lib/date-utils"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Briefcase, Calendar, ChevronDown, ChevronUp, Code, Lightbulb, Medal, Trophy } from 'lucide-react'
import { Archivo, Space_Grotesk, Space_Mono } from 'next/font/google'
import { useState } from "react"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })
const archivo = Archivo({ subsets: ["latin"], display: "swap" })

interface Achievement {
  id: number
  title: string
  type: string
  date: Date
  description: string
  category: string
  imageUrl?: string
}

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  // Get the appropriate icon based on achievement type
  const getTypeIcon = () => {
    switch (achievement.type.toLowerCase()) {
      case "award":
        return <Trophy className="w-4 h-4" />
      case "certification":
        return <Medal className="w-4 h-4" />
      case "project milestone":
        return <Code className="w-4 h-4" />
      case "recognition":
        return <Award className="w-4 h-4" />
      case "innovation":
        return <Lightbulb className="w-4 h-4" />
      case "language proficiency":
        return <Award className="w-4 h-4" />
      case "project leadership":
        return <Briefcase className="w-4 h-4" />
      case "project achievement":
        return <Trophy className="w-4 h-4" />
      case "technical contribution":
        return <Code className="w-4 h-4" />
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  // Get category color based on category
  const getCategoryColor = () => {
    switch (achievement.category.toLowerCase()) {
      case "design":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30"
      case "development":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30"
      case "leadership":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30"
      case "certification":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30"
      case "language":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800/30"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
    }
  }

  // Get type color based on type
  const getTypeColor = () => {
    switch (achievement.type.toLowerCase()) {
      case "award":
        return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300"
      case "certification":
        return "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300"
      case "project milestone":
        return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300"
      case "recognition":
        return "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300"
      case "innovation":
        return "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300"
      case "language proficiency":
        return "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
      case "project leadership":
        return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300"
      case "project achievement":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
      case "technical contribution":
        return "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300"
      default:
        return "bg-gray-50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-300"
    }
  }

  // Toggle description expansion
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Restored top line animation with improved smoothness */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-400"
        initial={{ scaleX: 0.15, opacity: 0.7 }}
        animate={{
          scaleX: isHovered ? 1 : 0.15,
          opacity: isHovered ? 1 : 0.7,
          transition: {
            scaleX: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />

      {/* Background pattern with subtle animation */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 p-5">
        {/* Header with title and type */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`${spaceGrotesk.className} text-lg font-medium text-gray-900 dark:text-gray-100 pr-4`}>
              {achievement.title}
            </h3>

            {/* Date with calendar icon */}
            <div className={`${spaceMono.className} flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1.5`}>
              <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
              {safeFormatDate(achievement.date, "MMMM d, yyyy")}
            </div>
          </div>

          <div className={cn("flex items-center justify-center p-2 rounded-full", getTypeColor())}>{getTypeIcon()}</div>
        </div>

        {/* Expandable description with smooth animations */}
        <div className="relative mb-4 min-h-[3rem]">
          <AnimatePresence initial={false} mode="wait">
            {isDescriptionExpanded ? (
              <motion.div
                key="expanded"
                initial={{ height: "3rem", opacity: 0.8 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: {
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    },
                    opacity: {
                      duration: 0.25,
                      ease: "easeInOut",
                    },
                  },
                }}
                exit={{
                  height: "3rem",
                  opacity: 0.8,
                  transition: {
                    height: {
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    },
                    opacity: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  },
                }}
                className="overflow-hidden"
              >
                <p className={`${archivo.className} text-sm text-gray-600 dark:text-gray-300 leading-relaxed`}>
                  {achievement.description}
                </p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  onClick={toggleDescription}
                  className="mt-2 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  <span>Show less</span>
                  <ChevronUp className="ml-1 w-3 h-3" />
                </motion.button>
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
                <p
                  className={`${archivo.className} text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2`}
                >
                  {achievement.description}
                </p>
                {achievement.description.length > 100 && (
                  <motion.button
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    onClick={toggleDescription}
                    className="mt-1 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    <span>Read more</span>
                    <ChevronDown className="ml-1 w-3 h-3" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category badge with unique styling */}
        <div className="flex items-center">
          <Badge variant="outline" className={cn("text-xs font-normal", getCategoryColor())}>
            {achievement.category}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}
