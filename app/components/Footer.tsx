"use client"

import { motion, useAnimation } from "framer-motion"
import { Github, Mail, Linkedin, Code2, ExternalLink } from 'lucide-react'
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Footer() {
  const controls = useAnimation()
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

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
      href: "https://github.com/primebeyonder",
      icon: <Github className="size-4" />,
      label: "GitHub",
      hoverColor: "hover:text-[#6e5494]",
    },
    {
      href: "https://leetcode.com/u/MyatKyawThu/",
      icon: <Code2 className="size-4" />,
      label: "LeetCode",
      hoverColor: "hover:text-[#FFA116]",
    },
    {
      href: "https://linkedin.com/in/myat-kyaw-thu-0b8177334",
      icon: <Linkedin className="size-4" />,
      label: "LinkedIn",
      hoverColor: "hover:text-[#0077B5]",
    },
    {
      href: "mailto:myatkyawthu4002@gmail.com",
      icon: <Mail className="size-4" />,
      label: "Email",
      hoverColor: "hover:text-[#D44638]",
    },
  ]

  return (
    <motion.footer
      className="relative w-full border-t border-slate-200 dark:border-slate-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      onHoverStart={() => controls.start("hover")}
      onHoverEnd={() => controls.start("initial")}
    >
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div className="grid gap-8">
          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative text-slate-600 dark:text-slate-400 transition-colors duration-300 ${link.hoverColor}`}
                aria-label={link.label}
              >
                <motion.div
                  className="relative"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-px opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, 
                        transparent 0%, 
                        currentColor 50%, 
                        transparent 100%
                      )`,
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute -inset-2 rounded-lg bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ zIndex: -1 }}
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Decorative line with dots */}
          <motion.div 
            className="relative flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <motion.div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
            <motion.div 
              className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
          </motion.div>

          {/* Copyright with subtle animation */}
          <motion.div 
            className="flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <motion.p
              className="text-sm text-slate-500 dark:text-slate-400 tracking-wide"
              whileHover={{
                color: theme === 'dark' ? '#e2e8f0' : '#475569',
                transition: { duration: 0.2 }
              }}
            >
              © {currentYear} All rights reserved
            </motion.p>
            <motion.span
              className="text-slate-400 dark:text-slate-600"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              •
            </motion.span>
            <motion.a
              href="/sitemap.xml"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Sitemap
              <ExternalLink className="inline-block ml-1 size-3" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle gradient background effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 dark:from-slate-900/50 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.footer>
  )
}