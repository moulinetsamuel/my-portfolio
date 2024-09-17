"use client";

import { useState, useEffect } from "react";
import OrbitingCircles from "../magicui/orbiting-circles";
import Image from "next/image";
import { SkillIcons, RadiusData } from "@/constants";

export default function SkillContent() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.5);
      } else if (width < 768) {
        setScale(0.6);
      } else if (width < 1024) {
        setScale(0.62);
      } else {
        setScale(0.8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalMaxIcons = RadiusData.reduce((acc, radius) => acc + radius.max, 0);
  let shuffledSkills = [...SkillIcons].sort(() => Math.random() - 0.5);

  if (shuffledSkills.length > totalMaxIcons) {
    shuffledSkills = shuffledSkills.slice(0, totalMaxIcons);
  }

  const skillWithRadius: {
    radiusIndex: number;
    id: number;
    name: string;
    icon_url: string;
    index: number;
  }[] = [];

  const skillCountPerRadius = RadiusData.map(() => 0);
  let currentRadiusIndex = 0;

  shuffledSkills.forEach((skill) => {
    while (
      skillCountPerRadius[currentRadiusIndex] >=
      RadiusData[currentRadiusIndex].max
    ) {
      currentRadiusIndex = (currentRadiusIndex + 1) % RadiusData.length;
    }

    skillWithRadius.push({
      ...skill,
      radiusIndex: currentRadiusIndex,
      index: skillCountPerRadius[currentRadiusIndex],
    });

    skillCountPerRadius[currentRadiusIndex]++;
    currentRadiusIndex = (currentRadiusIndex + 1) % RadiusData.length;
  });

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {skillWithRadius.map((skill) => {
        const totalIconsInRadius = skillCountPerRadius[skill.radiusIndex];
        const angle = (360 / totalIconsInRadius) * skill.index;
        const delay =
          (skill.index / totalIconsInRadius) *
          RadiusData[skill.radiusIndex].duration;

        return (
          <OrbitingCircles
            key={skill.id}
            className="border-none bg-transparent"
            radius={RadiusData[skill.radiusIndex].radius * scale}
            duration={RadiusData[skill.radiusIndex].duration}
            delay={delay}
            reverse={RadiusData[skill.radiusIndex].reverse}
            angle={angle}
          >
            <Image
              src={`icons/skills${skill.icon_url}`}
              alt={skill.name}
              width={RadiusData[skill.radiusIndex].size * scale}
              height={RadiusData[skill.radiusIndex].size * scale}
            />
          </OrbitingCircles>
        );
      })}
    </div>
  );
}
