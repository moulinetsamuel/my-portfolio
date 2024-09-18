import ProjectCarousel from "../contents/ProjectCarousel";
import { ProjectsData } from "@/constants";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16">
        Réalisations
      </h2>
      <div className="w-full max-w-5xl">
        <ProjectCarousel projects={ProjectsData} />
      </div>
    </section>
  );
}
