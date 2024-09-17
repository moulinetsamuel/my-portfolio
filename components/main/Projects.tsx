import ProjectCarousel from "../contents/ProjectCarousel";
import { ProjectsData } from "@/constants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 gap-8 md:gap-12 lg:gap-16"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Réalisations
      </h2>
      <div className="w-full">
        <ProjectCarousel projects={ProjectsData} />
      </div>
    </section>
  );
}
