import ProjectCarousel from "../contents/ProjectCarousel";
import { ProjectsData } from "@/constants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32"
    >
      <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl lg:mb-16 lg:text-4xl">
        Réalisations
      </h2>
      <div className="w-full max-w-5xl">
        <ProjectCarousel projects={ProjectsData} />
      </div>
    </section>
  );
}
