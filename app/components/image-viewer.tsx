'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({ src, alt, isOpen, onClose }: ImageViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      setIsZoomed(false);
      setImageLoaded(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = alt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/95 dark:bg-background/98 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Loading indicator */}
          {!imageLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </motion.div>
          )}

          {/* Header with controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="absolute top-0 left-0 right-0 z-[99999] p-2 md:p-4 bg-gradient-to-b from-background/80 to-transparent dark:from-background/90"
          >
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <motion.h3
                className="text-sm md:text-lg font-medium text-foreground truncate max-w-[150px] md:max-w-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {alt}
              </motion.h3>

              <div className="flex items-center gap-1 md:gap-2">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.15 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="p-1.5 md:p-2 rounded-lg bg-background/80 dark:bg-background/90 border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 backdrop-blur-sm"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? <ZoomOut size={16} className="md:w-5 md:h-5" /> : <ZoomIn size={16} className="md:w-5 md:h-5" />}
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="p-1.5 md:p-2 rounded-lg bg-background/80 dark:bg-background/90 border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 backdrop-blur-sm"
                  aria-label="Download image"
                >
                  <Download size={16} className="md:w-5 md:h-5" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.25 }}
                  onClick={onClose}
                  className="p-1.5 md:p-2 rounded-lg bg-background/80 dark:bg-background/90 border border-border hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 backdrop-blur-sm"
                  aria-label="Close image viewer"
                >
                  <X size={16} className="md:w-5 md:h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? (isZoomed ? 1.5 : 1) : 0.9,
              y: imageLoaded ? 0 : 20
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 25,
              scale: { duration: 0.3 }
            }}
            className={`relative max-w-[95vw] md:max-w-[85vw] max-h-[70vh] md:max-h-[85vh] w-auto h-auto cursor-pointer ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={1200}
                height={800}
                className="w-auto h-auto max-w-full max-h-full object-contain"
                priority
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />

              {/* Subtle overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-background/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 z-[99999]"
          >
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-4 py-1 md:py-2 rounded-lg bg-background/80 dark:bg-background/90 border border-border backdrop-blur-sm">
                <p className="text-xs md:text-sm text-muted-foreground text-center">
                  <span className="hidden md:inline">Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">ESC</kbd> to close • </span>
                  <span className="md:hidden">Tap to close • </span>
                  Click image to {isZoomed ? 'zoom out' : 'zoom in'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
