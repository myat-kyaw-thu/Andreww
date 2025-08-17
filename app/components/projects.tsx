"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { ProjectCard } from './project-card';

import { Button } from '@/components/ui/button';
import { Archivo, Space_Grotesk } from "next/font/google";
import { useProjectStore } from "../store/project-store";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

const archivo = Archivo({ subsets: ["latin"], display: "swap" });

// interface ProjectCardProps {
//   project: {
//     project_id: string;
//     project_title: string;
//     project_subtitle: string;
//     project_cover_img: string;
//     project_tech_stacks: string[];
//     project_link?: string;
//     github_link?: string;
//     project_status: "Completed" | "In Progress";
//     personal: boolean;
//   };
// }


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProjectsSection() {
  const { projects, isLoading, error, fetchProjects } = useProjectStore();

  // State for managing visible projects count
  const [visibleWorkProjects, setVisibleWorkProjects] = useState(4);
  const [visiblePersonalProjects, setVisiblePersonalProjects] = useState(4);

  // Fetch projects on component mount if not already loaded
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects by personal/work
  const workProjects = projects.filter((project) => !project.personal);
  const personalProjects = projects.filter((project) => project.personal);

  // Load more functions
  const loadMoreWorkProjects = () => {
    setVisibleWorkProjects(prev => prev + 2);
  };

  const loadMorePersonalProjects = () => {
    setVisiblePersonalProjects(prev => prev + 2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.section variants={containerVariants} initial="hidden" animate="show" className="w-full mx-auto space-y-16">
      {/* Work Experiences Section */}
      {workProjects.length > 0 && (
        <div>
          <motion.div variants={titleVariants} className="flex flex-col gap-2 mb-8">
            <span className={`${archivo.className} text-sm font-medium text-gray-500 dark:text-gray-400`}>
              Professional Work
            </span>
            <h2 className={`${spaceGrotesk.className} text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400`}>
              Work Experiences
            </h2>
            <motion.div
              className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          <div className="space-y-12">
            {workProjects.slice(0, visibleWorkProjects).map((project) => (
              <ProjectCard
                key={project.project_id}
                title={project.project_title}
                description={project.project_subtitle}
                image={project.project_cover_img}
                techStack={project.project_tech_stacks}
                status={project.project_status}
                type="Work"
                demoUrl={project.project_link}
                githubUrl={project.github_link}
              />
            ))}
          </div>

          {/* Load More Button for Work Projects */}
          {visibleWorkProjects < workProjects.length && (
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={loadMoreWorkProjects}
                variant="outline"
                className="px-6 py-2 text-sm font-medium"
              >
                Load More Work Projects ({workProjects.length - visibleWorkProjects} remaining)
              </Button>
            </motion.div>
          )}
        </div>
      )}

      {/* Personal Projects Section */}
      {personalProjects.length > 0 && (
        <div>
          <motion.div variants={titleVariants} className="flex flex-col gap-2 mb-8">
            <span className={`${archivo.className} text-sm font-medium text-gray-500 dark:text-gray-400`}>
              Personal Projects
            </span>
            <h2 className={`${spaceGrotesk.className} text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400`}>
              Own Portfolio
            </h2>
            <motion.div
              className="h-px bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
          <div className="space-y-12">
            {personalProjects.slice(0, visiblePersonalProjects).map((project) => (
              <ProjectCard
                key={project.project_id}
                title={project.project_title}
                description={project.project_subtitle}
                image={project.project_cover_img}
                techStack={project.project_tech_stacks}
                status={project.project_status}
                type="Personal"
                demoUrl={project.project_link}
                githubUrl={project.github_link}
              />
            ))}
          </div>

          {/* Load More Button for Personal Projects */}
          {visiblePersonalProjects < personalProjects.length && (
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={loadMorePersonalProjects}
                variant="outline"
                className="px-6 py-2 text-sm font-medium"
              >
                Load More Personal Projects ({personalProjects.length - visiblePersonalProjects} remaining)
              </Button>
            </motion.div>
          )}
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div variants={titleVariants} className="text-center py-20 text-gray-500 dark:text-gray-400">
          No projects to display yet.
        </motion.div>
      )}
    </motion.section>
  );
}
