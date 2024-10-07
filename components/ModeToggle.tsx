"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isRotating, setIsRotating] = React.useState(false);

  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setIsRotating(false);
    }, 150); // Half of the animation duration
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Basculer vers le mode ${
        theme === "dark" ? "clair" : "sombre"
      }`}
      className="relative overflow-hidden"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
          isRotating ? "animate-spin" : ""
        }`}
      >
        {theme === "dark" ? (
          <SunIcon className="size-[1.2rem] transition-all" />
        ) : (
          <MoonIcon className="size-[1.2rem] transition-all" />
        )}
      </div>
    </Button>
  );
}
