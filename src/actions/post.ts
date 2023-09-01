import prisma from "@/lib/config/prisma";
import { Prisma } from "@prisma/client";
import { Comment, Post } from "@/types/dto-out";

export const PostAction = {
  async createNewPost(options: Post) {
    try {
      const post = await prisma.post.create({
        data: options,
      });
      return post;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(
          "DB error, please try again later",
          {
            clientVersion: e.clientVersion,
            code: e.code,
          }
        );
      }
      throw e;
    }
  },
  getAllPosts() {
    return prisma.post.findMany({
      include: { comments: { orderBy: { createdAt: "desc" } } },
      orderBy: { createdAt: "desc" },
    });
  },

  getPostsByName(name: string) {
    return prisma.post.findMany({
      where: { userName: name },
      include: { comments: { orderBy: { createdAt: "desc" } } },
    });
  },
  async createNewComment(options: Comment) {
    try {
      const post = await prisma.comment.create({
        data: options,
      });
      return post;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Prisma.PrismaClientKnownRequestError(
          "DB error, please try again later",
          {
            clientVersion: e.clientVersion,
            code: e.code,
          }
        );
      }
      throw e;
    }
  },
};
