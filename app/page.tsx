export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <div
          id="about"
          className="relative flex flex-col h-full w-full mt-28 pb-10"
        >
          <h2>A propo de moi</h2>
          <div className="h-96"></div>
        </div>
        <section id="skills" className="py-10 scroll-mt-16">
          <h2>Mes Compétences technique </h2>
          <div className="h-96"></div>
        </section>
        <section id="projects" className="py-10 scroll-mt-16">
          <h2>Mes Projets</h2>
          <div className="h-96"></div>
        </section>
        <section id="contact" className="py-10 scroll-mt-16">
          <h2>Contactez moi</h2>
          <div className="h-96"></div>
        </section>
      </div>
    </main>
  );
}
