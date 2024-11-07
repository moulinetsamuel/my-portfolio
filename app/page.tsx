import Contact from '@/components/main/Contact';
import Hero from '@/components/main/Hero';
import NavBar from '@/components/NavBar';
import Projects from '@/components/main/Projects';
import Skills from '@/components/main/Skills';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col">
        <NavBar />
        <Hero />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </div>
    </main>
  );
}
