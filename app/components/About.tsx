
"use client"

import { useState } from "react";
import { SparklesText } from "./SparkleText"
import { motion, AnimatePresence } from "framer-motion"

const LanguageHighlight = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      className="relative inline-block font-semibold"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5"
            style={{ backgroundColor: color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.span>
  )
}
export default function AboutSection() {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null)

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

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const glitchEffect = {
    hidden: {
      opacity: 0,
      x: 3,
      transition: { duration: 0.1 },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.1 },
    },
  }
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
      >
        <SparklesText text="About" />
        <motion.div 
          className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </motion.div>

       <motion.div
        className="text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-4"
        variants={containerVariants}
      >
        <motion.p variants={textVariants}>
          As a passionate developer dedicated to crafting innovative web applications, I focus on solving real-world
          problems with{" "}
          <LanguageHighlight
            color="#8892BF"
            onHoverStart={() => setHoveredLanguage("PHP")}
            onHoverEnd={() => setHoveredLanguage(null)}
          >
            PHP
          </LanguageHighlight>
          ,{" "}
          <LanguageHighlight
            color="#F7DF1E"
            onHoverStart={() => setHoveredLanguage("JavaScript")}
            onHoverEnd={() => setHoveredLanguage(null)}
          >
            JavaScript
          </LanguageHighlight>
          , and{" "}
          <LanguageHighlight
            color="#3178C6"
            onHoverStart={() => setHoveredLanguage("TypeScript")}
            onHoverEnd={() => setHoveredLanguage(null)}
          >
            TypeScript
          </LanguageHighlight>
          .
        </motion.p>

        <motion.p variants={textVariants}>
          With a year of experience, I prioritize delivering high-quality, maintainable solutions. Every project
          reflects my commitment to efficiency—whether optimizing load times, improving performance by reducing bundle
          sizes, or transforming complex requirements into seamless, elegant solutions.
        </motion.p>

        <AnimatePresence>
          {hoveredLanguage === null && (
            <motion.p variants={textVariants} initial="hidden" animate="visible" exit="hidden">
              I ensure that every line of code I write meets the highest standards of quality and maintainability.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hoveredLanguage && (
            <motion.p
              variants={glitchEffect}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="font-mono text-sm"
            >
              {hoveredLanguage === "PHP" && "<?php echo 'Hello, World!'; ?>"}
              {hoveredLanguage === "JavaScript" && "console.log('Hello, World!');"}
              {hoveredLanguage === "TypeScript" && "const greeting: string = 'Hello, World!';"}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}