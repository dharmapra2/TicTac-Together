import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
    has_image: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      email: args.email,
      name: args.name,
      has_image: args.has_image,
      ...(args.has_image && { image: args.image }),
    });
  },
});

export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    image: v.string(),
    name: v.string(),
    has_image: v.boolean(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      has_image: args.has_image,
      ...(args.has_image && { image: args.image }),
    });
  },
});

export const deletedUser = internalMutation({
  args: { tokenIdentifier: v.string(), deleted: v.boolean() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }
    await ctx.db.delete(user._id);
  },
});

export const setUserOnlineOffline = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    isOnline: v.boolean(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      isOnline: args.isOnline ?? false,
      status: args.status ?? "",
    });
  },
});

export const getUsers = query({
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const users = await ctx.db.query("users").collect();
    return users.filter(
      (user) => user.tokenIdentifier !== identity.tokenIdentifier
    );
  },
});

export const getMe = query({
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const getGroupMembers = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const conversation = await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("_id"), args.conversationId))
      .first();
    if (!conversation) {
      throw new ConvexError("Conversation not found");
    }

    const users = await ctx.db.query("users").collect();
    const groupMembers = users.filter((user) =>
      conversation.participants.includes(user._id)
    );

    return groupMembers;
  },
});

export const getAvilablePlayers = query({
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const users = await ctx.db
      .query("users")
      .filter((q) =>
        q.and(
          q.neq(q.field("tokenIdentifier"), identity.tokenIdentifier),
          q.eq(q.field("status"), "active")
        )
      )
      .collect();
    console.log(users);
    return users;
  },
});

export const getInGamePlayers = query({
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const users = await ctx.db
      .query("users")
      .filter((q) =>
        q.and(
          q.neq(q.field("tokenIdentifier"), identity.tokenIdentifier),
          q.eq(q.field("status"), "Playing")
        )
      )
      .collect();
    return users;
  },
});

export const getWaitingPlayers = query({
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const users = await ctx.db
      .query("users")
      .filter((q) =>
        q.and(
          q.neq(q.field("tokenIdentifier"), identity.tokenIdentifier),
          q.or(
            q.eq(q.field("status"), "Waiting"),
            q.eq(q.field("status"), "InGame")
          )
        )
      )
      .collect();
    return users;
  },
});
