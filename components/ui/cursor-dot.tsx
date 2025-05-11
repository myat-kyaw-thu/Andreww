"use client"

import { useMobile } from "@/app/hook/use-mobile"
import { motion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function CursorDot() {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isClicked, setIsClicked] = useState(false)

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

  // Spring for size animation with different physics for bounce effect
  const dotSize = useSpring(18, {
    damping: 14, // Lower damping for more bounce
    stiffness: 300, // Higher stiffness for quicker response
    mass: 0.8, // Slightly higher mass for more pronounced bounce
  })

  // Update mouse position on mousemove
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Handle mouse down and up events
    const handleMouseDown = () => {
      setIsClicked(true)
      dotSize.set(10) // Shrink to 10px on click
    }

    const handleMouseUp = () => {
      setIsClicked(false)
      dotSize.set(18) // Return to original size with bounce
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    setMounted(true)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dotSize])

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
      {/* Main cursor dot with dynamic size */}
      <motion.div
        className="rounded-full flex items-center justify-center"
        style={{
          height: dotSize,
          width: dotSize,
          backgroundColor: "white", // White works best with mixBlendMode: difference
          transition: "all 0.1s ease-out",
          transform: `translate(-50%, -50%)`, // Center the dot on cursor
        }}
      />
    </motion.div>
  )
}
