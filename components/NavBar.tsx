"use client";

import { useState } from "react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import {
  DownloadIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#about-me", label: "Qui suis-je ?" },
    { href: "#skills", label: "Compétences" },
    { href: "#projects", label: "Projets" },
    { href: "#contact", label: "Contact" },
  ];

  const NavLink = ({
    href,
    label,
    onClick,
  }: {
    href: string;
    label: string;
    onClick?: () => void;
  }) => (
    <Link href={href} className="relative group" onClick={onClick}>
      {label}
      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </Link>
  );

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-theme flex backdrop-blur-md items-center z-50 px-4 sm:px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto">
        <div className="flex justify-between h-full items-center gap-5">
          <ModeToggle />
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"default"} className="hidden sm:flex gap-2">
            Télécharger mon CV
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                <Cross1Icon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
                <Button
                  variant={"default"}
                  className="flex gap-2 mt-4 sm:hidden"
                >
                  Télécharger mon CV
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
