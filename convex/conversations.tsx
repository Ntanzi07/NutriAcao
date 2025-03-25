import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
    args: {},
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

        const conversations = await ctx.db
            .query("conversations")
            .withIndex("by_userId", q => q
                .eq("userId", currentUser._id))
            .collect();

        if (!conversations) {
            throw new ConvexError("Conversation could not be found");
        }

        return conversations
    },
})
