"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WordRotate } from "./WordRotate"

interface PageLoaderProps {
  children: React.ReactNode
  minDuration?: number
}
const helloInLanguages = [
  "Hello", // English
  "မင်္ဂလာပါ", // Myanmar
  "こんにちは", // Japanese
  "สวัสดี", // Thai
  "안녕하세요", // Korean
  "你好", // Chinese
  "Bonjour", // French
]

export function PageLoader({ children, minDuration = 4000 }: PageLoaderProps) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "" // Your API base URL

  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const animationFrameRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const greetingContainerRef = useRef<HTMLDivElement>(null)

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project-index`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.ok) {
          // Projects loaded successfully
          setProjectsLoaded(true)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        // Even if there's an error, we'll consider loading complete
        setProjectsLoaded(true)
      }
    }

    fetchProjects()
  }, [API_BASE_URL])

  // Handle the progress animation and timing
  useEffect(() => {
    startTimeRef.current = Date.now()

    const animateProgress = () => {
      const elapsedTime = Date.now() - startTimeRef.current
      // Calculate progress based on elapsed time relative to minDuration
      const newProgress = Math.min(100, (elapsedTime / minDuration) * 100)

      setProgress(newProgress)

      if (newProgress < 100) {
        // Continue animation if we haven't reached 100%
        animationFrameRef.current = requestAnimationFrame(animateProgress)
      } else if (projectsLoaded) {
        // If we've reached 100% and projects are loaded, complete the loading
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false)
        }, 500) // Small delay for smooth transition
      }
    }

    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animateProgress)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [minDuration, projectsLoaded])

  // Check if both conditions are met: minimum time passed and projects loaded
  useEffect(() => {
    if (progress >= 100 && projectsLoaded) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false)
      }, 500) // Small delay for smooth transition
    }
  }, [progress, projectsLoaded])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950"
          >
            <div className="relative flex flex-col items-center">
              {/* Animated circles - adjusted for mobile */}
              <div className="absolute">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full bg-blue-100 dark:bg-blue-900/20 absolute -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-purple-100 dark:bg-purple-900/10 absolute -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              {/* Main content */}
              <div className="flex flex-col items-center z-10 space-y-4 sm:space-y-6 px-4">
                {/* Andrew says Hello - with dynamic positioning */}
                <div
                  ref={greetingContainerRef}
                  className="flex items-baseline justify-center space-x-2 transition-all duration-300 ease-in-out"
                >
                  <motion.span
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 transition-all duration-300 ease-in-out"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Andrew says
                  </motion.span>
                  <WordRotate
                    words={helloInLanguages}
                    duration={1500}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-600 dark:from-gray-400 dark:to-gray-400 text-2xl sm:text-3xl md:text-4xl font-bold"
                    motionProps={{
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 },
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    parentRef={greetingContainerRef as React.RefObject<HTMLDivElement>}
                  />
                </div>

                {/* Progress bar */}
                <div className="w-[240px] sm:w-[280px] md:w-[400px] relative mt-6 sm:mt-8">
                  <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gray-800 dark:bg-gray-200 rounded-full"
                      animate={{ width: `${progress}%` }}
                      initial={{ width: "0%" }}
                      transition={{
                        duration: 0.1,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Percentage counter */}
                  <motion.div
                    className="absolute -right-2 -top-6 sm:-top-8 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {Math.round(progress)}%
                  </motion.div>
                </div>

                {/* Loading text with dots animation */}
                <motion.div
                  className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <LoadingDots />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children with a fade-in effect when loading is complete */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Animated loading dots
function LoadingDots() {
  return (
    <div className="flex items-center space-x-1">
      <span>Loading</span>
      <span className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            .
          </motion.span>
        ))}
      </span>
    </div>
  )
}

