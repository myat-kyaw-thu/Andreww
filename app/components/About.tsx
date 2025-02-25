"use client"

import { motion } from "framer-motion"
import { SparklesText } from "./SparkleText"

export default function AboutSection() {

  return (
    <motion.section
      className="w-full max-w-2xl space-y-8 mt-10"
    >
      <motion.div className="space-y-2">
        <SparklesText text="About Me"/>
        <motion.div
        />
      </motion.div>

      <motion.p
        className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg"
      >
        Results-oriented Software Developer with experience in building scalable web applications. Specializing in
        PHP/Laravel and JavaScript, I've successfully delivered CMS websites, animated landing pages, and mini
        applications. My focus lies in creating user-centric designs with optimized performance and clean code. I thrive
        in collaborative environments and remain dedicated to continuous innovation in every project.
      </motion.p>
    </motion.section>
  )
}

