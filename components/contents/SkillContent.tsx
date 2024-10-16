'use client';

import { useState, useEffect, useCallback } from 'react';
import OrbitingCircles from '@/components/magicui/orbiting-circles';
import Image from 'next/image';
import type { Skill } from '@/lib/schemas/skill/skillSchema';
import { Info } from 'lucide-react';
import { RadiusData } from '@/constants';
import useSkillStore from '@/store/useSkillStore';

export default function SkillContent() {
  const { fetchSkills, skills, isLoading, error } = useSkillStore();
  const [scale, setScale] = useState(1);
  const [distributedSkills, setDistributedSkills] = useState<
    (Skill & { radiusIndex: number; index: number })[]
  >([]);
  const [hasMoreSkills, setHasMoreSkills] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setScale(0.5);
    else if (width < 768) setScale(0.6);
    else if (width < 1024) setScale(0.62);
    else setScale(0.8);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (skills) {
      const shuffled = [...skills].sort(() => Math.random() - 0.5);
      const totalMaxIcons = RadiusData.reduce((acc, radius) => acc + radius.max, 0);
      setHasMoreSkills(shuffled.length > totalMaxIcons);

      const distributed = shuffled.reduce(
        (acc, skill, index) => {
          if (acc.length >= totalMaxIcons) return acc;

          let radiusIndex = index % RadiusData.length;
          while (
            acc.filter((s) => s.radiusIndex === radiusIndex).length >=
            RadiusData[radiusIndex].max
          ) {
            radiusIndex = (radiusIndex + 1) % RadiusData.length;
          }

          acc.push({
            ...skill,
            radiusIndex,
            index: acc.filter((s) => s.radiusIndex === radiusIndex).length,
          });

          return acc;
        },
        [] as (Skill & { radiusIndex: number; index: number })[],
      );

      setDistributedSkills(distributed);
    }
  }, [skills]);

  if (error) {
    return <div className="text-center text-red-500 dark:text-red-400">{error};</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Chargement des compétences...
      </div>
    );
  }

  return (
    <div className="relative flex size-full flex-col items-center justify-center overflow-hidden">
      {distributedSkills.map((skill) => {
        const { radius, duration, reverse, size } = RadiusData[skill.radiusIndex];
        const totalIconsInRadius = distributedSkills.filter(
          (s) => s.radiusIndex === skill.radiusIndex,
        ).length;
        const angle = (360 / totalIconsInRadius) * skill.index;
        const delay = (skill.index / totalIconsInRadius) * duration;

        return (
          <OrbitingCircles
            key={skill.id}
            className="border-none bg-transparent"
            radius={radius * scale}
            duration={duration}
            delay={delay}
            reverse={reverse}
            angle={angle}
          >
            <Image
              src={skill.iconPath}
              alt={skill.name}
              width={size * scale}
              height={size * scale}
              className="object-contain"
            />
          </OrbitingCircles>
        );
      })}
      {hasMoreSkills && (
        <div className="absolute bottom-4 left-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Info className="mr-2 h-4 w-4" />
          Plus de compétences disponibles
        </div>
      )}
    </div>
  );
}
