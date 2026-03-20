"use client"

import { motion, Variants } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Space_Mono, Space_Grotesk } from "next/font/google"
import Link from "next/link"

const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const socialLinks = [
    {
      href: "https://github.com/myat-kyaw-thu",
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
    },
    {
      href: "mailto:myatkyawthu4002@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
    },
  ]

  return (
    <motion.footer
      className="w-full border-t border-gray-200 dark:border-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Location & Hours */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className={`${spaceMono.className} text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400`}>
              Location
            </p>
            <p className={`${spaceGrotesk.className} text-sm`}>
              Yangon, Myanmar
            </p>
            <p className={`${spaceMono.className} text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 pt-4`}>
              Contact
            </p>
            <div className="space-y-2">
              <a href="tel:+959262999350" className={`${spaceGrotesk.className} text-sm hover:opacity-70 transition-opacity block`}>
                +959 262 999 350
              </a>
              <a href="mailto:myatkyawthu4002@gmail.com" className={`${spaceGrotesk.className} text-sm hover:opacity-70 transition-opacity block`}>
                myatkyawthu4002@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start gap-8">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                aria-label={link.label}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Right - CTA */}
          <motion.div variants={itemVariants} className="text-right md:text-left">
            <p className={`${spaceMono.className} text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2`}>
              KIROT Studio
            </p>
            <a
              href="https://kirot.myatkyawthu.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${spaceGrotesk.className} text-sm hover:opacity-70 transition-opacity inline-flex items-center gap-2`}
            >
              KIROT
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gray-200 dark:bg-gray-800 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom - Copyright */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <p className={spaceMono.className}>
            © {currentYear} All rights reserved
          </p>
          <Link
            href="/sitemap.xml"
            className={`${spaceMono.className} hover:text-black dark:hover:text-white transition-colors`}
          >
            Privacy Policy
          </Link>
        </motion.div>
      </div>
    </motion.footer>
  )
}
