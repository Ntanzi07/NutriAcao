import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

  conversations: defineTable({
    userId: v.id("users"),
    firstMessage: v.string(),
    messageId: v.optional(v.id("messages")),
  }).index("by_userId", ["userId"]),

  conversationMember: defineTable({
    memberId: v.id("users"),
    conversationId: v.id("conversations"),
  }).index("by_memberId", ["memberId"])
    .index("by_conversationId", ["conversationId"])
    .index("by_memberId_conversationId", ["memberId", "conversationId"]),

  messages: defineTable({
    userId: v.id("users"),
    conversationId: v.id("conversations"),
    firstMessage: v.string(),
    content: v.array(v.object({role: v.string(), content:v.string()}))
  }).index("by_conversationId", ["conversationId"]),

});