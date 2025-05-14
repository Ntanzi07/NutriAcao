import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const messageValidator = v.object({
  role: v.string(),
  content: v.string()
});

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
    idade: v.optional(v.string()),
    altura: v.optional(v.string()),
    sexo: v.optional(v.string()),
    peso: v.optional(v.string()),
    TMB: v.optional(v.number()),
    TDEE: v.optional(v.number()),
    results: v.optional(v.object({
      carboidratos: v.number(),
      proteinas: v.number(),
      gorduras: v.number(),
      calorias: v.number(),
    })),
    infos: v.optional(v.object({
      atividadeDiaria: v.number(),
      freqMusculacao: v.string(),
      duracaoMusculacao: v.string(),
      intensidadeMusculacao: v.number(),
      freqAerobico: v.string(),
      duracaoAerobico: v.string(),
      intensidadeAerobico: v.number(),
      proteinaPorKg: v.number(),
      gorduraPorKg: v.number(),
    }))
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

  conversations: defineTable({
    userId: v.id("users"),
    firstMessage: v.string(),
    messages: v.array(messageValidator),
  }).index("by_userId", ["userId"]),

  conversationMember: defineTable({
    memberId: v.id("users"),
    conversationId: v.id("conversations"),
  }).index("by_memberId", ["memberId"])
    .index("by_conversationId", ["conversationId"])
    .index("by_memberId_conversationId", ["memberId", "conversationId"]),
});