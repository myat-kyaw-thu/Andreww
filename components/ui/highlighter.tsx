"use client"

import { useInView } from "motion/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

type ColorMode = "brand" | "ghost" | "custom"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  colorMode?: ColorMode
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  intensity?: "subtle" | "moderate" | "bold"
}

// 2026 Kinetic Minimalism: Smooth cubic-bezier timing
const BLOOM_TIMING = "cubic-bezier(0.22, 1, 0.36, 1)"

// Intensity presets for atmospheric minimalism
const INTENSITY_MAP = {
  subtle: { opacity: 0.03, blur: 12 },
  moderate: { opacity: 0.05, blur: 10 },
  bold: { opacity: 0.08, blur: 8 },
}

export function Highlighter({
  children,
  action = "highlight",
  color,
  colorMode = "ghost",
  strokeWidth = 1,
  animationDuration = 800,
  iterations = 1,
  padding = 3,
  multiline = true,
  isView = false,
  intensity = "subtle",
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  const shouldShow = !isView || isInView

  // Determine color based on mode
  const getColor = (): string => {
    if (colorMode === "custom" && color) return color
    if (colorMode === "brand") return "#3b82f6"
    return "#e5e7eb"
  }

  const finalColor = getColor()
  const intensityConfig = INTENSITY_MAP[intensity]

  useEffect(() => {
    const element = elementRef.current
    if (!shouldShow || !element) return

    // Wait for element to be fully rendered
    const initAnnotation = () => {
      const annotationConfig = {
        type: action,
        color: finalColor,
        strokeWidth: 2,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const annotation = annotate(element, annotationConfig)
      annotationRef.current = annotation

      // Show annotation
      annotation.show()

      // Wait for SVG to be created
      requestAnimationFrame(() => {
        const svg = element.querySelector("svg")
        if (!svg) return

        // CRITICAL: Stabilize SVG positioning to prevent layout shift
        svg.style.position = "absolute"
        svg.style.top = "0"
        svg.style.left = "0"
        svg.style.width = "100%"
        svg.style.height = "100%"
        svg.style.overflow = "visible"
        svg.style.pointerEvents = "none"
        svg.style.zIndex = "0"
        svg.style.transform = "translateZ(0)" // Force GPU acceleration
        svg.style.willChange = "auto"

        // Apply styling based on action type
        if (action === "highlight") {
          const rects = svg.querySelectorAll("rect")
          rects.forEach((rect) => {
            const rectElement = rect as SVGRectElement
            rectElement.style.opacity = String(intensityConfig.opacity)
            rectElement.style.filter = `blur(${intensityConfig.blur}px)`
            rectElement.style.transition = `all 600ms ${BLOOM_TIMING}`
          })
        } else {
          // For underline, box, circle, etc.
          const paths = svg.querySelectorAll("path, line")
          paths.forEach((path) => {
            const pathElement = path as SVGElement
            pathElement.style.transition = `all 600ms ${BLOOM_TIMING}`
            pathElement.style.opacity = "1"
            pathElement.style.strokeWidth = "5"
          })
        }

        setIsReady(true)
      })
    }

    // Small delay to ensure DOM is stable
    const timer = setTimeout(initAnnotation, 10)

    return () => {
      clearTimeout(timer)
      if (annotationRef.current) {
        annotationRef.current.remove()
        annotationRef.current = null
      }
      setIsReady(false)
    }
  }, [
    shouldShow,
    action,
    finalColor,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    intensityConfig,
  ])

  // Smooth hover effects
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!elementRef.current || !isReady) return

    const svg = elementRef.current.querySelector("svg")
    if (svg) {
      svg.style.transition = `opacity 400ms ${BLOOM_TIMING}`
      svg.style.opacity = "1"
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!elementRef.current || !isReady) return

    const svg = elementRef.current.querySelector("svg")
    if (svg && action === "highlight") {
      svg.style.transition = `opacity 600ms ${BLOOM_TIMING}`
      svg.style.opacity = String(intensityConfig.opacity)
    }
  }

  return (
    <span
      ref={elementRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // Prevent layout shifts - keep text in normal flow
        position: "relative",
        display: "inline",
        verticalAlign: "baseline",
        lineHeight: "inherit",
        // Smooth transitions
        transition: `filter 300ms ${BLOOM_TIMING}`,
        filter: isHovered ? "brightness(1.05)" : "brightness(1)",
      }}
    >
      {children}
    </span>
  )
}
