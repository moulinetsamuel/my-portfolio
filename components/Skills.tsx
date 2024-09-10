import OrbitingCircles from "./magicui/orbiting-circles";
import Image from "next/image";
import { SkillIcons } from "@/constants";

export default function Skills() {
  const radius = [
    {
      id: 1,
      radius: 100,
      size: 60,
    },
    {
      id: 2,
      radius: 200,
      size: 80,
    },
    {
      id: 3,
      radius: 300,
      size: 100,
    },
  ];

  const shuffledSkills = [...SkillIcons].sort(() => Math.random() - 0.5);

  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-bold py-20">Mes compétences techniques</h2>
      <div className="relative flex h-3/4 w-full flex-col items-center justify-center overflow-hidden">
        {shuffledSkills.map((skill, index) => {
          const radiusIndex = radius[index % radius.length];

          return (
            <OrbitingCircles
              key={skill.id}
              className="border-none bg-transparent"
              radius={radiusIndex.radius}
              duration={25}
              delay={index * 5}
            >
              <Image
                src={`icons/skills${skill.icon_url}`}
                alt={skill.name}
                width={radiusIndex.size}
                height={radiusIndex.size}
              />
            </OrbitingCircles>
          );
        })}
      </div>
    </section>
  );
}
