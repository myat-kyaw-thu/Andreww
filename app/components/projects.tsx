"use client"

import { motion } from "framer-motion"
import ProjectCard from "./project-card"


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}
const projects = [
  {
    project_id: "cms-platform",
    project_title: "Dynamic CMS Platform",
    project_subtitle: "A flexible content management system with custom post types and role-based access control",
    project_cover_img: "/placeholder.svg?height=140&width=120",
    project_tech_stacks: ["PHP", "Laravel", "MySQL", "JavaScript", "React", "Docker", "Redis"],
    project_link: "https://example-cms.com",
    github_link: "https://github.com/username/cms-platform",
    project_status: "Completed" as const,
    personal: false,
  },
  {
    project_id: "kbz-mini-app",
    project_title: "KBZPay Mini Application",
    project_subtitle: "Secure payment processing application integrated with KBZPay ecosystem",
    project_cover_img: "/placeholder.svg?height=140&width=120",
    project_tech_stacks: ["React", "Node.js", "TypeScript", "MongoDB", "Express", "Next.js"],
    project_link: "https://kbz-mini-app.com",
    project_status: "In Progress" as const,
    personal: true,

  },
]

export default function ProjectsSection() {
  const workProjects = projects.filter((project) => !project.personal)
  const personalProjects = projects.filter((project) => project.personal)
  return (
       <motion.section variants={containerVariants} initial="hidden" animate="show" className="w-full mx-auto space-y-16">
      {/* Work Experiences Section */}
      <div>
        <motion.div variants={titleVariants} className="flex flex-col gap-2 mb-8">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Professional Work</span>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Work Experiences
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {workProjects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
        </div>
      </div>

      {/* Personal Projects Section */}
      <div>
        <motion.div variants={titleVariants} className="flex flex-col gap-2 mb-8">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Personal Projects</span>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Own Portfolio
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {personalProjects.map((project) => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div variants={titleVariants} className="text-center py-20 text-gray-500 dark:text-gray-400">
          No projects to display yet.
        </motion.div>
      )}
    </motion.section>
  )
}

