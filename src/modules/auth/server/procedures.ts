import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

import { headers as getHeaders } from "next/headers";
import { loginSchema, registerSchema } from "../schema";
import { generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = ctx.db.auth({ headers });

    return session;
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const exisitingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = exisitingData.docs[0];

      if (existingUser)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
          username: input.username,
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to Login",
        });

      await generateAuthCookie({
        name: `${ctx.db.config.cookiePrefix}-token`,
        value: data.token,
      });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to Login",
      });

    await generateAuthCookie({
      name: `${ctx.db.config.cookiePrefix}-token`,
      value: data.token,
    });
    return data;
  }),
});
