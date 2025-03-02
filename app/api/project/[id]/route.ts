import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const authResult = verifyToken(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const id = params.id
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        project_features: true,
        project_goals: true,
        project_timeline: true,
        team_members: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Parse the technical_specifications back to an object
    const result = {
      ...project,
      technical_specifications: JSON.parse(project.technical_specifications as string),
    }

    return NextResponse.json(result)
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

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Update the project with a transaction to handle all related data
    const project = await prisma.$transaction(async (tx) => {
      // Delete existing related records
      await tx.projectFeature.deleteMany({ where: { projectId: id } })
      await tx.projectGoal.deleteMany({ where: { projectId: id } })
      await tx.projectTimeline.deleteMany({ where: { projectId: id } })
      await tx.teamMember.deleteMany({ where: { projectId: id } })

      // Update the project
      const updatedProject = await tx.project.update({
        where: { id },
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

      return updatedProject
    })

    // Parse the technical_specifications back to an object
    const result = {
      ...project,
      technical_specifications: JSON.parse(project.technical_specifications as string),
    }

    return NextResponse.json(result)
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
    const existingProject = await prisma.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Delete the project with a transaction to handle all related data
    await prisma.$transaction(async (tx) => {
      // Delete related records first
      await tx.projectFeature.deleteMany({ where: { projectId: id } })
      await tx.projectGoal.deleteMany({ where: { projectId: id } })
      await tx.projectTimeline.deleteMany({ where: { projectId: id } })
      await tx.teamMember.deleteMany({ where: { projectId: id } })

      // Delete the project
      await tx.project.delete({ where: { id } })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

