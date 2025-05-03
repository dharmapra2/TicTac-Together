import { User, Player, Spectator, ChatMessage } from "./user";

export interface GameRoom {
  id: string;
  players: Map<string, Player>;
  spectators: Map<string, Spectator>;
  status: "waiting" | "playing" | "ended";
  gameState: GameState | null;
  chatHistory: ChatMessage[];
  createdAt: number;
}

export interface GameState {
  board: (string | null)[];
  currentPlayer: "X" | "O";
  winner: string | null;
  moves: number;
}

export interface RoomJoinData {
  roomId: string;
  userId: string;
  username: string;
}
