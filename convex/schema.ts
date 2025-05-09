import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
    status: v.optional(v.string()),
    isOnline: v.optional(v.boolean()),
    has_image: v.optional(v.boolean()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  rooms: defineTable({
    id: v.id("rooms"),
    name: v.optional(v.string()),
    status: v.boolean(),
    participants: v.array(v.id("users")),
  }),

  conversations: defineTable({
    participants: v.array(v.id("users")),
    isGroup: v.boolean(),
    groupName: v.optional(v.string()),
    groupImage: v.optional(v.string()),
    admin: v.optional(v.id("users")),
  }),

  messages: defineTable({
    conversation: v.id("conversations"),
    sender: v.string(), // should be string so that it doesn't throw errors in openai part ("ChatGPT")
    content: v.string(),
    // we stored the storageId so that in feature we can modify the file (user can edit the image)
    storageId: v.optional(v.string()),
    messageType: v.union(
      v.literal("text"),
      v.literal("image"),
      v.literal("video")
    ),
  }).index("by_conversation", ["conversation"]),
});
