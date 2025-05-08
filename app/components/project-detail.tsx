"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Globe, Users } from 'lucide-react'
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
      project_id: "examplus-kbz-mini-app",
      project_title: "ExamPlus Mini Application for KBZAPP",
      project_subtitle: "Integrated exam management platform within the KBZAPP ecosystem",
      project_images: [
        "/placeholder.svg?height=600&width=1200",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      project_tech_stacks: ["Vue.js", "JavaScript", "TailwindCSS", "Shadcn UI", "Pinia"],
      project_link: "https://examplus-mini.kbzapp.com",
      project_status: "In Progress",
      personal: true,
      project_description:
        "The ExamPlus Mini Application provides seamless access to educational exams and packages through KBZAPP. Users can browse, purchase, and manage exams, receiving coupon codes that can be redeemed on the ExamPlus website. The application features comprehensive exam categorization, detailed results tracking, and an intuitive user interface designed to enhance the learning experience.",
      project_features: [
        {
          feature_id: 1,
          feature_name: "Exam Browsing and Management",
          feature_description:
            "Search and filter exams by tags and categories, view detailed exam information, and manage purchased exams.",
        },
        {
          feature_id: 2,
          feature_name: "Package Management",
          feature_description: "Browse and purchase exam packages containing multiple related exams with bundled pricing.",
        },
        {
          feature_id: 3,
          feature_name: "Coupon Code Integration",
          feature_description:
            "Receive and manage coupon codes for purchased exams and packages that can be redeemed on the ExamPlus website.",
        },
        {
          feature_id: 4,
          feature_name: "Exam History and Results",
          feature_description:
            "Track exam history and view detailed results, including identification of correct and incorrect answers.",
        },
      ],
      technical_specifications: {
        frontend: {
          frameworks: "Vue.js",
          libraries: "Pinia for state management, Shadcn UI for components",
        },
        backend: {
          frameworks: "Node.js",
          libraries: "Express.js",
        },
        database: {
          type: "Relational",
          system: "PostgreSQL",
        },
        styling: {
          framework: "TailwindCSS",
          component_library: "Shadcn UI",
        },
        architecture: {
          pattern: "Component-based architecture",
          state_management: "Pinia store modules for exams, packages, and user profile",
        },
        programming_languages: ["JavaScript"],
        testing_frameworks: ["Vitest", "Vue Test Utils"],
      },
      project_goals: [
        {
          goal_id: 1,
          goal_name: "Streamlined Exam Access",
          goal_description:
            "Provide an intuitive interface for browsing, purchasing, and accessing educational exams through coupon code integration.",
        },
        {
          goal_id: 2,
          goal_name: "Comprehensive Learning Management",
          goal_description:
            "Enable users to track their exam history, review results, and identify areas for improvement through detailed feedback.",
        },
        {
          goal_id: 3,
          goal_name: "Seamless Integration Experience",
          goal_description: "Create a smooth transition between KBZAPP and the ExamPlus platform for exam completion.",
        },
      ],
      project_flowchart: {
        mermaid_code: `flowchart TD
        A[User enters Mini App from KBZAPP] --> B{Choose Tab}

        B --> C[Exam Tab]
        B --> D[Package Tab]
        B --> E[Profile Tab]

        %% Exam Tab Flow
        C --> C1[Search/Filter Exams by Tag/Category]
        C1 --> C2[View Exam Details]
        C2 --> C3{Exam Type}
        C3 --> C4[Individual Exam]
        C3 --> C5[Part of a Package]
        C2 --> C6[Buy or Favorite Exam]
        C6 --> C7[Receive Coupon Code]
        C7 --> C8[Copy Code and Visit ExamPlus Website]
        C8 --> C9[Enter Code to Access Exam on ExamPlus]
        C9 --> C10[Answer Exam on ExamPlus]

        %% Package Tab Flow
        D --> D1[Search/Filter Packages by Tag/Category]
        D1 --> D2[View Package Details]
        D2 --> D3[See List of Included Exams]
        D2 --> D4[Buy Package]
        D4 --> D5[Receive Coupon Code for All Exams in Package]
        D5 --> D6[Visit ExamPlus and Redeem Code]

        %% Profile Tab Flow
        E --> E1[View Purchased Exams]
        E --> E2[View Purchased Packages]
        E --> E3[View History of Attempted Exams]
        E3 --> E4[View Exam Result]
        E4 --> E5[See Questions with Correct/Incorrect Markings]

        style C fill:#f9f,stroke:#333,stroke-width:1px
        style D fill:#bbf,stroke:#333,stroke-width:1px
        style E fill:#bfb,stroke:#333,stroke-width:1px
      `,
        description:
          "This flowchart illustrates the complete user journey within the ExamPlus Mini Application, from entering through KBZAPP to viewing exam results. It highlights the three main tabs (Exam, Package, Profile) and the key actions users can perform in each section.",
      },
      team_members: [
        {
          member_id: 1,
          member_name: "John Doe",
          member_role: "Project Manager",
        },
        {
          member_id: 2,
          member_name: "Jane Smith",
          member_role: "Lead Vue Developer",
        },
        {
          member_id: 3,
          member_name: "Bob Johnson",
          member_role: "UI/UX Designer",
        },
      ],

  }
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  interface Project {
    project_id: string;
    project_title: string;
    project_subtitle: string;
    project_images: string[];
    project_tech_stacks: string[];
    project_link: string;
    project_status: string;
    personal: boolean;
    project_description: string;
    project_features: {
      feature_id: number;
      feature_name: string;
      feature_description: string;
    }[];
    technical_specifications: {
      frontend: {
        frameworks: string;
        libraries: string;
      };
      backend: {
        frameworks: string;
        libraries: string;
      };
      database: {
        type: string;
        system: string;
      };
      programming_languages: string[];
      testing_frameworks: string[];
    };
    project_goals: {
      goal_id: number;
      goal_name: string;
      goal_description: string;
    }[];
    project_flowchart: {
      mermaid_code: string;
      description: string;
    };
    team_members: {
      member_id: number;
      member_name: string;
      member_role: string;
    }[];
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
        Math.max(0, currentImageIndex - 1)
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
                <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl relative">
                  {project.project_images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
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
                        className={`h-[150px] transition-all duration-300 ${
                          index === currentImageIndex ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover rounded-md cursor-pointer shadow-sm"
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
                      className={`w-2 h-2 rounded-full cursor-pointer ${
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
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-medium text-lg">Frontend</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Frameworks:</span>
                        <span>{project.technical_specifications.frontend.frameworks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Libraries:</span>
                        <span>{project.technical_specifications.frontend.libraries}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {
                  project.technical_specifications.backend && (
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <h3 className="font-medium text-lg">Backend</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Frameworks:</span>
                            <span>{project.technical_specifications.backend.frameworks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Libraries:</span>
                            <span>{project.technical_specifications.backend.libraries}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
               {
                project.technical_specifications.database && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-medium text-lg">Database</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span>{project.technical_specifications.database.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">System:</span>
                        <span>{project.technical_specifications.database.system}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-medium text-lg">Languages & Testing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Languages:</span>
                        <span>{project.technical_specifications.programming_languages.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Testing:</span>
                        <span>{project.technical_specifications.testing_frameworks.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="animate-in fade-in duration-300">
              <div className="space-y-6">
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
              <div className="space-y-2">
                {project.project_tech_stacks.map((tech: string) => (
                  <div
                    key={tech}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mr-3"></div>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
