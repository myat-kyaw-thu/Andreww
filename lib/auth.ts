import type { NextRequest } from "next/server";

export function verifyToken(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { success: false, error: "Missing or invalid authorization header" };
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Get the expected token from environment variables
    const expectedToken = process.env.ADMIN_TOKEN;

    if (!expectedToken) {
      return { success: false, error: "Server configuration error: Missing admin token" };
    }

    // Verify the token
    if (token !== expectedToken) {
      return { success: false, error: "Invalid token" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying token:", error);
    return { success: false, error: "Authentication error" };
  }
}
