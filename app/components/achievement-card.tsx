"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Award, Code, Briefcase, Lightbulb, Medal, Trophy, Calendar } from "lucide-react"
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

export function AchievementCard({ achievement }: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "development":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "leadership":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <motion.div
      className="relative h-60 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Subtle accent line at the top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Header with title and type */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 pr-4">{achievement.title}</h3>

          <motion.div
            className="flex items-center text-gray-500 dark:text-gray-400"
            animate={{
              rotate: isHovered ? 5 : 0,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {getTypeIcon()}
          </motion.div>
        </div>

        {/* Date with subtle animation */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
          {format(new Date(achievement.date), "MMMM d, yyyy")}
        </div>

        {/* Description */}
        <div className="relative mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{achievement.description}</p>
        </div>

        {/* Image if available with subtle animation */}
        {achievement.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md">
            <motion.img
              src={achievement.imageUrl || "/placeholder.svg"}
              alt={achievement.title}
              className="w-full h-auto object-cover"
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        )}

        {/* Category badge */}
        <Badge variant="outline" className={cn("text-xs font-normal", getCategoryColor())}>
          {achievement.category}
        </Badge>
      </div>
    </motion.div>
  )
}

