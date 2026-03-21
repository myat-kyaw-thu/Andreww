"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

interface Achievement {
  id: number;
  title: string;
  type: string;
  date: Date;
  description: string;
  category: string;
  imageUrl?: string;
  link?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Motion values for cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for smooth following
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const formatDate = (date: Date) => {
    return date.getFullYear().toString();
  };

  // Handle mouse move for image following
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile || !achievement.imageUrl) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    // Constrain to card boundaries with padding
    const padding = 20;
    const constrainedX = Math.max(padding, Math.min(x, cardRect.width - padding));
    const constrainedY = Math.max(padding, Math.min(y, cardRect.height - padding));

    mouseX.set(constrainedX - cardRect.width / 2);
    mouseY.set(constrainedY - cardRect.height / 2);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Handle mobile tap
  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  // Handle click - navigate to link if available
  const handleClick = () => {
    if (achievement.link) {
      window.open(achievement.link, "_blank");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer select-none relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Card Container */}
      <div className="relative space-y-4">
        {/* Index Number */}
        <div className={cn(jetbrainsMono.className, "text-xs font-medium tracking-widest text-slate-400 dark:text-slate-600")}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content */}
        <div className="space-y-3 relative z-10">
          {/* Date and Type */}
          <div className="flex items-center justify-between">
            <div className={cn(jetbrainsMono.className, "text-sm font-medium tracking-wide")}>
              <span className="text-slate-900 dark:text-white">{formatDate(achievement.date)}</span>
              <span className="text-slate-400 dark:text-slate-600 mx-2">·</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">{achievement.type}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={cn(spaceGrotesk.className, "text-lg md:text-xl font-medium leading-snug text-slate-900 dark:text-white")}>
            {achievement.title}
          </h3>

          {/* Category */}
          <div className={cn(jetbrainsMono.className, "text-xs font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase")}>
            {achievement.category}
          </div>

          {/* Description - Dimmed on default, full on hover */}
          <p
            className={cn(
              spaceGrotesk.className,
              "text-sm leading-relaxed text-slate-600 dark:text-slate-400",
              "opacity-50 group-hover:opacity-100 transition-opacity duration-300",
            )}
          >
            {achievement.description}
          </p>
        </div>

        {/* Hairline Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-slate-200/40 via-slate-300/20 to-slate-200/40 dark:from-slate-800/40 dark:via-slate-700/20 dark:to-slate-800/40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Desktop Image Container - Follows cursor on hover */}
        {!isMobile && achievement.imageUrl && (
          <motion.div
            ref={imageContainerRef}
            className={cn(
              "absolute top-0 left-0 right-0 bottom-0 pointer-events-none",
              "flex items-center justify-center",
              "will-change-transform",
            )}
            style={{
              x: springX,
              y: springY,
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? "auto" : "none",
              zIndex: 50,
            }}
            transition={{
              opacity: { duration: 0.3 },
            }}
          >
            <motion.div
              className={cn(
                "relative rounded-xl overflow-hidden",
                "border border-slate-200/20 dark:border-slate-800/20",
                "shadow-lg shadow-slate-900/10 dark:shadow-slate-900/30",
                "backdrop-blur-sm",
                "bg-white dark:bg-slate-950",
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.9,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 bg-slate-100 dark:bg-slate-900">
                <Image
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  fill
                  className={cn(
                    "object-cover transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0",
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  sizes="(max-width: 640px) 192px, 256px"
                />

                {/* Loading skeleton */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                )}

                {/* Error fallback */}
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Image unavailable</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Mobile Image Display - Centered below card on tap */}
      {isMobile && achievement.imageUrl && isHovered && (
        <motion.div
          className="mt-6 rounded-xl overflow-hidden border border-slate-200/20 dark:border-slate-800/20 shadow-lg shadow-slate-900/10 dark:shadow-slate-900/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-900">
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
