"use client"

import { motion } from "framer-motion"
import ProjectCard from "./project-card"

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
  },
  {
    project_id: "kbz-mini-app",
    project_title: "KBZPay Mini Application",
    project_subtitle: "Secure payment processing application integrated with KBZPay ecosystem",
    project_cover_img: "/placeholder.svg?height=140&width=120",
    project_tech_stacks: ["React", "Node.js", "TypeScript", "MongoDB", "Express", "Next.js"],
    project_link: "https://kbz-mini-app.com",
    project_status: "In Progress" as const,
  },
]

export default function ProjectsSection() {
  return (
    <section className="w-full mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
      >
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {projects.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>
    </section>
  )
}

