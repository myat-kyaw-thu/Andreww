"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Achievement {
  id?: number
  title: string
  type: string
  date: string
  description: string
  category: string
  imageUrl?: string
}

const emptyAchievement: Achievement = {
  title: "",
  type: "",
  date: "",
  description: "",
  category: "",
}

export default function AchievementsAdmin() {
  const API_KEY = process.env.ADMIN_TOKEN || ""
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/"

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<Achievement>(emptyAchievement)
  const [isEditing, setIsEditing] = useState(false)
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if token exists in localStorage for the admin UI authentication
    const storedToken = localStorage.getItem("admin_token")
    if (storedToken) {
      setToken(storedToken)
      verifyToken(storedToken)
    }

    // You can also directly fetch projects here if you want to show them before authentication
    // fetchProjects()
  }, [])

  const fetchAchievements = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/achievements`)
      if (!response.ok) throw new Error("Failed to fetch achievements")
      const data = await response.json()
      setAchievements(data)
      setError(null)
    } catch {
      setError("Failed to load achievements")
    } finally {
      setIsLoading(false)
    }
  }
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
        fetchAchievements() // No need to pass token anymore
      } else {
        setIsAuthenticated(false)
        setError("Invalid authentication token")
        // Clear invalid token from localStorage
        localStorage.removeItem("admin_token")
      }
    } catch {
      setError("Authentication failed")
      setIsAuthenticated(false)
      localStorage.removeItem("admin_token")
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentAchievement({ ...currentAchievement, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const method = isEditing ? "PUT" : "POST"
      const url = isEditing ? `${API_BASE_URL}/achievements/${currentAchievement.id}` : `${API_BASE_URL}/achievements`

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(currentAchievement),
      })

      if (!response.ok) throw new Error("Failed to save achievement")

      await fetchAchievements()
      setCurrentAchievement(emptyAchievement)
      setIsEditing(false)
      setError(null)
    } catch {
      setError("Failed to save achievement")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (achievement: Achievement) => {
    setCurrentAchievement(achievement)
    setIsEditing(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return

    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/achievements/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      })

      if (!response.ok) throw new Error("Failed to delete achievement")

      await fetchAchievements()
      setError(null)
    } catch {
      setError("Failed to delete achievement")
    } finally {
      setIsLoading(false)
    }
    }
    const handleLogin = () => {
        if (!token.trim()) {
                setError("Please enter an admin token")
                return
            }
        verifyToken(token)
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
      <h1 className="text-3xl font-bold mb-6">Achievements Admin</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Achievement" : "Add New Achievement"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={currentAchievement.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input id="type" name="type" value={currentAchievement.type} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={currentAchievement.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentAchievement.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={currentAchievement.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Achievement" : "Add Achievement"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading achievements...</p>}
          {!isLoading && achievements.length === 0 && <p>No achievements found. Add your first achievement!</p>}
          {!isLoading && achievements.length > 0 && (
            <ul className="space-y-4">
              {achievements.map((achievement) => (
                <li key={achievement.id} className="border-b pb-4">
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  <p>Type: {achievement.type}</p>
                  <p>Date: {new Date(achievement.date).toLocaleDateString()}</p>
                  <p>Category: {achievement.category}</p>
                  <div className="mt-2">
                    <Button onClick={() => handleEdit(achievement)} className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(achievement.id!)} variant="destructive">
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

