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

// Définissez un type pour vos projets
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  stack: string[];
  siteUrl: string;
  repoUrl: string;
};

// Données factices des projets (à remplacer par vos vraies données)
const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Personnel",
    description: "Mon site portfolio présentant mes projets et compétences.",
    image: "/placeholder.svg?height=300&width=400",
    stack: ["react", "nextjs", "tailwind", "typescript", "vercel"],
    siteUrl: "https://monportfolio.com",
    repoUrl: "https://github.com/moulinetsamuel/my-portfolio",
  },
  {
    id: 2,
    title: "Application de Gestion de Tâches",
    description: "Une application web pour gérer vos tâches quotidiennes.",
    image: "/placeholder.svg?height=300&width=400",
    stack: ["vue", "firebase", "vuetify"],
    siteUrl: "https://taskmanager.com",
    repoUrl: "https://github.com/moulinetsamuel/task-manager",
  },
  // Ajoutez d'autres projets ici
];

export default function ProjectCarousel() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.id}>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-center mb-4">{project.description}</p>
                <div className="flex justify-center space-x-2 mb-4">
                  {project.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Button asChild>
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir le site
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
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
