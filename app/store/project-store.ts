"use client";

import { create } from "zustand";
import projectData from "@/project-index.json";

interface Project {
  project_id: string;
  project_title: string;
  project_subtitle: string;
  project_cover_img: string[];
  project_tech_stacks: string[];
  project_link?: string;
  github_link?: string;
  project_status: "Completed" | "In Progress";
  personal: boolean;
  [key: string]: unknown;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

// Simulate API delay for realistic UX (3-6 seconds)
const simulateLoading = () => {
  const delay = Math.floor(Math.random() * 3000) + 3000; // 3000-6000ms
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const useProjectStore = create<ProjectState>()((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    // Only load once
    if (get().projects.length > 0) {
      return;
    }

    try {
      set({ isLoading: true });

      // Simulate API loading time for better UX
      await simulateLoading();

      // Load from local JSON
      set({ projects: projectData as Project[], error: null });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "An unknown error occurred" });
      console.error("Error loading projects:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));