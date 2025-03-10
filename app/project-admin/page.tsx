"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, Edit, Image, Plus, Trash2, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Project {
  id: string
  project_id: string
  project_title: string
  project_subtitle: string
  project_cover_img: string
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
  project_timeline: {
    milestone_id: number
    milestone_name: string
    milestone_date: string
    milestone_description: string
  }[]
  team_members: {
    member_id: number
    member_name: string
    member_role: string
  }[]
}

const emptyProject: Project = {
  id: "",
  project_id: "",
  project_title: "",
  project_subtitle: "",
  project_cover_img: "/placeholder.svg?height=600&width=1200",
  project_tech_stacks: [],
  project_link: "",
  project_status: "Planning",
  personal: false,
  project_description: "",
  project_features: [],
  technical_specifications: {
    frontend: {
      frameworks: "",
      libraries: "",
    },
    backend: {
      frameworks: "",
      libraries: "",
    },
    database: {
      type: "",
      system: "",
    },
    programming_languages: [],
    testing_frameworks: [],
  },
  project_goals: [],
  project_timeline: [],
  team_members: [],
}

export default function ProjectAdmin() {
  const API_KEY = process.env.ADMIN_TOKEN || "" // Use the environment variable for the API key
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/" // Update with your API base URL

  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token")
    if (storedToken) {
      setToken(storedToken)
      verifyToken(storedToken)
    }
  }, [])

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenToVerify}`,
        },
      })

      if (response.ok) {
        setIsAuthenticated(true)
        fetchProjects()
      } else {
        setIsAuthenticated(false)
        setError("Invalid authentication token")
      }
    } catch {
      setError("Authentication failed")
      setIsAuthenticated(false)
    }
  }

  const handleLogin = () => {
    verifyToken(token)
    if (isAuthenticated) {
      localStorage.setItem("admin_token", token)
    }
  }

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/projects`)

      if (!response.ok) throw new Error("Failed to fetch projects")

      const data = await response.json()
      setProjects(data)
      setError(null)
    } catch {
      setError("Failed to load projects")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async () => {
    setIsLoading(true)
    try {
      // Create FormData for file upload
      const formData = new FormData()

      // Add project data as JSON
      formData.append("data", JSON.stringify(currentProject))

      // Add image file if selected
      if (imageFile) {
        formData.append("image", imageFile)
      }

      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Invalid API key.")
        }
        if (response.status === 413) {
          throw new Error("Image file is too large. Please use a smaller image (max 10MB).")
        }
        throw new Error("Failed to create project")
      }

      const newProject = await response.json()
      setProjects([...projects, newProject])
      setCurrentProject(emptyProject)
      setImageFile(null)
      setImagePreview("")
      setIsEditing(false)
      setIsDialogOpen(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProject = async () => {
    setIsLoading(true)
    try {
      // Create FormData for file upload
      const formData = new FormData()

      // Add project data as JSON
      formData.append("data", JSON.stringify(currentProject))

      // Add image file if selected
      if (imageFile) {
        formData.append("image", imageFile)
      }

      const response = await fetch(`${API_BASE_URL}/projects/${currentProject.id}`, {
        method: "PUT",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Invalid API key.")
        }
        if (response.status === 413) {
          throw new Error("Image file is too large. Please use a smaller image (max 10MB).")
        }
        throw new Error("Failed to update project")
      }

      const updatedProject = await response.json()
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
      setCurrentProject(emptyProject)
      setImageFile(null)
      setImagePreview("")
      setIsEditing(false)
      setIsDialogOpen(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Invalid API key.")
        }
        throw new Error("Failed to delete project")
      }

      setProjects(projects.filter((p) => p.id !== id))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setCurrentProject(project)
    setImagePreview(project.project_cover_img)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProject({ ...currentProject, [name]: value })
  }

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techStacks = e.target.value.split(",").map((item) => item.trim())
    setCurrentProject({ ...currentProject, project_tech_stacks: techStacks })
  }

  const handleStatusChange = (value: string) => {
    setCurrentProject({ ...currentProject, project_status: value })
  }

  const handlePersonalChange = (value: string) => {
    setCurrentProject({ ...currentProject, personal: value === "true" })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Project Admin Login</CardTitle>
            <CardDescription>Enter your admin token to continue</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Admin Token</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Enter your admin token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Project Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentProject(emptyProject)
                setImageFile(null)
                setImagePreview("")
                setIsEditing(false)
                setIsDialogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription>Fill in the details for your project. Click save when you are done.</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="mt-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="technical">Technical Info</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project_id">Project ID</Label>
                    <Input
                      id="project_id"
                      name="project_id"
                      value={currentProject.project_id}
                      onChange={handleInputChange}
                      placeholder="e.g., kbz-mini-app"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project_title">Project Title</Label>
                    <Input
                      id="project_title"
                      name="project_title"
                      value={currentProject.project_title}
                      onChange={handleInputChange}
                      placeholder="Project Title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_subtitle">Project Subtitle</Label>
                  <Input
                    id="project_subtitle"
                    name="project_subtitle"
                    value={currentProject.project_subtitle}
                    onChange={handleInputChange}
                    placeholder="A brief description of the project"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Cover Image</Label>
                  <div className="flex items-center gap-4">
                    <div
                      className="border rounded-md w-32 h-32 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Project cover preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <Image className="w-8 h-8 mb-1" />
                          <span className="text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Button type="button" variant="outline" className="w-full mb-2" onClick={triggerFileInput}>
                        <Upload className="w-4 h-4 mr-2" />
                        {imageFile ? "Change Image" : "Upload Image"}
                      </Button>
                      {imageFile && (
                        <p className="text-sm text-muted-foreground">
                          {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_link">Project Link</Label>
                  <Input
                    id="project_link"
                    name="project_link"
                    value={currentProject.project_link}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project_status">Project Status</Label>
                    <Select value={currentProject.project_status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personal">Personal Project</Label>
                    <Select value={currentProject.personal.toString()} onValueChange={handlePersonalChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_tech_stacks">Tech Stack (comma separated)</Label>
                  <Input
                    id="project_tech_stacks"
                    name="project_tech_stacks"
                    value={currentProject.project_tech_stacks.join(", ")}
                    onChange={handleTechStackChange}
                    placeholder="React, Node.js, TypeScript"
                  />
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="project_description">Project Description</Label>
                  <Textarea
                    id="project_description"
                    name="project_description"
                    value={currentProject.project_description}
                    onChange={handleInputChange}
                    placeholder="Detailed description of the project"
                    rows={5}
                  />
                </div>

                <div className="space-y-6">
                  {/* Project Features */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium">Project Features</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newFeature = {
                            feature_id:
                              currentProject.project_features.length > 0
                                ? Math.max(...currentProject.project_features.map((f) => f.feature_id)) + 1
                                : 1,
                            feature_name: "",
                            feature_description: "",
                          }
                          setCurrentProject({
                            ...currentProject,
                            project_features: [...currentProject.project_features, newFeature],
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Feature
                      </Button>
                    </div>

                    {currentProject.project_features.map((feature, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`feature-name-${index}`} className="font-medium">
                              Feature {index + 1}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedFeatures = [...currentProject.project_features]
                                updatedFeatures.splice(index, 1)
                                setCurrentProject({
                                  ...currentProject,
                                  project_features: updatedFeatures,
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`feature-name-${index}`}>Feature Name</Label>
                            <Input
                              id={`feature-name-${index}`}
                              value={feature.feature_name}
                              onChange={(e) => {
                                const updatedFeatures = [...currentProject.project_features]
                                updatedFeatures[index].feature_name = e.target.value
                                setCurrentProject({
                                  ...currentProject,
                                  project_features: updatedFeatures,
                                })
                              }}
                              placeholder="Feature name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`feature-description-${index}`}>Feature Description</Label>
                            <Textarea
                              id={`feature-description-${index}`}
                              value={feature.feature_description}
                              onChange={(e) => {
                                const updatedFeatures = [...currentProject.project_features]
                                updatedFeatures[index].feature_description = e.target.value
                                setCurrentProject({
                                  ...currentProject,
                                  project_features: updatedFeatures,
                                })
                              }}
                              placeholder="Describe the feature"
                              rows={2}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    {currentProject.project_features.length === 0 && (
                      <div className="text-center p-4 border border-dashed rounded-md">
                        <p className="text-muted-foreground">
                          No features added yet. Click Add Feature to get started.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Project Goals */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium">Project Goals</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newGoal = {
                            goal_id:
                              currentProject.project_goals.length > 0
                                ? Math.max(...currentProject.project_goals.map((g) => g.goal_id)) + 1
                                : 1,
                            goal_name: "",
                            goal_description: "",
                          }
                          setCurrentProject({
                            ...currentProject,
                            project_goals: [...currentProject.project_goals, newGoal],
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Goal
                      </Button>
                    </div>

                    {currentProject.project_goals.map((goal, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`goal-name-${index}`} className="font-medium">
                              Goal {index + 1}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedGoals = [...currentProject.project_goals]
                                updatedGoals.splice(index, 1)
                                setCurrentProject({
                                  ...currentProject,
                                  project_goals: updatedGoals,
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`goal-name-${index}`}>Goal Name</Label>
                            <Input
                              id={`goal-name-${index}`}
                              value={goal.goal_name}
                              onChange={(e) => {
                                const updatedGoals = [...currentProject.project_goals]
                                updatedGoals[index].goal_name = e.target.value
                                setCurrentProject({
                                  ...currentProject,
                                  project_goals: updatedGoals,
                                })
                              }}
                              placeholder="Goal name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`goal-description-${index}`}>Goal Description</Label>
                            <Textarea
                              id={`goal-description-${index}`}
                              value={goal.goal_description}
                              onChange={(e) => {
                                const updatedGoals = [...currentProject.project_goals]
                                updatedGoals[index].goal_description = e.target.value
                                setCurrentProject({
                                  ...currentProject,
                                  project_goals: updatedGoals,
                                })
                              }}
                              placeholder="Describe the goal"
                              rows={2}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    {currentProject.project_goals.length === 0 && (
                      <div className="text-center p-4 border border-dashed rounded-md">
                        <p className="text-muted-foreground">No goals added yet. Click Add Goal to get started.</p>
                      </div>
                    )}
                  </div>

                  {/* Project Timeline */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium">Project Timeline</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newMilestone = {
                            milestone_id:
                              currentProject.project_timeline.length > 0
                                ? Math.max(...currentProject.project_timeline.map((m) => m.milestone_id)) + 1
                                : 1,
                            milestone_name: "",
                            milestone_date: "",
                            milestone_description: "",
                          }
                          setCurrentProject({
                            ...currentProject,
                            project_timeline: [...currentProject.project_timeline, newMilestone],
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Milestone
                      </Button>
                    </div>

                    {currentProject.project_timeline.map((milestone, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`milestone-name-${index}`} className="font-medium">
                              Milestone {index + 1}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedTimeline = [...currentProject.project_timeline]
                                updatedTimeline.splice(index, 1)
                                setCurrentProject({
                                  ...currentProject,
                                  project_timeline: updatedTimeline,
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`milestone-name-${index}`}>Milestone Name</Label>
                              <Input
                                id={`milestone-name-${index}`}
                                value={milestone.milestone_name}
                                onChange={(e) => {
                                  const updatedTimeline = [...currentProject.project_timeline]
                                  updatedTimeline[index].milestone_name = e.target.value
                                  setCurrentProject({
                                    ...currentProject,
                                    project_timeline: updatedTimeline,
                                  })
                                }}
                                placeholder="Milestone name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`milestone-date-${index}`}>Date</Label>
                              <Input
                                id={`milestone-date-${index}`}
                                type="date"
                                value={milestone.milestone_date}
                                onChange={(e) => {
                                  const updatedTimeline = [...currentProject.project_timeline]
                                  updatedTimeline[index].milestone_date = e.target.value
                                  setCurrentProject({
                                    ...currentProject,
                                    project_timeline: updatedTimeline,
                                  })
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`milestone-description-${index}`}>Description</Label>
                            <Textarea
                              id={`milestone-description-${index}`}
                              value={milestone.milestone_description}
                              onChange={(e) => {
                                const updatedTimeline = [...currentProject.project_timeline]
                                updatedTimeline[index].milestone_description = e.target.value
                                setCurrentProject({
                                  ...currentProject,
                                  project_timeline: updatedTimeline,
                                })
                              }}
                              placeholder="Describe the milestone"
                              rows={2}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    {currentProject.project_timeline.length === 0 && (
                      <div className="text-center p-4 border border-dashed rounded-md">
                        <p className="text-muted-foreground">
                          No timeline milestones added yet. Click Add Milestone  to get started.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Team Members */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium">Team Members</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newMember = {
                            member_id:
                              currentProject.team_members.length > 0
                                ? Math.max(...currentProject.team_members.map((m) => m.member_id)) + 1
                                : 1,
                            member_name: "",
                            member_role: "",
                          }
                          setCurrentProject({
                            ...currentProject,
                            team_members: [...currentProject.team_members, newMember],
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Team Member
                      </Button>
                    </div>

                    {currentProject.team_members.map((member, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`member-name-${index}`} className="font-medium">
                              Team Member {index + 1}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedMembers = [...currentProject.team_members]
                                updatedMembers.splice(index, 1)
                                setCurrentProject({
                                  ...currentProject,
                                  team_members: updatedMembers,
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`member-name-${index}`}>Name</Label>
                              <Input
                                id={`member-name-${index}`}
                                value={member.member_name}
                                onChange={(e) => {
                                  const updatedMembers = [...currentProject.team_members]
                                  updatedMembers[index].member_name = e.target.value
                                  setCurrentProject({
                                    ...currentProject,
                                    team_members: updatedMembers,
                                  })
                                }}
                                placeholder="Member name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`member-role-${index}`}>Role</Label>
                              <Input
                                id={`member-role-${index}`}
                                value={member.member_role}
                                onChange={(e) => {
                                  const updatedMembers = [...currentProject.team_members]
                                  updatedMembers[index].member_role = e.target.value
                                  setCurrentProject({
                                    ...currentProject,
                                    team_members: updatedMembers,
                                  })
                                }}
                                placeholder="Member role"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {currentProject.team_members.length === 0 && (
                      <div className="text-center p-4 border border-dashed rounded-md">
                        <p className="text-muted-foreground">
                          No team members added yet. Click Add Team Member to get started.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frontend_frameworks">Frontend Frameworks</Label>
                    <Input
                      id="frontend_frameworks"
                      value={currentProject.technical_specifications.frontend.frameworks}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          technical_specifications: {
                            ...currentProject.technical_specifications,
                            frontend: {
                              ...currentProject.technical_specifications.frontend,
                              frameworks: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="React, Next.js"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frontend_libraries">Frontend Libraries</Label>
                    <Input
                      id="frontend_libraries"
                      value={currentProject.technical_specifications.frontend.libraries}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          technical_specifications: {
                            ...currentProject.technical_specifications,
                            frontend: {
                              ...currentProject.technical_specifications.frontend,
                              libraries: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="Redux for state management"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backend_frameworks">Backend Frameworks</Label>
                    <Input
                      id="backend_frameworks"
                      value={currentProject.technical_specifications.backend.frameworks}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          technical_specifications: {
                            ...currentProject.technical_specifications,
                            backend: {
                              ...currentProject.technical_specifications.backend,
                              frameworks: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="Node.js, Express"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backend_libraries">Backend Libraries</Label>
                    <Input
                      id="backend_libraries"
                      value={currentProject.technical_specifications.backend.libraries}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          technical_specifications: {
                            ...currentProject.technical_specifications,
                            backend: {
                              ...currentProject.technical_specifications.backend,
                              libraries: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="Passport.js for authentication"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="database_type">Database Type</Label>
                    <Input
                      id="database_type"
                      value={currentProject.technical_specifications.database.type}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          technical_specifications: {
                            ...currentProject.technical_specifications,
                            database: {
                              ...currentProject.technical_specifications.database,
                              type: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="NoSQL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="database_system">Database System</Label>
                    <Input
                      id="database_system"
                      value={currentProject.technical_specifications.database.system}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          technical_specifications: {
                            ...currentProject.technical_specifications,
                            database: {
                              ...currentProject.technical_specifications.database,
                              system: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="MongoDB"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="programming_languages">Programming Languages (comma separated)</Label>
                  <Input
                    id="programming_languages"
                    value={currentProject.technical_specifications.programming_languages.join(", ")}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        technical_specifications: {
                          ...currentProject.technical_specifications,
                          programming_languages: e.target.value.split(",").map((item) => item.trim()),
                        },
                      })
                    }
                    placeholder="TypeScript, JavaScript"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testing_frameworks">Testing Frameworks (comma separated)</Label>
                  <Input
                    id="testing_frameworks"
                    value={currentProject.technical_specifications.testing_frameworks.join(", ")}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        technical_specifications: {
                          ...currentProject.technical_specifications,
                          testing_frameworks: e.target.value.split(",").map((item) => item.trim()),
                        },
                      })
                    }
                    placeholder="Jest, Enzyme"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentProject(emptyProject)
                  setImageFile(null)
                  setImagePreview("")
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={isEditing ? handleUpdateProject : handleCreateProject} disabled={isLoading}>
                {isLoading ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Manage your projects</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading projects...</p>}

          {!isLoading && projects.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No projects found. Create your first project!</p>
            </div>
          )}

          {!isLoading && projects.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.project_id}</TableCell>
                    <TableCell>{project.project_title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.project_status === "Completed"
                            ? "default"
                            : project.project_status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.project_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.project_tech_stacks.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                        {project.project_tech_stacks.length > 3 && (
                          <Badge variant="outline">+{project.project_tech_stacks.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

