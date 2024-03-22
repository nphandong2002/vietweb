import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "../_generated/server";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    let rooms = [];
    rooms = await ctx.db.query("room_game").collect();
    return rooms;
  },
});
