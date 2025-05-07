"use client"

import mermaid from "mermaid"
import { useEffect, useRef } from "react"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize mermaid with proper configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    })

    const renderChart = async () => {
      if (mermaidRef.current) {
        try {
          // Clear previous content
          mermaidRef.current.innerHTML = ""

          // Generate a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`

          // Create a new div with the unique ID
          const container = document.createElement("div")
          container.id = id
          container.className = "mermaid-diagram w-full overflow-auto"
          mermaidRef.current.appendChild(container)

          // Render the chart
          const { svg } = await mermaid.render(id, chart)
          container.innerHTML = svg
        } catch (error) {
          console.error("Mermaid rendering error:", error)
          mermaidRef.current.innerHTML = `<div class="p-4 text-red-500 border border-red-300 rounded">Error rendering flowchart. Please check the syntax.</div>`
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
            startOnLoad: false,
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

  return <div className="mermaid-container" ref={mermaidRef}></div>
}
