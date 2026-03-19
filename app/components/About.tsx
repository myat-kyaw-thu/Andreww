
"use client"

import { Highlighter } from "@/components/ui/highlighter"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { SparklesText } from "./SparkleText"

import { Archivo, Space_Grotesk } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const archivo = Archivo({ subsets: ["latin"], display: "swap" })

export default function AboutSection() {
  const [showHighlights, setShowHighlights] = useState(false)

  useEffect(() => {
    // Wait for text animations to complete before showing highlights
    const timer = setTimeout(() => {
      setShowHighlights(true)
    }, 1500) // After all text animations finish

    return () => clearTimeout(timer)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const textVariants: Variants = {
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
        <SparklesText text="About" className={spaceGrotesk.className}/>
        <motion.div
          className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>

       <motion.div
        className={`${archivo.className} dark:text-slate-300 leading-relaxed text-base space-y-4`}
        variants={containerVariants}
      >
        <motion.p variants={textVariants} transition={{ delay: 0.7 }}>
          Results-driven Software Engineer with{" "}
          {showHighlights ? (
            <Highlighter action="underline" colorMode="custom" color="#505ae6" intensity="subtle" isView={false}>
              2+ years of experience
            </Highlighter>
          ) : (
            <span>2+ years of experience</span>
          )}
          {" "}leading cross-functional teams and driving end-to-end project delivery. Adept at architecting and scaling high-performance systems using React, Vue.js, Laravel, and Node.js.
        </motion.p>

        <motion.p variants={textVariants} transition={{ delay: 0.8 }}>
          Proven track record in optimizing workflows, enhancing system efficiency, and delivering production-ready applications ahead of schedule. Demonstrates{" "}
          {showHighlights ? (
            <span>strong technical leadership</span>
          ) : (
            <span>strong technical leadership</span>
          )}
          {" "}with a focus on fostering innovation, promoting clean, modular code, and delivering tangible business outcomes.
        </motion.p>

        <motion.p variants={textVariants} transition={{ delay: 0.9 }}>
          Committed to{" "}
          {showHighlights ? (
            <Highlighter action="underline" colorMode="custom" color="#505ae6" intensity="subtle" isView={false}>
              ownership
            </Highlighter>
          ) : (
            <span>ownership</span>
          )}
          {" "}at every stage of the development lifecycle, from conceptualization to deployment. Proficient with{" "}
          {showHighlights ? (
            <Highlighter action="underline" colorMode="custom" color="#505ae6" intensity="subtle" isView={false}>
              React, Vue.js, Laravel, and Node.js
            </Highlighter>
          ) : (
            <span>React, Vue.js, Laravel, and Node.js</span>
          )}
          . Ensuring alignment with organizational goals and customer success.
        </motion.p>
      </motion.div>
    </motion.section>
  )
}
