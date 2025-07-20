/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Edit, ExternalLink, Github, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface Project {
  id?: string;
  project_id: string;
  project_title: string;
  project_subtitle: string;
  project_cover_img: string;
  project_tech_stacks: string[];
  project_link: string;
  github_link?: string;
  project_status: "Planning" | "In Progress" | "Completed" | "On Hold";
  personal: boolean;
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
};

export default function ProjectsIndex() {
  const API_KEY = process.env.ADMIN_TOKEN;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenToVerify}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        setIsAuthenticated(false);
        setError("Invalid authentication token");
      }
    } catch {
      setError("Authentication failed");
      setIsAuthenticated(false);
    }
  };

  const handleLogin = () => {
    if (!token.trim()) {
      setError("Please enter an admin token");
      return;
    }
    verifyToken(token);
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/project-index`);
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data.map(formatProjectFromApi));
      setError(null);
    } catch {
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          ...currentProject,
          project_tech_stacks: currentProject.project_tech_stacks,
        }),
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/project-index`, {
        method: "POST",
        headers: { "x-api-key": API_KEY || "vEG15KfWn+uHufs7WYn+2DPocBE/lZ7n6h9dryozRqk=" },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Authentication failed. Invalid API key.");
        if (response.status === 413) throw new Error("Image file is too large (max 10MB).");
        throw new Error("Failed to create project");
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      resetForm();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          ...currentProject,
          project_tech_stacks: currentProject.project_tech_stacks,
        }),
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API_BASE_URL}/project-index/${currentProject.id}`, {
        method: "PUT",
        headers: { "x-api-key": API_KEY || "" },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Authentication failed. Invalid API key.");
        if (response.status === 413) throw new Error("Image file is too large (max 10MB).");
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
      resetForm();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/project-index/${id}`, {
        method: "DELETE",
        headers: { "x-api-key": API_KEY || "" },
      });

      if (!response.ok) throw new Error(response.status === 401 ?
        "Authentication failed. Invalid API key." : "Failed to delete project");

      setProjects(projects.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  const formatProjectFromApi = (project: Project): Project => ({
    ...project,
    project_tech_stacks: typeof project.project_tech_stacks === "string" ?
      JSON.parse(project.project_tech_stacks) : project.project_tech_stacks,
  });

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setImagePreview(project.project_cover_img);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setCurrentProject(emptyProject);
    setImageFile(null);
    setImagePreview("");
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value === "" ? (name === "github_link" ? undefined : "") : value,
    }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techStacks = e.target.value.split(",").map(item => item.trim());
    setCurrentProject({ ...currentProject, project_tech_stacks: techStacks });
  };

  const handleStatusChange = (value: string) => {
    setCurrentProject({
      ...currentProject,
      project_status: value as "Planning" | "In Progress" | "Completed" | "On Hold",
    });
  };

  const handlePersonalChange = (checked: boolean) => {
    setCurrentProject({ ...currentProject, personal: checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

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
    );
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription>Fill in the project details</DialogDescription>
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
                  placeholder="Brief description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_tech_stacks">Tech Stack (comma separated)</Label>
                <Input
                  id="project_tech_stacks"
                  value={currentProject.project_tech_stacks.join(", ")}
                  onChange={handleTechStackChange}
                  placeholder="React, Node.js, TypeScript"
                />
              </div>

              <div className="space-y-2">
                <Label>Project Cover Image</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={triggerFileInput}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  )}
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

              <div className="space-y-2">
                <Label htmlFor="github_link">GitHub Link (optional)</Label>
                <Input
                  id="github_link"
                  name="github_link"
                  value={currentProject.github_link || ""}
                  onChange={handleInputChange}
                  placeholder="https://github.com/your-project"
                />
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
              <Button
                onClick={isEditing ? handleUpdateProject : handleCreateProject}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.project_title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.project_status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.project_tech_stacks.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {project.project_link && (
                      <a href={project.project_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {project.personal ? "Personal" : "Professional"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
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
                      onClick={() => project.id && handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
