import { Heart, Brain, Leaf, Smile, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  icon: React.ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right" | "top-center" | "middle-left" | "middle-right" | "random-1" | "random-2" | "random-3" | "random";
  delay?: number;
  size?: "sm" | "md" | "lg";
  opacity?: number;
}

const positionClasses = {
  "top-left": "top-10 left-5 md:top-20 md:left-10",
  "top-right": "top-10 right-5 md:top-20 md:right-10",
  "bottom-left": "bottom-10 left-5 md:bottom-20 md:left-10",
  "bottom-right": "bottom-10 right-5 md:bottom-20 md:right-10",
  "center-left": "top-1/2 left-3 md:left-8 -translate-y-1/2",
  "center-right": "top-1/2 right-3 md:right-8 -translate-y-1/2",
  "top-center": "top-16 left-1/2 -translate-x-1/2",
  "middle-left": "top-1/3 left-4 md:left-6",
  "middle-right": "top-2/3 right-4 md:right-6",
  "random-1": "top-1/4 left-1/4",
  "random-2": "top-3/4 right-1/4",
  "random-3": "top-1/3 right-1/3",
};

const sizeClasses = {
  sm: "w-8 h-8 md:w-12 md:h-12",
  md: "w-12 h-12 md:w-16 md:h-16",
  lg: "w-16 h-16 md:w-24 md:h-24",
};

export function FloatingElement({
  icon,
  position = "random",
  delay = 0,
  size = "md",
  opacity = 0.6,
}: FloatingElementProps) {
  // Get random position if "random" is specified
  const positions = Object.keys(positionClasses) as Array<keyof typeof positionClasses>;
  const randomPosition = position === "random" 
    ? positions[Math.floor(Math.random() * positions.length)]
    : (position as keyof typeof positionClasses);

  return (
    <div
      className={cn(
        "absolute pointer-events-none",
        positionClasses[randomPosition]
      )}
      style={{
        animation: `float-element 4.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className={cn(
          "text-primary/95 filter drop-shadow-lg transition-transform hover:scale-110 mental-health-glow",
          sizeClasses[size]
        )}
        style={{ opacity }}
      >
        {icon}
      </div>
    </div>
  );
}

export function MentalHealthElements() {
  const elements = [
    { icon: <Heart className="w-full h-full" />, position: "random" as const, delay: 0 },
    { icon: <Brain className="w-full h-full" />, position: "random" as const, delay: 1 },
    { icon: <Leaf className="w-full h-full" />, position: "random" as const, delay: 2, size: "sm" as const },
    { icon: <Smile className="w-full h-full" />, position: "random" as const, delay: 0.5 },
    { icon: <Zap className="w-full h-full" />, position: "random" as const, delay: 1.5, size: "sm" as const },
    { icon: <Shield className="w-full h-full" />, position: "random" as const, delay: 1 },
  ];

  return (
    <>
      {elements.map((el, idx) => (
        <FloatingElement
          key={idx}
          icon={el.icon}
          position={el.position}
          delay={el.delay}
          size={el.size}
          opacity={0.75}
        />
      ))}

      <style>{`
        @keyframes float-element {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-35px) rotate(8deg) scale(1.08);
          }
          50% {
            transform: translateY(0px) rotate(-8deg) scale(1);
          }
          75% {
            transform: translateY(-25px) rotate(5deg) scale(1.05);
          }
        }
      `}</style>
    </>
  );
}
