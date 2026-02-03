import { Heart, Brain, Leaf, Smile, Zap, Shield, Sparkles, Activity, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageMentalHealthElementProps {
  section: "how-it-works" | "features" | "why-choose" | "meet-ai" | "testimonials";
}

const sectionElements = {
  "how-it-works": [
    { icon: <Brain className="w-full h-full" />, position: "random" },
    { icon: <Sparkles className="w-full h-full" />, position: "random" },
  ],
  "features": [
    { icon: <Heart className="w-full h-full" />, position: "random" },
    { icon: <Zap className="w-full h-full" />, position: "random" },
  ],
  "why-choose": [
    { icon: <Shield className="w-full h-full" />, position: "random" },
    { icon: <Leaf className="w-full h-full" />, position: "random" },
  ],
  "meet-ai": [
    { icon: <Lightbulb className="w-full h-full" />, position: "random" },
    { icon: <Activity className="w-full h-full" />, position: "random" },
  ],
  "testimonials": [
    { icon: <Smile className="w-full h-full" />, position: "random" },
    { icon: <Heart className="w-full h-full" />, position: "random" },
  ],
};


interface FloatingIconProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "middle-left" | "middle-right" | "random";
  delay?: number;
}

function SectionFloatingIcon({ icon, position, delay = 0 }: FloatingIconProps & { icon: React.ReactNode }) {
  const positionClasses = {
    "top-left": "top-8 left-4 md:top-12 md:left-8",
    "top-right": "top-8 right-4 md:top-12 md:right-8",
    "bottom-left": "bottom-8 left-4 md:bottom-12 md:left-8",
    "bottom-right": "bottom-8 right-4 md:bottom-12 md:right-8",
    "top-center": "top-8 left-1/2 -translate-x-1/2 md:top-12",
    "middle-left": "top-1/2 -translate-y-1/2 left-4 md:left-8",
    "middle-right": "top-1/2 -translate-y-1/2 right-4 md:right-8",
    "random-1": "top-1/4 left-1/4",
    "random-2": "top-1/3 right-1/4",
    "random-3": "bottom-1/4 left-1/3",
  };

  // Get random position if "random" is specified
  const positions = Object.keys(positionClasses) as Array<keyof typeof positionClasses>;
  const displayPosition = position === "random" 
    ? positions[Math.floor(Math.random() * positions.length)]
    : (position as keyof typeof positionClasses);

  return (
    <div
      className={cn(
        "absolute pointer-events-none w-10 h-10 md:w-14 md:h-14",
        positionClasses[displayPosition]
      )}
      style={{
        animation: `float-element 4.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.7,
      }}
    >
      <div className="text-primary/90 filter drop-shadow-lg w-full h-full mental-health-glow">
        {icon}
      </div>
    </div>
  );
}

export function PageMentalHealthElements({ section }: PageMentalHealthElementProps) {
  const elements = sectionElements[section];

  return (
    <>
      {elements.map((el, idx) => (
        <SectionFloatingIcon
          key={idx}
          icon={el.icon}
          position={el.position as "top-left" | "top-right" | "bottom-left" | "bottom-right"}
          delay={idx * 0.5}
        />
      ))}

      <style>{`
        @keyframes float-element {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-25px) rotate(6deg) scale(1.06);
          }
          50% {
            transform: translateY(0px) rotate(-6deg) scale(1);
          }
          75% {
            transform: translateY(-18px) rotate(4deg) scale(1.04);
          }
        }
      `}</style>
    </>
  );
}
