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

        const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", q => q.eq("clerkId", identity.subject))
        .unique();

        return user;
    },
})

export const update = mutation({
    args: {
        idade: v.optional(v.string()),
        altura: v.optional(v.string()),
        sexo: v.optional(v.string()),
        peso: v.optional(v.string()),
        atividades: v.optional(v.string()),
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


        // TODO...
        if(args.sexo === "H"){

        }
        const calculo = 2;

        await ctx.db.patch(currentUser._id, { 
            idade: args.idade,
            altura: args.altura,
            sexo: args.sexo,
            peso: args.peso,
            calculoBasal: calculo,
        });

    }
})