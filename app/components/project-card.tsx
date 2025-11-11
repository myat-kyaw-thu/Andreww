"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, ExternalLink, Eye, Github, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageViewer } from "./image-viewer";

import { Archivo, Space_Grotesk, Space_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const archivo = Archivo({ subsets: ["latin"], display: "swap" });

interface ProjectCardProps {
  title: string;
  description: string;
  image: string | string[]; // Support both single image and array
  techStack: string[] | string;
  status: "Completed" | "In Progress";
  type: "Personal" | "Work";
  demoUrl?: string;
  githubUrl?: string;
}

const techStackColors: Record<string, { bg: string; text: string; border: string; }> = {
  // Frontend
  React: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  "Next.js": { bg: "bg-gray-50 dark:bg-gray-900/50", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700" },
  Vue: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800" },
  TailwindCSS: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800" },
  Bootstrap: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },

  // Backend
  "Node.js": { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
  Express: { bg: "bg-slate-50 dark:bg-slate-900/50", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-700" },
  Laravel: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },

  // Languages
  TypeScript: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  JavaScript: { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-800" },
  Python: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  PHP: { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800" },

  // Databases
  MongoDB: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
  MySQL: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  PostgreSQL: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  Prisma: { bg: "bg-slate-50 dark:bg-slate-900/50", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-700" },

  // Tools
  Docker: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  AWS: { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
  Vercel: { bg: "bg-gray-50 dark:bg-gray-900/50", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700" },
};

export function ProjectCard({
  title,
  description,
  image,
  techStack,
  status,
  type,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image as string or array
  const imageArray = Array.isArray(image) ? image : [image];
  const coverImage = imageArray[0] || "/placeholder.svg";

  let parsedTechStack: string[] = [];
  try {
    if (Array.isArray(techStack)) {
      parsedTechStack = techStack;
    } else if (typeof techStack === "string") {
      try {
        parsedTechStack = JSON.parse(techStack);
      } catch {
        parsedTechStack = techStack.split(",").map((tech) => tech.trim());
      }
    }
  } catch (error) {
    console.error("Error parsing tech stack:", error);
    parsedTechStack = [];
  }

  const visibleTechStack = showAllTech ? parsedTechStack : parsedTechStack.slice(0, 6);
  const hasMoreTech = parsedTechStack.length > 6;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group w-full max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              type: "spring",
              stiffness: 120,
              damping: 25,
            }}
            className="relative aspect-[4/3] w-full cursor-pointer"
            onClick={() => setImageViewerOpen(true)}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center rounded-lg">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}

            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover rounded-lg transition-all duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onLoad={() => setImageLoaded(true)}
            />

            {/* Subtle hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/0 rounded-lg transition-colors duration-300"
              animate={{ backgroundColor: isHovered ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0)" }}
            />

            {/* Floating Eye button on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-2 right-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageViewerOpen(true);
                    }}
                    className="p-1.5 bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background transition-colors shadow-lg"
                  >
                    <Eye size={14} className="text-foreground" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status and Type badges */}
            <div className="absolute top-2 left-2 flex gap-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`${archivo.className} flex items-center gap-0.5 px-1.5 py-0.5 bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-full border border-border/50 text-xs font-medium text-foreground`}
              >
                <Tag size={10} />
                {type}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`${archivo.className} flex items-center gap-0.5 px-1.5 py-0.5 backdrop-blur-sm rounded-full border text-xs font-medium ${status === "Completed"
                  ? "bg-green-50/90 dark:bg-green-950/80 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-800/50"
                  : "bg-blue-50/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50"
                  }`}
              >
                <Calendar size={10} />
                {status}
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
              damping: 25,
            }}
            className="space-y-4"
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              className={`${spaceGrotesk.className} text-lg lg:text-xl font-semibold text-foreground leading-tight`}
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              className="space-y-2"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={isExpanded ? 'expanded' : 'collapsed'}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`${archivo.className} text-foreground/70 leading-relaxed ${!isExpanded ? "line-clamp-3" : ""}`}
                >
                  {description}
                </motion.p>
              </AnimatePresence>

              {description.length > 150 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Show less <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown size={14} />
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>

            {/* Tech Stack */}
            {parsedTechStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
                className="space-y-2"
              >
                <div className="flex flex-wrap gap-1.5">
                  <AnimatePresence>
                    {visibleTechStack.map((tech, index) => {
                      const colors = techStackColors[tech] || {
                        bg: "bg-muted/50 dark:bg-muted/30",
                        text: "text-muted-foreground",
                        border: "border-border/50"
                      };
                      return (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.05, y: -1 }}
                          transition={{
                            delay: 0.7 + index * 0.05,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          className={`${spaceMono.className} px-2 py-0.5 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border} cursor-default`}
                        >
                          {tech}
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {hasMoreTech && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAllTech(!showAllTech)}
                    className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {showAllTech ? (
                      <>
                        Show less <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        Show all ({parsedTechStack.length}) <ChevronDown size={14} />
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Links */}
            {(demoUrl || githubUrl) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
                className="flex gap-3 pt-1"
              >
                {demoUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground hover:text-foreground/80 border border-border rounded-lg hover:border-border/80 transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </motion.a>
                )}
                {githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground hover:text-foreground/80 border border-border rounded-lg hover:border-border/80 transition-all duration-200"
                  >
                    <Github size={14} />
                    Source Code
                  </motion.a>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.article>

      <ImageViewer
        images={imageArray}
        alt={title}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
      />
    </>
  );
}