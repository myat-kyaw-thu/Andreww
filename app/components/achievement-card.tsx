"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Award, Calendar, Star, Trophy, X, Zap } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import type React from "react";
import { useRef, useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

interface Achievement {
  id: number;
  title: string;
  type: string;
  date: Date;
  description: string;
  category: string;
  imageUrl?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Enhanced magnetic effect for detail button
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Subtle 3D rotation effect
  const rotateX = useTransform(springY, [-30, 30], [3, -3]);
  const rotateY = useTransform(springX, [-30, 30], [-3, 3]);

  // Enhanced color system with better dark mode support
  const getThemeColors = () => {
    const colorSets = [
      {
        light: "#C1A36E",
        dark: "#D4B886",
        accent: "#F5E6D3",
        darkAccent: "#2A2520",
      },
      {
        light: "#A67C52",
        dark: "#C19A6B",
        accent: "#E8D5C4",
        darkAccent: "#252018",
      },
      {
        light: "#8B7355",
        dark: "#A68B6F",
        accent: "#DDD4C7",
        darkAccent: "#201E1A",
      },
      {
        light: "#B5A490",
        dark: "#CDB9A5",
        accent: "#F0EBE4",
        darkAccent: "#2B2722",
      },
      {
        light: "#9B8B7A",
        dark: "#B5A394",
        accent: "#E6DDD4",
        darkAccent: "#24211E",
      },
      {
        light: "#8E7B6B",
        dark: "#A8947F",
        accent: "#DDD2C7",
        darkAccent: "#211E1B",
      },
    ];
    return colorSets[index % colorSets.length];
  };

  // Get category icon
  const getCategoryIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      award: <Award className="w-4 h-4" strokeWidth={1.5} />,
      trophy: <Trophy className="w-4 h-4" strokeWidth={1.5} />,
      achievement: <Star className="w-4 h-4" strokeWidth={1.5} />,
      milestone: <Zap className="w-4 h-4" strokeWidth={1.5} />,
    };
    return iconMap[achievement.category.toLowerCase()] || <Award className="w-4 h-4" strokeWidth={1.5} />;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !buttonRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    const isInside =
      e.clientX >= cardRect.left &&
      e.clientX <= cardRect.right &&
      e.clientY >= cardRect.top &&
      e.clientY <= cardRect.bottom;

    setIsHovered(isInside);

    if (isInside) {
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 120;
      const strength = Math.max(0, 1 - distance / maxDistance);

      mouseX.set(deltaX * strength * 0.2);
      mouseY.set(deltaY * strength * 0.2);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const formatDate = (date: Date) => {
    return date.getFullYear().toString();
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const colors = getThemeColors();

  return (
    <>
      {/* Achievement Card */}
      <motion.div
        ref={cardRef}
        className="relative group cursor-pointer select-none"
        style={{ aspectRatio: "5/3" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Enhanced card with glassmorphism effect */}
        <motion.div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
            "border border-slate-200/50 dark:border-slate-800/50",
            "shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20",
          )}
          style={{
            rotateX,
            rotateY,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 bg-gradient-to-br from-transparent via-transparent to-current"
            style={{ color: `${colors.light}10` }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Top accent line with gradient */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: isHovered ? 1 : 0.3,
              background: isHovered
                ? `linear-gradient(to right, transparent, ${colors.light}, transparent)`
                : `linear-gradient(to right, transparent, ${colors.light}40, transparent)`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Enhanced corner accent with pulsing effect */}
          <div className="absolute top-4 left-6">
            <motion.div
              className="relative"
              animate={{
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.light }}
                animate={{
                  boxShadow: isHovered
                    ? `0 0 20px ${colors.light}40, 0 0 40px ${colors.light}20`
                    : `0 0 0px ${colors.light}00`,
                }}
                transition={{ duration: 0.4 }}
              />
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-0"
                style={{ borderColor: colors.light }}
                animate={{
                  scale: isHovered ? [1, 1.5, 2] : 1,
                  opacity: isHovered ? [0.5, 0.2, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </div>

          {/* Enhanced category indicator */}
          <div className="absolute top-5 right-6">
            <motion.div
              className={cn(
                spaceGrotesk.className,
                "flex items-center gap-2 text-[10px] font-medium tracking-normal uppercase",
                "px-3 py-1.5 rounded-full backdrop-blur-sm",
                "bg-slate-100/80 dark:bg-slate-800/80",
                "border border-slate-200/50 dark:border-slate-700/50",
                "text-slate-600 dark:text-slate-400",
              )}
              animate={{
                backgroundColor: isHovered ? `${colors.light}15` : "rgb(241 245 249 / 0.8)", // slate-100/80 fallback
                borderColor: isHovered ? `${colors.light}30` : "rgb(226 232 240 / 0.5)",
                color: isHovered ? colors.light : undefined,
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  color: isHovered ? colors.light : undefined,
                }}
                transition={{ duration: 0.3 }}
              >
                {getCategoryIcon()}
              </motion.div>
              {achievement.category}
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="space-y-3 pt-2">
              <motion.div
                className={cn(spaceGrotesk.className, "text-xs font-medium tracking-wide")}
                animate={{
                  color: isHovered ? colors.light : undefined,
                }}
                transition={{ duration: 0.3 }}
              >
                {formatDate(achievement.date)}
              </motion.div>

              <h3
                className={cn(
                  spaceGrotesk.className,
                  "text-lg font-medium leading-tight tracking-tight",
                  "text-slate-900 dark:text-slate-100",
                )}
              >
                {achievement.title}
              </h3>

              <motion.div
                className={cn(
                  spaceGrotesk.className,
                  "text-[10px] font-medium uppercase tracking-widest",
                  "text-slate-500 dark:text-slate-400",
                )}
                animate={{
                  color: isHovered ? `${colors.light}80` : undefined,
                }}
                transition={{ duration: 0.3 }}
              >
                {achievement.type}
              </motion.div>
            </div>

            {/* Enhanced detail button */}
            <div className="flex justify-end items-end mt-4">
              <motion.button
                ref={buttonRef}
                onClick={() => setIsDialogOpen(true)}
                className={cn(
                  spaceGrotesk.className,
                  "flex items-center gap-2 text-xs font-medium",
                  "px-4 py-2 rounded-xl backdrop-blur-sm",
                  "bg-white/80 dark:bg-slate-800/80",
                  "border border-slate-200/50 dark:border-slate-700/50",
                  "text-slate-700 dark:text-slate-300",
                  "transition-all duration-300",
                )}
                style={{
                  x: springX,
                  y: springY,
                  rotateX,
                  rotateY,
                }}
                animate={{
                  color: isHovered ? colors.light : undefined,
                  borderColor: isHovered ? `${colors.light}30` : undefined,
                  backgroundColor: isHovered ? `${colors.light}08` : undefined,
                  boxShadow: isHovered
                    ? `0 8px 32px ${colors.light}20, 0 4px 16px ${colors.light}10`
                    : "0 4px 16px rgb(0 0 0 / 0.1)",
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tracking-wide">Detail</span>
                <motion.div animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Dialog Portal */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            {/* Enhanced backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsDialogOpen(false)}
            />

            {/* Enhanced dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
              <motion.div
                className={cn(
                  "relative w-full max-w-4xl max-h-[90vh]",
                  "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl",
                  "border border-slate-200/50 dark:border-slate-800/50",
                  "rounded-3xl overflow-hidden",
                  "shadow-2xl shadow-slate-900/20",
                )}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Enhanced close button */}
                <motion.button
                  onClick={() => setIsDialogOpen(false)}
                  className={cn(
                    "absolute top-6 right-6 z-10 flex items-center justify-center",
                    "w-12 h-12 rounded-full backdrop-blur-sm",
                    "bg-slate-100/80 dark:bg-slate-800/80",
                    "border border-slate-200/50 dark:border-slate-700/50",
                    "text-slate-600 dark:text-slate-400",
                    "hover:bg-slate-200/80 dark:hover:bg-slate-700/80",
                    "transition-all duration-200",
                  )}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>

                {/* Enhanced header accent */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-transparent via-current to-transparent"
                  style={{ color: colors.light }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
                  <div className="p-12">
                    {/* Enhanced header */}
                    <motion.div
                      className="mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <div className={cn(spaceGrotesk.className, "flex items-center gap-4 text-sm font-medium mb-6")}>
                        <Calendar className="w-4 h-4" strokeWidth={1.5} style={{ color: colors.light }} />
                        <span className="tracking-wide" style={{ color: colors.light }}>
                          {formatFullDate(achievement.date)}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-slate-500 dark:text-slate-400">{achievement.type}</span>
                      </div>

                      <h2
                        className={cn(
                          spaceGrotesk.className,
                          "text-4xl font-medium leading-tight tracking-tight mb-4",
                          "text-slate-900 dark:text-slate-100",
                        )}
                      >
                        {achievement.title}
                      </h2>

                      <div
                        className={cn(spaceGrotesk.className, "text-sm font-medium uppercase tracking-widest")}
                        style={{ color: colors.light }}
                      >
                        {achievement.category}
                      </div>
                    </motion.div>

                    {/* Enhanced image with Next.js Image */}
                    {achievement.imageUrl && (
                      <motion.div
                        className="mb-12 rounded-2xl overflow-hidden relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="relative w-full h-96 bg-slate-100 dark:bg-slate-800">
                          <Image
                            src={achievement.imageUrl || "/placeholder.svg"}
                            alt={achievement.title}
                            fill
                            className={cn(
                              "object-cover transition-all duration-700",
                              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
                            )}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            priority
                          />
                          {/* Loading skeleton */}
                          {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
                          )}
                          {/* Error fallback */}
                          {imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                              <div className="text-center">
                                <Award className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                                <p className="text-sm text-slate-500">Image not available</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Enhanced description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <p
                        className={cn(
                          spaceGrotesk.className,
                          "text-lg leading-relaxed",
                          "text-slate-600 dark:text-slate-300",
                        )}
                      >
                        {achievement.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
