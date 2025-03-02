"use client"

import { motion } from "framer-motion"
import { SparklesText } from "./SparkleText"

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const highlightVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
  }

  const HighlightedText = ({ children, color = "slate" }: { children: React.ReactNode; color?: string }) => (
    <motion.span
      className={`relative inline-block ${
        color === "slate" 
          ? "text-slate-900 dark:text-slate-100" 
          : `text-${color}-500 dark:text-${color}-400`
      }`}
      variants={highlightVariants}
      whileHover={{ 
        y: -1,
        transition: { duration: 0.2 }
      }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className={`absolute -inset-1 rounded-md ${
          color === "slate" 
            ? "bg-slate-100 dark:bg-slate-800/50" 
            : `bg-${color}-100/30 dark:bg-${color}-900/30`
        }`}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.span>
  )

  const ItalicText = ({ children }: { children: React.ReactNode }) => (
    <motion.span
      className="inline-block italic relative"
      variants={highlightVariants}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-px bg-current opacity-60"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  )

  return (
    <motion.section 
      className="w-full max-w-2xl space-y-8 my-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div 
        className="space-y-2"
        variants={highlightVariants}
      >
        <SparklesText text="About Me" />
        <motion.div 
          className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      <motion.p 
        className="text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-2"
        variants={containerVariants}
      >
        <motion.span variants={highlightVariants} className="block">
          As a passionate developer dedicated to crafting innovative web applications, I focus on solving real-world problems with{" "}
          <HighlightedText color="blue">PHP</HighlightedText>,{" "}
          <HighlightedText color="yellow">JavaScript</HighlightedText>, and{" "}
          <HighlightedText color="blue">TypeScript</HighlightedText>.
        </motion.span>

        <motion.span variants={highlightVariants} className="block mt-4">
          With a year of experience, I prioritize delivering{" "}
          <ItalicText>high-quality</ItalicText>, <ItalicText>maintainable solutions</ItalicText>. 
          Every project reflects my commitment to efficiency—whether optimizing load times, improving performance 
          by reducing bundle sizes, or transforming complex requirements into{" "}
          <ItalicText>seamless, elegant solutions</ItalicText>.
        </motion.span>

        <motion.span variants={highlightVariants} className="block mt-4">
          I ensure that every line of code I write meets the highest standards of{" "}
          <ItalicText>quality</ItalicText> and{" "}
          <ItalicText>maintainability</ItalicText>.
        </motion.span>
      </motion.p>
    </motion.section>
  )
}