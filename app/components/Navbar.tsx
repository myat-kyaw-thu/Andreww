"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Award, Clock, Home } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Archivo } from "next/font/google";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const archivo = Archivo({ subsets: ["latin"], display: "swap" });

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeSection, setActiveSection] = useState("top");
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle active section detection based on pathname and scroll
  useMotionValueEvent(scrollY, "change", () => {
    // If on projects page, don't update active section based on scroll
    if (pathname === "/projects") {
      setActiveSection("projects");
      return;
    }

    // On home page, detect sections by scroll position
    const sections = ["top", "achievements"];
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });
    if (currentSection) {
      setActiveSection(currentSection);
    }
  });

  // Update hover effect
  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = navRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      // This is already safe across browsers - no change needed
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    setMounted(true);

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll function with idempotency and loading state
  const scrollToSection = (sectionId: string, href?: string) => {
    // If href is provided and it's a route (starts with /)
    if (href && href.startsWith("/")) {
      // Only navigate if we're not already on that page
      const normalizedPathname = pathname === "" ? "/" : pathname;
      const normalizedHref = href;
      
      if (normalizedPathname !== normalizedHref) {
        startTransition(() => {
          router.push(href);
        });
      }
      // If already on the page, do nothing (idempotent)
      return;
    }

    // For home button (href === "#"), navigate to home only if not already there
    if (href === "#") {
      const normalizedPathname = pathname === "" ? "/" : pathname;
      if (normalizedPathname !== "/") {
        startTransition(() => {
          router.push("/");
        });
      } else {
        // If already on home, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("top");
      }
      return;
    }

    // For anchor links, only scroll if we're on the home page
    const normalizedPathname = pathname === "" ? "/" : pathname;
    if (normalizedPathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(sectionId);
      }
    }
  };

  if (!mounted) return null;

  const navItems = [
    { id: "top", label: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" />, href: "#achievements" },
    { id: "projects", label: "Projects", icon: <Award className="w-4 h-4" />, href: "/projects" },
  ];

  return (
    <>
      {/* Loading Overlay - Shows during navigation */}
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm pointer-events-none"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-6 px-4">
      <div className="max-w-xl mx-auto">
        <nav className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 pointer-events-auto overflow-hidden">
          {/* Scroll indicator border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-700 origin-left z-10"
            style={{ scaleX }}
          />

          <div className="h-16 px-6 flex items-center justify-between">
            {/* Left side - Navigation Links */}
            <div className="flex items-center gap-1 relative">
              {/* Hover background */}
              <motion.div
                className="absolute h-9 bg-slate-100 dark:bg-slate-800 rounded-lg transition-all duration-300 ease-out"
                animate={hoverStyle}
                initial={false}
              />

              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => {
                    navRefs.current[index] = el;
                  }}
                  onClick={() => scrollToSection(item.id, item.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium z-10",
                    "text-slate-700 dark:text-slate-300",
                    activeSection === item.id && "text-slate-900 dark:text-white",
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.icon}
                    <span className={`${archivo.className} hidden sm:inline`}>{item.label}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Right side - Clock and Theme Toggle */}
            <div className="flex items-center gap-4">
              {/* Clock */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium tabular-nums">{time}</span>
              </motion.div>

              {/* Theme Toggle */}
              <AnimatedThemeToggler
                className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 p-2 transition-colors"
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
    </>
  );
}

