import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { messageValidator } from "./schema";

export const get = query({
    args: {
        id: v.id("conversations")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unautthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx, clerkId: identity.subject
        })

        if (!currentUser) {
            throw new ConvexError("User not founded")
        }

        const conversation = await ctx.db.get(args.id)

        if (!conversation) {
            throw new ConvexError("Conversation not found")
        }

        const membership = await ctx.db
            .query("conversationMember")
            .withIndex("by_memberId_conversationId",
                q => q.eq("memberId", currentUser._id)
                    .eq("conversationId", conversation._id)).unique()

        if (!membership) {
            throw new ConvexError("You aren't a member of this conversation")
        }

        return { conversation }
    },
})

export const create = mutation({
    args: {
        firstMessage: v.string(),
        messages: v.array(messageValidator),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unautthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx, clerkId: identity.subject
        })

        if (!currentUser) {
            throw new ConvexError("User not founded")
        }

        const conversation = await ctx.db.insert(
            "conversations", {
            userId: currentUser._id,
            firstMessage: args.firstMessage,
            messages: args.messages,
        }
        )
        return { _id: conversation }
    }
})

export const deleteConversation = mutation({
    args: {
        conversationId: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unautthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx, clerkId: identity.subject
        })

        if (!currentUser) {
            throw new ConvexError("User not founded")
        }

        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) throw new Error("Conversation not found");

        await ctx.db.delete(args.conversationId);
    }
})


export const update = mutation({
    args: {
        conversationId: v.id("conversations"),
        messages: v.array(messageValidator),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unautthorized");
        }

        const currentUser = await getUserByClerkId({
            ctx, clerkId: identity.subject
        })

        if (!currentUser) {
            throw new ConvexError("User not founded")
        }

        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) throw new Error("Conversation not found");

        await ctx.db.patch(conversation._id, { messages: args.messages });
        return { _id: conversation }
    }
})
