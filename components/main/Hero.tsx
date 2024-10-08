import HeroProfil from "@/components/contents/HeroProfil";
import HeroDescription from "@/components/contents/HeroDescription";

export default function Hero() {
  return (
    <section
      id="about-me"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 md:flex-row md:justify-evenly md:gap-12 md:px-8 lg:gap-16 lg:px-16"
    >
      <HeroProfil />
      <HeroDescription />
    </section>
  );
}
