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

export function AchievementCard({ achievement }: AchievementCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Simplified magnetic effect - only for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 25 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Reduced rotation effect
  const rotateX = useTransform(springY, [-20, 20], [1, -1]);
  const rotateY = useTransform(springX, [-20, 20], [-1, 1]);

  // Simplified color system
  const getThemeColors = () => ({
    light: "#C1A36E",
    dark: "#D4B886",
    accent: "#F5E6D3",
    darkAccent: "#2A2520",
  });

  // Get category icon
  const getCategoryIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      award: <Award className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />,
      trophy: <Trophy className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />,
      achievement: <Star className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />,
      milestone: <Zap className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />,
    };
    return iconMap[achievement.category.toLowerCase()] || <Award className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />;
  };

  // Simplified mouse handling - only on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Skip on mobile

    if (!cardRef.current || !buttonRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    const isInside =
      e.clientX >= cardRect.left &&
      e.clientX <= cardRect.right &&
      e.clientY >= cardRect.top &&
      e.clientY <= cardRect.bottom;

    if (isInside) {
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 80;
      const strength = Math.max(0, 1 - distance / maxDistance);

      mouseX.set(deltaX * strength * 0.1);
      mouseY.set(deltaY * strength * 0.1);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Simplified card */}
        <motion.div
          className={cn(
            "relative w-full overflow-hidden rounded-xl sm:rounded-2xl",
            "bg-white/90 dark:bg-slate-900/90",
            "border border-slate-200/50 dark:border-slate-800/50",
            "shadow-md shadow-slate-200/20 dark:shadow-slate-900/20",
          )}
          style={{
            rotateX: window.innerWidth >= 768 ? rotateX : 0,
            rotateY: window.innerWidth >= 768 ? rotateY : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] opacity-30" style={{ backgroundColor: colors.light }} />

          {/* Corner accent */}
          <div className="absolute top-2 sm:top-4 left-3 sm:left-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: colors.light }} />
          </div>

          {/* Category indicator */}
          <div className="absolute top-2 sm:top-5 right-3 sm:right-6">
            <div
              className={cn(
                spaceGrotesk.className,
                "flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-medium tracking-normal uppercase",
                "px-2 py-1 sm:px-3 sm:py-1.5 rounded-full",
                "bg-slate-100/80 dark:bg-slate-800/80",
                "border border-slate-200/50 dark:border-slate-700/50",
              )}
              style={{
                backgroundColor: `${colors.light}15`,
                borderColor: `${colors.light}30`,
                color: colors.light,
              }}
            >
              {getCategoryIcon()}
              <span className="hidden sm:inline">{achievement.category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-3 sm:p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="space-y-1.5 sm:space-y-3 pt-1 sm:pt-2">
              <div
                className={cn(spaceGrotesk.className, "text-[10px] sm:text-xs font-medium tracking-wide")}
                style={{ color: colors.light }}
              >
                {formatDate(achievement.date)}
              </div>
              <h3
                className={cn(
                  spaceGrotesk.className,
                  "text-sm sm:text-lg font-medium leading-tight tracking-tight",
                  "text-slate-900 dark:text-slate-100",
                )}
              >
                {achievement.title}
              </h3>
              <div
                className={cn(
                  spaceGrotesk.className,
                  "text-[8px] sm:text-[10px] font-medium uppercase tracking-widest",
                  "text-slate-500 dark:text-slate-400",
                )}
              >
                {achievement.type}
              </div>
            </div>

            {/* Detail button */}
            <div className="flex justify-end items-end mt-2 sm:mt-4">
              <motion.button
                ref={buttonRef}
                onClick={() => setIsDialogOpen(true)}
                className={cn(
                  spaceGrotesk.className,
                  "flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium",
                  "px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl",
                  "bg-white/80 dark:bg-slate-800/80",
                  "border border-slate-200/50 dark:border-slate-700/50",
                  "transition-colors duration-200",
                )}
                style={{
                  x: window.innerWidth >= 768 ? springX : 0,
                  y: window.innerWidth >= 768 ? springY : 0,
                  color: colors.light,
                  borderColor: `${colors.light}30`,
                  backgroundColor: `${colors.light}08`,
                }}
              >
                <span className="tracking-wide">Detail</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Optimized Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            {/* Simplified backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDialogOpen(false)}
            />

            {/* Optimized dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8">
              <motion.div
                className={cn(
                  "relative w-full max-w-sm sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh]",
                  "bg-white/95 dark:bg-slate-900/95",
                  "border border-slate-200/50 dark:border-slate-800/50",
                  "rounded-2xl sm:rounded-3xl overflow-hidden",
                  "shadow-xl shadow-slate-900/20",
                )}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className={cn(
                    "absolute top-3 right-3 sm:top-6 sm:right-6 z-10 flex items-center justify-center",
                    "w-8 h-8 sm:w-12 sm:h-12 rounded-full",
                    "bg-slate-100/80 dark:bg-slate-800/80",
                    "border border-slate-200/50 dark:border-slate-700/50",
                    "text-slate-600 dark:text-slate-400",
                    "hover:bg-slate-200/80 dark:hover:bg-slate-700/80",
                    "transition-colors duration-200",
                  )}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                </button>

                {/* Header accent */}
                <div className="h-0.5 sm:h-1" style={{ backgroundColor: colors.light }} />

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(95vh-2rem)] sm:max-h-[calc(90vh-4rem)]">
                  <div className="p-4 sm:p-12">
                    {/* Header */}
                    <div className="mb-6 sm:mb-12">
                      <div
                        className={cn(
                          spaceGrotesk.className,
                          "flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium mb-3 sm:mb-6",
                        )}
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} style={{ color: colors.light }} />
                        <span className="tracking-wide" style={{ color: colors.light }}>
                          {formatFullDate(achievement.date)}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-slate-500 dark:text-slate-400">{achievement.type}</span>
                      </div>
                      <h2
                        className={cn(
                          spaceGrotesk.className,
                          "text-xl sm:text-4xl font-medium leading-tight tracking-tight mb-2 sm:mb-4",
                          "text-slate-900 dark:text-slate-100",
                        )}
                      >
                        {achievement.title}
                      </h2>
                      <div
                        className={cn(
                          spaceGrotesk.className,
                          "text-xs sm:text-sm font-medium uppercase tracking-widest",
                        )}
                        style={{ color: colors.light }}
                      >
                        {achievement.category}
                      </div>
                    </div>

                    {/* Image */}
                    {achievement.imageUrl && (
                      <div className="mb-6 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden relative">
                        <div className="relative w-full h-48 sm:h-96 bg-slate-100 dark:bg-slate-800">
                          <Image
                            src={achievement.imageUrl || "/placeholder.svg"}
                            alt={achievement.title}
                            fill
                            className={cn(
                              "object-cover transition-opacity duration-300",
                              imageLoaded ? "opacity-100" : "opacity-0",
                            )}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          />
                          {/* Loading skeleton */}
                          {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                          )}
                          {/* Error fallback */}
                          {imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                              <div className="text-center">
                                <Award className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-slate-400" />
                                <p className="text-xs sm:text-sm text-slate-500">Image not available</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <p
                        className={cn(
                          spaceGrotesk.className,
                          "text-sm sm:text-lg leading-relaxed",
                          "text-slate-600 dark:text-slate-300",
                        )}
                      >
                        {achievement.description}
                      </p>
                    </div>
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
