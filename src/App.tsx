/*
  'ด�/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Wifi,
  WifiOff,
  Users,
  Play,
  RotateCcw,
  MessageSquare,
  Gift,
  Heart,
  Plus,
  Trash2,
  Tv,
  ExternalLink,
  Terminal,
  Settings,
  X,
  Volume2,
  VolumeX,
  Check,
  Edit2,
} from 'lucide-react';
import { Avatar, ConnectionState, LogMessage, BackgroundStyle, AvatarType } from './types';
import { AvatarRenderer } from './components/AvatarRenderer';

// Pre-configured elegant backgrounds
const BACKGROUNDS: BackgroundStyle[] = [
  {
    id: 'cozy-park',
    name: 'Cozy Park (พาร์คแสนอบอุ่น)',
    nameTh: 'Cozy Park',
    className: 'bg-radial from-emerald-100/90 via-teal-50 to-cyan-50',
    floorColor: 'border-t-4 border-emerald-500/20 bg-emerald-500/10',
  },
  {
    id: 'neon-grid',
    name: 'Cyberpunk Neon (นีออนไซเบอร์)',
    nameTh: 'Neon Cyber',
    className: 'bg-[#050608]',
    floorColor: 'border-t border-[#00F2EA]/20 bg-[#0A0B0E] shadow-[0_-10px_30px_rgba(0,242,234,0.1)]',
    gridColor: 'repeating-linear-gradient(90deg, rgba(0, 242, 234, 0.03) 0px, rgba(0, 242, 234, 0.03) 1px, transparent 1px, transparent 45px)',
  },
  {
    id: 'stream-studio',
    name: 'Glitch Stage (เวทีแสงไฟ)',
    nameTh: 'Glitch Stage',
    className: 'bg-radial from-purple-950/60 via-[#0A0B0E] to-black',
    floorColor: 'border-t border-purple-500/25 bg-purple-950/20 shadow-[0_-15px_45px_rgba(255,0,80,0.08)]',
  },
  {
    id: 'chroma-green',
    name: 'Chroma Key Green (สตรีมเจาะพื้นเขียว)',
    nameTh: 'Chroma Green',
    className: 'bg-[#00ff00]',
    floorColor: 'border-t border-black/10 bg-[#00ff00]',
  },
  {
    id: 'chroma-blue',
    name: 'Chroma Key Blue (บลูสกรีน)',
    nameTh: 'Chroma Blue',
    className: 'bg-[#0000ff]',
    floorColor: 'border-t border-black/10 bg-[#0000ff]',
  },
  {
    id: 'transparent',
    name: 'Transparent Classy (โปร่งใสธรรมดาไม่มีพื้น)',
    nameTh: 'Transparent',
    className: 'bg-transparent',
    floorColor: 'border-t-0 bg-transparent',
  },
  {
    id: 'transparent-neon-cyan',
    name: 'Transparent + Neon Cyan (โปร่งใส + พื้นเวทีนีออนฟ้าเรืองแสง ✨)',
    nameTh: 'Transparent Neon Cyan',
    className: 'bg-transparent',
    floorColor: 'border-t-2 border-[#00F2EA] bg-gradient-to-b from-[#00F2EA]/20 via-black/40 to-black/80 shadow-[0_-12px_40px_rgba(0,242,234,0.65),inset_0_1px_15px_rgba(0,242,234,0.4)] backdrop-blur-xs',
  },
  {
    id: 'transparent-neon-pink',
    name: 'Transparent + Neon Pink (โปร่งใส + พื้นเวทีนีออนชมพูเรืองแสง ✨)',
    nameTh: 'Transparent Neon Pink',
    className: 'bg-transparent',
    floorColor: 'border-t-2 border-[#FF0050] bg-gradient-to-b from-[#FF0050]/20 via-black/40 to-black/80 shadow-[0_-12px_40px_rgba(255,0,80,0.65),inset_0_1px_15px_rgba(255,0,80,0.4)] backdrop-blur-xs',
  },
  {
    id: 'transparent-neon-purple',
    name: 'Transparent + Neon Purple (โปร่งใส + พื้นเวทีนีออนม่วงวิบวับ ✨)',
    nameTh: 'Transparent Neon Purple',
    className: 'bg-transparent',
    floorColor: 'border-t-2 border-[#a855f7] bg-gradient-to-b from-[#a855f7]/20 via-black/40 to-black/80 shadow-[0_-12px_40px_rgba(168,85,247,0.65),inset_0_1px_15px_rgba(168,85,247,0.4)] backdrop-blur-xs',
  },
];

// Seed lists to simulate organic viewers quickly
const MOCK_NAMES = [
  { nick: 'ก้อง เกียรติ', user: 'kong_live' },
  { nick: 'น้องบีม มีความสุข', user: 'beam_sunny' },
  { nick: 'อลิส สลิ่มสลวย', user: 'alice_gaming' },
  { nick: 'พี่เต๋า กอดแมว', user: 'tao_kitty' },
  { nick: 'หมูหวาน นู่เบียร์', user: 'sweet_beer' },
  { nick: 'ต้นข้าว ตะวันเกลียว', user: 'ton_rice_th' },
  { nick: 'สายน้ำ ครามชล', user: 'blue_river' },
  { nick: 'เมย่า ยิ้มหวาน', user: 'maya_smile' },
  { nick: 'แป้งโกกิ', user: 'pang_koki' },
  { nick: 'วิน พลังช้างแปด', user: 'win_heavy' },
];

const MOCK_COMMENTS = [
  'สวัสดีครับพี่สตรีมเมอร์! 👋',
  'น่ารักมากครับเกมวันนี้! 😍',
  'ขอเพลงหน่อยครับ 🎵',
  'สู้ๆ นะครับเป็นกำลังใจให้ครับ 💖',
  'เย้! ชนะแล้ววว 🎉',
  'เล่นเก่งเวอร์ วิ่งๆๆ 🏃‍♂️',
  'ดูอยู่ตลอดนะครับบบ 🥺',
  'แชร์ไลฟ์ให้แล้วค้าบ ✨',
  'สุดจัดปลัดบอก ขนาดสตรีมยังบอก 👑',
];

const MOCK_GIFTS = [
  { name: 'คอนเสิร์ตเสียงใส 🎤', points: 100 },
  { name: 'หัวใจเต้นตึกตัก 💖', points: 5 },
  { name: 'คาปูชิโน่อุ่นๆ ☕', points: 10 },
  { name: 'มงกุฎราชา 👑', points: 299 },
  { name: 'ดอกกุหลาบ 🌹', points: 1 },
];

const AVATAR_TYPES: AvatarType[] = ['slime', 'cute-golem', 'bunny', 'wizard', 'astronaut', 'penguin', 'axolotl'];
const COLOR_PALETTE = [
  '#f43f5e', // rose
  '#3b82f6', // blue
  '#10b981', // emerald
  '#eab308', // yellow
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f97316', // orange
  '#06b6d4', // cyan
  '#a855f7', // purple
];

const PRESET_AVATARS = [
  { name: 'หมา Doge 🐕', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=150' },
  { name: 'เหมียวส้ม 🐈', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150' },
  { name: 'นกฮูก 🦉', url: 'https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&q=80&w=150' },
  { name: 'เพนกวินจริง 🐧', url: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&q=80&w=150' },
  { name: 'หมีน้อย 🧸', url: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&q=80&w=150' },
  { name: 'อิกัวน่ากวน 🦎', url: 'https://images.unsplash.com/photo-1548366086-7f1b76106622?auto=format&fit=crop&q=80&w=150' },
  { name: 'เมกะบอท 🤖', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=mega' },
  { name: 'พิกเซลดรากอน 🐲', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=dragon' },
  { name: 'พิกเซลคิง 👑', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=king' },
];

export default function App() {
  // App variables states
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [wsUrl, setWsUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const wsParam = params.get('ws');
      if (wsParam) return wsParam;
      return localStorage.getItem('ws_url') || 'ws://localhost:62024';
    }
    return 'ws://localhost:62024';
  });
  const [shouldReconnect, setShouldReconnect] = useState(true);
  const [connection, setConnection] = useState<ConnectionState>('disconnected');
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [currentBg, setCurrentBg] = useState<BackgroundStyle>(BACKGROUNDS[1]); // Default to neon-grid
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tiktokUsername, setTiktokUsername] = useState(() => localStorage.getItem('tiktok_username') || 'tiktok_avatar');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  
  // Custom Controls Settings
  const [maxAvatars, setMaxAvatars] = useState(30);
  const [avatarAgeLimit, setAvatarAgeLimit] = useState(5); // in minutes, inactive avatars removed
  const [autoMovement, setAutoMovement] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedAvatarType, setSelectedAvatarType] = useState<AvatarType>('slime');

  // Sidebar Tabs State
  const [sidebarTab, setSidebarTab] = useState<'settings' | 'spawn' | 'viewers'>('settings');

  // Custom manual avatar spawn states
  const [customNick, setCustomNick] = useState('');
  const [customUser, setCustomUser] = useState('');
  const [customType, setCustomType] = useState<AvatarType>('slime');
  const [customImgUrl, setCustomImgUrl] = useState('');
  const [customImgFile, setCustomImgFile] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState(COLOR_PALETTE[0]);
  const [customAction, setCustomAction] = useState<'join' | 'chat' | 'like' | 'follow' | 'gift'>('chat');
  const [customActionVal, setCustomActionVal] = useState('');

  // OBS Mode states
  const [isObsMode, setIsObsMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Bubble duration settings (in seconds, on-screen persistence of speech bubble. Set to 999999 for permanent display)
  const [bubbleDuration, setBubbleDuration] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const bParam = params.get('bubble_time');
      if (bParam) return parseInt(bParam, 10);
      const saved = localStorage.getItem('bubble_duration');
      return saved ? parseInt(saved, 10) : 12; // Default to 12 seconds for perfect live visibility
    }
    return 12;
  });

  // Highlight neon aura and strong lighting glow toggle
  const [neonGlow, setNeonGlow] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const glowParam = params.get('neon_glow');
      if (glowParam) return glowParam === 'true';
      const saved = localStorage.getItem('neon_glow');
      return saved ? saved === 'true' : true; // Default to true (vivid neon!)
    }
    return true;
  });

  // Stats Counters
  const [totalChatsRecv, setTotalChatsRecv] = useState(0);
  const [totalGiftsRecv, setTotalGiftsRecv] = useState(0);
  const [totalLikesRecv, setTotalLikesRecv] = useState(0);

  // References
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Logs function helper
  const addLog = useCallback((type: LogMessage['type'], message: string) => {
    const newLog: LogMessage = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 50)]);
  }, []);

  // Soft Synthesizer sound generator for live events
  const playSound = useCallback((frequency: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine', duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context failed:', e);
    }
  }, [soundEnabled]);

  // Method to force insert/update an avatar on screen
  const addOrUpdateAvatar = useCallback((
    uniqueId: string,
    nickname: string,
    profilePicture?: string,
    actionType?: 'chat' | 'like' | 'follow' | 'gift',
    actionValue?: string,
    customType?: AvatarType,
    customColor?: string
  ) => {
    const now = Date.now();
    const durationMs = bubbleDuration === 999999 ? 365 * 24 * 60 * 60 * 1000 : bubbleDuration * 1000;
    
    setAvatars((prevAvatars) => {
      const exists = prevAvatars.find((a) => a.uniqueId === uniqueId);
      
      if (exists) {
        // Return updated avatar elements
        return prevAvatars.map((a) => {
          if (a.uniqueId === uniqueId) {
            let nextActionState = a.state;
            if (actionType === 'chat' || actionType === 'gift') {
              nextActionState = 'jumping';
            }
            
            return {
              ...a,
              nickname: nickname || a.nickname,
              profilePicture: profilePicture || a.profilePicture,
              lastActive: now,
              state: nextActionState,
              comment: actionType === 'chat' ? (actionValue || null) : actionType === 'gift' ? actionValue || null : a.comment,
              commentExpiresAt: actionType === 'chat' || actionType === 'gift' ? now + durationMs : a.commentExpiresAt,
              reaction: actionType || a.reaction,
              reactionExpiresAt: now + 4000,
              giftName: actionType === 'gift' ? actionValue : a.giftName,
              isVip: actionType === 'gift' ? true : a.isVip,
              avatarType: customType || a.avatarType,
              color: customColor || a.color,
            };
          }
          return a;
        });
      } else {
        // Create new Avatar
        // Check count constraint
        if (prevAvatars.length >= maxAvatars) {
          // Evict the most inactive avatar that isn't VIP
          const nonVips = prevAvatars.filter(a => !a.isVip);
          const targets = nonVips.length > 0 ? nonVips : prevAvatars;
          const oldest = targets.reduce((old, curr) => curr.lastActive < old.lastActive ? curr : old, targets[0]);
          // Remove old avatar
          prevAvatars = prevAvatars.filter(a => a.uniqueId !== oldest.uniqueId);
        }

        const newX = 15 + Math.random() * 70; // 15% to 85% width
        const newY = 60 + Math.random() * 25; // 60% to 85% height to sit beautifully on floor level
        const randomType = customType || (selectedAvatarType === 'slime' && Math.random() > 0.4 ? AVATAR_TYPES[Math.floor(Math.random() * AVATAR_TYPES.length)] : selectedAvatarType);
        const randomColor = customColor || COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

        const newAvatar: Avatar = {
          uniqueId,
          nickname: nickname || uniqueId,
          profilePicture,
          avatarType: randomType,
          x: newX,
          y: newY,
          targetX: 10 + Math.random() * 80,
          targetY: 55 + Math.random() * 32,
          angle: 0,
          color: randomColor,
          scale: 0.9 + Math.random() * 0.25,
          joinedAt: now,
          lastActive: now,
          comment: actionType === 'chat' ? (actionValue || null) : actionType === 'gift' ? actionValue || null : 'เข้ามาดูไลฟ์แล้ว! ✨',
          commentExpiresAt: now + durationMs,
          reaction: actionType || 'join',
          reactionExpiresAt: now + 3000,
          giftName: actionType === 'gift' ? actionValue : undefined,
          facingLeft: Math.random() > 0.5,
          speed: 0.3 + Math.random() * 0.4,
          bobOffset: Math.random() * Math.PI,
          state: actionType === 'chat' || actionType === 'gift' ? 'jumping' : 'idle',
          isVip: actionType === 'gift',
        };

        return [...prevAvatars, newAvatar];
      }
    });

    // Event specific Sound
    if (actionType === 'chat') {
      playSound(349.23, 'sine', 0.12); // F4 Note
    } else if (actionType === 'gift') {
      playSound(523.25, 'triangle', 0.3); // C5 bright trumpet
      setTimeout(() => playSound(659.25, 'sine', 0.2), 100);
      setTimeout(() => playSound(783.99, 'sine', 0.25), 200);
    } else if (actionType === 'like') {
      playSound(392.00, 'sine', 0.08); // G4 soft note
    } else if (actionType === 'follow') {
      playSound(440.00, 'sine', 0.15); // A4 welcoming bell
    } else {
      playSound(293.66, 'sine', 0.1); // D4 slide
    }
  }, [maxAvatars, selectedAvatarType, playSound, soundEnabled, bubbleDuration]);


  // Connect WebSocket logic for the live TikTok server input
  const connectWebSocket = useCallback((urlInput: string) => {
    setShouldReconnect(true);
    if (wsRef.current) {
      wsRef.current.close();
    }

    setConnection('connecting');
    addLog('info', `กำลังเชื่อมต่อกับ WebSocket ของ TikTok Streamer: ${urlInput}...`);

    try {
      const socket = new WebSocket(urlInput);
      wsRef.current = socket;

      socket.onopen = () => {
        setConnection('connected');
        addLog('success', 'เชื่อมต่อสำเร็จ! พร้อมดึงข้อมูลคนดูเข้าสู่จอแบบเรียลไทม์');
        playSound(523.25, 'sine', 0.25); // high positive sound
      };

      socket.onmessage = (event) => {
        try {
          const rawMessage = JSON.parse(event.data);
          
          // Capture protocol event formats
          // Support standard { event: 'chat', data: { uniqueId, nickname, comment } }
          const eventType = rawMessage.event;
          const eventData = rawMessage.data;

          if (!eventType || !eventData) {
            console.warn('Unhandled message format:', rawMessage);
            return;
          }

          const nickname = eventData.nickname || eventData.uniqueId || 'ของขวัญ';
          const uniqueId = eventData.uniqueId || 'unknown';

          if (eventType === 'chat') {
            const comment = eventData.comment || '';
            addLog('event', `💬 @${uniqueId}: ${comment}`);
            addOrUpdateAvatar(uniqueId, nickname, eventData.profilePicture, 'chat', comment);
            setTotalChatsRecv((prev) => prev + 1);
          } else if (eventType === 'join') {
            addLog('event', `👤 @${uniqueId} ได้เข้าร่วมการดูไลฟ์`);
            addOrUpdateAvatar(uniqueId, nickname, eventData.profilePicture, 'join');
          } else if (eventType === 'like') {
            const count = eventData.count || 1;
            addLog('event', `❤️ @${uniqueId} ถูกใจไลฟ์ ${count} ครั้ง`);
            addOrUpdateAvatar(uniqueId, nickname, eventData.profilePicture, 'like');
            setTotalLikesRecv((prev) => prev + count);
          } else if (eventType === 'follow') {
            addLog('event', `🌟 @${uniqueId} ได้กดติดตามคุณแล้ว!`);
            addOrUpdateAvatar(uniqueId, nickname, eventData.profilePicture, 'follow');
          } else if (eventType === 'gift') {
            const giftName = eventData.giftName || 'ของขวัญแสนแพง';
            const count = eventData.giftCount || 1;
            addLog('event', `🎁 @${uniqueId} ส่งของขวัญ [${giftName}] x${count}`);
            addOrUpdateAvatar(uniqueId, nickname, eventData.profilePicture, 'gift', `${giftName} x${count}`);
            setTotalGiftsRecv((prev) => prev + count);
          }
        } catch (err) {
          console.error('Error parsing received packet:', err);
          addLog('error', `เกิดข้อผิดพลาดในการรับข้อมูล: ${err instanceof Error ? err.message : String(err)}`);
        }
      };

      socket.onclose = () => {
        setConnection('disconnected');
        addLog('warning', 'การเชื่อมต่อกับเครื่องคอมพิวเตอร์ของคุณขาดหายไป (Websocket Closed)');
      };

      socket.onerror = (err) => {
        setConnection('error');
        addLog('error', `WebSocket ล้มเหลว กรุณาเช็คว่ารัน IndoFinity หรือ TikTok Connector อยู่ในพอร์ตมั้ย?`);
        console.error('WS Error:', err);
      };
    } catch (e) {
      setConnection('error');
      addLog('error', `ไม่สามารถสร้าง WebSocket: ${e instanceof Error ? e.message : String(e)}`);
    }
  }, [addLog, addOrUpdateAvatar, playSound]);

  const disconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setConnection('disconnected');
      setShouldReconnect(false);
      addLog('info', 'ตัดการเชื่อมต่อ WebSocket แล้ว (ปิดระบบเชื่อมต่ออัตโนมัติ)');
    }
  }, [addLog]);

  // Auto reconnection loop for real-time stream stability
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (shouldReconnect && (connection === 'disconnected' || connection === 'error')) {
      timer = setTimeout(() => {
        addLog('info', '🔄 กำลังส่งสัญญาณดึงข้อมูลจากโปรแกรมจำลองอัตโนมัติแบบ Real-time...');
        connectWebSocket(wsUrl);
      }, 5000); // Retry every 5 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [connection, wsUrl, shouldReconnect, connectWebSocket, addLog]);

  // Handle auto connection on load or input changes
  useEffect(() => {
    // Attempt connecting on mount
    const params = new URLSearchParams(window.location.search);
    const wsParam = params.get('ws');
    const finalWsUrl = wsParam || localStorage.getItem('ws_url') || wsUrl;
    
    if (wsParam) {
      setWsUrl(wsParam);
    } else {
      const saved = localStorage.getItem('ws_url');
      if (saved) {
        setWsUrl(saved);
      }
    }

    // Try starting initial connection
    connectWebSocket(finalWsUrl);

    // Read URL search parameters for OBS mode layout
    if (params.get('obs') === 'true') {
      setIsObsMode(true);
    }
    const bgParam = params.get('bg');
    if (bgParam) {
      const foundBg = BACKGROUNDS.find(bg => bg.id === bgParam);
      if (foundBg) {
        setCurrentBg(foundBg);
      }
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Avatars behavior simulation loop (Physics and walking triggers)
  useEffect(() => {
    const loopInterval = setInterval(() => {
      setAvatars((prevAvatars) => {
        const now = Date.now();
        
        const activeLimitMs = avatarAgeLimit * 60 * 1000;
        
        return prevAvatars
          .filter((a) => {
            const timeDiff = now - a.lastActive;
            const threshold = a.isVip ? activeLimitMs * 2 : activeLimitMs;
            return timeDiff < threshold; // Keeps active avatars
          })
          .map((a) => {
            const updateObj = { ...a };

            // Comment expiry
            if (updateObj.comment && now > updateObj.commentExpiresAt) {
              updateObj.comment = null;
              if (updateObj.state === 'jumping') {
                updateObj.state = 'idle';
              }
            }

            // Reaction status expiry
            if (updateObj.reaction && now > updateObj.reactionExpiresAt) {
              updateObj.reaction = null;
            }

            // Random walking generator (if auto movement toggled)
            if (autoMovement) {
              const dx = updateObj.targetX - updateObj.x;
              const dy = updateObj.targetY - updateObj.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 2.5) {
                updateObj.state = 'idle';
                
                if (Math.random() < 0.15) {
                  updateObj.targetX = 15 + Math.random() * 70;
                  updateObj.targetY = 58 + Math.random() * 28;
                  updateObj.state = 'walking';
                  updateObj.facingLeft = updateObj.targetX < updateObj.x;
                }
              } else if (updateObj.state === 'walking' || Math.random() < 0.01) {
                updateObj.state = 'walking';
                
                const step = updateObj.speed * speedMultiplier * 0.45;
                const angleRad = Math.atan2(dy, dx);
                updateObj.x += Math.cos(angleRad) * step;
                updateObj.y += Math.sin(angleRad) * step;
                
                updateObj.facingLeft = Math.cos(angleRad) < 0;
              }
            }

            return updateObj;
          });
      });
    }, 50);

    return () => clearInterval(loopInterval);
  }, [autoMovement, speedMultiplier, avatarAgeLimit]);

  // Organic Simulator buttons to easily test look and feel
  const simulateJoin = useCallback(() => {
    const randomUser = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
    const simulatedUsername = `${randomUser.user}_${Math.floor(Math.random() * 900 + 100)}`;
    addLog('event', `👤 (จำลอง) @${simulatedUsername} เข้าร่วมห้องไลฟ์`);
    addOrUpdateAvatar(simulatedUsername, randomUser.nick, undefined, undefined);
  }, [addLog, addOrUpdateAvatar]);

  const simulateChat = useCallback(() => {
    if (avatars.length === 0) {
      simulateJoin();
      return;
    }
    const randomAvatarIdx = Math.floor(Math.random() * avatars.length);
    const selectedAvatar = avatars[randomAvatarIdx];
    const commentText = MOCK_COMMENTS[Math.floor(Math.random() * MOCK_COMMENTS.length)];
    
    addLog('event', `💬 (จำลอง) @${selectedAvatar.uniqueId}: ${commentText}`);
    addOrUpdateAvatar(selectedAvatar.uniqueId, selectedAvatar.nickname, undefined, 'chat', commentText);
    setTotalChatsRecv((prev) => prev + 1);
  }, [avatars, simulateJoin, addLog, addOrUpdateAvatar]);

  const simulateLike = useCallback(() => {
    if (avatars.length === 0) {
      simulateJoin();
      return;
    }
    const randomAvatarIdx = Math.floor(Math.random() * avatars.length);
    const selectedAvatar = avatars[randomAvatarIdx];
    
    addLog('event', `❤️ (จำลอง) @${selectedAvatar.uniqueId} ถูกใจไลฟ์`);
    addOrUpdateAvatar(selectedAvatar.uniqueId, selectedAvatar.nickname, undefined, 'like');
    setTotalLikesRecv((prev) => prev + 1);
  }, [avatars, simulateJoin, addLog, addOrUpdateAvatar]);

  const simulateGift = useCallback(() => {
    if (avatars.length === 0) {
      simulateJoin();
      return;
    }
    const randomAvatarIdx = Math.floor(Math.random() * avatars.length);
    const selectedAvatar = avatars[randomAvatarIdx];
    const gift = MOCK_GIFTS[Math.floor(Math.random() * MOCK_GIFTS.length)];
    
    addLog('event', `🎁 (จำลอง) @${selectedAvatar.uniqueId} มอบสัญลักษณ์ของขวัญ: ${gift.name}`);
    addOrUpdateAvatar(selectedAvatar.uniqueId, selectedAvatar.nickname, undefined, 'gift', gift.name);
    setTotalGiftsRecv((prev) => prev + 1);
  }, [avatars, simulateJoin, addLog, addOrUpdateAvatar]);

  const clearAllRoom = useCallback(() => {
    setAvatars([]);
    addLog('info', 'ทำความสะอาดล้างหน้าจออวตารทั้งหมดแล้ว');
    playSound(440, 'sine', 0.1);
  }, [addLog, playSound]);

  const handleCustomSpawn = (e: React.FormEvent) => {
    e.preventDefault();
    const uname = customUser.trim().toLowerCase() || `user_${Math.floor(Math.random() * 9000 + 1000)}`;
    const nick = customNick.trim() || `Viewer ${Math.floor(Math.random() * 900 + 100)}`;
    
    let actionType: 'chat' | 'like' | 'follow' | 'gift' | undefined = undefined;
    if (customAction !== 'join') {
      actionType = customAction as 'chat' | 'like' | 'follow' | 'gift';
    }

    const pfp = customType === 'custom' ? (customImgFile || customImgUrl || 'https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=150') : undefined;

    addLog('success', `🧙 [เสกอวตาร] @${uname} (${nick}) เข้าสู่จอสำเร็จ!`);
    addOrUpdateAvatar(
      uname,
      nick,
      pfp,
      actionType,
      customAction === 'chat' || customAction === 'gift' ? customActionVal || 'สวัสดีทุกคนนครับบ! 👋' : undefined,
      customType,
      customColor
    );

    // Reset inputs
    setCustomNick('');
    setCustomUser('');
    setCustomActionVal('');
  };

  const copyObsUrl = () => {
    try {
      const obsUrl = `${window.location.origin}/?obs=true&bg=${currentBg.id}&ws=${encodeURIComponent(wsUrl)}&bubble_time=${bubbleDuration}&neon_glow=${neonGlow}`;
      navigator.clipboard.writeText(obsUrl);
      setCopied(true);
      addLog('success', 'คัดลอกลิงก์ OBS สำเร็จ! พร้อมพอร์ตเชื่อมต่ออัตโนมัติ 🚀');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      addLog('error', 'ไม่สามารถคัดลอกได้อัตโนมัติ กรุณาคัดลอกจากกล่องข้อความ');
    }
  };

  const handleAvatarClick = (avatar: Avatar) => {
    // Force specific avatar to jump and greet
    addLog('event', `🎯 @${avatar.uniqueId} กระโดดทักทายคุณ!`);
    addOrUpdateAvatar(avatar.uniqueId, avatar.nickname, undefined, 'chat', 'ฮั่นแน่! กดคลิกโดนตัวผมด้วย 👋');
  };

  if (isObsMode) {
    return (
      <div 
        className={`w-screen h-screen relative overflow-hidden transition-all duration-700 ${currentBg.className}`}
        style={{ backgroundImage: currentBg.gridColor }}
      >
        {/* Transparent Exit button ONLY visible if hovered, to prevent trapping developers testing this */}
        <button 
          onClick={() => setIsObsMode(false)}
          className="absolute top-2 right-2 z-50 opacity-0 hover:opacity-100 bg-black/60 border border-white/15 px-2.5 py-1.5 text-[10px] rounded text-slate-400 font-sans transition-opacity cursor-pointer flex items-center gap-1"
        >
          ✕ ออกจากโหมดตรวจสอบ (กลับสู่แผงควบคุม)
        </button>

        {/* The Interactive Ground Floor where avatars reside */}
        <div className="absolute inset-0 z-0">
          {avatars.map((av) => (
            <div key={av.uniqueId}>
              <AvatarRenderer avatar={av} neonGlow={neonGlow} />
            </div>
          ))}
        </div>

        {/* Stylizer Stage floor lines */}
        <div className={`absolute bottom-0 left-0 right-0 h-1/5 transition-colors duration-500 ${currentBg.floorColor}`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <span className="text-[9px] font-mono tracking-widest text-white uppercase">STAGE GROUND FLOOR BOUNDARY</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0B0E] text-slate-200 font-sans overflow-hidden">
      
      {/* Immersive Header Navigation */}
      <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#12141C] border-b border-white/5 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#FF0050] to-[#00F2EA] rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/10">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.232 3.234 6.256 6.256 0 0 0 5.25 9.127 6.25 6.25 0 0 0 6.25-6.25V9.454a8.232 8.232 0 0 0 4.711 1.5V7.561a4.783 4.783 0 0 1-1.746-.875z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              AvatarStream Connect 
              <span className="text-[10px] uppercase px-2 py-0.5 bg-gradient-to-r from-[#FF0050]/20 to-[#00F2EA]/20 border border-white/10 rounded font-normal text-slate-300 font-sans">
                v2.1.0
              </span>
            </h1>
            <p className="text-xs text-slate-400">TikTok Live Interactive Overlay</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${connection === 'connected' ? 'bg-[#00F2EA]' : 'bg-rose-500'} animate-pulse`}></span>
              <span className="text-xs font-mono text-[#00F2EA]">{wsUrl}</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-sans">
              {connection === 'connected' ? 'WebSocket Connected' : 'WebSocket Disconnected'}
            </span>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/5 hidden sm:flex">
            <div className="w-6 h-6 rounded-full bg-[#00F2EA]/20 border border-[#00F2EA]/50 flex items-center justify-center text-[10px] text-[#00F2EA] font-extrabold shadow-xs uppercase">
              {tiktokUsername ? tiktokUsername.slice(0, 2) : 'TT'}
            </div>
            
            {isEditingUsername ? (
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-slate-400">@</span>
                <input
                  type="text"
                  value={tiktokUsername}
                  onChange={(e) => {
                    const val = e.target.value.replace(/^@/, '').trim();
                    setTiktokUsername(val);
                    localStorage.setItem('tiktok_username', val);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingUsername(false);
                    }
                  }}
                  autoFocus
                  placeholder="username"
                  className="bg-black/45 border border-[#00F2EA]/40 rounded px-1.5 py-0.5 text-xs text-white outline-none w-28 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setIsEditingUsername(false)}
                  className="p-1 hover:bg-white/10 rounded text-[#00F2EA] cursor-pointer"
                  title="บันทึก"
                >
                  <Check size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingUsername(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-white transition-colors group cursor-pointer"
                title="คลิกเพื่อแก้ไขชื่อช่องของคุณ"
              >
                <span>@{tiktokUsername || 'tiktok_avatar'}</span>
                <Edit2 size={10} className="text-slate-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Workspace Frame */}
      <main className="flex flex-1 overflow-hidden p-6 gap-6 flex-col lg:flex-row">
        
        {/* Sidebar Controls Layout (Left Column on Large, Top/Collapse on smaller screen) */}
        <aside className="w-full lg:w-72 flex flex-col gap-4 overflow-y-auto shrink-0 pr-1 max-h-[35%] lg:max-h-full">
          
          {/* Tabs header selector */}
          <div className="flex bg-[#12141C] p-1 rounded-xl border border-white/5 gap-1 shadow-md shrink-0">
            <button
              type="button"
              onClick={() => setSidebarTab('settings')}
              className={`flex-grow py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                sidebarTab === 'settings' 
                  ? 'bg-gradient-to-r from-[#00F2EA] to-teal-500 text-black shadow-md font-extrabold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              ตั้งค่าระบบ
            </button>
            <button
              type="button"
              onClick={() => setSidebarTab('spawn')}
              className={`flex-grow py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                sidebarTab === 'spawn' 
                  ? 'bg-gradient-to-r from-[#00F2EA] to-teal-500 text-black shadow-md font-extrabold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              🪄 เสกอวตารเอง
            </button>
            <button
              type="button"
              onClick={() => setSidebarTab('viewers')}
              className={`flex-grow py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                sidebarTab === 'viewers' 
                  ? 'bg-gradient-to-r from-[#00F2EA] to-teal-500 text-black shadow-md font-extrabold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              ผู้เล่น ({avatars.length})
            </button>
          </div>

          {/* TAB 1: System settings and OBS ready link */}
          {sidebarTab === 'settings' && (
            <div className="bg-[#12141C] border border-white/5 rounded-2xl p-4 space-y-4 shadow-xl shrink-0">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Settings size={12} className="text-[#00F2EA]" /> Avatar Settings
                </h3>
                <button 
                  onClick={clearAllRoom} 
                  className="text-[10px] text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer"
                  title="ล้างทุกคนในห้อง"
                >
                  ล้างจอ
                </button>
              </div>

              <div className="space-y-3">
                {/* WebSocket Server Connection Config */}
                <div className="bg-[#1A1D26] border border-white/5 rounded-xl p-3 space-y-2.5 font-sans">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${connection === 'connected' ? 'bg-[#00F2EA]' : connection === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-rose-500'}`} />
                      เชื่อมต่อ TikTok Web Link
                    </label>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      {connection === 'connected' ? 'Connected' : connection === 'connecting' ? 'Connecting' : 'Disconnected'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={wsUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setWsUrl(val);
                        localStorage.setItem('ws_url', val);
                      }}
                      placeholder="ws://localhost:62024"
                      className="flex-1 min-w-0 bg-[#0A0B0E] border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-[#00F2EA]/40 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (connection === 'connected') {
                          disconnectWebSocket();
                        } else {
                          connectWebSocket(wsUrl);
                        }
                      }}
                      className={`px-2.5 py-1.5 rounded text-[10px] font-extrabold cursor-pointer transition-all shrink-0 ${
                        connection === 'connected' 
                          ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md' 
                          : 'bg-[#00F2EA] hover:bg-[#00F2EA]/85 text-slate-950 active:scale-95'
                      }`}
                    >
                      {connection === 'connected' ? 'ยกเลิก' : 'เชื่อมต่อ'}
                    </button>
                  </div>
                  <div className="text-[9px] text-[#00F2EA] flex justify-between">
                    <span>ตล. IndoFinity: ws://localhost:62024</span>
                    <span>ตล. Connector: ws://127.0.0.1:2113</span>
                  </div>
                </div>

                {/* TikTok Username Profile Config */}
                <div className="bg-[#1A1D26] border border-white/5 rounded-xl p-3 space-y-2 font-sans">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                      👤 ชื่อช่อง TikTok ของคุณ
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">@</span>
                    <input 
                      type="text"
                      value={tiktokUsername}
                      onChange={(e) => {
                        const val = e.target.value.replace(/^@/, '').trim();
                        setTiktokUsername(val);
                        localStorage.setItem('tiktok_username', val);
                      }}
                      placeholder="เช่น my_channel_name"
                      className="w-full bg-[#0A0B0E] border border-white/10 rounded pl-6 pr-2 py-1.5 text-xs text-white outline-none focus:border-[#00F2EA]/40 font-mono"
                    />
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed">
                    ใส่เพื่อกำหนดชื่อของคุณที่จะโชว์บนแถบสเตตัส และระบุช่อง TikTok ของสตรีมเมอร์
                  </p>
                </div>

                {/* Default Spawn Behavior */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 uppercase font-bold tracking-wide">ประเภทตัวละครเกิดจำลอง</label>
                  <select 
                    value={selectedAvatarType}
                    onChange={(e) => setSelectedAvatarType(e.target.value as AvatarType)}
                    className="w-full bg-[#1A1D26] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00F2EA]/50 transition-colors cursor-pointer"
                  >
                    <option value="slime">🦎 สไลม์สุดป่วน (Slime)</option>
                    <option value="cute-golem">🗿 โกเลมหินวิเศษ (Cute Golem)</option>
                    <option value="bunny">🐰 กระต่ายน้อยร่าเริง (Bunny)</option>
                    <option value="wizard">🧙 พ่อมดร่ายมนตร์ (Wizard)</option>
                    <option value="astronaut">🧑‍🚀 มนุษย์อวกาศลอยคอ (Astronaut)</option>
                    <option value="penguin">🐧 เพนกวินขั้วโลก (Penguin)</option>
                    <option value="axolotl">🌸 หมาน้ำแต่อมยิ้ม (Axolotl)</option>
                  </select>
                </div>

                {/* Range scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>ความเร็วอวตาร</span>
                    <span className="text-[#00F2EA] font-mono font-bold">x{speedMultiplier.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={speedMultiplier}
                    onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-[#00F2EA] bg-[#1A1D26] h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Lifespan clear */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>อยู่ได้นานสูงสุด</span>
                    <span className="text-[#00F2EA] font-mono font-bold">{avatarAgeLimit} นาที</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={avatarAgeLimit}
                    onChange={(e) => setAvatarAgeLimit(parseInt(e.target.value))}
                    className="w-full accent-[#00F2EA] bg-[#1A1D26] h-1 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#1A1D26] rounded-xl border border-white/5">
                  <span className="text-xs text-slate-200">เดินสำรวจสุ่มเวที</span>
                  <button
                    onClick={() => setAutoMovement(!autoMovement)}
                    type="button"
                    className={`w-10 h-5.5 rounded-full flex items-center px-1 border transition-all cursor-pointer ${
                      autoMovement 
                        ? 'bg-[#00F2EA]/20 border-[#00F2EA]/40' 
                        : 'bg-[#1A1D26] border-white/10'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full transition-all ${
                      autoMovement ? 'bg-[#00F2EA] translate-x-4' : 'bg-slate-400 translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#1A1D26] rounded-xl border border-white/5">
                  <span className="text-xs text-slate-200">เสียงแชทเด้งดุ๊กดิ๊ก</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    type="button"
                    className={`w-10 h-5.5 rounded-full flex items-center px-1 border transition-all cursor-pointer ${
                      soundEnabled 
                        ? 'bg-[#FF0050]/20 border-[#FF0050]/40' 
                        : 'bg-[#1A1D26] border-white/10'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full transition-all ${
                      soundEnabled ? 'bg-[#FF0050] translate-x-4' : 'bg-slate-400 translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Vivid Premium Neon Sparkle and Speech Duration controls */}
                <div className="bg-[#1A1D26] border border-white/5 rounded-xl p-3 space-y-3 font-sans">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00F2EA]">
                    ✨ ตกแต่งความมีสีสันสไตล์นีออน
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">ความเรืองแสงนีออน (Neon Glow Aura)</span>
                    <button
                      onClick={() => {
                        const nextGlow = !neonGlow;
                        setNeonGlow(nextGlow);
                        localStorage.setItem('neon_glow', String(nextGlow));
                      }}
                      type="button"
                      className={`w-10 h-5.5 rounded-full flex items-center px-1 border transition-all cursor-pointer ${
                        neonGlow 
                          ? 'bg-[#00F2EA]/20 border-[#00F2EA]/40' 
                          : 'bg-[#1A1D26] border-white/10'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full transition-all ${
                        neonGlow ? 'bg-[#00F2EA] translate-x-4' : 'bg-slate-400 translate-x-0'
                      }`} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">เวลาค้างกล่องข้อความพูดคุย bubble</label>
                    <select 
                      value={bubbleDuration}
                      onChange={(e) => {
                        const dur = parseInt(e.target.value, 10);
                        setBubbleDuration(dur);
                        localStorage.setItem('bubble_duration', String(dur));
                      }}
                      className="w-full bg-[#0A0B0E] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00F2EA]/50 transition-colors cursor-pointer"
                    >
                      <option value={5}>⚡ 5 วินาที (เร็ว)</option>
                      <option value={12}>💬 12 วินาที (แนะนำ)</option>
                      <option value={30}>🕒 30 วินาที (ปานกลาง)</option>
                      <option value={60}>⏱️ 1 นาที (คงอยู่ยาว)</option>
                      <option value={999999}>♾️ ไม่จำกัด (ค้างตลอดจนกว่าจะมีแชทใหม่มาทับ)</option>
                    </select>
                  </div>
                </div>

                {/* OBS Integration Link Generator */}
                <div className="bg-[#1A1D26] border border-white/5 rounded-xl p-3 space-y-2.5 mt-2 font-sans">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00F2EA]">
                    <Tv size={12} /> สตรีมด้วย OBS Studio
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    ก๊อปปี้ลิงก์ด้านล่างไปใส่ใน <strong>Browser Source</strong> ของ OBS หรือ TikTok LIVE Studio และเปิดฟิลเตอร์ <em>Chroma Key</em> สีเขียวเพื่อเจาะจอ!
                  </p>

                  <div className="bg-rose-500/10 border border-rose-500/25 p-2 rounded text-[10px] space-y-1 text-rose-300">
                    <p className="font-extrabold flex items-center gap-1">
                      ⚠️ ข้อควรระวังสูงสุด
                    </p>
                    <p className="text-[9px] text-slate-300 leading-normal">
                      <strong>ห้ามเอาลิ้งก์ "ws://localhost:62024" ไปใส่ใน OBS เด็ดขาด!</strong> ช่อง URL ใน OBS ต้องใช้เป็นที่อยู่เว็บแอปด้านล่างนี้เท่านั้นครับ!
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <div className="flex-1 min-w-0 bg-[#0A0B0E] border border-white/5 rounded px-2 py-1.5 text-[9px] font-mono text-slate-400 truncate tracking-tight flex items-center justify-between">
                      <span className="truncate select-all">
                        {typeof window !== 'undefined' 
                          ? `${window.location.origin}/?obs=true&bg=${currentBg.id}&ws=${encodeURIComponent(wsUrl)}&bubble_time=${bubbleDuration}&neon_glow=${neonGlow}` 
                          : `?obs=true&bg=${currentBg.id}&ws=${encodeURIComponent(wsUrl)}&bubble_time=${bubbleDuration}&neon_glow=${neonGlow}`
                        }
                      </span>
                      <span className="text-[8px] text-[#00F2EA] font-extrabold tracking-wider shrink-0 select-none ml-1">WEB URL</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyObsUrl}
                      className={`px-2.5 py-1.5 rounded text-[10px] font-extrabold cursor-pointer transition-all ${
                        copied ? 'bg-emerald-500 text-white shadow-md' : 'bg-[#00F2EA] hover:bg-[#00F2EA]/85 text-slate-950 active:scale-95'
                      }`}
                    >
                      {copied ? 'ก๊อปแล้ว!' : 'คัดลอก URL'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsObsMode(true)}
                    className="w-full text-center py-1.5 bg-white/5 hover:bg-white/10 text-[9px] font-semibold text-slate-300 rounded border border-white/5 transition-colors cursor-pointer mb-2"
                  >
                    🖥️ ตรวจสอบตัวอย่างโหมดสตรีมด่วน (Preview OBS Mode)
                  </button>

                  {/* Complete Troubleshooting Guide Inside Card */}
                  <div className="border-t border-white/10 pt-2.5 mt-1 space-y-2">
                    <h4 className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wide">🚨 3 ขั้นตอนแก้ปัญหา IndoFinity กดเสกแล้วไม่ทำงาน:</h4>
                    
                    <div className="bg-black/60 p-2.5 rounded border border-[#00F2EA]/20 space-y-2">
                      <div className="space-y-1">
                        <p className="text-[10.5px] font-extrabold text-white flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-[#00F2EA] flex items-center justify-center font-bold text-[9px]">1</span>
                          ลิ้งก์ใน OBS ต้องเป็น ลิ้งก์เว็บแอปนี้
                        </p>
                        <p className="text-[9.5px] text-slate-300 leading-relaxed pl-5">
                          คัดลอกลิ้งก์จากกล่อง <strong>"คัดลอก URL"</strong> ด้านบนไปใส่ใน OBS (ไม่ใช่ ws:// ดั้งเดิม) สัญญาณสตรีมมิ่งจึงจะโชว์ตัวละครการเกิดได้สมบูรณ์ครับ
                        </p>
                      </div>

                      <div className="space-y-1 border-t border-white/5 pt-1.5">
                        <p className="text-[10.5px] font-extrabold text-white flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-[#00F2EA] flex items-center justify-center font-bold text-[9px]">2</span>
                          กดเชื่อมต่อในโปรแกรม IndoFinity ให้สำเร็จ
                        </p>
                        <p className="text-[9.5px] text-slate-300 leading-relaxed pl-5">
                          ในโปรแกรม IndoFinity ปุ่มสีส้ม <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">Connect</span> ขวาบนยังเชื่อมไม่สำเร็จ! ต้องใส่ชื่อช่อง TikTok หรือไอดี และกดเชื่อมต่อจนปุ่มเปลี่ยนสเตตัสครับ
                        </p>
                      </div>

                      <div className="space-y-1 border-t border-white/5 pt-1.5">
                        <p className="text-[10.5px] font-extrabold text-white flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-[#00F2EA] flex items-center justify-center font-bold text-[9px]">3</span>
                          ตั้งค่าอนุญาตเนื้อหา "Insecure content" บนบราวเซอร์ Chrome
                        </p>
                        <p className="text-[9.5px] text-slate-300 leading-relaxed pl-5">
                          เนื่องจากหน้าเว็บเป็น HTTPS แต่โปรแกรมจำลองดึงผ่าน ws:// ซึ่งไม่เข้ารหัสความปลอดภัย:
                        </p>
                        <ul className="text-[9px] text-emerald-300 pl-5 list-decimal list-inside space-y-0.5">
                          <li>คลิกที่ไอคอน <strong>"ตั้งค่าเว็บไซต์ / แม่กุญแจ"</strong> ข้างแถบ URL ของหน้าเว็บนี้</li>
                          <li>เลือกเมนู <strong className="text-white">"การตั้งค่าไซต์" (Site Settings)</strong></li>
                          <li>เลื่อนไปล่างสุดหาหัวข้อ <strong className="text-white">"เนื้อหาที่ไม่ปลอดภัย" (Insecure content)</strong></li>
                          <li>เปลี่ยนเป็นตัวเลือก <strong className="text-[#00F2EA] font-extrabold">"อนุญาต" (Allow)</strong> และกด F5 โหลดหน้าเว็บนี้ใหม่</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-black/40 p-2 rounded border border-amber-500/10 space-y-1">
                      <p className="text-[9.5px] font-bold text-slate-200">💡 ทางเลือกเสริม: ใช้งานง่ายไม่มีสะดุด 100%:</p>
                      <p className="text-[9px] text-slate-400 leading-relaxed">
                        เปิดหน้านี้บนบราวเซอร์ Chrome ตลอดเวลา แล้วกางสตรีมจอเขียวเต็มที่ จากนั้นเพิ่มสื่อใน OBS เลือกเป็น <strong className="text-white">Window Capture</strong> แล้วทำการเจาะคีย์ Chroma Key วิธีนี้เสถียรที่สุดและแก้ปัญหาร้อยแปดอย่างได้ทันทีครับ!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manual Avatar Spawner */}
          {sidebarTab === 'spawn' && (
            <form onSubmit={handleCustomSpawn} className="bg-[#12141C] border border-white/5 rounded-2xl p-4 space-y-3 shadow-xl flex flex-col flex-grow select-none">
              <div className="border-b border-white/5 pb-2">
                <h3 className="text-xs font-bold text-[#00F2EA] uppercase tracking-wider flex items-center gap-1.5">
                  🪄 เสกอวตารคัสตอม (Custom Spawn)
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal">สร้าง/เพิ่มอวตารจำลองได้ตามใจชอบ ทั้งชื่อ สี และโมเดล!</p>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-2 gap-2 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ชื่อเล่น (Nickname)</label>
                    <input
                      type="text"
                      value={customNick}
                      onChange={(e) => setCustomNick(e.target.value)}
                      placeholder="เช่น สมชายจอมซ่า"
                      className="w-full bg-[#1A1D26] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00F2EA]/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ไอดีเซิร์ฟ (ID)</label>
                    <input
                      type="text"
                      value={customUser}
                      onChange={(e) => setCustomUser(e.target.value)}
                      placeholder="เช่น user_xyz"
                      className="w-full bg-[#1A1D26] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00F2EA]/50 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">โมเดลอวตาร (Selector)</label>
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as AvatarType)}
                    className="w-full bg-[#1A1D26] border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#00F2EA]/50 cursor-pointer"
                  >
                    <option value="slime">🦎 สไลม์เด้งได้ (Slime)</option>
                    <option value="cute-golem">🗿 โกเลมหินวิเศษ (Cute Golem)</option>
                    <option value="bunny">🐰 กระต่ายน้อยร่าเริง (Bunny)</option>
                    <option value="wizard">🧙 พ่อมดมนตรา (Wizard)</option>
                    <option value="astronaut">🧑‍🚀 มนุษย์อวกาศ (Astronaut)</option>
                    <option value="penguin">🐧 เพนกวินดุ๊กดิ๊ก (Penguin)</option>
                    <option value="axolotl">🌸 หมาน้ำแต่อมยิ้ม (Axolotl)</option>
                    <option value="custom">🖼️ หาอวตารใส่เอง/อัปโหลดรูปภาพ (Custom Image)</option>
                  </select>
                </div>

                {customType === 'custom' && (
                  <div className="bg-[#181B27]/80 rounded-xl p-3 border border-white/5 space-y-3 animate-fade-in text-sans">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] text-[#00F2EA] font-extrabold uppercase tracking-widest">
                        🖼️ ตั้งค่าอวตารรูปของคุณเอง (Custom Image Avatar)
                      </span>
                      <p className="text-[9px] text-slate-400">รูปภาพของคุณจะถูกนำเสนอลอยประดับแสงออร่าแสนน่ารักรอบตัวละคร!</p>
                    </div>

                    {/* File Upload Zone */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">อัปโหลดไฟล์ในเครื่องคอมพิวเตอร์:</span>
                      <div className="relative border border-dashed border-white/15 rounded-lg p-3 hover:border-[#00F2EA]/40 transition-colors bg-black/25 flex flex-col items-center justify-center text-center cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setCustomImgFile(event.target?.result as string);
                                setCustomImgUrl(''); // Clear url input
                                addLog('success', `อัปโหลดรูปอวตารสำเร็จ: ${file.name} 🎉`);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {customImgFile ? (
                          <div className="flex items-center gap-2">
                            <img src={customImgFile} className="w-8 h-8 rounded-full object-cover border border-[#00F2EA]" alt="preview" />
                            <div className="text-left">
                              <p className="text-[10px] font-bold text-emerald-400">โหลดไฟล์เสร็จสิ้น!</p>
                              <p className="text-[8px] text-slate-400">คลิกลากรูปภาพใหม่เพื่อเปลี่ยน</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <p className="text-[10px] text-slate-300 font-bold group-hover:text-[#00F2EA] transition-colors">
                              📁 คลิกที่นี่เพื่อลากวางไฟล์รูป (Drag or click)
                            </p>
                            <p className="text-[8px] text-slate-500">รองรับ GIF, PNG (แบบใส), JPG</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">หรือวางลิงก์รูปภาพจากเน็ต (Image URL):</span>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={customImgUrl}
                          onChange={(e) => {
                            setCustomImgUrl(e.target.value);
                            setCustomImgFile(null); // Clear file data
                          }}
                          placeholder="https://example.com/chibi.png"
                          className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-[#00F2EA]/40 font-mono text-[9px]"
                        />
                        {customImgUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomImgUrl('');
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Choose from adorable templates */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-[#00F2EA] font-extrabold uppercase tracking-wider block">🎉 หรือเลือกใช้รูปจำลองน่ารักๆ สำเร็จรูป:</span>
                      <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-0.5">
                        {PRESET_AVATARS.map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => {
                              setCustomImgUrl(p.url);
                              setCustomImgFile(null);
                              addLog('info', `เลือกด่วน: ${p.name}`);
                            }}
                            className={`p-1 border rounded bg-black/15 flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all hover:bg-[#00F2EA]/10 hover:border-[#00F2EA]/30 ${
                              customImgUrl === p.url ? 'border-[#00F2EA] bg-[#00F2EA]/5 shadow-md' : 'border-white/5'
                            }`}
                          >
                            <img src={p.url} className="w-8 h-8 rounded-full object-cover border border-white/5" alt={p.name} />
                            <span className="text-[8px] text-slate-300 truncate w-full font-sans">{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">เลือกสีอวตาร</label>
                  <div className="flex flex-wrap gap-1.5">
                    {COLOR_PALETTE.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setCustomColor(col)}
                        className={`w-6 h-6 rounded-full border border-black/20 cursor-pointer hover:scale-110 active:scale-90 transition-transform relative`}
                        style={{ backgroundColor: col }}
                      >
                        {customColor === col && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white select-none">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block text-slate-300">กระดิกทักทาย (Action)</label>
                  <div className="grid grid-cols-2 gap-1 px-1 py-1 rounded bg-[#1A1D26] border border-white/5 font-sans">
                    {[
                      { id: 'join', label: '👤 เกิดเฉยๆ' },
                      { id: 'chat', label: '💬 ส่งข้อความ' },
                      { id: 'like', label: '❤️ ส่งหัวใจ' },
                      { id: 'follow', label: '🌟 กดติดตาม' },
                      { id: 'gift', label: '🎁 เปย์ของขวัญ' }
                    ].map((actOpts) => (
                      <button
                        key={actOpts.id}
                        type="button"
                        onClick={() => setCustomAction(actOpts.id as any)}
                        className={`py-1 text-[10px] font-medium rounded transition-all cursor-pointer ${
                          customAction === actOpts.id 
                            ? 'bg-gradient-to-r from-[#FF0050] to-[#FF0050]/90 text-white font-extrabold shadow-md' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        {actOpts.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Text Area for Comment/Gift content */}
                {(customAction === 'chat' || customAction === 'gift') && (
                  <div className="space-y-1 animate-fade-in pb-1">
                    <label className="text-[9px] text-[#00F2EA] font-extrabold uppercase tracking-widest leading-none">
                      {customAction === 'chat' ? 'ระบุข้อความแชท (Chat Content)' : 'ระบุประเภทของขวัญพร้อมจำนวน'}
                    </label>
                    <input
                      type="text"
                      value={customActionVal}
                      onChange={(e) => setCustomActionVal(e.target.value)}
                      placeholder={customAction === 'chat' ? 'สวัสดีทุกคนครับ ยินดีที่ได้เห็นหน้าจอ!' : 'เช่น มงกุฎทองคำ 👑 x1'}
                      className="w-full bg-[#1A1D26] border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#00F2EA]/50 font-sans"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 to-[#00F2EA] hover:brightness-110 text-slate-950 font-extrabold py-2.5 px-3 rounded-xl transition-all shadow-lg text-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🪄</span> เสกระเบิดอวตารลงสนาม!
              </button>
            </form>
          )}

          {/* TAB 3: Active Viewers List */}
          {sidebarTab === 'viewers' && (
            <div className="flex-grow bg-[#12141C] border border-white/5 rounded-2xl p-4 flex flex-col min-h-[170px] shadow-xl">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Active Viewers ({avatars.length})</span>
                <span className="text-[9px] text-[#00F2EA] tracking-wide font-mono animate-pulse">LIVE SCREEN</span>
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-slate-300 max-h-[180px] lg:max-h-none">
                {avatars.length === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col text-center py-6 text-slate-500">
                    <p className="text-xs italic">ไม่มีอวตารออนไลน์</p>
                    <p className="text-[9px] mt-1 text-slate-500 leading-normal">
                      สลับไปแท็บ <strong>เสกอวตารเอง</strong> หรือกดจำลองด้านล่างเพื่อให้ฝูงคนกระโดดลงสู่จอของคุณ!
                    </p>
                  </div>
                ) : (
                  avatars.map((v) => {
                    return (
                      <div 
                        key={v.uniqueId} 
                        onClick={() => handleAvatarClick(v)}
                        className="flex items-center gap-2.5 p-1.5 hover:bg-white/5 rounded-lg transition-all cursor-pointer border border-transparent hover:border-white/5"
                      >
                        <div 
                          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-white shadow-md relative"
                          style={{ backgroundColor: v.color }}
                        >
                          {v.nickname.charAt(0).toUpperCase()}
                          {v.isVip && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 p-[1px] rounded-full">
                              <Sparkles size={8} className="fill-current" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 font-sans">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-slate-200 truncate font-mono">@{v.uniqueId}</p>
                            <span className="text-[8px] font-mono bg-white/10 text-slate-300 px-1 rounded uppercase">
                              {v.avatarType}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#00F2EA] italic truncate">
                            {v.state === 'walking' ? 'Walking...' : v.state === 'jumping' ? 'Jumping 🌟' : 'Idle resting'}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </aside>

        {/* Central Preview and Event Console Area */}
        <section className="flex-1 flex flex-col gap-6 overflow-hidden">
          
          {/* Main Simulation Area */}
          <div className="flex-1 bg-[#050608] rounded-3xl border border-white/10 relative overflow-hidden group shadow-2xl shadow-cyan-500/5 min-h-[300px]">
            
            {/* Visual Backdrops / Canvas inside simulation stage */}
            <div 
              className={`absolute inset-0 transition-all duration-700 flex flex-col justify-between ${currentBg.className}`}
              style={{ backgroundImage: currentBg.gridColor }}
            >
              
              {/* Top Watermark for OBS capturing */}
              <div className="p-4 flex items-center justify-between pointer-events-none z-10 select-none">
                <div className="flex items-center gap-2 text-slate-200/80 bg-[#12141C]/80 backdrop-blur-xl border border-white/10 rounded-full px-3.5 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-400" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-200">
                    {currentBg.nameTh} Display Stage
                  </span>
                </div>

                <div className="bg-[#12141C]/80 backdrop-blur-xl border border-white/10 px-3 py-1 text-xs font-bold rounded-full text-slate-200">
                  ผู้ชมรวมสั่นสะเทือน: {avatars.length} ตัว
                </div>
              </div>

              {/* The Interactive Ground Floor Floor where avatars reside */}
              <div className="absolute inset-0 top-14 bottom-2 z-0">
                {avatars.map((av) => (
                  <div key={av.uniqueId} onClick={() => handleAvatarClick(av)} className="cursor-pointer">
                    <AvatarRenderer avatar={av} neonGlow={neonGlow} />
                  </div>
                ))}

                {/* Empty display status callout */}
                {avatars.length === 0 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex flex-col items-center text-center pointer-events-none p-5 max-w-sm mx-auto bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl select-none">
                    <div className="w-12 h-12 bg-[#00F2EA]/10 rounded-full flex items-center justify-center text-[#00F2EA] mb-3 animate-pulse">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="font-bold text-sm text-slate-100">ไม่มีผู้ชมอวตารอยู่บนจอเวที</h3>
                    <p className="text-xs text-slate-400 mt-1 lines-relaxed">
                      กดปุ่มจำลองด้านล่างเพื่อสุ่มความเคลื่อนไหวจำลอง และพิมพ์แชทเข้ามาให้เห็นทันที! หรือรันโปรแกรมเชื่อม TikTok ไลฟ์
                    </p>
                  </div>
                )}
              </div>

              {/* Stylizer Stage lines bottom panel to fit vertical depth alignment */}
              <div className={`h-1/5 w-full mt-auto relative transition-colors duration-500 ${currentBg.floorColor}`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase">STAGE GROUND FLOOR BOUNDARY</span>
                </div>
              </div>

            </div>

            {/* Stage Left top badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10 selector-ignore">
              {/* Optional identifier watermark tags */}
            </div>

            {/* Quick Simulators Overlay Toolbar Buttons at Bottom Right for rapid interactivity */}
            <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 z-10">
              <button
                onClick={simulateJoin}
                className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-150 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1"
                id="stage_sim_join"
              >
                <Plus size={12} className="text-[#00F2EA]" /> <span>(จำลอง) เข้าร่วม</span>
              </button>
              <button
                onClick={simulateChat}
                className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-150 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1"
                id="stage_sim_chat"
              >
                <MessageSquare size={12} className="text-blue-400" /> <span>(จำลอง) แชท</span>
              </button>
              <button
                onClick={simulateLike}
                className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-150 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1"
                id="stage_sim_like"
              >
                <Heart size={12} className="text-[#FF0050]" /> <span>(จำลอง) ถูกใจ</span>
              </button>
              <button
                onClick={simulateGift}
                className="px-3 py-1.5 bg-[#FF0050] hover:bg-[#FF0050]/90 text-white rounded-lg text-xs font-extrabold transition-all shadow-lg active:scale-95 flex items-center gap-1"
                id="stage_sim_gift"
              >
                <Gift size={12} className="text-yellow-300" /> <span>(จำลอง) ของขวัญ</span>
              </button>
            </div>

            {/* Backdrop selection bar - stylized */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
              <div className="bg-[#12141C]/80 backdrop-blur-md p-1 border border-white/10 rounded-lg flex items-center gap-1">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setCurrentBg(bg)}
                    className={`w-5 h-5 rounded-md transition-all ${
                      currentBg.id === bg.id 
                        ? 'ring-2 ring-[#00F2EA] scale-110 shadow-md' 
                        : 'opacity-55 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: bg.id === 'neon-grid' ? '#0A0B0E' : bg.id === 'cozy-park' ? '#34d399' : bg.id === 'stream-studio' ? '#a855f7' : bg.id === 'chroma-green' ? '#00ff00' : '#0000ff' }}
                    title={bg.name}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Web Connection form & WebSocket Event Console Log */}
          <div className="h-52 bg-[#12141C] border border-white/5 rounded-2xl flex flex-col shadow-xl overflow-hidden shrink-0">
            
            <div className="px-5 py-3 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#00F2EA]" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">WebSocket Connector & Console</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={wsUrl}
                  onChange={(e) => setWsUrl(e.target.value)}
                  placeholder="ws://localhost:62024"
                  className="bg-[#1A1D26] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white outline-none focus:border-[#00F2EA]/50 font-mono tracking-tight w-48"
                  id="ws_url_footer"
                />
                {connection === 'connected' ? (
                  <button
                    onClick={disconnectWebSocket}
                    className="bg-[#FF0050] hover:bg-[#FF0050]/80 text-white px-2.5 py-1 rounded-md text-xs font-semibold select-none cursor-pointer"
                  >
                    ตัด
                  </button>
                ) : (
                  <button
                    onClick={() => connectWebSocket(wsUrl)}
                    disabled={connection === 'connecting'}
                    className="bg-[#00F2EA] hover:bg-[#00F2EA]/80 text-black px-2.5 py-1 rounded-md text-xs font-extrabold select-none cursor-pointer disabled:opacity-40"
                  >
                    เชื่อมต่อ
                  </button>
                )}
              </div>
            </div>

            {/* Stream logging element, color optimized */}
            <div className="flex-1 p-4 font-mono text-[11px] space-y-1.5 overflow-y-auto bg-[#0A0B0E]" id="console_scroller">
              {logs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-500 italic text-[11px]">
                  ไม่มีข้อความแชทหรือกระแสไลฟ์ระบบในขนาดนี้...
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex gap-3 text-slate-400">
                    <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                    {log.type === 'event' ? (
                      <span className="text-slate-200">{log.message}</span>
                    ) : log.type === 'success' ? (
                      <span className="text-[#00F2EA] font-semibold">{log.message}</span>
                    ) : log.type === 'error' ? (
                      <span className="text-[#FF0050] hover:underline font-bold">{log.message}</span>
                    ) : log.type === 'warning' ? (
                      <span className="text-amber-400">{log.message}</span>
                    ) : (
                      <span className="text-slate-400">{log.message}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Decorative Interactive Immersive Footer Status Bar */}
      <footer className="px-6 py-3 bg-[#0A0B0E] border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono select-none">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2EA]"></span>
            LATENCY: <span className="text-slate-300 font-bold">12ms (LOCAL)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            ACTIVE CONTEXT: <span className="text-slate-300 font-bold">{avatars.length} ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            CHATS RECV: <span className="text-slate-300 font-bold">{totalChatsRecv}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <span>MEM: 124MB</span>
          <span>CPU: 4.2%</span>
          <span className="text-slate-400 font-extrabold hover:text-[#00F2EA] transition-colors">BUILD: 0xFF24A</span>
        </div>
      </footer>

    </div>
  );
}
