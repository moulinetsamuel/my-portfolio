import Contact from "@/components/main/Contact";
import Hero from "@/components/main/Hero";
import NavBar from "@/components/NavBar";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col">
        <NavBar />
        <Hero />
        <div className="h-16 md:h-24 lg:h-32 relative">
          <Separator
            orientation="vertical"
            className="absolute left-1/2 h-full"
          />
        </div>
        <Skills />
        <div className="h-16 md:h-24 lg:h-32 relative">
          <Separator
            orientation="vertical"
            className="absolute left-1/2 h-full"
          />
        </div>
        <Projects />
        <div className="h-16 md:h-24 lg:h-32 relative">
          <Separator
            orientation="vertical"
            className="absolute left-1/2 h-full"
          />
        </div>
        <Contact />
      </div>
    </main>
  );
}
