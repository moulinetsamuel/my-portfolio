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
  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent className="h-full">
        {projects.map((project) => (
          <CarouselItem key={project.id} className="h-full">
            <Card className="border-none shadow-none h-full">
              <CardContent className="flex flex-col justify-between p-8 h-full">
                <div className="flex flex-col items-center gap-8">
                  <div className="h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-4 text-center">
                        {project.title}
                      </h3>
                      <p className="text-lg mb-6">{project.description}</p>
                    </div>
                    <div className="flex gap-10 mb-6 justify-center">
                      {project.stack.map((techId) => {
                        const skill = SkillIcons.find((s) => s.id === techId);
                        return skill ? (
                          <Image
                            key={skill.id}
                            src={`icons/skills${skill.icon_url}`}
                            alt={skill.name}
                            width={50}
                            height={50}
                            className="mb-2"
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <Button size="lg" asChild>
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Voir le site
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Code source
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
