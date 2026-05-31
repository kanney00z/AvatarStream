/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, Smile, UserPlus, Star } from 'lucide-react';
import { Avatar } from '../types';

interface AvatarRendererProps {
  avatar: Avatar;
  neonGlow?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({ avatar, neonGlow = true }) => {
  const {
    nickname,
    uniqueId,
    avatarType,
    color,
    comment,
    reaction,
    facingLeft,
    state,
    isVip,
    giftName,
    profilePicture,
  } = avatar;

  // Let's build distinct procedural SVG designs for each avatar type
  const renderAvatarBody = () => {
    // If we have a profile picture or custom avatar type with image, render the image
    if ((avatarType === 'custom' || profilePicture) && profilePicture) {
      return (
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Subtle reflection ring */}
          <div 
            className="absolute -inset-1 rounded-full border-2 animate-pulse opacity-70"
            style={{ borderColor: color }}
          />
          <img
            src={profilePicture}
            alt={nickname}
            className="w-12 h-12 rounded-full object-cover border-2 shadow-lg scale-105 pointer-events-none"
            style={{ borderColor: color }}
            referrerPolicy="no-referrer"
            onError={(e) => {
              // If the custom URL loads with error, fallback to letter container
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    }

    switch (avatarType) {
      case 'slime':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Wobbling body shadow */}
            <ellipse cx="50" cy="85" rx="35" ry="8" fill="rgba(0,0,0,0.15)" />
            {/* Jelly body */}
            <path
              d="M15,75 Q10,40 50,20 Q90,40 85,75 Q80,85 50,85 Q20,85 15,75 Z"
              fill={color}
              className="transition-all duration-300"
            />
            {/* Gel highlight reflection */}
            <path
              d="M25,45 Q40,30 65,30 Q60,35 45,45 Z"
              fill="rgba(255, 255, 255, 0.4)"
            />
            {/* Cute eyes */}
            <g transform={`translate(${facingLeft ? -4 : 4}, 5)`}>
              <circle cx="38" cy="52" r="6" fill="#1e293b" />
              <circle cx="62" cy="52" r="6" fill="#1e293b" />
              {/* Eye sparkle highlights */}
              <circle cx="36" cy="50" r="2" fill="#ffffff" />
              <circle cx="60" cy="50" r="2" fill="#ffffff" />
              {/* Blush */}
              <ellipse cx="30" cy="60" rx="5" ry="2" fill="#f43f5e" opacity="0.6" />
              <ellipse cx="70" cy="60" rx="5" ry="2" fill="#f43f5e" opacity="0.6" />
              {/* Small smile */}
              <path d="M 46,59 Q 50,64 54,59" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      case 'cute-golem':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="88" rx="32" ry="7" fill="rgba(0,0,0,0.2)" />
            {/* Rock head & upper body */}
            <rect x="22" y="24" width="56" height="50" rx="14" fill={color} />
            {/* Shoulders / plates */}
            <rect x="14" y="44" width="14" height="24" rx="5" fill="#475569" />
            <rect x="72" y="44" width="14" height="24" rx="5" fill="#475569" />
            {/* Ear spikes */}
            <polygon points="12,30 24,38 24,26" fill="#334155" />
            <polygon points="88,30 76,38 76,26" fill="#334155" />
            
            {/* Glowing magic eyes */}
            <g transform={`translate(${facingLeft ? -3 : 3}, 4)`}>
              <rect x="33" y="40" width="10" height="6" rx="3" fill="#38bdf8" className="animate-pulse" />
              <rect x="57" y="40" width="10" height="6" rx="3" fill="#38bdf8" className="animate-pulse" />
              {/* Stone cracks pattern */}
              <path d="M 28,30 L 40,26" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeLinecap="round" />
              <path d="M 72,32 L 64,36" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeLinecap="round" />
              {/* Cute wide block mouth */}
              <rect x="44" y="54" width="12" height="4" rx="2" fill="#1e293b" />
            </g>
          </svg>
        );

      case 'bunny':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="90" rx="28" ry="6" fill="rgba(0,0,0,0.15)" />
            {/* Bunny ears */}
            <g transform={`translate(${facingLeft ? -2 : 2}, -2)`}>
              {/* Left ear */}
              <rect x="32" y="8" width="12" height="36" rx="6" fill={color} transform="rotate(-6 38 40)" />
              <rect x="35" y="14" width="6" height="26" rx="3" fill="#fda4af" transform="rotate(-6 38 40)" />
              {/* Right ear */}
              <rect x="56" y="8" width="12" height="36" rx="6" fill={color} transform="rotate(6 62 40)" />
              <rect x="59" y="14" width="6" height="26" rx="3" fill="#fda4af" transform="rotate(6 62 40)" />
            </g>
            {/* Fluffy head and body */}
            <circle cx="50" cy="62" r="28" fill={color} />
            {/* Cheek fluff */}
            <path d="M 22,62 Q 13,62 20,70" fill={color} />
            <path d="M 78,62 Q 87,62 80,70" fill={color} />
            
            {/* Features */}
            <g transform={`translate(${facingLeft ? -3 : 3}, 8)`}>
              <circle cx="38" cy="50" r="4.5" fill="#2d3748" />
              <circle cx="62" cy="50" r="4.5" fill="#2d3748" />
              <circle cx="36" cy="48" r="1.5" fill="#fff" />
              <circle cx="60" cy="48" r="1.5" fill="#fff" />
              {/* Pink nose */}
              <polygon points="48,56 52,56 50,59" fill="#f43f5e" />
              {/* Bunny teeth expression */}
              <path d="M 46,62 Q 50,65 54,62" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <rect x="48.5" y="64" width="3" height="3" fill="#fff" stroke="#2d3748" strokeWidth="1" />
            </g>
          </svg>
        );

      case 'wizard':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(0,0,0,0.18)" />
            {/* Wizard Robe */}
            <path d="M 25,85 L 50,45 L 75,85 Z" fill="#4338ca" />
            <path d="M 32,85 L 50,45 L 68,85 Z" fill={color} />
            
            {/* Round Face */}
            <circle cx="50" cy="48" r="20" fill="#fde047" />
            
            {/* Wizard Hat */}
            <path d="M 22,38 C 22,34 78,34 78,38 C 70,38 64,10 50,5 C 36,10 30,38 22,38 Z" fill="#312e81" />
            <ellipse cx="50" cy="36" rx="26" ry="4" fill={color} />
            {/* Magic star badge on hat */}
            <path d="M 50,16 L 52,22 L 58,22 L 53,26 L 55,32 L 50,28 L 45,32 L 47,26 L 42,22 L 48,22 Z" fill="#facc15" />

            {/* Glowing magic staff (wielding dynamically, left/right according to direction) */}
            <g transform={`translate(${facingLeft ? -4 : 58}, 42)`}>
              <rect x="0" y="0" width="4" height="42" rx="2" fill="#78350f" />
              {/* Magic gem crystal */}
              <polygon points="2, -10 -4, -2 2, 6 8, -2" fill="#22d3ee" className="animate-pulse" />
              <circle cx="2" cy="-2" r="3" fill="#fff" opacity="0.8" />
            </g>

            {/* Face details */}
            <g transform={`translate(${facingLeft ? -3 : 3}, 2)`}>
              <circle cx="42" cy="48" r="3" fill="#1e293b" />
              <circle cx="58" cy="48" r="3" fill="#1e293b" />
              <ellipse cx="38" cy="52" rx="3" ry="1.5" fill="#fb7185" opacity="0.5" />
              <ellipse cx="62" cy="52" rx="3" ry="1.5" fill="#fb7185" opacity="0.5" />
              {/* Long wizard white mustache */}
              <path d="M 38,53 Q 50,56 62,53 Q 50,68 38,53 Z" fill="#f1f5f9" />
              {/* wizard nose */}
              <ellipse cx="50" cy="51" rx="2.5" ry="4" fill="#facc15" opacity="0.8" />
            </g>
          </svg>
        );

      case 'astronaut':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="88" rx="30" ry="7" fill="rgba(0,0,0,0.2)" />
            {/* Back oxygen tank */}
            <rect x="18" y="32" width="12" height="40" rx="6" fill="#cbd5e1" />
            <rect x="70" y="32" width="12" height="40" rx="6" fill="#cbd5e1" />
            
            {/* Spacesuit Body */}
            <rect x="25" y="45" width="50" height="38" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
            {/* Color accent bar across chest */}
            <rect x="35" y="55" width="30" height="6" rx="2" fill={color} />
            
            {/* Helmet */}
            <circle cx="50" cy="38" r="24" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3.5" />
            {/* Big Shiny Visor */}
            <ellipse cx="50" cy="38" rx="18" ry="13" fill="#0f172a" />
            
            {/* Visor shine gradient effect & tiny internal avatar face */}
            <path d="M 36,36 Q 48,28 62,34 C 64,38 60,45 42,46 Z" fill="rgba(56, 189, 248, 0.25)" />
            {/* Highlighting sheen */}
            <ellipse cx="44" cy="32" rx="3" ry="2" fill="#fff" transform="rotate(-20 44 32)" />
            
            {/* Tiny retro console lights */}
            <circle cx="40" cy="68" r="2.5" fill="#ef4444" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="50" cy="68" r="2.5" fill="#22c55e" />
            <circle cx="60" cy="68" r="2.5" fill="#3b82f6" />
          </svg>
        );

