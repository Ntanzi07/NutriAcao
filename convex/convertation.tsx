import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

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
