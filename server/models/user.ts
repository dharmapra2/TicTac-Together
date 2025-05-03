export interface User {
  userId: string;
  username: string;
  socketId: string;
  lastSeen: Date;
}

export interface Player extends User {
  team: "X" | "O" | null;
  isReady: boolean;
  score: number;
}

export interface Spectator extends User {
  isActive: boolean;
}

export interface ChatMessage {
  userId: string;
  username: string;
  message: string;
  timestamp: number;
  type: "text" | "voice";
}
