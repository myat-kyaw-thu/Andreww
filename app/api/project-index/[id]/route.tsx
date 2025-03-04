import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"
import { writeFile, unlink } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const id = params.id
    const project = await prisma.projectIndex.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Parse the project_tech_stacks from JSON string to array
    const formattedProject = {
      ...project,
      project_tech_stacks: JSON.parse(project.project_tech_stacks as string),
    }

    return NextResponse.json(formattedProject)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const id = params.id

    // Check if project exists
    const existingProject = await prisma.projectIndex.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Handle multipart form data
    const formData = await request.formData()
    const projectDataJson = formData.get("data") as string
    const imageFile = formData.get("image") as File | null

    if (!projectDataJson) {
      return NextResponse.json({ error: "Project data is required" }, { status: 400 })
    }

    const projectData = JSON.parse(projectDataJson)

    // Handle image upload if provided
    let imagePath = projectData.project_cover_img || existingProject.project_cover_img
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create unique filename
      const filename = `${uuidv4()}-${imageFile.name.replace(/\s/g, "_")}`

      // Define the path where the image will be saved
      const publicDir = join(process.cwd(), "public", "uploads")
      const filePath = join(publicDir, filename)

      // Ensure the directory exists
      await writeFile(filePath, buffer)

      // Set the image path to be used in the database
      imagePath = `/uploads/${filename}`

      // Delete old image if it exists and is not the default
      if (existingProject.project_cover_img && existingProject.project_cover_img.startsWith("/uploads/")) {
        try {
          const oldFilePath = join(process.cwd(), "public", existingProject.project_cover_img)
          await unlink(oldFilePath)
        } catch (err) {
          console.error("Error deleting old image:", err)
          // Continue even if delete fails
        }
      }
    }

    // Update the project
    const project = await prisma.projectIndex.update({
      where: { id },
      data: {
        project_id: projectData.project_id,
        project_title: projectData.project_title,
        project_subtitle: projectData.project_subtitle,
        project_cover_img: imagePath,
        project_tech_stacks: JSON.stringify(projectData.project_tech_stacks),
        project_link: projectData.project_link,
        github_link: projectData.github_link || null,
        project_status: projectData.project_status,
        personal: projectData.personal,
      },
    })

    // Return the updated project with parsed tech stacks
    return NextResponse.json({
      ...project,
      project_tech_stacks: JSON.parse(project.project_tech_stacks as string),
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const id = params.id

    // Check if project exists
    const existingProject = await prisma.projectIndex.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Delete the image file if it exists and is not the default
    if (existingProject.project_cover_img && existingProject.project_cover_img.startsWith("/uploads/")) {
      try {
        const filePath = join(process.cwd(), "public", existingProject.project_cover_img)
        await unlink(filePath)
      } catch (err) {
        console.error("Error deleting image file:", err)
        // Continue even if delete fails
      }
    }

    // Delete the project
    await prisma.projectIndex.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

