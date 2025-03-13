"use client"

import { motion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useMobile } from "@/app/hook/use-mobile"

export default function CursorDot() {

  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  // Track mouse position with useState
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Slower spring physics for more pronounced following effect
  const smoothOptions = {
    damping: 32, // Higher damping = more friction
    stiffness: 130, // Lower stiffness = less "pull" force
    mass: 0.7, // Higher mass = more inertia
  }

  const smoothX = useSpring(0, smoothOptions)
  const smoothY = useSpring(0, smoothOptions)

  // Update mouse position on mousemove
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    setMounted(true)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  // Update spring values when mouse position changes
  useEffect(() => {
    smoothX.set(mousePosition.x)
    smoothY.set(mousePosition.y)
  }, [mousePosition, smoothX, smoothY])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null

  // Hide on mobile
  if (isMobile) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        x: smoothX,
        y: smoothY,
        mixBlendMode: "difference",
        filter: "contrast(1.2)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 0.3 } }}
    >
      {/* Main cursor dot */}
      <motion.div
        className="rounded-full flex items-center justify-center"
        style={{
          height: 18,
          width: 18,
          backgroundColor: "white", // White works best with mixBlendMode: difference
          transition: "all 0.1s ease-out",
        }}
      />
    </motion.div>
  )
}
