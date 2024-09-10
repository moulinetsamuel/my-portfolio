import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <NavBar />
        <Hero />
        <Separator orientation="vertical" />
        <Skills />
        <Separator orientation="vertical" />
        <Projects />
        <Separator orientation="vertical" />
        <Contact />
      </div>
    </main>
  );
}
