import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "slide-up";
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animationType = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  const animationClass = {
    "fade-up": "animate-scroll-fade-up",
    "fade-down": "animate-scroll-fade-down",
    "fade-left": "animate-scroll-fade-left",
    "fade-right": "animate-scroll-fade-right",
    "scale": "animate-scroll-scale",
    "slide-up": "animate-scroll-slide-up",
  }[animationType];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? animationClass : "opacity-0 translate-y-10",
        className
      )}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
