"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, ExternalLink, Eye, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageViewer } from "./image-viewer";
import { FaReact, FaVuejs, FaNodeJs, FaLaravel, FaPython, FaPhp, FaDocker, FaAws, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiPrisma, SiVercel, SiFramer, SiSupabase, SiFirebase, SiRedis, SiStripe, SiZod, SiRadixui, SiReactquery, SiComposer } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiVuejsFill } from "react-icons/ri";

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

// Tech stack icons and colors mapping
type TechConfig = { 
  icon?: React.ElementType; 
  customIcon?: string; // Path to custom icon
  color: string;
};

const techStackConfig: Record<string, TechConfig> = {
  // Frontend Frameworks
  "React": { icon: FaReact, color: "#61DAFB" },
  "React.js": { icon: FaReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "NextJs": { icon: SiNextdotjs, color: "#000000" },
  "Vue.js": { icon: FaVuejs, color: "#4FC08D" },
  "VueJs": { icon: FaVuejs, color: "#4FC08D" },
  
  // Styling
  "TailwindCSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "Css": { icon: FaCss3Alt, color: "#1572B6" },
  "Html": { icon: FaHtml5, color: "#E34F26" },
  
  // Languages
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Typescript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "PHP": { icon: FaPhp, color: "#777BB4" },
  "Php": { icon: FaPhp, color: "#777BB4" },
  "Python": { icon: FaPython, color: "#3776AB" },
  
  // Backend
  "Node.js": { icon: FaNodeJs, color: "#339933" },
  "Express": { icon: SiExpress, color: "#000000" },
  "Express.js": { icon: SiExpress, color: "#000000" },
  "Laravel": { icon: FaLaravel, color: "#FF2D20" },
  
  // Databases
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "PostgreSQL": { icon: BiLogoPostgresql, color: "#4169E1" },
  "Prisma": { icon: SiPrisma, color: "#2D3748" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "Redis": { icon: SiRedis, color: "#DC382D" },
  "Neon": { icon: BiLogoPostgresql, color: "#00E599" },
  
  // Animation & UI
  "Framer-Motion": { icon: SiFramer, color: "#0055FF" },
  "GSAP": { icon: FaReact, color: "#88CE02" },
  "Radix UI": { icon: SiRadixui, color: "#161618" },
  "ShadcnUI": { icon: SiRadixui, color: "#000000" },
  "ShadcnUi": { icon: SiRadixui, color: "#000000" },
  
  // State Management
  "Zustand": { icon: TbBrandReactNative, color: "#443E38" },
  "Pinia": { icon: RiVuejsFill, color: "#FFD859" },
  
  // Tools & Services
  "Docker": { icon: FaDocker, color: "#2496ED" },
  "AWS": { icon: FaAws, color: "#FF9900" },
  "Vercel": { icon: SiVercel, color: "#000000" },
  "Stripe": { icon: SiStripe, color: "#008CDD" },
  "Composer": { icon: SiComposer, color: "#885630" },
  
  // Validation & Query
  "Zod": { icon: SiZod, color: "#3E67B1" },
  "ZOD": { icon: SiZod, color: "#3E67B1" },
  "TanStack Query": { icon: SiReactquery, color: "#FF4154" },
  
  // Others
  "Lucide-React": { icon: FaReact, color: "#61DAFB" },
  "JSON-RPC": { customIcon: "/icons/json-rpc-logo-3.png", color: "#F7DF1E" },
  "MCP Protocol": { customIcon: "/icons/mcp.png.avif", color: "#339933" },
  "Blade": { customIcon: "/icons/blade_laravel.png", color: "#FF2D20" },
  "Filament": { customIcon: "/icons/filament.png", color: "#FDAE4B" },
  "LiveWire": { customIcon: "/icons/livewire.svg", color: "#FB70A9" },
  "Alphine.js": { customIcon: "/icons/aphinejs.png", color: "#8BC0D0" },
  "Bun": { customIcon: "/icons/bunjd.png", color: "#FBF0DF" },
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
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {visibleTechStack.map((tech, index) => {
                      const config = techStackConfig[tech];
                      const Icon = config?.icon;
                      const customIcon = config?.customIcon;
                      const iconColor = config?.color || "#6B7280";
                      
                      return (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.15, y: -2 }}
                          transition={{
                            delay: 0.7 + index * 0.05,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          className="p-1.5 rounded-lg border bg-muted/50 dark:bg-muted/30 border-border/50 cursor-default"
                          title={tech}
                        >
                          {customIcon ? (
                            <Image
                              src={customIcon}
                              alt={tech}
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain"
                            />
                          ) : Icon ? (
                            <Icon size={16} style={{ color: iconColor }} />
                          ) : null}
                        </motion.div>
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
                    <ExternalLink size={14} />
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