import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

export default function NavBar() {
  return (
    <header className="w-full h-[65px] fixed top-0 shadow-theme flex backdrop-blur-md items-center z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto">
        <div className="flex justify-between h-full items-center gap-5">
          <ModeToggle />
          <nav className="flex items-center gap-10">
            <Link href="#about-me" className="relative group">
              Qui suis-je ?
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="#skills" className="relative group">
              Compétences
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="#projects" className="relative group">
              Projets
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="#contact" className="relative group">
              Contact
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </nav>
        </div>
        <Button variant={"outline"} className="flex gap-2 hover">
          Télécharger mon CV
          <DownloadIcon />
        </Button>
      </div>
    </header>
  );
}
