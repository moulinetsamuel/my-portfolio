import OrbitingCircles from "./magicui/orbiting-circles";
import Image from "next/image";
import { SkillIcons } from "@/constants";

export default function Skills() {
  const radiusData = [
    {
      id: 1,
      radius: 100,
      size: 50,
      max: 5,
      duration: 25,
    },
    {
      id: 2,
      radius: 200,
      size: 70,
      max: 10,
      duration: 25,
      reverse: true,
    },
    {
      id: 3,
      radius: 300,
      size: 90,
      max: 15,
      duration: 25,
    },
  ];

  // Calculer le nombre total maximal d'icônes pouvant être affichées
  const totalMaxIcons = radiusData.reduce((acc, radius) => acc + radius.max, 0);

  // Mélanger les compétences
  let shuffledSkills = [...SkillIcons].sort(() => Math.random() - 0.5);

  // Si le nombre d'icônes dépasse le maximum, couper la liste
  let removedSkills: {
    id: number;
    name: string;
    icon_url: string;
  }[] = [];

  if (shuffledSkills.length > totalMaxIcons) {
    removedSkills = shuffledSkills.slice(totalMaxIcons);
    shuffledSkills = shuffledSkills.slice(0, totalMaxIcons);
  }

  const skillWithRadius: {
    radiusIndex: number;
    id: number;
    name: string;
    icon_url: string;
    index: number;
  }[] = [];

  const skillCountPerRadius = radiusData.map(() => 0); // Initialise un compteur pour chaque rayon

  let currentRadiusIndex = 0; // Rayon de départ

  shuffledSkills.forEach((skill) => {
    // Trouver un rayon qui n'a pas atteint sa limite, en commençant par le dernier rayon utilisé
    while (
      skillCountPerRadius[currentRadiusIndex] >=
      radiusData[currentRadiusIndex].max
    ) {
      currentRadiusIndex = (currentRadiusIndex + 1) % radiusData.length; // Passer au rayon suivant en boucle
    }

    // Ajouter la compétence au groupe avec son radiusIndex
    skillWithRadius.push({
      ...skill,
      radiusIndex: currentRadiusIndex,
      index: skillCountPerRadius[currentRadiusIndex],
    });

    // Incrémenter le compteur pour ce rayon
    skillCountPerRadius[currentRadiusIndex]++;

    // Passer au rayon suivant pour la prochaine compétence
    currentRadiusIndex = (currentRadiusIndex + 1) % radiusData.length;
  });

  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-bold py-20">Mes compétences techniques</h2>

      <div className="relative flex h-3/4 w-full flex-col items-center justify-center overflow-hidden">
        {skillWithRadius.map((skill, index) => {
          const totalIconsInRadius = skillCountPerRadius[skill.radiusIndex];

          // Calculer l'angle pour chaque icône
          const angle = (360 / totalIconsInRadius) * skill.index;

          // Calcul du délai basé sur l'index
          const delay =
            (skill.index / totalIconsInRadius) *
            radiusData[skill.radiusIndex].duration;

          return (
            <OrbitingCircles
              key={skill.id}
              className="border-none bg-transparent"
              radius={radiusData[skill.radiusIndex].radius}
              duration={radiusData[skill.radiusIndex].duration}
              delay={delay}
              reverse={radiusData[skill.radiusIndex].reverse}
              angle={angle}
            >
              <Image
                src={`icons/skills${skill.icon_url}`}
                alt={skill.name}
                width={radiusData[skill.radiusIndex].size}
                height={radiusData[skill.radiusIndex].size}
              />
            </OrbitingCircles>
          );
        })}
      </div>
    </section>
  );
}
