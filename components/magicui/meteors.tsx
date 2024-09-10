"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: Math.random() * window.innerHeight + "px", // Météores démarrant à des hauteurs aléatoires
      left: Math.random() * window.innerWidth + "px",
      animationDelay: Math.random() * 2 + "s",
      animationDuration: Math.random() * 8 + 5 + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="meteor-container">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-primary shadow-[0_0_0_1px_#ffffff10]"
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-primary to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
