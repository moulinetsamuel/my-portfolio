import SkillContent from "../contents/SkillContent";
import { SkillIcons, RadiusData } from "@/constants";

export default function Skills() {
  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col justify-center items-center pt-16"
    >
      <h2 className="text-4xl font-bold pt-16">Compétences techniques</h2>
      <SkillContent icons={SkillIcons} radiusData={RadiusData} />
    </section>
  );
}
