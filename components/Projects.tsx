import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section
      id="projects"
      className="h-screen w-full flex flex-col justify-center items-center pt-16"
    >
      <h2 className="text-4xl font-bold text-center mb-8 ">Projets</h2>
      <ProjectCarousel />
    </section>
  );
}
