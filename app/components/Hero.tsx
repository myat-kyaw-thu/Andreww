"use client"
import Image from "next/image"
import React from "react"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { LineShadowText } from "./LineShadowText"
import { Github, FileText, Linkedin, Mail, Code2 } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black"

  const techStack = [
    { name: "React", color: "text-[#61DAFB]", url: "https://reactjs.org/" },
    { name: "Next.js", color: "text-black dark:text-white", url: "https://nextjs.org/" },
    { name: "Vue.js", color: "text-[#4FC08D]", url: "https://vuejs.org/" },
    { name: "Express.js", color: "text-[#000000] dark:text-[#FFFFFF]", url: "https://expressjs.com/" },
    { name: "Laravel", color: "text-[#FF2D20]", url: "https://laravel.com/" },
  ]

  return (
    <section className="w-full max-w-2xl space-y-8 flex flex-between">
      <motion.div className="size-32">
        <Image src="/profile.jpg" alt="Andrew" width={120} height={160} className="rounded-full" />
      </motion.div>

      <motion.div className="flex flex-col flex-1">
        <h1 className="ms-10 text-xl leading-none tracking-tighter sm:text-2xl md:text-6xl">
          Hey, I am
          <LineShadowText className="italic ms-3 font-bold text-3xl md:text-7xl" shadowColor={shadowColor}>
            Andrew
          </LineShadowText>
        </h1>

        <p className="text-lg sm:text-xl text-neutral-900 dark:text-neutral-200 mt-7">
          Full Stack Developer | Based in{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Yangon"
            target="_blank"
            rel="noopener noreferrer"
            className="underline italic font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Yangon, Myanmar
          </Link>
          <br />
          Crafting digital experiences with{" "}
          {techStack.map((tech, index) => (
            <React.Fragment key={tech.name}>
              <Link
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline italic font-semibold ${tech.color} hover:opacity-80 transition-opacity duration-300`}
              >
                {tech.name}
              </Link>
              {index < techStack.length - 1 && ", "}
              {index === techStack.length - 2 && "and "}
            </React.Fragment>
          ))}
          .
        </p>

        <div className="flex space-x-4 mt-6">
          <Link
            href="https://github.com/primebeyonder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-neutral-200 hover:text-[#6e5494] transition-colors duration-300"
          >
            <Github size={28} />
          </Link>
          <Link
            href="https://leetcode.com/u/MyatKyawThu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-neutral-200 hover:text-[#FFA116] transition-colors duration-300"
          >
            <Code2 size={28} />
          </Link>
          <Link
            href="https://linkedin.com/in/myat-kyaw-thu-0b8177334"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-neutral-200 hover:text-[#0077B5] transition-colors duration-300"
          >
            <Linkedin size={28} />
          </Link>
          <Link
            href="mailto:myatkyawthu4002@gmail.com"
            className="text-neutral-900 dark:text-neutral-200 hover:text-[#D44638] transition-colors duration-300"
          >
            <Mail size={28} />
          </Link>
          <Link
            href="/myatkyawthu.pdf"
            download
            className="text-neutral-900 dark:text-neutral-200 hover:text-[#4285F4] transition-colors duration-300"
          >
            <FileText size={28} />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

