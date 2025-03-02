import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      include: {
        project_features: true,
        project_goals: true,
        project_timeline: true,
        team_members: true,
      },
    })

    return NextResponse.json(projects)
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

    const data = await request.json()

    // Extract nested data
    const {
      project_features,
      project_goals,
      project_timeline,
      team_members,
      technical_specifications,
      ...projectData
    } = data

    // Create the project with all related data
    const project = await prisma.project.create({
      data: {
        ...projectData,
        technical_specifications: JSON.stringify(technical_specifications),
        project_features: {
          create: project_features || [],
        },
        project_goals: {
          create: project_goals || [],
        },
        project_timeline: {
          create: project_timeline || [],
        },
        team_members: {
          create: team_members || [],
        },
      },
      include: {
        project_features: true,
        project_goals: true,
        project_timeline: true,
        team_members: true,
      },
    })

    // Parse the technical_specifications back to an object
    const result = {
      ...project,
      technical_specifications: JSON.parse(project.technical_specifications as string),
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

