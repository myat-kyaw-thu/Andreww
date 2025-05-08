"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Globe, Users } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Dynamically import the Mermaid component with no SSR to avoid hydration issues
const MermaidChart = dynamic(() => import("./mermaid-component"), { ssr: false })

// This would typically come from an API or database
async function getProjectById(id: string) {
  // Mock data for demonstration
  return {
    "project_id": "shwe-min-lab-admin",
    "project_title": "Shwe Min Lab Admin Dashboard",
    "project_subtitle": "Full-featured laboratory logistics and invoice management system",
    "project_images": [
      "/screens/dashboard-overview.png",
      "/screens/clinic-runner-management.png",
      "/screens/labtest-workflow.png",
      "/screens/invoice-config.png"
    ],
    "project_tech_stacks": [
      "Laravel", "PHP", "Typescript", "Vue.js", "TailwindCSS", "Shadcn UI", "Firebase", "MySQL"
    ],
    "project_link": "https://app.uat.shwemin.mssmyanmar.com/login",
    "project_status": "In Development",
    "personal": false,
    "project_description": "Shwe Min Lab Admin Dashboard is a comprehensive platform designed to manage clinics, runners, lab test workflows, invoice generation, pricing plans, and role-based permissions. The system aims to digitize and streamline the medical lab logistics process by enabling a scalable and modular admin experience.",

    "project_features": [
      {
        "feature_id": 1,
        "feature_name": "Clinic & Runner Management",
        "feature_description": "CRUD functionality for clinics and runners, with pricing plan assignment to specific clinics."
      },
      {
        "feature_id": 2,
        "feature_name": "Lab Workflow Management",
        "feature_description": "Manage lab test collection from clinics, assign to runners, confirm reception, and track delivery for invoicing."
      },
      {
        "feature_id": 3,
        "feature_name": "Invoice Header/Footer Generator",
        "feature_description": "Admin can customize PDF-ready invoice headers and footers for document consistency."
      },
      {
        "feature_id": 4,
        "feature_name": "Dynamic Pricing Plan Import/Export",
        "feature_description": "Supports Excel export of current pricing and bulk import of updated plans for system-wide changes."
      },
      {
        "feature_id": 5,
        "feature_name": "Tube Rules Configuration",
        "feature_description": "Assign specific tube types and required quantities per lab test for accurate logistics tracking."
      },
      {
        "feature_id": 6,
        "feature_name": "Advertisement Management",
        "feature_description": "Create and manage text sliders, fullscreen ads, and banner ads for system announcements or external promotions."
      },
      {
        "feature_id": 7,
        "feature_name": "Role-Based Access Control",
        "feature_description": "Create user roles, assign granular permissions, and control access to admin modules and data."
      }
    ],

    "technical_specifications": {
      "frontend": {
        "frameworks": "Vue.js",
        "libraries": "Shadcn UI, Vue Router, Firebase Auth, Pinia"
      },
      "backend": {
        "frameworks": "Laravel",
        "languages": "PHP, TypeScript",
        "libraries": "Laravel Sanctum",
        "authentication": "Firebase + Laravel Sanctum"
      },
      "database": {
        "type": "Relational",
        "system": "MySQL"
      },
      "styling": {
        "framework": "TailwindCSS",
        "component_library": "Shadcn UI"
      },
      "architecture": {
        "pattern": "Modular MVC + Component-driven frontend",
        "state_management": "Pinia (Frontend)"
      },
      "programming_languages": ["PHP", "TypeScript"],
      "testing_frameworks": ["Jest", "Cypress"],
      "mobile_api": {
        "developer": "Myat Kyaw Thu",
        "scope": "Full mobile integration for clinics and runners"
      }
    },

    "project_goals": [
      {
        "goal_id": 1,
        "goal_name": "Centralized Admin Control",
        "goal_description": "Provide a centralized interface to manage all clinical operations, test routing, and invoicing."
      },
      {
        "goal_id": 2,
        "goal_name": "Automated Lab Workflow",
        "goal_description": "Ensure accurate and timely test collection, delivery, and confirmation through a digital workflow."
      },
      {
        "goal_id": 3,
        "goal_name": "Scalable Role Management",
        "goal_description": "Implement role-based access control for multiple departments and admin tiers."
      },
      {
        "goal_id": 4,
        "goal_name": "Efficient Pricing Management",
        "goal_description": "Support rapid updates to lab pricing using import/export workflows integrated with Excel."
      }
    ],

    "project_flowchart": {
      "mermaid_code": `flowchart LR

%% Sidebar Menu
A[Sidebar Menu] --> B[User Settings]
A --> C[Clinic / Runner]
A --> D[Ads & Pricing Plan]
A --> E[Invoice Setup]
A --> F[Invoice List]
A --> G[Lab Management]
A --> H[Pickup Checking]
A --> I[Lab Test Rule]
A --> J[Admin Profile]
A --> K[Permissions]

%% Clinic / Runner
C --> C1[CRUD Clinics]
C --> C2[CRUD Runners]
C --> C3[Assign Pricing Plan]

%% Ads & Pricing
D --> D1[Create Text Slider Ad]
D --> D2[Create Fullscreen Ad]
D --> D3[Create Banner Ad]
D --> D4[Export Pricing to Excel]
D --> D5[Import Updated Pricing]

%% Invoice Header/Footer
E --> E1[Create Header/Footer for PDF]

%% Invoice List
F --> F1[View & Manage Invoices]

%% Lab Management Process
G --> G1[Receive Lab Tests]
G1 --> G2[Deliver to Runner]
G2 --> G3[Confirm Received]
G3 --> G4[Generate Invoice & Result]
G4 --> F1

%% Lab Test Rule
I --> I1[Assign Tubes to Tests]
I --> I2[Set Tube Quantity]

%% Admin Profile
J --> J1[Edit Profile]

%% Permissions
K --> K1[Create Roles]
K1 --> K2[Assign Permissions]
K2 --> K3[Set Access Levels]
`,
      "description": "Structured user and admin journey through modules like clinic management, lab operations, invoicing, and role control."
    },

    "team_members": [
      {
        "member_id": 1,
        "member_name": "Myat Kyaw Thu",
        "member_role": "Fullstack Developer (Web + Mobile API)"
      },
      {
        "member_id": 2,
        "member_name": "Zayar Min Htike",
        "member_role": "Project Manager / System Design"
      },
      {
        "member_id": 3,
        "member_name": "Kyaw Thiha Lynn",
        "member_role": "UI/UX Designer"
      }
    ]
  }
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  interface Project {
    project_id: string
    project_title: string
    project_subtitle: string
    project_images: string[]
    project_tech_stacks: string[]
    project_link: string
    project_status: string
    personal: boolean
    project_description: string
    project_features: {
      feature_id: number
      feature_name: string
      feature_description: string
    }[]
    technical_specifications: {
      frontend: {
        frameworks: string
        libraries: string
      }
      backend: {
        frameworks: string
        libraries: string
      }
      database: {
        type: string
        system: string
      }
      programming_languages: string[]
      testing_frameworks: string[]
    }
    project_goals: {
      goal_id: number
      goal_name: string
      goal_description: string
    }[]
    project_flowchart: {
      mermaid_code: string
      description: string
    }
    team_members: {
      member_id: number
      member_name: string
      member_role: string
    }[]
  }
  const [project, setProject] = useState<Project>()
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const thumbnailsWrapperRef = useRef<HTMLDivElement>(null)
  const visibleThumbnails = 3
  const thumbnailHeight = 150 + 16 // Height + gap

  useEffect(() => {
    async function loadProject() {
      try {
        const projectData = await getProjectById(params.id)

        // Preload images to prevent layout shifts
        if (projectData.project_images && projectData.project_images.length > 0) {
          await Promise.all(
            projectData.project_images.map((src: string) => {
              return new Promise((resolve) => {
                const img = document.createElement("img")
                img.src = src
                img.onload = resolve
                img.onerror = resolve // Continue even if image fails to load
              })
            }),
          )
        }

        setProject(projectData)
      } catch (error) {
        console.error("Failed to load project:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [params.id])

  useEffect(() => {
    // Update thumbnail scroll position when current image changes
    if (thumbnailsWrapperRef.current && project?.project_images) {
      const maxVisibleIndex = Math.min(
        project.project_images.length - visibleThumbnails,
        Math.max(0, currentImageIndex - 1),
      )
      thumbnailsWrapperRef.current.style.transform = `translateY(-${maxVisibleIndex * thumbnailHeight}px)`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, project?.project_images])

  const nextImage = () => {
    if (project?.project_images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.project_images.length)
    }
  }

  const prevImage = () => {
    if (project?.project_images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.project_images.length) % project.project_images.length)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.project_images])

  if (loading) {
    return <div className="container mx-auto px-4 py-12 max-w-6xl">Loading...</div>
  }

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-auto animate-in fade-in duration-700">
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          className="group relative overflow-hidden rounded-full pl-8 transition-all duration-300 ease-out hover:pl-10 hover:pr-6"
        >
          <Link href="/">
            <span className="relative z-10 flex items-center text-sm font-medium">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
              Back
            </span>
            <span className="absolute inset-0 z-0 bg-gray-100 dark:bg-gray-800 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Project overview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs font-medium">
                {project.project_status}
              </Badge>
              {project.personal && (
                <Badge variant="secondary" className="text-xs font-medium">
                  Personal Project
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 transition-all">
              {project.project_title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 transition-all">{project.project_subtitle}</p>
          </div>

          {/* Image Gallery - Based on the PHP Blade implementation */}
          <div className="flex flex-col md:flex-row w-full gap-4">
            {/* Main Image Container */}
            <div className="w-full md:w-4/5 relative">
              <div className="relative overflow-hidden rounded-xl">
                <div className="w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-xl relative">
                  {project.project_images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover rounded-xl"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <button
                    onClick={prevImage}
                    className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="px-4 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-black dark:text-white font-medium">
                    <span>{currentImageIndex + 1}</span> / <span>{project.project_images.length}</span>
                  </div>

                  <button
                    onClick={nextImage}
                    className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Container */}
            <div className="w-full md:w-2/5">
              <div className="relative h-[450px]">
                <div className="h-full overflow-hidden">
                  <div
                    ref={thumbnailsWrapperRef}
                    className="flex flex-col gap-4 transition-transform duration-300 ease-in-out"
                  >
                    {project.project_images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className={`h-[150px] transition-all duration-300 overflow-hidden rounded-md ${
                          index === currentImageIndex
                            ? "shadow-[inset_0_0_0_2px] shadow-primary"
                            : "hover:shadow-[inset_0_0_0_1px] hover:shadow-gray-300 dark:hover:shadow-gray-600"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thumbnail Navigation Indicators */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
                  {project.project_images.map((_: string, index: number) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                        index === currentImageIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none transition-colors">
            <h2 className="text-2xl font-semibold">Project Overview</h2>
            <p>{project.project_description}</p>
          </div>

          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="features" className="transition-all">
                Features
              </TabsTrigger>
              <TabsTrigger value="technical" className="transition-all">
                Technical
              </TabsTrigger>
              <TabsTrigger value="goals" className="transition-all">
                Goals
              </TabsTrigger>
              <TabsTrigger value="flowchart" className="transition-all">
                Flowchart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.project_features.map((feature) => (
                  <Card
                    key={feature.feature_id}
                    className="overflow-hidden group hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors">
                          <svg
                            className="h-5 w-5 text-gray-600 dark:text-gray-400"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-medium text-lg">{feature.feature_name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.feature_description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="technical" className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-4">Frontend</h3>
                    <dl className="space-y-3">
                      <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Frameworks:</dt>
                        <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                          {project.technical_specifications.frontend.frameworks}
                        </dd>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Libraries:</dt>
                        <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                          {project.technical_specifications.frontend.libraries}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                {project.technical_specifications.backend && (
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-4">Backend</h3>
                      <dl className="space-y-3">
                        <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                          <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Frameworks:</dt>
                          <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                            {project.technical_specifications.backend.frameworks}
                          </dd>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                          <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Libraries:</dt>
                          <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                            {project.technical_specifications.backend.libraries}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                )}

                {project.technical_specifications.database && (
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-4">Database</h3>
                      <dl className="space-y-3">
                        <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                          <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</dt>
                          <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                            {project.technical_specifications.database.type}
                          </dd>
                        </div>
                        <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                          <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">System:</dt>
                          <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                            {project.technical_specifications.database.system}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                )}

                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-4">Languages & Testing</h3>
                    <dl className="space-y-3">
                      <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Languages:</dt>
                        <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                          {project.technical_specifications.programming_languages.join(", ")}
                        </dd>
                      </div>
                      <div className="grid grid-cols-[120px_1fr] items-baseline gap-2">
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Testing:</dt>
                        <dd className="text-sm truncate hover:text-clip hover:whitespace-normal">
                          {project.technical_specifications.testing_frameworks.join(", ")}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.project_goals.map((goal) => (
                  <Card key={goal.goal_id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{goal.goal_name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{goal.goal_description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="flowchart" className="animate-in fade-in duration-300">
              <Card className="overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium text-lg">Project Flow Diagram</h3>
                  <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                    <MermaidChart chart={project.project_flowchart.mermaid_code} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{project.project_flowchart.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Project details */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Project Details</h3>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{project.project_status}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400">Website</span>
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      <span>Visit Site</span>
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Team</h3>
                  <div className="space-y-4">
                    {project.team_members.map((member) => (
                      <div key={member.member_id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium">{member.member_name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{member.member_role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.project_tech_stacks.map((tech: string) => (
                    <div
                      key={tech}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mr-3"></div>
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
