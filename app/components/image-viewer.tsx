'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageViewerProps {
  images: string[]; // Array of image URLs
  initialIndex?: number; // Starting image index
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

// Backwards compatibility: single image support
interface SingleImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer(props: ImageViewerProps | SingleImageViewerProps) {
  const { alt, isOpen, onClose } = props;

  // Handle backwards compatibility
  const imageArray = 'images' in props ? props.images : [props.src];
  const startIndex = 'initialIndex' in props ? props.initialIndex ?? 0 : 0;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentSrc = imageArray[currentIndex];
  const hasMultipleImages = imageArray.length > 1;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  const handleNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev: number) => (prev + 1) % imageArray.length);
  }, [imageArray.length]);

  const handlePrevious = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev: number) => (prev - 1 + imageArray.length) % imageArray.length);
  }, [imageArray.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        handleNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      setIsZoomed(false);
      setImageLoaded(false);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, hasMultipleImages, handleNext, handlePrevious]);

  const handleDownload = async () => {
    try {
      const response = await fetch(currentSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${alt}-${currentIndex + 1}` || 'image';
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
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm md:text-lg font-medium text-foreground truncate max-w-[150px] md:max-w-md">
                  {alt}
                </h3>
                {hasMultipleImages && (
                  <span className="text-xs md:text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {currentIndex + 1} / {imageArray.length}
                  </span>
                )}
              </motion.div>

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

          {/* Navigation buttons */}
          {hasMultipleImages && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[99999] p-2 md:p-3 rounded-full bg-background/80 dark:bg-background/90 border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 backdrop-blur-sm shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[99999] p-2 md:p-3 rounded-full bg-background/80 dark:bg-background/90 border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 backdrop-blur-sm shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </motion.button>
            </>
          )}

          {/* Image container */}
          <motion.div
            key={currentIndex}
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
                src={currentSrc || "/placeholder.svg"}
                alt={`${alt} - ${currentIndex + 1}`}
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
                  <span className="hidden md:inline">
                    <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">ESC</kbd> to close
                    {hasMultipleImages && (
                      <>
                        {' • '}
                        <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">←</kbd>
                        {' '}
                        <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">→</kbd>
                        {' '}to navigate
                      </>
                    )}
                    {' • '}
                  </span>
                  <span className="md:hidden">Tap to close • </span>
                  Click to {isZoomed ? 'zoom out' : 'zoom in'}
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
