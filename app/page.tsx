import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <div id="about" className="relative flex flex-col h-full w-full mt-16">
          <Hero />
        </div>

        <Skills />

        <Projects />

        <Contact />
      </div>
    </main>
  );
}
