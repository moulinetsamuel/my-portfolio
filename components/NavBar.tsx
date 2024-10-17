'use client';

import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import ModeToggle from './ModeToggle';
import { Button } from './ui/button';
import { DownloadIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import NavLink from './NavLink';
import { navItems } from '@/constants';
import { getCV } from '@/lib/api/cv';
import type { CV } from '@/lib/schemas/cv/cvSchemas';
import { useToast } from '@/hooks/use-toast';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: cv, error } = useSWR<CV | null>('/api/cv', getCV);
  const { toast } = useToast();

  const handleDownloadCV = useCallback(() => {
    if (cv && cv.filePath) {
      const link = document.createElement('a');
      link.href = cv.filePath;
      link.download = cv.filePath.split('/').pop() || 'CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('CV file path not available');
      toast({
        title: 'Erreur',
        description: "Le CV n'est pas disponible pour le téléchargement.",
        variant: 'destructive',
      });
    }
  }, [cv, toast]);

  const mainNavigation = useMemo(
    () => (
      <nav className="hidden items-center gap-6 md:flex lg:gap-10">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>
    ),
    [],
  );

  return (
    <header className="shadow-theme fixed top-0 z-50 flex h-[65px] w-full items-center px-4 backdrop-blur-md sm:px-10">
      <div className="m-auto flex size-full flex-row items-center justify-between">
        <div className="flex h-full items-center justify-between gap-5">
          <ModeToggle />
          {mainNavigation}
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={'default'}
            className="hidden gap-2 sm:flex"
            onClick={handleDownloadCV}
            disabled={!cv || error}
            aria-label="Télécharger mon CV"
          >
            Télécharger mon CV
            <DownloadIcon className="size-4" />
          </Button>
          <Sheet open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                <HamburgerMenuIcon
                  className={`size-[1.2rem] transition-all ${
                    isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
                  }`}
                />
                <Cross1Icon
                  className={`absolute size-[1.2rem] transition-all ${
                    isOpen ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
                  }`}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Retrouvez ici les différentes sections de mon portfolio. Cliquez sur une
                  section pour y accéder.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
                <Button
                  variant={'default'}
                  className="mt-4 flex gap-2 sm:hidden"
                  onClick={handleDownloadCV}
                  disabled={!cv || error}
                  aria-label="Télécharger mon CV"
                >
                  Télécharger mon CV
                  <DownloadIcon className="size-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
