"use client"

import Image from "next/image"
import React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { LineShadowText } from "./LineShadowText"
import { Github, FileText, Linkedin, Mail, Code2 } from "lucide-react"
import Link from "next/link"
import { Space_Grotesk, Space_Mono, Archivo } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" })
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" })
const archivo = Archivo({ subsets: ["latin"], display: "swap" })

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const socialVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  }

  const socialItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.15,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.section
      className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">
        <motion.div
          className="relative"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.4,
              },
            },
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <div className="relative">
            <Image
              src="/profile2.png"
              alt="Andrew"
              width={130}
              height={130}
              className="rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-800 transition-shadow duration-300 hover:ring-slate-300 dark:hover:ring-slate-700"
              style={{
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center sm:items-start">
          <motion.div variants={itemVariants} className="text-center sm:text-left">
            <h1 className={`${spaceMono.className} text-lg leading-none tracking-tighter sm:text-xl md:text-2xl`}>
              Hey, I am
              <LineShadowText
                className={`${spaceGrotesk.className} block italic font-bold text-5xl md:text-6xl mt-1`}
                shadowColor={shadowColor}
              >
                Andrew
              </LineShadowText>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`${archivo.className} text-sm sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200 mt-4 text-center sm:text-left`}
          >
            Full Stack Developer | Based in{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Yangon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline italic font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 relative group"
            >
              <span>Yangon, Myanmar</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <br className="hidden xs:block sm:hidden" />
            <span className="inline-block mt-1 sm:mt-0">
              Crafting digital experiences with{" "}
              {techStack.map((tech, index) => (
                <React.Fragment key={tech.name}>
                  <Link
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline italic font-semibold ${spaceGrotesk.className} ${tech.color} hover:opacity-80 transition-opacity duration-300 relative group`}
                  >
                    <span>{tech.name}</span>
                    <motion.span
                      className={`absolute bottom-0 left-0 w-full h-0.5 ${tech.color.replace("text-", "bg-")} origin-left`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  {index < techStack.length - 1 && ", "}
                  {index === techStack.length - 2 && "and "}
                </React.Fragment>
              ))}
              .
            </span>
          </motion.p>

          <motion.div className="flex space-x-4 mt-5 justify-center sm:justify-start" variants={socialVariants}>
            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="https://github.com/primebeyonder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-200 hover:text-[#6e5494] transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="GitHub Profile"
              >
                <Github size={22} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="https://leetcode.com/u/MyatKyawThu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-200 hover:text-[#FFA116] transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="LeetCode Profile"
              >
                <Code2 size={22} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="https://linkedin.com/in/myat-kyaw-thu-0b8177334"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-200 hover:text-[#0077B5] transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={22} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="mailto:myatkyawthu4002@gmail.com"
                className="text-neutral-900 dark:text-neutral-200 hover:text-[#D44638] transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Email Contact"
              >
                <Mail size={22} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <a
                href="/myatkyawthu.pdf"
                download="myatkyawthu.pdf"
                className="text-neutral-900 dark:text-neutral-200 hover:text-[#4285F4] transition-colors duration-300 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Download Resume"
                onClick={(e) => {
                  e.preventDefault()
                  const link = document.createElement("a")
                  link.href = "/myatkyawthu.pdf"
                  link.download = "myatkyawthu.pdf"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <FileText size={22} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero

