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

        // const conversationMember = await ctx.db
        //     .query("conversationMember")
        //     .withIndex("by_memberId", q => q.eq
        //         ("memberId", currentUser._id))
        //     .collect();

        // const conversations = Promise.all(conversationMember?.map
        //     (async membership => {
        //         const conversation = await ctx.db.get(membership.conversationId);

        //         if (!conversation) {
        //             throw new ConvexError("Conversation could not be found");
        //         }

        //         return conversation;
        //     })
        // );

        // const conversationWithDetails = await Promise.all((await conversations)
        //     .map(async (conversation, index) => {
        //         const conversationMemberships = await ctx.db
        //             .query("conversationMember")
        //             .withIndex("by_conversationId", (q) =>
        //                 q.eq("conversationId", conversation?._id)
        //             ).collect();
        //         return conversation
        //     })
        // );
        // return conversationWithDetails;
    },
})