      case 'penguin':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="88" rx="26" ry="6" fill="rgba(0,0,0,0.18)" />
            {/* Left and right yellow feet */}
            <ellipse cx="38" cy="85" rx="8" ry="4" fill="#f97316" />
            <ellipse cx="62" cy="85" rx="8" ry="4" fill="#f97316" />
            
            {/* Main black body */}
            <ellipse cx="50" cy="56" rx="26" ry="30" fill="#1e293b" />
            {/* White belly panel */}
            <ellipse cx="50" cy="60" rx="18" ry="22" fill="#ffffff" />
            
            {/* Waving flippers */}
            <g transform={`rotate(${facingLeft ? -12 : 12} 30 55)`}>
              <path d="M 24,42 Q 10,50 20,62 C 26,62 26,50 24,42 Z" fill="#1e293b" />
            </g>
            <g transform={`rotate(${facingLeft ? 12 : -12} 70 55)`}>
              <path d="M 76,42 Q 90,50 80,62 C 74,62 74,50 76,42 Z" fill="#1e293b" />
            </g>

            {/* Cozy scarf (uses the custom color selected) */}
            <path d="M 30,52 Q 50,60 70,52 L 68,58 Q 50,66 32,58 Z" fill={color} />
            <rect x="58" y="56" width="8" height="15" rx="2" fill={color} transform="rotate(15 62 56)" />

