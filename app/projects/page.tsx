"use client";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ProjectsGrid } from "@/app/components/projects-grid";
import projectsData from "@/project-index.json";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Archivo, Space_Grotesk } from "next/font/google";
import { useMemo, useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const archivo = Archivo({ subsets: ["latin"], display: "swap" });

type TabType = "work" | "personal";

type ProjectData = {
  id: string;
  project_id: string;
  project_title: string;
  project_subtitle: string;
  project_cover_img: string[];
  project_tech_stacks: string[];
  project_link?: string;
  github_link?: string | null;
  project_status: string;
  personal: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("work");

  // Separate projects by type
  const workProjects = useMemo(
    () => (projectsData as ProjectData[]).filter((project) => !project.personal),
    []
  );

  const personalProjects = useMemo(
    () => (projectsData as ProjectData[]).filter((project) => project.personal),
    []
  );

  const displayedProjects = activeTab === "work" ? workProjects : personalProjects;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tabVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={tabVariants} className="space-y-4">
            <h1
              className={`${spaceGrotesk.className} text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white`}
            >
              Projects & Work
            </h1>
            <p
              className={`${archivo.className} text-lg text-slate-600 dark:text-slate-400 max-w-2xl`}
            >
              Explore my professional work experiences and personal projects. Each project represents a unique challenge and learning opportunity.
            </p>
          </motion.div>
        </motion.section>

        {/* Tab Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabVariants}
          className="mb-12"
        >
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
            {[
              { id: "work", label: "Work Experiences", count: workProjects.length },
              { id: "personal", label: "Personal Projects", count: personalProjects.length },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className="relative px-4 py-3 text-sm font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span
                  className={`${
                    activeTab === tab.id
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-xs font-semibold opacity-60">
                    ({tab.count})
                  </span>
                </span>

                {/* Animated underline */}
                <AnimatePresence>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {displayedProjects.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <ProjectsGrid projects={displayedProjects as any} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p
                  className={`${archivo.className} text-slate-600 dark:text-slate-400`}
                >
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
