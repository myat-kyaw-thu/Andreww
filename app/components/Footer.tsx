"use client"

import { motion, useAnimation } from "framer-motion"
import { Code2, Dot, ExternalLink, Github, Linkedin, Mail } from "lucide-react"
import { Space_Mono } from "next/font/google"
import Link from "next/link"
import { useState } from "react"

const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })

export default function Footer() {
  const controls = useAnimation()
  const currentYear = 2025
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  const socialLinks = [
    {
      href: "https://github.com/myat-kyaw-thu",
      icon: <Github className="size-4" />,
      label: "GitHub",
    },
    {
      href: "https://leetcode.com/u/MyatKyawThu/",
      icon: <Code2 className="size-4" />,
      label: "LeetCode",
    },
    {
      href: "https://linkedin.com/in/myat-kyaw-thu-0b8177334",
      icon: <Linkedin className="size-4" />,
      label: "LinkedIn",
    },
    {
      href: "mailto:myatkyawthu4002@gmail.com",
      icon: <Mail className="size-4" />,
      label: "Email",
    },
  ]

  return (
    <motion.footer
      className="relative w-full border-t border-gray-200 dark:border-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      onHoverStart={() => controls.start("hover")}
      onHoverEnd={() => controls.start("initial")}
    >
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div className="grid gap-10">
          {/* Social Links with hover effects */}
          <motion.div className="flex justify-center gap-8" variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200"
                aria-label={link.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative"
                  whileHover={{
                    y: -3,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileTap={{ scale: 0.92 }}
                >
                  {link.icon}

                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gray-300 dark:bg-gray-600"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredIndex === index ? 1 : 0,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Hover background */}
                  <motion.span
                    className="absolute -inset-2.5 rounded-full bg-gray-100 dark:bg-gray-800"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{
                      scale: hoveredIndex === index ? 1 : 0.6,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ zIndex: -1 }}
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Animated divider with morse code dots */}
          <motion.div className="relative flex items-center justify-center" variants={itemVariants}>
            <div className="flex items-center space-x-1">
              {[1, 3, 1, 2, 1].map((size, i) => (
                <motion.div
                  key={i}
                  className={`h-[${size}px] w-[${size * 3}px] rounded-full bg-gray-300 dark:bg-gray-700`}
                  initial={{ opacity: 0.4 }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Copyright with subtle animation */}
          <motion.div className="flex flex-col items-center justify-center gap-3" variants={itemVariants}>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="h-px w-12 bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-700"
                animate={{ width: ["0px", "48px"] }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
              <motion.p
                className={`${spaceMono.className} text-xs px-3 text-gray-400 dark:text-gray-500 tracking-wider uppercase`}
                animate={{ letterSpacing: ["0.05em", "0.1em"] }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {currentYear}
              </motion.p>
              <motion.div
                className="h-px w-12 bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-700"
                animate={{ width: ["0px", "48px"] }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400"
              whileHover={{ color: "rgba(107, 114, 128, 1)" }}
            >
              <motion.p className={`${spaceMono.className} text-sm tracking-wide`}>All rights reserved</motion.p>
              <motion.span
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Dot className="size-4 opacity-50" />
              </motion.span>
              <motion.a
                href="/sitemap.xml"
                className={`${spaceMono.className} text-sm relative group`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Sitemap
                <ExternalLink className="inline-block ml-1 size-3" />
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-400 dark:bg-gray-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle gradient line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{
          opacity: 1,
          scaleX: 1,
          filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </motion.footer>
  )
}
