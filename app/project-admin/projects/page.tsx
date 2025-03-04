"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { AlertCircle, Edit, ExternalLink, Github, Image, Plus, Trash2, Upload } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface Project {
  id?: string
  project_id: string
  project_title: string
  project_subtitle: string
  project_cover_img: string
  project_tech_stacks: string[]
  project_link: string
  github_link?: string
  project_status: "Planning" | "In Progress" | "Completed" | "On Hold"
  personal: boolean
}

const emptyProject: Project = {
  project_id: "",
  project_title: "",
  project_subtitle: "",
  project_cover_img: "",
  project_tech_stacks: [],
  project_link: "",
  github_link: "",
  project_status: "Planning",
  personal: false,
}

export default function ProjectsIndex() {
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
        fetchProjects(tokenToVerify)
      } else {
        setIsAuthenticated(false)
        setError("Invalid authentication token")
      }
    } catch (err) {
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

  const fetchProjects = async (authToken: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/projects-index", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch projects")

      const data = await response.json()
      setProjects(data)
      setError(null)
    } catch (err) {
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
      formData.append('data', JSON.stringify(currentProject))
      
      // Add image file if selected
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const response = await fetch("/api/projects-index", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      
      if (!response.ok) throw new Error("Failed to create project")
      
      const newProject = await response.json()
      setProjects([...projects, newProject])
      setCurrentProject(emptyProject)
      setImageFile(null)
      setImagePreview("")
      setIsEditing(false)
      setError(null)
    } catch  {
      setError("Failed to create project")
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
      formData.append('data', JSON.stringify(currentProject))
      
      // Add image file if selected
      if (imageFile) {
        formData.append('image', imageFile)
      }

      const response = await fetch(`/api/projects-index/${currentProject.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      
      if (!response.ok) throw new Error("Failed to update project")
      
      const updatedProject = await response.json()
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p))
      setCurrentProject(emptyProject)
      setImageFile(null)
      setImagePreview("")
      setIsEditing(false)
      setError(null)
    } catch  {
      setError("Failed to update project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/projects-index/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      
      if (!response.ok) throw new Error("Failed to delete project")
      
      setProjects(projects.filter(p => p.id !== id))
      setError(null)
    } catch  {
      setError("Failed to delete project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProject = (project: Project) => {
    setCurrentProject(project)
    setImagePreview(project.project_cover_img)
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProject({ ...currentProject, [name]: value })
  }

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techStacks = e.target.value.split(",").map(item => item.trim())
    setCurrentProject({ ...currentProject, project_tech_stacks: techStacks })
  }

  const handleStatusChange = (value: string) => {
    setCurrentProject({ 
      ...currentProject, 
      project_status: value as "Planning" | "In Progress" | "Completed" | "On Hold" 
    })
  }

  const handlePersonalChange = (checked: boolean) => {
    setCurrentProject({ ...currentProject, personal: checked })
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
      <h1 className="text-3xl font-bold mb-6">Projects Index</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setCurrentProject(emptyProject)
              setImageFile(null)
              setImagePreview("")
              setIsEditing(false)
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription>
                Fill in the details for your project. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_id">Project ID</Label>
                  <Input
                    id="project_id"
                    name="project_id"
                    value={currentProject.project_id}
                    onChange={handleInputChange}
                    placeholder="e.g., cms-platform"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_status">Project Status</Label>
                  <Select 
                    value={currentProject.project_status} 
                    onValueChange={handleStatusChange}
                  >
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
              
              <div className="space-y-2">
                <Label htmlFor="project_subtitle">Project Subtitle</Label>
                <Textarea
                  id="project_subtitle"
                  name="project_subtitle"
                  value={currentProject.project_subtitle}
                  onChange={handleInputChange}
                  placeholder="A brief description of the project"
                  rows={2}
                />
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
              
              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="github_link">GitHub Link</Label>
                  <Input
                    id="github_link"
                    name="github_link"
                    value={currentProject.github_link}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Project Cover Image</Label>
                <div className="flex items-center gap-4">
                  <div 
                    className="border rounded-md w-32 h-32 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    {imagePreview ? (
                     <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Project cover preview"
                        width={500} // Replace with your desired width
                        height={300} // Replace with your desired height
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
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full mb-2"
                      onClick={triggerFileInput}
                    >
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
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="personal" 
                  checked={currentProject.personal}
                  onCheckedChange={handlePersonalChange}
                />
                <Label htmlFor="personal">Personal Project</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setCurrentProject(emptyProject)
                setImageFile(null)
                setImagePreview("")
              }}>
                Cancel
              </Button>
              <Button onClick={isEditing ? handleUpdateProject : handleCreateProject} disabled={isLoading}>
                {isLoading ? "Saving..." : (isEditing ? "Update Project" : "Create Project")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Manage your projects index</CardDescription>
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
                  <TableHead>Image</TableHead>
                  <TableHead>Project ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                        {project.project_cover_img ? (
                         <Image
                            src={imagePreview || "/placeholder.svg"}
                            alt="Project cover preview"
                            width={500} // Replace with your desired width
                            height={300} // Replace with your desired height
                            className="w-full h-full object-cover"
                            />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Image className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{project.project_id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.project_title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {project.project_subtitle}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        project.project_status === "Completed" ? "default" :
                        project.project_status === "In Progress" ? "secondary" :
                        "outline"
                      }>
                        {project.project_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.project_tech_stacks.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline">{tech}</Badge>
                        ))}
                        {project.project_tech_stacks.length > 3 && (
                          <Badge variant="outline">+{project.project_tech_stacks.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {project.project_link && (
                          <a 
                            href={project.project_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github_link && (
                          <a 
                            href={project.github_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id!)}
                        >
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
