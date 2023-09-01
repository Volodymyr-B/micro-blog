import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "must contain at least 6 characters" })
    .max(32, { message: "entry is too long" }),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "must contain at least 3 characters" })
      .max(32, { message: "maximum 32 characters allowed" }),
    email: z.string().email({ message: "please enter a valid email address." }),
    role: z.enum(["author", "commentator"]),
    password: z
      .string()
      .min(6, { message: "must contain at least 6 characters" })
      .max(32, { message: "maximum 32 characters allowed" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpValues = z.infer<typeof signUpSchema>;

export const postSchema = z.object({
  title: z
    .string()
    .min(6, { message: "entry is too short" })
    .max(30, { message: "entry is too long" }),
  post: z
    .string()
    .min(10, { message: "entry is too short" })
    .max(400, { message: "entry is too long" }),
});
export type PostsValues = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  comment: z
    .string()
    .min(10, { message: "entry is too short" })
    .max(400, { message: "entry is too long" }),
});
export type CommentsValues = z.infer<typeof commentSchema>;
