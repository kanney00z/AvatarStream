/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AvatarType = 'slime' | 'cute-golem' | 'bunny' | 'wizard' | 'astronaut' | 'penguin' | 'axolotl';

export interface Avatar {
  uniqueId: string;
  nickname: string;
  avatarType: AvatarType;
  profilePicture?: string;
  x: number; // percentage width (0-100) or pixels
  y: number; // percentage height (0-100) or pixels
  targetX: number;
  targetY: number;
  angle: number;
  color: string;
  scale: number;
  joinedAt: number;
  lastActive: number;
  comment: string | null;
  commentExpiresAt: number;
  reaction: 'chat' | 'like' | 'follow' | 'gift' | 'join' | null;
  reactionExpiresAt: number;
  giftName?: string;
  facingLeft: boolean;
  speed: number;
  bobOffset: number;
  state: 'idle' | 'walking' | 'jumping';
  isVip?: boolean;
}

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface LogMessage {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'event';
  message: string;
}

export interface BackgroundStyle {
  id: string;
  name: string;
  nameTh: string;
  className: string;
  floorColor: string;
  gridColor?: string;
  overlayClass?: string;
}

export interface TikTokEvent {
  event: 'chat' | 'join' | 'like' | 'follow' | 'gift';
  data: {
    uniqueId: string;
    nickname: string;
    comment?: string;
    profilePicture?: string;
    count?: number;
    giftId?: string;
    giftName?: string;
    giftCount?: number;
    repeatCount?: number;
  };
}
