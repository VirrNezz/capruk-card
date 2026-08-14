/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Waves, 
  Gamepad2,
  Anchor,
  Compass,
  Activity
} from 'lucide-react';

import { OceanBackground } from './components/OceanBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { ProfileHeader } from './components/ProfileHeader';
import { SocialLinks } from './components/SocialLinks';
import { Toast } from './components/Toast';
import { UserProfile, SocialLink, OceanThemeConfig } from './types';

export default function App() {
  // 1. Initial Default Profile Data (Can be customized directly in code)
  const [profile] = useState<UserProfile>({
    name: 'Capruk Si Hiu',
    username: 'capruksihiu',
    tagline: 'Roblox Animator - Content Creator',
    bio: 'Jangan Lupa Subcribe Channel Youtube Aku Dan Jangan Lupa Juga Follow Tiktok Ku Agar Tidak Ketinggalan Konten-Konten Animasi Roblox Yang Kocak Dan NGUAWORR',
    avatarUrl: '/image/capruk-profile.jpeg',
    location: 'Pacific Ocean / Subsea Base',
    status: 'online',
    statusText: 'Exploring the Coral Reefs',
    badges: [
      { id: '1', label: 'Youtuber', icon: 'Sparkles', color: 'cyan' },
      { id: '2', label: 'Roblox Animator', icon: 'Gamepad2', color: 'indigo' },
      { id: '3', label: 'Content Creator', icon: 'Tv', color: 'rose' }
    ],
    stats: [
      { label: 'Subscribe On Youtube', value: '186K+' },
      { label: 'Videos On Youtube', value: '134' },
      { label: 'Video Start', value: '2022' }
    ]
  });

  // 2. Initial Social Links (Roblox, Discord, YouTube, TikTok)
  const [socialLinks] = useState<SocialLink[]>([
    {
      id: 'roblox',
      name: 'Roblox',
      subtitle: 'GamePlay & Mabar',
      url: 'https://www.roblox.com/users/1052945050/profile',
      handle: '@capruksihiu',
      badge: 'Top Experience',
      themeColor: '#ef4444',
      iconName: 'roblox'
    },
    {
      id: 'discord',
      name: 'Discord',
      subtitle: 'Chat & HangOut',
      url: 'https://discord.gg/qEJPhUDA5c',
      handle: 'Caprukers HangOut',
      badge: 'Active Voice',
      themeColor: '#6366f1',
      iconName: 'discord'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      subtitle: 'Animasi Roblox & Live Streaming',
      url: 'https://youtu.be/SOMx2olS0Vc?si=dH4igzno8anB13Tv',
      handle: '@capruksihiu',
      badge: 'New Videos',
      themeColor: '#f43f5e',
      iconName: 'youtube'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      subtitle: 'Animasi Short NGUAWOR',
      url: 'https://www.tiktok.com/@capruksihiu',
      handle: '@capruksihiu',
      badge: 'Trending',
      themeColor: '#06b6d4',
      iconName: 'tiktok'
    }
  ]);

  // 3. Ocean Theme Configuration
  const [themeConfig] = useState<OceanThemeConfig>({
    videoSource: '/background/background.mp4',
    videoBlur: 0,
    oceanTone: 'bioluminescent',
    sharkDensity: 'medium',
    bubblesEnabled: true,
    glassGlowIntensity: 'vibrant'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'links' | 'about'>('links');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 md:p-8 text-white overflow-x-hidden selection:bg-cyan-400 selection:text-slate-900">
      {/* 1. Dynamic Looping Video & Animated Sharks Background */}
      <OceanBackground config={themeConfig} />

      {/* 2. Audio Player at Top-Right (Independent, Non-obstructive) */}
      <MusicPlayer />

      {/* 3. Main Center iOS Frosted Glass Glow Card */}
      <div className="w-full max-w-xl my-16 sm:my-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[32px] bg-white/[0.07] dark:bg-slate-950/45 backdrop-blur-2xl border border-white/25 dark:border-cyan-500/20 shadow-[0_16px_60px_rgba(0,180,255,0.22)] p-5 sm:p-8 md:p-9 space-y-6 overflow-hidden text-white"
        >
          {/* Specular Top Edge Glow Light for authentic iOS glassmorphism */}
          <div className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent pointer-events-none" />

          {/* Ambient Inner Glow Flares */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Section (Photo, Name, Bio, Ocean Badges) */}
          <ProfileHeader profile={profile} />

          {/* Navigation Pill Switcher */}
          <div className="flex items-center justify-center p-1 rounded-2xl bg-black/25 border border-white/10 max-w-xs mx-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-1.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'links'
                  ? 'bg-cyan-500/30 text-cyan-200 shadow-sm border border-cyan-400/40'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Socials & Gaming
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-1.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
                activeTab === 'about'
                  ? 'bg-cyan-500/30 text-cyan-200 shadow-sm border border-cyan-400/40'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Anchor className="w-3.5 h-3.5" />
              Career Stats
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'links' ? (
              <motion.div
                key="links-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* 4 Special Social Cards: Roblox, Discord, YouTube, TikTok */}
                <SocialLinks
                  links={socialLinks}
                  onCopySuccess={showToast}
                />
              </motion.div>
            ) : (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {profile.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-0.5"
                    >
                      <p className="text-base sm:text-lg font-bold text-cyan-300 font-mono">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-white/60 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Oceanic Bio Story Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-white/80 leading-relaxed">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Compass className="w-4 h-4" />
                    <span>Caprukers Community Lore</span>
                  </div>
                  <p>
                    Broadcasting live from sub-aquatic coordinates. Connecting gamers, creators, and oceanic enthusiasts through Roblox development, Discord hangout sessions, and visual streams.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-cyan-200/70 border-t border-white/10">
                    <span>Base: Caprukers Community</span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      Radar Active
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card Footer */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-xs text-white/50">
            <div className="flex items-center gap-1.5 text-cyan-200/70">
              <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Ocean Theme • Deep Bioluminescence</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Personal Portfolio
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Toast Notifications */}
      <Toast message={toastMessage} />
    </main>
  );
}
