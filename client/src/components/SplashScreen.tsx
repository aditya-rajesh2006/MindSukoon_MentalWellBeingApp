import React, { useEffect, useState } from 'react';
import { Heart, Brain, Leaf, Smile, Zap, Shield } from 'lucide-react';

const icons = [
  { Icon: Heart, color: 'hsl(200 70% 50%)', label: 'Compassion' },
  { Icon: Brain, color: 'hsl(200 70% 50%)', label: 'Clarity' },
  { Icon: Leaf, color: 'hsl(120 40% 65%)', label: 'Growth' },
  { Icon: Smile, color: 'hsl(270 65% 60%)', label: 'Happiness' },
  { Icon: Zap, color: 'hsl(270 65% 60%)', label: 'Energy' },
  { Icon: Shield, color: 'hsl(120 40% 65%)', label: 'Safety' },
];

export function SplashScreen() {
  const [loadingText, setLoadingText] = useState('Preparing your wellness journey');

  useEffect(() => {
    const textSequence = [
      'Preparing your wellness journey',
      'Connecting to calm spaces',
      'Unlocking mental clarity',
      'Almost ready...'
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % textSequence.length;
      setLoadingText(textSequence[currentIndex]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center overflow-hidden relative">
      {/* Subtle animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" 
          style={{ animation: 'float 12s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" 
          style={{ animation: 'float 12s ease-in-out infinite 2s' }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-16 px-4">
        
        {/* Logo/Title Area */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h1>
          <p className="text-primary/70 text-lg font-light tracking-wide">Your Journey to Inner Peace</p>
        </div>

        {/* Orbiting Icons - Cleaner Design */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Concentric circles for guidance */}
          <div className="absolute inset-0 rounded-full border border-primary/10"></div>
          <div className="absolute inset-8 rounded-full border border-primary/5"></div>

          {/* Center heart with enhanced glow */}
          <div className="relative flex items-center justify-center z-20">
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-lg"
              style={{
                animation: 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                width: '64px',
                height: '64px',
              }}
            ></div>
            <div 
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl backdrop-blur-md"
              style={{
                boxShadow: '0 0 40px hsl(200 70% 50% / 0.3), inset 0 0 20px hsl(0 0% 100% / 0.1)',
              }}
            >
              <Heart className="w-8 h-8 text-white" fill="white" strokeWidth={1} />
            </div>
          </div>

          {/* Orbiting icons - refined */}
          {icons.map((item, index) => (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{
                animation: `orbit-smooth 24s linear infinite`,
                animationDelay: `${(index * 24) / 6}s`,
              }}
            >
              <div
                className="absolute flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  width: '56px',
                  height: '56px',
                  background: `linear-gradient(135deg, ${item.color}15, ${item.color}25)`,
                  border: `2px solid ${item.color}50`,
                  backdropFilter: 'blur(8px)',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: `0 4px 12px ${item.color}20`,
                }}
              >
                <item.Icon 
                  className="w-6 h-6"
                  style={{ color: item.color }}
                  strokeWidth={1.5}
                />
              </div>
            </div>
          ))}

          {/* Rotating rings - subtle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid',
              borderColor: 'hsl(200 70% 50% / 0.2)',
              animation: 'spin-slow 4s linear infinite',
            }}
          ></div>
          <div 
            className="absolute inset-6 rounded-full"
            style={{
              border: '1px solid',
              borderColor: 'hsl(270 65% 60% / 0.2)',
              animation: 'spin-slow-reverse 6s linear infinite',
            }}
          ></div>
        </div>

        {/* Loading section - bottom */}
        <div className="flex flex-col items-center gap-6 w-full max-w-xs">
          
          {/* Dynamic status text */}
          <div className="h-7 flex items-center justify-center">
            <p className="text-primary/60 text-sm font-medium text-center min-h-7 transition-opacity duration-500">
              {loadingText}
            </p>
          </div>

          {/* Loading bar - cleaner */}
          <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
              style={{
                animation: 'slide-smooth 2.5s ease-in-out infinite',
                width: '40%'
              }}
            ></div>
          </div>

          {/* Dots animation - centered and refined */}
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-full bg-primary/60 backdrop-blur-sm"
                style={{
                  width: '8px',
                  height: '8px',
                  animation: `bounce-smooth 1.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-primary/40 text-center max-w-sm font-light tracking-wide">
          Welcome to your personal mental wellness sanctuary
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes orbit-smooth {
          from {
            transform: rotateZ(0deg) translateX(144px) rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg) translateX(144px) rotateZ(-360deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotateZ(360deg);
          }
          to {
            transform: rotateZ(0deg);
          }
        }

        @keyframes slide-smooth {
          0%, 100% {
            width: 40%;
            transform: translateX(-100%);
          }
          50% {
            width: 40%;
            transform: translateX(300%);
          }
        }

        @keyframes bounce-smooth {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-14px);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
