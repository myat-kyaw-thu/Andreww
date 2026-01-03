'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useMobile } from '../hook/use-mobile';

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMobile();

  // Use motion values for instant updates without re-renders
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const checkIfClickable = useCallback((element: HTMLElement | null): boolean => {
    if (!element || element === document.body) return false;

    // Check current element
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');
    const computedCursor = window.getComputedStyle(element).cursor;

    if (
      tagName === 'a' ||
      tagName === 'button' ||
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      element.onclick !== null ||
      element.classList.contains('cursor-pointer') ||
      (role && ['button', 'link', 'tab', 'menuitem'].includes(role)) ||
      computedCursor === 'pointer' ||
      element.hasAttribute('data-clickable')
    ) {
      return true;
    }

    // Check parent elements recursively
    return checkIfClickable(element.parentElement);
  }, []);

  useEffect(() => {
    setMounted(true);

    const updateMousePosition = (e: MouseEvent) => {
      // Update motion values directly for instant response
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(checkIfClickable(target));
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Use passive listeners for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, checkIfClickable]);

  // Don't show cursor on mobile devices or before mounting
  if (!mounted || isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 30,
          mass: 0.2,
        }}
        style={{
          width: '35px',
          height: '35px',
        }}
      >
        <motion.img
          src={isPointer ? '/pointer.png' : '/cursor.png'}
          alt="cursor"
          className="w-full h-full object-contain select-none dark:invert"
          style={{ filter: 'grayscale(100%) contrast(1.2)' }}
          draggable={false}
          animate={{
            opacity: isClicking ? 0.8 : 1,
            scale: isPointer ? 1.15 : 1,
          }}
          transition={{
            opacity: {
              duration: 0.1,
              ease: 'easeOut',
            },
            scale: {
              type: 'spring',
              stiffness: 500,
              damping: 25,
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
