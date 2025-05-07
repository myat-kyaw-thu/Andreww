"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Globe, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Mermaid from "./mermaid-component"

// This would typically come from an API or database
async function getProjectById(id: string) {
  // Mock data for demonstration
  return {
    project_id: "kbz-mini-app",
    project_title: "KBZPay Mini Application",
    project_subtitle: "Secure payment processing application integrated with KBZPay ecosystem",
    project_images: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    project_tech_stacks: ["React", "Node.js", "TypeScript", "MongoDB", "Express", "Next.js"],
    project_link: "https://kbz-mini-app.com",
    project_status: "In Progress",
    personal: true,
    project_description:
      "The KBZPay Mini Application is designed to provide seamless and secure payment processing within the KBZPay ecosystem. It leverages cutting-edge technologies to ensure fast, reliable, and user-friendly transactions. The application aims to enhance the overall payment experience by integrating advanced features such as QR code scanning, real-time notifications, and robust security measures.",
    project_features: [
      {
        feature_id: 1,
        feature_name: "Secure Payment Processing",
        feature_description:
          "Utilizes advanced security protocols to protect user transactions, including encryption and secure authentication methods.",
      },
      {
        feature_id: 2,
        feature_name: "QR Code Integration",
        feature_description: "Allows users to make payments by scanning QR codes, simplifying the transaction process.",
      },
      {
        feature_id: 3,
        feature_name: "Real-time Notifications",
        feature_description:
          "Provides instant updates on transaction status, ensuring users are informed about their payments.",
      },
      {
        feature_id: 4,
        feature_name: "User Profile Management",
        feature_description:
          "Enables users to manage their profiles securely, including transaction history and account settings.",
      },
    ],
    technical_specifications: {
      frontend: {
        frameworks: "React, Next.js",
        libraries: "Redux for state management",
      },
      backend: {
        frameworks: "Node.js, Express",
        libraries: "Passport.js for authentication",
      },
      database: {
        type: "NoSQL",
        system: "MongoDB",
      },
      programming_languages: ["TypeScript", "JavaScript"],
      testing_frameworks: ["Jest", "Enzyme"],
    },
    project_goals: [
      {
        goal_id: 1,
        goal_name: "Enhance User Experience",
        goal_description:
          "Improve the overall user interface and interaction flow to increase user satisfaction and engagement.",
      },
      {
        goal_id: 2,
        goal_name: "Increase Security",
        goal_description:
          "Implement robust security measures to prevent fraud and unauthorized access, ensuring the integrity of user data.",
      },
      {
        goal_id: 3,
        goal_name: "Optimize Performance",
        goal_description: "Ensure the application performs efficiently across various devices and network conditions.",
      },
    ],
    project_flowchart: {
      mermaid_code: `flowchart TD
  %% Entry Point
  Start([Start: Patient Requests Blood Test])

  %% Clinic Processes
  ClinicForm([Clinic Fills Test Form<br>and Confirms Details])
  GenerateInfo([System Generates Test List<br>and Tube Count])
  SubmitRequest([Clinic Submits Request to System])

  %% Runner Pickup Flow
  RunnerAssigned([Runner Automatically Assigned])
  NotifyRunner([Runner Gets Pickup Notification])
  PickupConfirmed([Runner Confirms Pickup])
  DeliverToLab([Runner Delivers Sample to Lab])

  %% Lab Reception
  ConfirmDelivery([Lab Reception Confirms Delivery])
  ScanAndMatch([Sample Scanned & Linked<br>to Patient/Test Info])
  VerifySample([Verify Sample and Test List])

  %% Lab Processing
  LabProcessing([Lab Technician Processes Sample])
  GenerateResults([Generate Digital and Paper Results])
  ResultChecked([Lab Verifies Results])

  %% Delivery & Archive
  NotifyClinic([System Notifies Clinic / Runner])
  DeliverResult([Deliver Result to Patient])
  Archive([Archive Test and Result to History])
  End([End])

  %% Flow
  Start --> ClinicForm --> GenerateInfo --> SubmitRequest
  SubmitRequest --> RunnerAssigned --> NotifyRunner --> PickupConfirmed --> DeliverToLab

  DeliverToLab --> ConfirmDelivery --> ScanAndMatch --> VerifySample
  VerifySample --> LabProcessing --> GenerateResults --> ResultChecked

  ResultChecked --> NotifyClinic --> DeliverResult --> Archive --> End

  %% Parallel interaction from Clinic side
  ClinicForm --- NotifyRunner
  SubmitRequest --- NotifyClinic

  %% Styling
  classDef stage fill:#E3F2FD,stroke:#2196F3,stroke-width:2px;
  classDef terminal fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px;
  class Start,End terminal;
  class ClinicForm,GenerateInfo,SubmitRequest,RunnerAssigned,NotifyRunner,PickupConfirmed,DeliverToLab,ConfirmDelivery,ScanAndMatch,VerifySample,LabProcessing,GenerateResults,ResultChecked,NotifyClinic,DeliverResult,Archive stage;`,
      description:
        "This flowchart illustrates the complete process flow of the KBZPay Mini Application, from user order initiation to delivery confirmation. It highlights key decision points and the roles of different team members in the process.",
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
        member_role: "Lead Developer",
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

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

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
    // Scroll to keep the current thumbnail visible
    if (thumbnailsRef.current) {
      const thumbnailElements = thumbnailsRef.current.querySelectorAll(".thumbnail-item")
      if (thumbnailElements[currentImageIndex]) {
        thumbnailElements[currentImageIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }
  }, [currentImageIndex])

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

  if (loading) {
    return <div className="container mx-auto px-4 py-12 max-w-6xl">Loading...</div>
  }

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-in fade-in duration-700">
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

            <div className="flex flex-wrap gap-2 pt-2">
              {project.project_tech_stacks.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="transition-all hover:scale-105">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main large image with navigation controls */}
            <div className="md:col-span-3 relative overflow-hidden rounded-xl group">
              {/* Fixed aspect ratio container to prevent layout shifts */}
              <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800">
                <Image
                  src={project.project_images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${project.project_title} main image`}
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={currentImageIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Vertical thumbnails with scroll */}
            <div
              ref={thumbnailsRef}
              className="md:col-span-1 h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {project.project_images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl group thumbnail-item cursor-pointer transition-all duration-300 ${
                    currentImageIndex === index ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-950" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {/* Fixed aspect ratio container for thumbnails */}
                  <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.project_title} image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 25vw"
                      className={`object-cover transition-transform duration-500 ${
                        currentImageIndex === index ? "brightness-100" : "brightness-90 hover:brightness-100"
                      }`}
                    />
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                    )}
                  </div>
                </div>
              ))}
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
                    <Mermaid
                      chart={`
flowchart TD
  %% Entry Point
  Start([Start: Patient Requests Blood Test])

  %% Clinic Processes
  ClinicForm([Clinic Fills Test Form<br>and Confirms Details])
  GenerateInfo([System Generates Test List<br>and Tube Count])
  SubmitRequest([Clinic Submits Request to System])

  %% Runner Pickup Flow
  RunnerAssigned([Runner Automatically Assigned])
  NotifyRunner([Runner Gets Pickup Notification])
  PickupConfirmed([Runner Confirms Pickup])
  DeliverToLab([Runner Delivers Sample to Lab])

  %% Lab Reception
  ConfirmDelivery([Lab Reception Confirms Delivery])
  ScanAndMatch([Sample Scanned & Linked<br>to Patient/Test Info])
  VerifySample([Verify Sample and Test List])

  %% Lab Processing
  LabProcessing([Lab Technician Processes Sample])
  GenerateResults([Generate Digital and Paper Results])
  ResultChecked([Lab Verifies Results])

  %% Delivery & Archive
  NotifyClinic([System Notifies Clinic / Runner])
  DeliverResult([Deliver Result to Patient])
  Archive([Archive Test and Result to History])
  End([End])

  %% Flow
  Start --> ClinicForm --> GenerateInfo --> SubmitRequest
  SubmitRequest --> RunnerAssigned --> NotifyRunner --> PickupConfirmed --> DeliverToLab

  DeliverToLab --> ConfirmDelivery --> ScanAndMatch --> VerifySample
  VerifySample --> LabProcessing --> GenerateResults --> ResultChecked

  ResultChecked --> NotifyClinic --> DeliverResult --> Archive --> End

  %% Parallel interaction from Clinic side
  ClinicForm --- NotifyRunner
  SubmitRequest --- NotifyClinic

  %% Styling
  classDef stage fill:#E3F2FD,stroke:#2196F3,stroke-width:2px;
  classDef terminal fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px;
  class Start,End terminal;
  class ClinicForm,GenerateInfo,SubmitRequest,RunnerAssigned,NotifyRunner,PickupConfirmed,DeliverToLab,ConfirmDelivery,ScanAndMatch,VerifySample,LabProcessing,GenerateResults,ResultChecked,NotifyClinic,DeliverResult,Archive stage;
        `}
                    />
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
