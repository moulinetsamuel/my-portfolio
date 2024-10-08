"use client";

import { useState, useCallback, useMemo } from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import {
  DownloadIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import NavLink from "./NavLink";
import { navItems } from "@/constants";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/Cv/CV_SAMUEL_MOULINET_2024.pdf";
    link.download = "CV_SAMUEL_MOULINET_2024.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const mainNavigation = useMemo(
    () => (
      <nav className="hidden md:flex items-center gap-6 lg:gap-10">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>
    ),
    []
  );

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-theme flex backdrop-blur-md items-center z-50 px-4 sm:px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto">
        <div className="flex justify-between h-full items-center gap-5">
          <ModeToggle />
          {mainNavigation}
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={"default"}
            className="hidden sm:flex gap-2"
            onClick={handleDownloadCV}
            aria-label="Télécharger mon CV"
          >
            Télécharger mon CV
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Sheet
            open={isOpen}
            onOpenChange={(open: boolean) => setIsOpen(open)}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                <HamburgerMenuIcon
                  className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
                  }`}
                />
                <Cross1Icon
                  className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    isOpen ? "rotate-0 scale-100" : "rotate-90 scale-0"
                  }`}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Retrouvez ici les différentes sections de mon portfolio.
                  Cliquez sur une section pour y accéder.
                </SheetDescription>
              </SheetHeader>
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
                  onClick={handleDownloadCV}
                  aria-label="Télécharger mon CV"
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
