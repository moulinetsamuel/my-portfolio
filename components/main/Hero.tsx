import HeroProfil from "../contents/HeroProfil";
import HeroDescription from "../contents/HeroDescription";

export default function Hero() {
  return (
    <section
      id="about-me"
      className="min-h-screen w-full flex flex-col md:flex-row justify-center md:justify-evenly items-center px-4 md:px-8 lg:px-16 gap-8 md:gap-12 lg:gap-16"
    >
      <HeroProfil />
      <HeroDescription />
    </section>
  );
}
