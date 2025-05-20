"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define the Project type to match your ProjectCard props
interface Project {
  project_id: string
  project_title: string
  project_subtitle: string
  project_cover_img: string
  project_tech_stacks: string[]
  project_link?: string
  github_link?: string
  project_status: "Completed" | "In Progress"
  personal: boolean
  [key: string]: unknown
}

interface ProjectState {
  projects: Project[]
  isLoading: boolean
  error: string | null
  hasLoaded: boolean
  fetchProjects: () => Promise<void>
  refreshProjects: () => Promise<void>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      isLoading: false,
      error: null,
      hasLoaded: false,

      fetchProjects: async () => {
        // If projects are already loaded, don't fetch again
        if (get().hasLoaded && get().projects.length > 0) {
          return
        }

        try {
          set({ isLoading: true })

          const response = await fetch(`${API_BASE_URL}/project-index`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch projects")
          }

          const data = await response.json()
          set({ projects: data, error: null, hasLoaded: true })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : "An unknown error occurred" })
          console.error("Error fetching projects:", err)
        } finally {
          set({ isLoading: false })
        }
      },

      // Force refresh projects even if already loaded
      refreshProjects: async () => {
        try {
          set({ isLoading: true })

          const response = await fetch(`${API_BASE_URL}/project-index`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store", // Bypass cache
          })

          if (!response.ok) {
            throw new Error("Failed to fetch projects")
          }

          const data = await response.json()
          set({ projects: data, error: null, hasLoaded: true })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : "An unknown error occurred" })
          console.error("Error refreshing projects:", err)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: "project-storage", // name of the item in localStorage
      partialize: (state) => ({ projects: state.projects, hasLoaded: state.hasLoaded }), // only persist these fields
    },
  ),
)
