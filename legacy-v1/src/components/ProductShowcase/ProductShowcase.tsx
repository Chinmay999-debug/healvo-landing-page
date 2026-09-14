import { useState, useRef, useEffect } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { Play, Pause, RotateCcw } from "lucide-react";

interface Chapter {
  start: number;
  end: number;
  label: string;
  path: string;
}

const CHAPTERS: Chapter[] = [
  { start: 0, end: 4.5, label: "Clinic Overview", path: "/overview" },
  { start: 4.5, end: 8.5, label: "Patient Directory", path: "/patients" },
  { start: 8.5, end: 13.0, label: "Patient Record", path: "/patients/priya-sharma" },
  { start: 13.0, end: 18.5, label: "FDI Dental Chart", path: "/patients/priya-sharma/dental-chart" },
  { start: 18.5, end: 23.0, label: "Consultation & Notes", path: "/patients/priya-sharma/consultation" },
  { start: 23.0, end: 27.5, label: "Billing & Collections", path: "/billing" },
  { start: 27.5, end: 32.0, label: "Healvo AI Assistant", path: "/overview?ai=open" },
];

export function ProductShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentChapter, setCurrentChapter] = useState<Chapter>(CHAPTERS[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      const duration = video.duration || 31.5;
      setProgress((time / duration) * 100);

      const active = CHAPTERS.find((ch) => time >= ch.start && time < ch.end) || CHAPTERS[0];
      setCurrentChapter(active);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
  };

  return (
    <div className="w-full relative">
      <BrowserFrame currentPath={currentChapter.path}>
        <div className="relative group w-full aspect-[1440/860] bg-[#f8fafc]">
          {/* Real Recorded Healvo Walkthrough Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover block"
            poster="/healvo_walkthrough_poster.png"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Demonstration of Healvo clinic management software in actual operation"
          >
            <source src="/healvo_walkthrough.mp4" type="video/mp4" />
            <source src="/healvo_walkthrough.webm" type="video/webm" />
            Your browser does not support HTML5 video.
          </video>

          {/* Unobtrusive Chapter Pill */}
          <div className="absolute top-3.5 right-3.5 pointer-events-none z-10 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-white shadow-lg text-[12px] font-medium select-none">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
              <span className="text-slate-300">Demo:</span>
              <span className="font-semibold text-white">{currentChapter.label}</span>
            </div>
          </div>

          {/* Subtle Control Overlay (appears on hover or when paused) */}
          <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={togglePlay}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md border border-white/15 text-[11.5px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button
              type="button"
              onClick={restartVideo}
              className="p-1.5 rounded-lg bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer shadow-md"
              aria-label="Replay from start"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Video Timeline Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-black/15">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-[#0ea5b7] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}
