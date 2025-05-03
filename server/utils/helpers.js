export function generateId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function validateRoom(roomId) {
  return /^[A-Z0-9]{6,8}$/.test(roomId);
}

export function generateSessionId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
