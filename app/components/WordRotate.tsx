"use client"

import { AnimatePresence, motion, type MotionProps } from "framer-motion"
import { useEffect, useState, useRef, type RefObject } from "react"
import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
  parentRef?: RefObject<HTMLDivElement>
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  parentRef,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [wordWidth, setWordWidth] = useState<number>(0)
  const textMeasureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  // Measure the width of the current word
  useEffect(() => {
    if (textMeasureRef.current) {
      // Create a hidden element to measure text width
      const measureElement = document.createElement("div")
      measureElement.style.position = "absolute"
      measureElement.style.visibility = "hidden"
      measureElement.style.whiteSpace = "nowrap"
      measureElement.style.fontSize = window.getComputedStyle(textMeasureRef.current).fontSize
      measureElement.style.fontWeight = window.getComputedStyle(textMeasureRef.current).fontWeight
      measureElement.style.fontFamily = window.getComputedStyle(textMeasureRef.current).fontFamily
      measureElement.innerText = words[index]

      document.body.appendChild(measureElement)
      const width = measureElement.offsetWidth
      document.body.removeChild(measureElement)

      setWordWidth(width)
    }
  }, [index, words])

  // Update parent container spacing if needed
  useEffect(() => {
    if (parentRef?.current && containerRef.current) {
      // Adjust the parent container's justification or spacing based on word width
      parentRef.current.style.transition = "all 0.3s ease-in-out"
    }
  }, [wordWidth, parentRef])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden inline-flex justify-center transition-all duration-300 ease-in-out"
      style={{ minWidth: `${wordWidth + 10}px` }} // Add a small buffer
    >
      <AnimatePresence mode="wait">
        <motion.div key={words[index]} ref={textMeasureRef} className={cn(className)} {...motionProps}>
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

