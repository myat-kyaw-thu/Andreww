"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTransition, useState, useEffect } from "react";
import type React from "react";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"], display: "swap" });

interface PageLoaderProps {
  children: React.ReactNode;
}

/**
 * PageLoader - Handles both initial page load and client-side transitions
 * 
 * Shows loading state for:
 * - Initial page mount (first load)
 * - Server Actions
 * - Navigation transitions
 * - Data mutations
 */
export function PageLoader({ children }: PageLoaderProps) {
  const [isPending] = useTransition();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Hide initial loader after content is ready
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const showLoader = isPending || isInitialLoad;

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-950"
          >
            <div className="flex flex-col items-center gap-8">
              {/* Minimal dot loader */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Simple text */}
              <motion.p
                className={`${archivo.className} text-sm text-slate-600 dark:text-slate-400 tracking-wide`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isInitialLoad ? "Loading" : "Processing"}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInitialLoad ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}