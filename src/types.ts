export interface SocialLink {
  id: 'roblox' | 'discord' | 'youtube' | 'tiktok';
  name: string;
  subtitle: string;
  url: string;
  handle: string;
  badge?: string;
  themeColor: string; // Accent glow color
  iconName: string;
}

export interface UserProfile {
  name: string;
  username: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  statusText: string;
  badges: Array<{ id: string; label: string; icon: string; color: string }>;
  stats: Array<{ label: string; value: string }>;
}

export interface CustomFont {
  id: string;
  name: string;
  family: string;
  sourceType: 'preset' | 'url' | 'file';
  url?: string;
  fileData?: string; // base64 or object URL
  format?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration?: string;
  isSynth?: boolean;
}

export interface OceanThemeConfig {
  videoSource: string;
  videoBlur: number;
  oceanTone: 'deep-abyss' | 'bioluminescent' | 'caribbean-cyan' | 'twilight-coral';
  sharkDensity: 'low' | 'medium' | 'high';
  bubblesEnabled: boolean;
  glassGlowIntensity: 'soft' | 'medium' | 'vibrant';
}
