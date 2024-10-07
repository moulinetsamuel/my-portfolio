"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SkillIcons } from "@/constants";
import { type CarouselApi } from "@/components/ui/carousel";

type ProjectsProps = {
  projects: {
    id: number;
    title: string;
    description: string;
    image: string;
    stack: number[];
    siteUrl: string;
    repoUrl: string;
  }[];
};

export default function ProjectCarousel({ projects }: ProjectsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToSlide = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id}>
              <Card className="border shadow-md">
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="mb-2 text-xl font-bold md:text-2xl">
                          {project.title}
                        </h3>
                        <p className="mb-4 text-sm md:text-base">
                          {project.description}
                        </p>
                        <div className="mb-4 flex flex-wrap gap-3">
                          {project.stack.map((techId) => {
                            const skill = SkillIcons.find(
                              (s) => s.id === techId
                            );
                            return skill ? (
                              <Image
                                key={skill.id}
                                src={`icons/skills${skill.icon_url}`}
                                alt={skill.name}
                                width={30}
                                height={30}
                                className="transition-transform hover:scale-110"
                              />
                            ) : null;
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col justify-start gap-4 sm:flex-row">
                        <Button asChild>
                          <a
                            href={project.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 size-4" />
                            Voir le site
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 size-4" />
                            Code source
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      <div className="mt-4 flex justify-center">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`mx-1 size-3 rounded-full transition-all duration-300 ${
              index === current - 1
                ? "scale-125 bg-primary"
                : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
            }`}
            aria-label={`Aller au projet ${index + 1} sur ${count}`}
          />
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
        Projet {current} sur {count}
      </div>
    </div>
  );
}
