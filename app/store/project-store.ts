"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Project {
  project_id: string;
  project_title: string;
  project_subtitle: string;
  project_cover_img: string;
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
  hasLoaded: boolean;
  fetchProjects: () => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const STORAGE_KEY = "project-storage";
const TIMESTAMP_KEY = "project-storage-timestamp";
const EXPIRE_MS = 24 * 60 * 60 * 1000;

function isExpired() {
  const ts = localStorage.getItem(TIMESTAMP_KEY);
  if (!ts) return true;
  return Date.now() - Number(ts) > EXPIRE_MS;
}

function setTimestamp() {
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
}

function clearCache() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TIMESTAMP_KEY);
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      isLoading: false,
      error: null,
      hasLoaded: false,

      fetchProjects: async () => {
        // Check expiry before using cache
        if (typeof window !== "undefined") {
          if (isExpired()) {
            clearCache();
            set({ projects: [], hasLoaded: false });
          }
        }

        // If already loaded and not expired, do nothing
        if (get().hasLoaded && get().projects.length > 0) {
          return;
        }

        try {
          set({ isLoading: true });

          const response = await fetch(`${API_BASE_URL}/project-index`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }

          const data = await response.json();
          set({ projects: data, error: null, hasLoaded: true });
          if (typeof window !== "undefined") setTimestamp();
        } catch (err) {
          set({ error: err instanceof Error ? err.message : "An unknown error occurred" });
          console.error("Error fetching projects:", err);
        } finally {
          set({ isLoading: false });
        }
      },

      refreshProjects: async () => {
        try {
          set({ isLoading: true });

          const response = await fetch(`${API_BASE_URL}/project-index`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }

          const data = await response.json();
          set({ projects: data, error: null, hasLoaded: true });
          if (typeof window !== "undefined") setTimestamp();
        } catch (err) {
          set({ error: err instanceof Error ? err.message : "An unknown error occurred" });
          console.error("Error refreshing projects:", err);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ projects: state.projects, hasLoaded: state.hasLoaded }),
      // Clean up expired cache before hydration
      onRehydrateStorage: () => (state) => {
        if (typeof window !== "undefined" && isExpired()) {
          clearCache();
          if (state) {
            state.projects = [];
            state.hasLoaded = false;
          }
        }
      },
    },
  ),
);