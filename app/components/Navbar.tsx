
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Award, Clock, Home, Zap } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<string>("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState({ x: 0, y: 0 });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastScrollYRef = useRef(0);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navItems = [
    { id: "top", label: "Home", icon: <Home className="w-4 h-4" />, href: "#" },
    { id: "achievements", label: "Achievements", icon: <Award className="w-4 h-4" />, href: "#achievements" },
    { id: "projects", label: "Projects", icon: <Zap className="w-4 h-4" />, href: "/projects" },
  ];

  // Handle scroll direction and visibility
  useMotionValueEvent(scrollY, "change", (latest) => {
    const current = latest as number;
    const delta = current - lastScrollYRef.current;

    // Determine scroll direction
    if (delta > 0) {
      setIsNavVisible(false);
    } else if (delta < 0) {
      setIsNavVisible(true);
    }

    // Set scrolled state for lift effect
    setIsScrolled(current > 50);

    lastScrollYRef.current = current;
  });

  // Handle active section detection based on pathname and scroll
  useMotionValueEvent(scrollY, "change", () => {
    // If on projects page, don't update active section based on scroll
    if (pathname === "/projects") {
      return;
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
      }
    }
  };

  // Magnetic hover effect for logo
  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setLogoHover({ x, y });
  };

  const handleLogoMouseLeave = () => {
    setLogoHover({ x: 0, y: 0 });
  };

  // Update clock
  useEffect(() => {
    const updateTime = () => {
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

  if (!mounted) return null;

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

      {/* Navbar - Floating Pill Layout with Scroll Direction Listener */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-6 px-4 safe-area-inset-bottom"
        animate={{
          y: isNavVisible ? 0 : 120,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.nav
            className={cn(
              "relative pointer-events-auto overflow-hidden",
              "bg-white/40 dark:bg-slate-950/40",
              "backdrop-blur-2xl",
              "border border-white/20 dark:border-slate-800/30",
              "rounded-3xl",
              "transition-all duration-500 ease-out",
            )}
            animate={{
              boxShadow: isScrolled
                ? "0 20px 60px -20px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)"
                : "0 8px 24px -12px rgba(0, 0, 0, 0.08)",
              paddingTop: isScrolled ? "12px" : "16px",
              paddingBottom: isScrolled ? "12px" : "16px",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Gradient border accent */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-slate-600/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isScrolled ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />

            {/* Scroll progress indicator */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-400/60 to-slate-300/60 dark:from-slate-500/60 dark:to-slate-600/60 origin-left"
              style={{ scaleX }}
            />

            <div className="px-6 flex items-center justify-between">
              {/* Left side - Logo with Magnetic Hover */}
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                onMouseMove={handleLogoMouseMove}
                onMouseLeave={handleLogoMouseLeave}
                onClick={() => scrollToSection("top", "#")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
                  animate={{
                    x: logoHover.x,
                    y: logoHover.y,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Image
                    src="/profile2.png"
                    alt="Kiro Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>

              </motion.div>

              {/* Center - Navigation Links */}
              <div className="flex items-center gap-1 relative">
                {/* Hover background */}
                <motion.div
                  className="absolute h-8 bg-white/20 dark:bg-slate-700/30 rounded-lg backdrop-blur-sm transition-all duration-300 ease-out"
                  animate={hoverStyle}
                  initial={false}
                />

                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    ref={(el) => {
                      navRefs.current[index] = el;
                    }}
                    onClick={() => scrollToSection(item.id, item.href)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-xs font-medium z-10",
                      "transition-colors duration-300",
                      "text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300",
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <span className="relative z-10 flex items-center gap-2 tracking-wide">
                      {item.icon}
                      <span className={cn("hidden sm:inline", jetbrainsMono.className)}>
                        {item.label}
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Right side - Clock and Theme Toggle */}
              <div className="flex items-center gap-3">
                {/* Clock */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    "text-slate-600 dark:text-slate-400",
                    "bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm",
                    "px-3 py-1.5 rounded-full",
                    "border border-white/10 dark:border-slate-700/20",
                    jetbrainsMono.className,
                  )}
                >
                  <Clock className="w-3 h-3" />
                  <span className="font-medium tabular-nums tracking-wider">{time}</span>
                </motion.div>

                {/* Theme Toggle */}
                <AnimatedThemeToggler className="rounded-full hover:bg-white/10 dark:hover:bg-slate-800/30 p-2 transition-colors" />
              </div>
            </div>
          </motion.nav>
        </div>
      </motion.div>
    </>
  );
}

