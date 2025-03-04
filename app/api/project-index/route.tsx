import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const projects = await prisma.projectIndex.findMany()

    // Parse the project_tech_stacks from JSON string to array
    const formattedProjects = projects.map((project) => ({
      ...project,
      project_tech_stacks: JSON.parse(project.project_tech_stacks as string),
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
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
    let imagePath = projectData.project_cover_img || ""
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
    }

    // Create the project
    const project = await prisma.projectIndex.create({
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

    // Return the created project with parsed tech stacks
    return NextResponse.json(
      {
        ...project,
        project_tech_stacks: JSON.parse(project.project_tech_stacks as string),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

