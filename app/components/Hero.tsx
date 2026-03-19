"use client";

import { motion } from "framer-motion";
import { Code2, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { Archivo, Space_Grotesk, Space_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LineShadowText } from "./LineShadowText";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const archivo = Archivo({ subsets: ["latin"], display: "swap" });

const Hero = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const techStack = [
    { name: "React", color: "text-[#61DAFB]", url: "https://reactjs.org/" },
    { name: "Next.js", color: "text-black dark:text-white", url: "https://nextjs.org/" },
    { name: "Vue.js", color: "text-[#4FC08D]", url: "https://vuejs.org/" },
    { name: "Express.js", color: "text-[#000000] dark:text-[#FFFFFF]", url: "https://expressjs.com/" },
    { name: "Laravel", color: "text-[#FF2D20]", url: "https://laravel.com/" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

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
  };

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
  };

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
  };

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
          <div className="relative group">
            {/* Vanilla cream bg for light, graphite for dark */}
            <div className="absolute inset-0 rounded-3xl bg-amber-50 dark:bg-slate-900 transition-colors duration-300" />
            <Image
              src="/profile2.png"
              alt="Andrew"
              width={130}
              height={130}
              className="relative rounded-3xl object-cover ring-1 ring-amber-100 dark:ring-slate-800 transition-all duration-300 hover:ring-amber-200 dark:hover:ring-slate-700"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center sm:items-start">
          <motion.div variants={itemVariants} className="text-center sm:text-left">
            <h1 className={`${spaceMono.className} text-sm leading-relaxed tracking-wide sm:text-base md:text-lg font-medium text-neutral-600 dark:text-neutral-400`}>
              Hey, I am
            </h1>
            <LineShadowText
              className={`${spaceGrotesk.className} block italic font-bold text-3xl md:text-4xl mt-2 leading-tight`}
              shadowColor={shadowColor}
            >
              Myat Kyaw Thu
            </LineShadowText>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`${archivo.className} text-sm sm:text-base md:text-base text-neutral-700 dark:text-neutral-300 mt-5 text-center sm:text-left leading-relaxed`}
          >
            Full Stack Developer | Based in{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Yangon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline italic font-medium text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group"
            >
              <span>Yangon, Myanmar</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 origin-left"
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
                    className={`underline italic font-medium ${spaceGrotesk.className} ${tech.color} hover:opacity-70 transition-opacity duration-300 relative group`}
                  >
                    <span>{tech.name}</span>
                    <motion.span
                      className={`absolute bottom-0 left-0 w-full h-0.5 ${tech.color.replace("text-", "bg-")} origin-left opacity-60`}
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

          <motion.div className="flex space-x-3 mt-6 justify-center sm:justify-start" variants={socialVariants}>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="https://github.com/myat-kyaw-thu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                aria-label="GitHub Profile"
              >
                <Github size={20} strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="https://leetcode.com/u/MyatKyawThu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                aria-label="LeetCode Profile"
              >
                <Code2 size={20} strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="https://linkedin.com/in/myat-kyaw-thu-0b8177334"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <Link
                href="mailto:myatkyawthu4002@gmail.com"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                aria-label="Email Contact"
              >
                <Mail size={20} strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div variants={socialItemVariants} whileHover="hover">
              <a
                href="/Myat Kyaw Thu.pdf"
                download="Myat Kyaw Thu.pdf"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                aria-label="Download Resume"
                onClick={(e) => {
                  e.preventDefault();
                  const link = document.createElement("a");
                  link.href = "/Myat Kyaw Thu.pdf";
                  link.download = "Myat Kyaw Thu.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <FileText size={20} strokeWidth={1.5} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
