import ProjectDetailsPage from "@/app/components/project-detail";

export default function Page({ params }: { params: { id: string; }; }) {
  console.log("Project ID from params:", params.id);
  return <ProjectDetailsPage params={{ id: "kbz-mini-app" }} />;
}
