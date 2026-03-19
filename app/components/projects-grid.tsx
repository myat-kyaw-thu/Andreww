"use client";

import { motion, Variants } from "framer-motion";
import { Archivo } from "next/font/google";
import { ProjectCard } from "./project-card";

const archivo = Archivo({ subsets: ["latin"], display: "swap" });

interface Project {
  id: string;
  project_id: string;
  project_title: string;
  project_subtitle: string;
  project_cover_img: string[];
  project_tech_stacks: string[];
  project_link?: string;
  github_link?: string | null;
  project_status: "Completed" | "In Progress";
  personal: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="relative"
        >
          {/* Subtle separator line */}
          {index > 0 && (
            <div className="absolute -top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          )}

          <ProjectCard
            title={project.project_title}
            description={project.project_subtitle}
            image={project.project_cover_img}
            techStack={project.project_tech_stacks}
            status={project.project_status}
            type={project.personal ? "Personal" : "Work"}
            demoUrl={project.project_link || undefined}
            githubUrl={project.github_link || undefined}
          />
        </motion.div>
      ))}

      {/* Empty state message */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-20"
        >
          <p
            className={`${archivo.className} text-slate-600 dark:text-slate-400 text-lg`}
          >
            No projects to display at the moment.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
