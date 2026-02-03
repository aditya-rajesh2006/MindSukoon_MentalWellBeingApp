"use client";

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Camera, Sparkles } from "lucide-react";
import { EmotionModelViewer } from "./EmotionModelViewer";
import { MoodTrends } from "./MoodTrends";
import { auth } from "@/lib/firebase";
import { logMoodWithEmotion } from "@/lib/db";

export  function MoodScanner() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const analyzeMood = async () => {
    if (!capturedImage) return alert("Please capture an image first!");
    setLoading(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      });
      const data = await res.json();
      const detectedEmotion = data.emotion;
      setEmotion(detectedEmotion);
      
      // Map emotions to emojis
      const emotionEmojis: Record<string, string> = {
        happy: "😊",
        sad: "😢",
        angry: "😠",
        fear: "😨",
        surprise: "😲",
        disgust: "🤢",
        neutral: "😐",
      };
      setEmoji(emotionEmojis[detectedEmotion.toLowerCase()] || "😐");
      
      // Save emotion to localStorage for the Model component
      const todayDateString = new Date().toDateString();
      localStorage.setItem(`scanner_emotion_${todayDateString}`, detectedEmotion);
      
      // Trigger animation after a brief delay
      setTimeout(() => setShowResult(true), 300);
      
      // Store mood in database for current user
      const user = auth.currentUser;
      if (user) {
        try {
          console.log("Saving mood to DB for user:", user.uid, "emotion:", detectedEmotion); // DEBUG
          await logMoodWithEmotion(user.uid, detectedEmotion);
          console.log("Mood saved successfully"); // DEBUG
          // Trigger refresh event for MoodTrends component
          window.dispatchEvent(new Event("moodUpdated"));
        } catch (dbError) {
          console.error("Error saving mood to database:", dbError);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error analyzing mood.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 animate-fade-smooth-in">
      <div className="text-center space-y-2 animate-swipe-in-right">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
          Mood Scanner
          <Smile className="w-8 h-8 text-primary animate-glow-pulse" />
        </h1>
        <p className="text-muted-foreground">Understand your emotions in real-time</p>
      </div>

      <Card className="w-full max-w-lg shadow-lg p-4 rounded-2xl card-animate hover-lift">
        <CardContent className="flex flex-col items-center gap-4">
          {/* Webcam preview with glow */}
          <div className="relative w-full rounded-xl overflow-hidden animate-glow-pulse">
            {!capturedImage ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{
                  facingMode: "user", 
                }}
                className="rounded-xl border-2 border-primary/30 w-full aspect-video object-cover"
              />
            ) : (
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="rounded-xl border-2 border-primary/30 w-full aspect-video object-cover animate-splash-in"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 animate-shimmer"></div>
              </div>
            )}
          </div>

          {/* Buttons with animations */}
          <div className="flex gap-3 mt-3 w-full stagger-animate">
            {!capturedImage ? (
              <Button 
                onClick={capture} 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold animate-scale-in"
              >
                <Camera className="mr-2 h-4 w-4" /> Capture
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setCapturedImage(null);
                  setEmotion(null);
                  setEmoji(null);
                  setShowResult(false);
                }}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold animate-scale-in"
              >
                Retake
              </Button>
            )}
            <Button
              onClick={analyzeMood}
              disabled={!capturedImage || loading}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold animate-scale-in"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚡</span> Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Analyze
                </span>
              )}
            </Button>
          </div>

          {/* Mood result with splash animation */}
          {emotion && showResult && (
            <div className="mt-6 text-center w-full p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl animate-splash-pop border border-primary/20">
              <p className="text-sm font-medium text-muted-foreground mb-2">Emotion Detected</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-6xl animate-bounce-spring">{emoji}</span>
              </div>
              <p className="text-2xl font-bold text-primary capitalize">{emotion}</p>
              <p className="text-xs text-muted-foreground mt-2 animate-breathe">✨ Your mood has been recorded</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Display 3D Model after mood checking is done */}
      {emotion && showResult && (
        <Card className="w-full max-w-4xl shadow-lg p-4 rounded-2xl mt-6 card-animate">
          <CardContent className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-center mb-4 flex items-center gap-2 animate-swipe-in-left">
              <Sparkles className="w-6 h-6 text-accent animate-glow-pulse" />
              Your Mood Visualization
              <Sparkles className="w-6 h-6 text-accent animate-glow-pulse" />
            </h2>
            <div className="w-full animate-scale-in">
              <EmotionModelViewer 
                emotion={
                  emotion === "happy" ? "happy" :
                  emotion === "sad" ? "sad" :
                  emotion === "angry" ? "angry" :
                  emotion === "fear" ? "fear" :
                  emotion === "surprise" ? "surprise" :
                  "idle"
                } 
              />
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg w-full border border-primary/20 animate-elevate-gentle">
              <p className="text-sm font-medium text-muted-foreground mb-1">Current Emotion</p>
              <p className="text-lg font-bold text-primary capitalize">{emotion}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Display Mood Trends for Last 7 Days */}
      <div className="w-full max-w-6xl mt-6 animate-fade-smooth-in" style={{ animationDelay: '0.2s' }}>
        <MoodTrends />
      </div>
    </div>
  );
}
