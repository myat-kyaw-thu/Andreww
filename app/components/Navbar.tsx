"use client"

import { useTheme } from "next-themes"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Moon, Sun, Clock, Home, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("top")
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<string>("")
  const [visible, setVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = useState({})
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()
  const { theme, setTheme } = useTheme()

  // Handle scroll visibility
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest
    if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
      setVisible(true)
    } else if (currentScrollY < lastScrollY.current) {
      setVisible(false)
    }
    lastScrollY.current = currentScrollY
  })

  // Handle active section detection
  useMotionValueEvent(scrollY, "change", () => {
    const sections = ["top", "achievements"]
    const currentSection = sections.find(section => {
      const element = document.getElementById(section)
      if (!element) return false
      const rect = element.getBoundingClientRect()
      return rect.top <= 100 && rect.bottom >= 100
    })
    if (currentSection) {
      setActiveSection(currentSection)
    }
  })

  // Update hover effect
  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = navRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    setMounted(true)

    return () => clearInterval(interval)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setActiveSection(sectionId)
    }
  }

  if (!mounted) return null

  const navItems = [
    { id: "top", label: "Home", icon: <Home className="w-4 h-4" /> },
    { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" /> },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-6 px-4"
    >
      <div className="max-w-xl mx-auto">
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 pointer-events-auto overflow-hidden">
          <div className="h-16 px-6 flex items-center justify-between">
            {/* Left side - Navigation Links */}
            <div className="flex items-center gap-1 relative">
              {/* Hover background */}
              <motion.div
                className="absolute h-9 bg-slate-100 dark:bg-slate-800 rounded-lg transition-all duration-300 ease-out"
                animate={hoverStyle}
                initial={false}
              />
              
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={el => navRefs.current[index] = el}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium z-10",
                    "text-slate-700 dark:text-slate-300",
                    activeSection === item.id && "text-slate-900 dark:text-white"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Right side - Clock and Theme Toggle */}
            <div className="flex items-center gap-4">
              {/* Clock */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium tabular-nums">{time}</span>
              </motion.div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === "dark" ? 0 : 360,
                  }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  {theme === "dark" ? (
                    <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
                  ) : (
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
                  )}
                </motion.div>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </motion.div>
  )
}