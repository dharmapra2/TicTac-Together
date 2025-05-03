export function handleCreateRoom(socket, data, activeUsers) {
  try {
    console.log("User joined data:", data);

    if (!data.userId || !data.username) {
      throw new Error("Invalid user data");
    }

    const userData = {
      ...data,
      socketId: socket.id,
      lastSeen: Date.now(),
      isActive: true,
    };

    // Update or add user
    activeUsers.set(data.userId, userData);

    if (data.isReconnect) {
      console.log(`↩️ User reconnected: ${data.username}`);
      socket.broadcast.emit("user_reconnected", {
        userId: data.userId,
        username: data.username,
      });
    } else {
      console.log(`👋 New user joined: ${data.username}`);
      socket.broadcast.emit("new_user_notification", {
        userId: data.userId,
        username: data.username,
        message: `${data.username} joined the game`,
      });
    }

    // Send active users (excluding current)
    const others = Array.from(activeUsers.values()).filter(
      (u) => u.userId !== data.userId
    );
    socket.emit("active_users", others);
  } catch (error) {
    console.error("User join error:", error);
    socket.emit("error", {
      message: error.message || "Failed to join user",
    });
    throw error; // Re-throw for the outer try-catch
  }
}
