import ProjectCarousel from "../contents/ProjectCarousel";
import { ProjectsData } from "@/constants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full flex flex-col justify-start items-center pt-16"
    >
      <h2 className="text-4xl font-bold py-12">Réalisations</h2>
      <div className="w-full">
        <ProjectCarousel projects={ProjectsData} />
      </div>
    </section>
  );
}
