"use client"

import mermaid from "mermaid"
import { useEffect, useRef } from "react"

interface MermaidProps {
  chart: string
}

export default function MermaidChart({ chart }: MermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize mermaid with proper configuration
    mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    })

    const renderChart = async () => {
      if (mermaidRef.current) {
        try {
          // Clear previous content
          mermaidRef.current.innerHTML = ""

          // Create a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`

          // Create a container with the mermaid class
          const container = document.createElement("div")
          container.className = "mermaid"
          container.textContent = chart
          mermaidRef.current.appendChild(container)

          // Run mermaid
          mermaid.contentLoaded()
        } catch (error) {
          console.error("Mermaid rendering error:", error)
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<div class="p-4 text-red-500 border border-red-300 rounded">Error rendering flowchart. Please check the syntax.</div>`
          }
        }
      }
    }

    renderChart()

    // Re-render on theme change
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark")
          mermaid.initialize({
            startOnLoad: true,
            theme: isDark ? "dark" : "default",
            securityLevel: "loose",
            fontFamily: "inherit",
          })
          renderChart()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [chart])

  return <div ref={mermaidRef}></div>
}