            {/* Face details */}
            <g transform={`translate(${facingLeft ? -2 : 2}, 0)`}>
              <circle cx="42" cy="44" r="3.5" fill="#0f172a" />
              <circle cx="58" cy="44" r="3.5" fill="#0f172a" />
              <circle cx="40.5" cy="42" r="1.2" fill="#fff" />
              <circle cx="56.5" cy="42" r="1.2" fill="#fff" />
              {/* Cute orange beak */}
              <polygon points="46,47 54,47 50,54" fill="#ea580c" />
            </g>
          </svg>
        );

      case 'axolotl':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(0,0,0,0.12)" />
            {/* Three cute frills on each side (coral pink pink gills) */}
            {/* Left frills */}
            <path d="M 22,40 Q 6,36 12,44" fill={color} stroke="#fb7185" strokeWidth="2.5" />
            <path d="M 18,48 Q 4,50 14,56" fill={color} stroke="#fb7185" strokeWidth="2.5" />
            <path d="M 22,56 Q 8,64 16,68" fill={color} stroke="#fb7185" strokeWidth="2.5" />
            
            {/* Right frills */}
            <path d="M 78,40 Q 94,36 88,44" fill={color} stroke="#fb7185" strokeWidth="2.5" />
            <path d="M 82,48 Q 96,50 86,56" fill={color} stroke="#fb7185" strokeWidth="2.5" />
            <path d="M 78,56 Q 92,64 84,68" fill={color} stroke="#fb7185" strokeWidth="2.5" />

            {/* Adorable round Axolotl body */}
            <ellipse cx="50" cy="62" rx="30" ry="24" fill={color} />
            {/* Small hands */}
            <ellipse cx="32" cy="78" rx="6" ry="4" fill={color} />
            <ellipse cx="68" cy="78" rx="6" ry="4" fill={color} />
            
            {/* Tail floating behind */}
            <path d="M 68,70 Q 86,75 78,84 Q 70,84 65,74" fill={color} opacity="0.9" />

            {/* Cute wide beaded face */}
            <g transform={`translate(${facingLeft ? -3 : 3}, 4)`}>
              <circle cx="34" cy="58" r="4.5" fill="#1e293b" />
              <circle cx="66" cy="58" r="4.5" fill="#1e293b" />
              <circle cx="32" cy="56" r="1.5" fill="#fff" />
              <circle cx="64" cy="56" r="1.5" fill="#fff" />
              
              {/* Cute blushing gills */}
              <circle cx="26" cy="64" r="5" fill="#f43f5e" opacity="0.45" />
              <circle cx="74" cy="64" r="5" fill="#f43f5e" opacity="0.45" />

              {/* Extremely wide little smile */}
              <path d="M 44,65 Q 50,68 56,65" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: color }}>
            <span className="text-white text-2xl font-bold font-sans">
              {nickname.charAt(0).toUpperCase()}
            </span>
          </div>
        );
    }
  };

  // Get active reaction iconography and colors
  const getReactionBadge = () => {
    switch (reaction) {
      case 'chat':
        return (
          <div className="bg-blue-500 text-white p-1 rounded-full shadow-lg flex items-center justify-center animate-bounce">
            <Smile size={14} />
          </div>
        );
      case 'like':
        return (
          <div className="bg-rose-500 text-white p-1 rounded-full shadow-lg flex items-center justify-center animate-bounce">
            <Heart className="fill-white" size={14} />
          </div>
        );
      case 'follow':
        return (
          <div className="bg-teal-500 text-white p-1 rounded-full shadow-lg flex items-center justify-center animate-bounce">
            <UserPlus size={14} />
          </div>
        );
      case 'gift':
        return (
          <div className="bg-amber-500 text-white p-1.5 rounded-full shadow-xl flex items-center justify-center animate-bounce">
            <Gift className="text-white" size={16} />
          </div>
        );
      default:
        return null;
    }
  };

  // Determine physics motion values for states
  let animationStyles = {};
  if (state === 'jumping') {
    animationStyles = {
      y: [-6, -24, 0],
      scaleX: [1, 0.85, 1.1, 0.95, 1],
      scaleY: [1, 1.15, 0.8, 1.05, 1],
    };
  } else if (state === 'walking') {
    animationStyles = {
      y: [0, -6, 0],
      rotate: [-3, 3, -3],
    };
  } else {
    // Normal Idle breathing float
    animationStyles = {
      y: [0, -3, 0],
    };
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: `${avatar.x}%`,
        top: `${avatar.y}%`,
        transform: 'translate(-50%, -85%)',
        zIndex: reaction ? 50 : Math.round(avatar.y),
        transition: 'left 1.2s cubic-bezier(0.25, 1, 0.5, 1), top 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="flex flex-col items-center select-none cursor-pointer"
    >
      {/* Speech / Chat / Gift bubble with standard Motion wrapper */}
      <AnimatePresence>
        {comment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="absolute bottom-full mb-3 text-white text-xs font-bold py-1.5 px-3 rounded-2xl shadow-2xl border-2 max-w-48 whitespace-normal text-center min-w-16 break-all font-sans bg-slate-950/95"
            style={{
              transform: 'translateX(-50%)',
              borderColor: color,
              boxShadow: neonGlow
                ? `0px 4px 16px rgba(0,0,0,0.85), 0 0 12px ${color}65, inset 0 0 6px ${color}45`
                : `0 8px 24px ${color}60, 0 0 12px ${color}40`,
            }}
          >
            {/* Small pointed arrow down */}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent"
              style={{ borderTopColor: color }} // Matches the glowing color boundary nicely!
            />
            {/* Arrow inner filler */}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent"
              style={{ borderTopColor: '#020617', marginTop: '-1px' }} // Matches bg-slate-950 background
            />
            
            {reaction === 'gift' ? (
              <div className="flex flex-col items-center">
                <span className="text-amber-400 font-extrabold text-xs flex items-center gap-1 justify-center animate-bounce">
                  <Sparkles size={11} className="animate-spin text-amber-300" /> ส่งของขวัญ!
                </span>
                <span className="text-rose-400 font-black text-sm animate-pulse tracking-wide drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]">
                  {giftName || 'ของขวัญชิ้นใหญ่'}
                </span>
                {comment && <span className="text-slate-300 text-[11px] mt-0.5 line-clamp-2" style={{ textShadow: 'none' }}>"{comment}"</span>}
              </div>
            ) : (
              <span className="block font-sans drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] leading-tight text-[11px]">{comment}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Reaction Icon Badge */}
      {reaction && (
        <div className="absolute -top-1 right-2 z-30">
          {getReactionBadge()}
        </div>
      )}

      {/* Sparkle burst backdrop for VIPs or Gifts */}
      {(isVip || reaction === 'gift') && (
        <div className="absolute inset-0 -m-4 bg-yellow-400/20 rounded-full blur-md animate-ping" style={{ animationDuration: '2s' }} />
      )}

      {/* Actual Living Avatar Body Component */}
      <motion.div
        animate={animationStyles}
        transition={{
          duration: state === 'jumping' ? 0.6 : (state === 'walking' ? 0.35 : 1.8),
          repeat: state === 'idle' ? Infinity : 0,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="w-14 h-14 relative flex items-center justify-center"
        style={{
          filter: neonGlow
            ? `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 1.5px rgba(255,255,255,0.6))`
            : `drop-shadow(0 0 4px ${color}dd) drop-shadow(0 0 2px rgba(255, 255, 255, 0.35))`,
        }}
      >
        {renderAvatarBody()}
      </motion.div>

      {/* Text / Username details */}
      <div className="mt-2 flex flex-col items-center relative">
        <div className="relative">
          <div
            className={`relative px-2.5 py-1 text-white rounded-lg flex items-center gap-1.5 border-2 shadow-xl max-w-32 truncate hover:scale-105 transition-transform ${
              isVip
                ? 'bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 border-yellow-300 font-extrabold text-[11px] animate-pulse'
                : 'bg-slate-950 text-[10.5px]'
            }`}
            style={
              !isVip
                ? {
                    borderColor: color,
                    boxShadow: neonGlow
                      ? `0 0 10px ${color}aa, inset 0 0 4px ${color}40, 0 4px 8px rgba(0,0,0,0.85)`
                      : `0 2px 4px rgba(0,0,0,0.5)`,
                  }
                : {
                    textShadow: '0 1.5px 3px rgba(0,0,0,0.8)',
                    boxShadow: neonGlow
                      ? '0 0 12px rgba(245, 158, 11, 0.8), inset 0 1px 2px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.85)'
                      : 'inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 10px rgba(0,0,0,0.85)'
                  }
            }
          >
            {isVip ? (
              <Star size={11} className="fill-yellow-300 text-yellow-300 shrink-0 animate-bounce" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: color }} />
            )}
            <span className="truncate font-sans font-black tracking-wide">
              @{uniqueId}
            </span>
          </div>
        </div>
        
        {/* Colorful small display name or subtext with thick readable text-shadow */}
        <span 
          className="text-[11px] font-sans font-extrabold max-w-36 truncate select-none text-white mt-1 opacity-100 leading-normal"
          style={{ 
            textShadow: '1.2px 1.2px 0px #000, -1.2px -1.2px 0px #000, 1.2px -1.2px 0px #000, -1.2px 1.2px 0px #000, 0px 1.5px 3px rgba(0,0,0,1)' 
          }}
        >
          {nickname}
        </span>
      </div>
    </div>
  );
};
