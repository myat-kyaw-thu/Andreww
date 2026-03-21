"use client";

import { motion, Variants } from "framer-motion";

export default function ProjectsLoading() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Navbar placeholder */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-lg h-16" />
        </div>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
        {/* Header Section Skeleton */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Title skeleton */}
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg w-64 animate-pulse" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-full animate-pulse" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 animate-pulse" />
            </div>
          </motion.div>
        </motion.section>

        {/* Tab Navigation Skeleton */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="mb-12"
        >
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            {/* Work Experiences tab */}
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-40 animate-pulse" />

            {/* Personal Projects tab */}
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-40 animate-pulse" />
          </div>
        </motion.div>

        {/* Projects Grid Skeleton */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative"
            >
              {/* Separator line */}
              {i > 1 && (
                <div className="absolute -top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
              )}

              {/* Project Card Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />

                  {/* Badge placeholders */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="h-6 w-16 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                  {/* Title skeleton */}
                  <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 animate-pulse" />

                  {/* Description skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-full animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-full animate-pulse" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-5/6 animate-pulse" />
                  </div>

                  {/* Tech Stack skeleton */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div
                        key={j}
                        className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>

                  {/* Links skeleton */}
                  <div className="flex gap-3 pt-2">
                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                    <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
