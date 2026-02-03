"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { MeetAI } from "@/components/MeetAI";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { auth } from "@/lib/firebase";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MentalHealthElements } from "@/components/MentalHealthElements";
import { PageMentalHealthElements } from "@/components/PageMentalHealthElements";

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* ✅ Simplified Header (now self-contained) */}
      <Header />

      {/* 🌈 Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-green-300/20 to-blue-400/20 blur-3xl rounded-full -top-40 -left-40 animate-float-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl rounded-full bottom-0 right-0 animate-float-slower"></div>

      {/* 🏠 Main Content */}
      {!showProfile && !showSettings ? (
        <>
          {/* Animated Hero Section with Floating Elements */}
          <div className="relative">
            <MentalHealthElements />
            <AnimatedSection animationType="fade-up" delay={0}>
              <Hero />
            </AnimatedSection>
          </div>

          {/* How It Works - Fade from left */}
          <div className="relative">
            <PageMentalHealthElements section="how-it-works" />
            <AnimatedSection animationType="fade-left" delay={50}>
              <HowItWorks />
            </AnimatedSection>
          </div>

          {/* Features Section - Scale animation */}
          <div className="relative">
            <PageMentalHealthElements section="features" />
            <AnimatedSection animationType="scale" delay={80}>
              <FeaturesSection />
            </AnimatedSection>
          </div>

          {/* Why Choose Us - Fade from right */}
          <div className="relative">
            <PageMentalHealthElements section="why-choose" />
            <AnimatedSection animationType="fade-right" delay={50}>
              <WhyChooseUs />
            </AnimatedSection>
          </div>

          {/* Meet AI - Slide up */}
          <div className="relative">
            <PageMentalHealthElements section="meet-ai" />
            <AnimatedSection animationType="slide-up" delay={100}>
              <MeetAI />
            </AnimatedSection>
          </div>

          {/* Testimonials - Fade down */}
          <div className="relative">
            <PageMentalHealthElements section="testimonials" />
            <AnimatedSection animationType="fade-down" delay={70}>
              <Testimonials />
            </AnimatedSection>
          </div>

          {/* Footer - Fade up */}
          <AnimatedSection animationType="fade-up" delay={50}>
            <Footer />
          </AnimatedSection>

          <ChatBot />
        </>
      ) : showProfile ? (
        <ProfilePage onBack={() => setShowProfile(false)} />
      ) : (
        <SettingsPage onBack={() => setShowSettings(false)} />
      )}

      {/* ✨ Floating Animation Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(50px) translateX(30px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-60px) translateX(-30px) scale(1.05); }
        }
        @keyframes scroll-fade-up {
          from {
            opacity: 0;
            transform: translateY(60px) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        @keyframes scroll-fade-down {
          from {
            opacity: 0;
            transform: translateY(-60px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        @keyframes scroll-fade-left {
          from {
            opacity: 0;
            transform: translateX(-80px) skewY(5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewY(0deg);
          }
        }
        @keyframes scroll-fade-right {
          from {
            opacity: 0;
            transform: translateX(80px) skewY(-5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewY(0deg);
          }
        }
        @keyframes scroll-scale {
          from {
            opacity: 0;
            transform: scale(0.8) rotateZ(-5deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateZ(0deg);
          }
        }
        @keyframes scroll-slide-up {
          from {
            opacity: 0;
            transform: translateY(80px) rotateX(-15deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        .animate-float-slow { animation: float-slow 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .animate-float-slower { animation: float-slower 10s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .animate-scroll-fade-up { animation: scroll-fade-up 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scroll-fade-down { animation: scroll-fade-down 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scroll-fade-left { animation: scroll-fade-left 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scroll-fade-right { animation: scroll-fade-right 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scroll-scale { animation: scroll-scale 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scroll-slide-up { animation: scroll-slide-up 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
}
