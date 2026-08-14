import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Music, 
  ChevronDown, 
  ChevronUp, 
  Waves,
  Disc3
} from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export const MusicPlayer: React.FC = () => {
  const [state, setState] = useState(audioManager.getState());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(() => {
      setState(audioManager.getState());
    });
    return unsubscribe;
  }, []);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.togglePlay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioManager.setVolume(val);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.toggleMute();
  };

  const currentVolume = state.isMuted ? 0 : state.volume;

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-40 select-none">
      <motion.div
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        {/* Main Glass Player Container */}
        <div 
          className="relative bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-cyan-500/25 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(0,180,255,0.18)] hover:shadow-[0_12px_40px_rgba(0,210,255,0.3)] transition-all duration-300 overflow-hidden text-white group"
        >
          {/* Subtle Specular Glow Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

          {/* Compact / Header Bar */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 px-3.5 py-2.5 md:px-4 md:py-3 cursor-pointer"
          >
            {/* Spinning Disc / Wave Icon */}
            <div className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              {state.isPlaying ? (
                <Disc3 className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
              ) : (
                <Music className="w-4 h-4" />
              )}
              {state.isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
              )}
            </div>

            {/* Track Info (Single Song) */}
            <div className="flex flex-col max-w-[130px] sm:max-w-[170px]">
              <span className="text-xs font-semibold text-white/90 truncate flex items-center gap-1.5">
                {state.currentTrack.title}
              </span>
              <span className="text-[10px] text-cyan-200/70 truncate">
                {state.isPlaying ? 'Now Playing' : 'Ocean Ambience'}
              </span>
            </div>

            {/* Quick Play/Pause Button */}
            <button
              id="quick-play-pause-btn"
              onClick={handlePlayToggle}
              aria-label={state.isPlaying ? 'Pause music' : 'Play music'}
              className="p-1.5 rounded-full bg-cyan-500/30 hover:bg-cyan-400/50 active:scale-95 text-cyan-100 border border-cyan-300/30 transition-all ml-1"
            >
              {state.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>

            {/* Expand / Collapse Icon */}
            <button 
              aria-label="Toggle player controls"
              className="p-1 text-white/60 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expanded Controls Drawer */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-white/10 px-4 py-3.5 bg-black/20 space-y-3.5"
              >
                {/* Audio Equalizer & Track Details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 h-4">
                    {[0.6, 1, 0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={state.isPlaying ? {
                          height: ['20%', `${h * 100}%`, '30%', `${h * 80}%`]
                        } : { height: '25%' }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8 + i * 0.15,
                          ease: 'easeInOut'
                        }}
                        className="w-1 bg-gradient-to-t from-cyan-400 to-teal-200 rounded-full"
                      />
                    ))}
                    <span className="text-[11px] text-cyan-200/80 font-medium ml-2">
                      {state.currentTrack.artist}
                    </span>
                  </div>

                  <span className="text-[10px] text-cyan-300/80 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/25">
                    Continuous Loop
                  </span>
                </div>

                {/* Volume Slider Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-white/70">
                    <span className="flex items-center gap-1">
                      <Waves className="w-3 h-3 text-cyan-300" />
                      Volume
                    </span>
                    <span className="font-mono text-cyan-300 font-medium">
                      {Math.round(currentVolume * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={handleMuteToggle}
                      aria-label="Toggle mute"
                      className="text-cyan-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
                    >
                      {currentVolume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-300" />
                      ) : currentVolume < 0.4 ? (
                        <Volume1 className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    {/* Custom Range Slider with Cyan Gradient */}
                    <input
                      id="music-volume-range"
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={currentVolume}
                      onChange={handleVolumeChange}
                      aria-label="Music volume slider"
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quick Helper text */}
                <div className="text-[10px] text-center text-white/50 italic">
                  Continuous ocean waves & ambient chimes
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
