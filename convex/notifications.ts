// convex/notifications.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const sendJoinRequest = mutation({
  args: {
    gameId: v.string(),
    senderId: v.string(),
    recipientId: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // Get sender info
    // const sender = await ctx.runQuery(internal.users.get, {
    //   userId: args.senderId,
    // });

    // Send real-time notification
    await ctx.runMutation(internal.notifications.receive, {
      type: "join_request",
      gameId: args.gameId,
      senderId: args.senderId,
      senderName: "Dharma",
      recipientId: args.recipientId,
      message: args.message,
    });

    // You could also update game state here if needed
  },
});

export const receive = mutation({
  args: {
    type: v.string(),
    gameId: v.string(),
    senderId: v.string(),
    senderName: v.string(),
    recipientId: v.string(),
    message: v.string(),
  },
  handler: async () => null, // Just triggers subscriptions
});
