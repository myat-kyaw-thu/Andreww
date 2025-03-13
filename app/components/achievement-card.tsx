"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Award, Code, Briefcase, Lightbulb, Medal, Trophy, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
import { Space_Grotesk, Space_Mono, Archivo } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })
const archivo = Archivo({ subsets: ["latin"], display: "swap" })

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
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  // Get category color
  const getCategoryColor = () => {
    switch (achievement.category.toLowerCase()) {
      case "design":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
      case "development":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
      case "leadership":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
    }
  }

  // Toggle description expansion
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-5 transition-all duration-300 dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        height: "auto",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Subtle accent line at the top with improved animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{
          scaleX: isHovered ? 1 : 0.15,
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10">
        {/* Header with title and type */}
        <div className="flex items-start justify-between mb-3">
         <motion.h3 className={`${spaceGrotesk.className} text-lg font-medium text-gray-900 dark:text-gray-100 pr-4`}>
          {achievement.title}
        </motion.h3>
          <motion.div
            className="flex items-center justify-center p-1.5 rounded-full bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400"
            animate={{
              rotate: isHovered ? [0, -5, 5, 0] : 0,
              scale: isHovered ? [1, 1.05, 1] : 1,
              backgroundColor: isHovered ? "rgba(249, 250, 251, 0.8)" : "rgba(249, 250, 251, 0.5)",
            }}
            transition={{
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.3, ease: "easeOut" },
              backgroundColor: { duration: 0.3 },
            }}
          >
            {getTypeIcon()}
          </motion.div>
        </div>

        {/* Date with subtle animation */}
        <motion.div
          className={`${spaceMono.className} flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3`}
          animate={{
            opacity: isHovered ? 0.9 : 0.7,
            x: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{
              rotate: isHovered ? [0, 5, 0] : 0,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
          </motion.div>
          {format(new Date(achievement.date), "MMMM d, yyyy")}
        </motion.div>

        {/* Expandable description */}
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
                    height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                    opacity: { duration: 0.25, ease: "easeInOut" },
                  },
                }}
                exit={{
                  height: "3rem",
                  opacity: 0.8,
                  transition: {
                    height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                    opacity: { duration: 0.2, ease: "easeInOut" },
                  },
                }}
                layout
              >
                <p className={`${archivo.className} text-sm text-gray-600 dark:text-gray-300 leading-relaxed`}>{achievement.description}</p>
                <motion.button
                  onClick={toggleDescription}
                  className="mt-2 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
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
                layout
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                  {achievement.description}
                </p>
                {achievement.description.length > 100 && (
                  <motion.button
                    onClick={toggleDescription}
                    className="mt-1 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Read more</span>
                    <ChevronDown className="ml-1 w-3 h-3" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category badge with subtle animation */}
        <motion.div className="flex items-center">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-normal transition-all duration-200",
              getCategoryColor(),
              isHovered ? "border-opacity-100" : "border-opacity-70",
            )}
          >
            {achievement.category}
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  )
}

