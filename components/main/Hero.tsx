import HeroProfil from "../contents/HeroProfil";
import HeroDescription from "../contents/HeroDescription";

export default function Hero() {
  return (
    <section
      id="about-me"
      className="h-screen w-full flex justify-evenly pt-16"
    >
      <HeroProfil />
      <HeroDescription />
    </section>
  );
}
