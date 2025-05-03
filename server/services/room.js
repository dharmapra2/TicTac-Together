import { generateId } from "../utils/helpers";

export function createRoom(userId, username, socketId, activeRooms) {
  const roomId = generateId();
  const newRoom = {
    id: roomId,
    players: new Map(),
    spectators: new Map(),
    status: "waiting",
    gameState: initializeGameState(),
    chatHistory: [],
    createdAt: Date.now(),
  };

  addPlayer(newRoom, {
    userId,
    username,
    socketId,
    team: null,
    isReady: false,
    score: 0,
  });

  activeRooms.set(roomId, newRoom);
  return newRoom;
}

export function getRoom(roomId, activeRooms) {
  return activeRooms.get(roomId);
}

export function addPlayer(room, player) {
  player.team = room.players.size === 0 ? "X" : "O";
  room.players.set(player.socketId, player);
  return player;
}

export function addSpectator(room, spectator) {
  room.spectators.set(spectator.socketId, spectator);
  return spectator;
}

export function startGame(room) {
  room.status = "playing";
  room.gameState = initializeGameState();
}

// ... other room service functions

function initializeGameState() {
  return {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    moves: 0,
  };
}
