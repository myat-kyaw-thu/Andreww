import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-50">404</h1>
      <h2 className="mt-4 text-2xl font-medium text-gray-700 dark:text-gray-300">Project Not Found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The project you are looking for does not exist or has been removed.
      </p>
      <Button asChild className="mt-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>
    </div>
  )
}

