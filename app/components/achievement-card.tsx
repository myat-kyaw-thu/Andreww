"use client"

import type React from "react"

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Calendar, X } from "lucide-react"
import { Space_Grotesk } from "next/font/google"
import { useRef, useState } from "react"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })

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
  index: number
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Subtle magnetic effect for detail button
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 15 } // More subtle spring
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Very subtle rotation based on mouse position
  const rotateX = useTransform(springY, [-20, 20], [2, -2])
  const rotateY = useTransform(springX, [-20, 20], [-2, 2])

  // Color system based on index for variety
  const getHoverColor = () => {
    const colors = [
      "#C1A36E", // Warm gold
      "#A67C52", // Rich bronze
      "#8B7355", // Deep taupe
      "#B5A490", // Soft beige
      "#9B8B7A", // Muted brown
      "#8E7B6B", // Warm gray
    ]
    return colors[index % colors.length]
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !buttonRef.current) return

    const cardRect = cardRef.current.getBoundingClientRect()
    const buttonRect = buttonRef.current.getBoundingClientRect()

    // Check if mouse is within card bounds
    const isInside =
      e.clientX >= cardRect.left &&
      e.clientX <= cardRect.right &&
      e.clientY >= cardRect.top &&
      e.clientY <= cardRect.bottom

    setIsHovered(isInside)

    if (isInside) {
      // Calculate distance from button center for magnetic effect
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2

      const deltaX = e.clientX - buttonCenterX
      const deltaY = e.clientY - buttonCenterY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Very subtle magnetic effect (reduced strength)
      const maxDistance = 100
      const strength = Math.max(0, 1 - distance / maxDistance)

      // Reduced movement amount (0.15 instead of 0.4)
      mouseX.set(deltaX * strength * 0.15)
      mouseY.set(deltaY * strength * 0.15)
    } else {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const formatDate = (date: Date) => {
    return date.getFullYear().toString()
  }

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const hoverColor = getHoverColor()

  return (
    <>
      {/* Achievement Card */}
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer select-none"
        style={{ aspectRatio: "5/3" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main card with luxury styling */}
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-white border border-gray-100/80">
          {/* Subtle top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"
            animate={{
              background: isHovered
                ? `linear-gradient(to right, transparent, ${hoverColor}40, transparent)`
                : "linear-gradient(to right, transparent, #D1D5DB, transparent)",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Minimalist corner accent */}
          <div className="absolute top-3 left-5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-gray-200"
              animate={{
                backgroundColor: isHovered ? hoverColor : "#E5E7EB",
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Category indicator */}
          <div className="absolute top-6 right-6">
            <motion.div
              className={`${spaceGrotesk.className} text-[10px] font-medium tracking-normal uppercase px-2 py-1 rounded-full bg-gray-50 text-gray-400 border border-gray-100`}
              animate={{
                backgroundColor: isHovered ? `${hoverColor}08` : "#F9FAFB",
                borderColor: isHovered ? `${hoverColor}20` : "#F3F4F6",
                color: isHovered ? hoverColor : "#9CA3AF",
              }}
              transition={{ duration: 0.3 }}
            >
              {achievement.category}
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative h-full p-5 flex flex-col justify-between">
            {/* Header */}
            <div className="space-y-2 pt-2">
              <motion.div
                className={`${spaceGrotesk.className} text-xs font-medium tracking-wide`}
                animate={{
                  color: isHovered ? hoverColor : "#9CA3AF",
                }}
                transition={{ duration: 0.3 }}
              >
                {formatDate(achievement.date)}
              </motion.div>

              <h3
                className={`${spaceGrotesk.className} text-lg font-medium text-gray-900 leading-tight tracking-tight`}
              >
                {achievement.title}
              </h3>

              <motion.div
                className={`${spaceGrotesk.className} text-[10px] font-medium text-gray-400 uppercase tracking-widest`}
                animate={{
                  color: isHovered ? `${hoverColor}80` : "#9CA3AF",
                }}
                transition={{ duration: 0.3 }}
              >
                {achievement.type}
              </motion.div>
            </div>

            {/* Detail button - ALWAYS visible with color change on hover */}
            <div className="flex justify-end items-end mt-2">
              <motion.button
                ref={buttonRef}
                onClick={() => setIsDialogOpen(true)}
                className={`${spaceGrotesk.className} flex items-center gap-2 text-xs font-medium transition-colors duration-300 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-100`}
                style={{
                  x: springX,
                  y: springY,
                  rotateX,
                  rotateY,
                }}
                animate={{
                  color: isHovered ? hoverColor : "#6B7280",
                  borderColor: isHovered ? `${hoverColor}20` : "#F3F4F6",
                  backgroundColor: isHovered ? `${hoverColor}05` : "rgba(255, 255, 255, 0.8)",
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tracking-wide">Detail</span>
                <motion.div animate={{ x: isHovered ? 2 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Centered Dialog Portal */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsDialogOpen(false)}
            />

            {/* Dialog - Perfectly centered */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
              <motion.div
                className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Close button */}
                <motion.button
                  onClick={() => setIsDialogOpen(false)}
                  className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>

                {/* Decorative header accent */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-transparent via-current to-transparent"
                  style={{ color: hoverColor }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
                  <div className="p-12">
                    {/* Header */}
                    <motion.div
                      className="mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <div className={`${spaceGrotesk.className} flex items-center gap-4 text-sm font-medium mb-6`}>
                        <Calendar className="w-4 h-4" strokeWidth={1.5} style={{ color: hoverColor }} />
                        <span className="tracking-wide" style={{ color: hoverColor }}>
                          {formatFullDate(achievement.date)}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500">{achievement.type}</span>
                      </div>

                      <h2
                        className={`${spaceGrotesk.className} text-4xl font-medium text-gray-900 leading-tight tracking-tight mb-4`}
                      >
                        {achievement.title}
                      </h2>

                      <div
                        className={`${spaceGrotesk.className} text-sm font-medium uppercase tracking-widest`}
                        style={{ color: hoverColor }}
                      >
                        {achievement.category}
                      </div>
                    </motion.div>

                    {/* Image - Better layout */}
                    {achievement.imageUrl && (
                      <motion.div
                        className="mb-10 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <img
                          src={achievement.imageUrl || "/placeholder.svg"}
                          alt={achievement.title}
                          className="w-full h-80 object-cover"
                        />
                      </motion.div>
                    )}

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <p className={`${spaceGrotesk.className} text-lg text-gray-600 leading-relaxed`}>
                        {achievement.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
