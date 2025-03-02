import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const authResult = verifyToken(request)

  if (authResult.success) {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ error: authResult.error }, { status: 401 })
  }
}

