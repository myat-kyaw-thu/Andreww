import ProjectDetailsPage from "@/app/components/project-detail";

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectDetailsPage params={{ id: "kbz-mini-app" }} />
}
