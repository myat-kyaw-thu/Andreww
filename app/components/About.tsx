"use client"

import { motion } from "framer-motion"
import { SparklesText } from "./SparkleText"

export default function AboutSection() {

  return (
       <motion.section className="w-full max-w-2xl space-y-8 my-10">
      <motion.div className="space-y-2">
        <SparklesText text="About Me" />
        <motion.div />
      </motion.div>

      <motion.p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
        Detail-obsessed Software Developer with a proven track record of delivering{" "}
        <span className="underline italic">pixel-perfect</span> web applications. Specializing in{" "}
        <span className="text-blue-500">PHP</span>, <span className="text-red-500">Laravel</span> and{" "}
        <span className="text-yellow-500">JavaScript</span>, I've meticulously crafted{" "}
        <span className="underline italic">15+ production-ready applications</span> with{" "}
        <span className="underline italic">99.9% uptime</span>. Each project showcases my commitment to{" "}
        <span className="underline italic">precision</span> – from optimizing load times to reducing bundle sizes by up
        to 40%. I transform complex requirements into elegant solutions, ensuring every line of code meets the highest
        standards of <span className="underline italic">quality</span> and{" "}
        <span className="underline italic">maintainability</span>.
      </motion.p>
    </motion.section>
  )
}