import { mkdir, writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create unique filename
  const filename = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`

  // Define the path where the image will be saved
  const uploadDir = join(process.cwd(), "public", "uploads")

  // Ensure the directory exists
  try {
    await mkdir(uploadDir, { recursive: true })
  } catch (error) {
    console.error("Error creating upload directory:", error)
  }

  const filePath = join(uploadDir, filename)

  // Write the file
  await writeFile(filePath, buffer)

  // Return the path relative to the public directory
  return `/uploads/${filename}`
}

