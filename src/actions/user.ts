import { Prisma } from "@prisma/client";
import prisma from "@/lib/config/prisma";
import { hashPassword } from "@/lib/utils/hashPassword";
import { User } from "@/types/dto-out";

export const UserAction = {
  async createNew(options: User) {
    const hashPass = await hashPassword(options.password);
    try {
      const { password, ...user } = await prisma.user.create({
        data: {
          name: options.name,
          email: options.email,
          role: options.role,
          password: hashPass,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new Prisma.PrismaClientKnownRequestError(
            "Error, new user cannot be created with this email or name",
            {
              clientVersion: e.clientVersion,
              code: e.code,
            }
          );
        } else {
          throw new Prisma.PrismaClientKnownRequestError(
            "DB error, please try again later",
            {
              clientVersion: e.clientVersion,
              code: e.code,
            }
          );
        }
      }
      throw e;
    }
  },

  getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
        },
        posts: { orderBy: { createdAt: "desc" } },
      },
    });
  },
};
