import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { OceanThemeConfig } from '../types';

interface OceanBackgroundProps {
  config?: Partial<OceanThemeConfig>;
}

export const OceanBackground: React.FC<OceanBackgroundProps> = ({ config }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default high quality underwater looping video sources
  const videoSources = [
    'https://assets.mixkit.co/videos/preview/mixkit-underwater-view-of-sunbeams-in-the-sea-4155-large.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // fallback if needed
  ];

  const oceanToneClasses = {
    'deep-abyss': 'from-[#020b14] via-[#051829] to-[#010912]',
    'bioluminescent': 'from-[#031525] via-[#052b46] to-[#02131e]',
    'caribbean-cyan': 'from-[#031f30] via-[#083a54] to-[#041a29]',
    'twilight-coral': 'from-[#091526] via-[#10243b] to-[#060e1a]'
  };

  const currentTone = config?.oceanTone || 'bioluminescent';

  // Bubbles generator
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; size: number; duration: number; delay: number; opacity: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.15
    }));
    setBubbles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Ocean Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${oceanToneClasses[currentTone]} transition-colors duration-1000`} />

      {/* Video Layer */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-1000">
        {!videoFailed && (
          <video
            ref={videoRef}
            src={config?.videoSource || videoSources[0]}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => {
              setVideoFailed(true);
            }}
            className="w-full h-full object-cover filter brightness-90 contrast-110 saturate-125"
          />
        )}
      </div>

      {/* Underwater Caustics & Sunbeam Light Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/15 via-transparent to-transparent opacity-80" />
      <div className="absolute -top-32 left-1/4 w-[600px] h-[700px] bg-gradient-to-b from-cyan-300/10 to-transparent rotate-12 blur-3xl transform pointer-events-none animate-pulse" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[600px] bg-gradient-to-b from-teal-300/10 to-transparent -rotate-12 blur-3xl transform pointer-events-none" />

      {/* Realistic Animated Shark 1 (Foreground/Mid-Depth Cruiser) */}
      <motion.div
        initial={{ x: '-25vw', y: '25vh', opacity: 0 }}
        animate={{
          x: ['-20vw', '110vw'],
          y: ['25vh', '20vh', '30vh', '22vh'],
          opacity: [0, 0.45, 0.5, 0]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute top-0 left-0 w-64 md:w-88 filter drop-shadow-[0_10px_25px_rgba(0,180,255,0.25)] blur-[0.6px]"
      >
        <svg viewBox="0 0 450 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-cyan-200/50">
          <g className="animate-[wiggle_2.4s_ease-in-out_infinite] origin-center">
            {/* Shark Body Silhouette with bioluminescent ocean tint */}
            <path
              d="M420 85 C390 75 330 65 270 58 C210 50 160 55 120 70 C80 82 50 88 15 90 C30 85 45 78 50 70 C40 60 25 50 5 45 C15 58 20 72 15 88 C8 93 2 95 0 96 C5 98 12 100 20 102 C25 118 20 132 5 145 C25 140 40 130 50 120 C45 112 30 105 15 100 C50 102 80 108 120 120 C160 135 210 140 270 132 C330 125 390 115 420 105 C440 98 450 95 440 90 C435 88 428 86 420 85 Z"
              fill="url(#sharkGrad1)"
            />
            {/* Dorsal Fin */}
            <path
              d="M210 55 C225 35 240 10 255 2 C252 20 248 38 238 52 Z"
              fill="url(#sharkDorsalGrad)"
            />
            {/* Pectoral Fin Left */}
            <path
              d="M270 128 C280 150 295 175 320 178 C310 160 300 142 290 126 Z"
              fill="url(#sharkFinGrad)"
            />
            {/* Secondary Dorsal & Anal fins */}
            <path d="M100 68 C105 58 112 50 120 48 C118 56 115 62 110 66 Z" fill="url(#sharkFinGrad)" opacity="0.8" />
            <path d="M95 122 C100 132 108 138 115 140 C112 134 110 128 106 124 Z" fill="url(#sharkFinGrad)" opacity="0.8" />
            {/* Eye & Gill slits subtle glow */}
            <circle cx="395" cy="88" r="2.5" fill="#38bdf8" opacity="0.85" />
            <path d="M360 80 Q356 92 360 105" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <path d="M352 82 Q348 92 352 103" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
            <path d="M344 84 Q340 92 344 101" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          </g>
          <defs>
            <linearGradient id="sharkGrad1" x1="450" y1="90" x2="0" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#0369a1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="sharkDorsalGrad" x1="255" y1="2" x2="210" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="sharkFinGrad" x1="320" y1="178" x2="270" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Realistic Animated Shark 2 (Deep Background Shadow, moving opposite direction) */}
      <motion.div
        initial={{ x: '110vw', y: '65vh', opacity: 0 }}
        animate={{
          x: ['110vw', '-30vw'],
          y: ['65vh', '70vh', '60vh', '68vh'],
          opacity: [0, 0.25, 0.3, 0]
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 12
        }}
        className="absolute top-0 left-0 w-80 md:w-96 filter blur-[2.5px] scale-x-[-1]"
      >
        <svg viewBox="0 0 450 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-cyan-900/30">
          <g>
            <path
              d="M420 85 C390 75 330 65 270 58 C210 50 160 55 120 70 C80 82 50 88 15 90 C30 85 45 78 50 70 C40 60 25 50 5 45 C15 58 20 72 15 88 C8 93 2 95 0 96 C5 98 12 100 20 102 C25 118 20 132 5 145 C25 140 40 130 50 120 C45 112 30 105 15 100 C50 102 80 108 120 120 C160 135 210 140 270 132 C330 125 390 115 420 105 C440 98 450 95 440 90 Z"
              fill="#0369a1"
              fillOpacity="0.3"
            />
            <path d="M210 55 C225 35 240 10 255 2 C252 20 248 38 238 52 Z" fill="#0284c7" fillOpacity="0.25" />
            <path d="M270 128 C280 150 295 175 320 178 C310 160 300 142 290 126 Z" fill="#0284c7" fillOpacity="0.25" />
          </g>
        </svg>
      </motion.div>

      {/* Floating Ocean Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '105vh', x: `${b.x}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [`${b.x}vw`, `${b.x + (b.id % 2 === 0 ? 2 : -2)}vw`, `${b.x}vw`],
            opacity: [0, b.opacity, b.opacity, 0]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear'
          }}
          style={{ width: b.size, height: b.size }}
          className="absolute rounded-full bg-gradient-to-t from-cyan-200/40 to-white/70 border border-cyan-100/60 shadow-[0_0_8px_rgba(56,189,248,0.4)] backdrop-blur-xs"
        />
      ))}

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(1,8,18,0.75)_100%)]" />
    </div>
  );
};
