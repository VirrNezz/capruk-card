import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles,
  Gamepad2,
  Tv,
  Compass
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const statusColors = {
  online: 'bg-emerald-400 text-emerald-950 border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]',
  idle: 'bg-amber-400 text-amber-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.7)]',
  dnd: 'bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.7)]',
  offline: 'bg-slate-400 text-slate-900 border-slate-300'
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile
}) => {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-4">
      {/* Avatar Container with Glowing Ocean Ring */}
      <div className="relative group">
        {/* Bioluminescent Outer Glow */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        
        {/* Ripple Wave Outer Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-400/80 via-white/40 to-blue-600/80 shadow-[0_0_30px_rgba(0,210,255,0.4)]">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/40 bg-slate-900 relative">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Status Indicator Bubble */}
          <div 
            title={profile.statusText}
            className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center ${statusColors[profile.status]}`}
          >
            <span className="w-2 h-2 rounded-full bg-white/80 animate-ping" />
          </div>
        </div>
      </div>

      {/* Name, Handle & Verified Badge */}
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {profile.name}
          </h1>
          <span title="Verified Ocean Creator">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-cyan-200/90 font-medium">
          <span>@{profile.username}</span>
          <span>•</span>
          <span className="text-teal-300 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            {profile.tagline}
          </span>
        </div>
      </div>

      {/* Bio Paragraph */}
      <p className="text-xs sm:text-sm text-slate-200/90 max-w-md mx-auto leading-relaxed px-2 font-normal">
        {profile.bio}
      </p>

      {/* Badges / Tags Row */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-cyan-500/15 text-cyan-200 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3 h-3 text-cyan-300" />
          Youtuber
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 backdrop-blur-md">
          <Gamepad2 className="w-3 h-3 text-indigo-300" />
          Roblox Animator
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-rose-500/15 text-rose-200 border border-rose-400/30 backdrop-blur-md">
          <Tv className="w-3 h-3 text-rose-300" />
          Content Creator
        </span>
      </div>
    </div>
  );
};
