import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Copy, Check, Sparkles, Heart } from 'lucide-react';
import { SocialLink } from '../types';

interface SocialLinksProps {
  links: SocialLink[];
  onCopySuccess?: (message: string) => void;
}

// High-fidelity brand SVG components
const BrandIcons: Record<string, React.FC<{ className?: string }>> = {
  roblox: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.33 0L0 18.67l18.67 5.33L24 5.33 5.33 0zm9.45 13.56l-4.14-1.18 1.18-4.14 4.14 1.18-1.18 4.14z" />
    </svg>
  ),
  discord: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  youtube: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  tiktok: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.28c0 2.22-.68 4.41-2.02 6.17-1.46 1.94-3.71 3.2-6.13 3.49-2.33.28-4.75-.41-6.62-1.85-2.05-1.58-3.35-4-3.52-6.57-.18-2.67 1-5.32 3.07-7.05 1.83-1.53 4.3-2.22 6.67-1.83.01 1.45.01 2.9.01 4.35-1.3-.39-2.76-.23-3.92.51-1.06.67-1.78 1.83-1.91 3.08-.13 1.25.35 2.53 1.29 3.37 1.05.95 2.57 1.34 3.95.99 1.24-.31 2.28-1.27 2.7-2.47.24-.7.34-1.44.34-2.18V.02z"/>
    </svg>
  ),
  saweria: ({ className = "w-6 h-6" }) => <Heart className={className} />
};

const brandColorStyles: Record<string, { bgGlow: string; borderGlow: string; iconBg: string; textAccent: string; badgeBg: string }> = {
  roblox: {
    bgGlow: 'hover:shadow-[0_8px_30px_rgba(239,68,68,0.25)]',
    borderGlow: 'hover:border-red-400/50',
    iconBg: 'bg-gradient-to-br from-red-500/30 to-rose-700/40 text-white border-red-400/40',
    textAccent: 'group-hover:text-red-300',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30'
  },
  discord: {
    bgGlow: 'hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)]',
    borderGlow: 'hover:border-indigo-400/50',
    iconBg: 'bg-gradient-to-br from-indigo-500/30 to-blue-700/40 text-indigo-200 border-indigo-400/40',
    textAccent: 'group-hover:text-indigo-300',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  },
  youtube: {
    bgGlow: 'hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)]',
    borderGlow: 'hover:border-rose-400/50',
    iconBg: 'bg-gradient-to-br from-rose-500/30 to-red-700/40 text-rose-100 border-rose-400/40',
    textAccent: 'group-hover:text-rose-300',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  },
  tiktok: {
    bgGlow: 'hover:shadow-[0_8px_30px_rgba(6,182,212,0.3)]',
    borderGlow: 'hover:border-cyan-400/50',
    iconBg: 'bg-gradient-to-br from-cyan-500/30 via-slate-800 to-pink-500/30 text-cyan-200 border-cyan-400/40',
    textAccent: 'group-hover:text-cyan-300',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  saweria: {
    bgGlow: 'hover:shadow-[0_8px_30px_rgba(249,115,22,0.3)]',
    borderGlow: 'hover:border-orange-400/50',
    iconBg: 'bg-gradient-to-br from-orange-500/30 to-amber-700/40 text-orange-200 border-orange-400/40',
    textAccent: 'group-hover:text-orange-300',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, onCopySuccess }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, link: SocialLink) => {
    e.preventDefault();
    e.stopPropagation();
    const textToCopy = link.handle || link.url;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(link.id);
      onCopySuccess?.(`Copied ${link.name} info`);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <div className="w-full space-y-3.5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs uppercase tracking-wider text-cyan-200/80 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Featured Socials & Gaming Hub
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {links.map((link, index) => {
          const Icon = BrandIcons[link.id] || BrandIcons.roblox;
          const styles = brandColorStyles[link.id] || brandColorStyles.discord;
          const isCopied = copiedId === link.id;

          return (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="relative group"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/20 ${styles.borderGlow} ${styles.bgGlow} transition-all duration-300`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border ${styles.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className={`text-sm font-bold text-white ${styles.textAccent}`}>
                      {link.name}
                    </span>
                    <p className="text-xs text-white/70 truncate">{link.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={(e) => handleCopy(e, link)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 border border-white/15"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-200" />}
                  </button>
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
