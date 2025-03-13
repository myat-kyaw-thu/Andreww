import { notFound } from "next/navigation"
import { ArrowUpRight, Calendar, CheckCircle, Clock, Globe, Users, ArrowLeft } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// This would typically come from an API or database
async function getProjectById(id: string) {
  // Mock data for demonstration
  return {
    project_id: "kbz-mini-app",
    project_title: "KBZPay Mini Application",
    project_subtitle: "Secure payment processing application integrated with KBZPay ecosystem",
    project_cover_img: "/placeholder.svg?height=600&width=1200",
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
    project_timeline: [
      {
        milestone_id: 1,
        milestone_name: "Project Initiation",
        milestone_date: "2023-01-01",
        milestone_description: "Project planning and team assembly.",
      },
      {
        milestone_id: 2,
        milestone_name: "Development Phase",
        milestone_date: "2023-02-01",
        milestone_description: "Start of the development phase focusing on core features.",
      },
      {
        milestone_id: 3,
        milestone_name: "Testing and Debugging",
        milestone_date: "2023-04-01",
        milestone_description: "Comprehensive testing to identify and fix bugs.",
      },
      {
        milestone_id: 4,
        milestone_name: "Launch Preparation",
        milestone_date: "2023-06-01",
        milestone_description: "Final preparations for the application launch.",
      },
    ],
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

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)
  
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
              {project.project_tech_stacks.map((tech) => (
                <Badge key={tech} variant="secondary" className="transition-all hover:scale-105">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl group">
          <Image      
            src={project.project_cover_img || "/placeholder.svg"}
            alt={project.project_title}
            layout="responsive"
            width={1200}    
            height={600}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              <TabsTrigger value="timeline" className="transition-all">
                Timeline
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
                          <CheckCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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

            <TabsContent value="timeline" className="animate-in fade-in duration-300">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                {project.project_timeline.map((milestone, index) => (
                  <div
                    key={milestone.milestone_id}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
                      <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-all hover:shadow-md">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-gray-900 dark:text-gray-100">{milestone.milestone_name}</div>
                        <time className="font-mono text-sm text-gray-500 dark:text-gray-400">
                          {new Date(milestone.milestone_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">{milestone.milestone_description}</div>
                    </div>
                  </div>
                ))}
              </div>
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
                    <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
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
                {project.project_tech_stacks.map((tech) => (
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
