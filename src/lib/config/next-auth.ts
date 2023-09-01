import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { UserAction } from "@/actions/user";
import { verifyPassword } from "@/lib/utils/hashPassword";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await UserAction.getByEmail(credentials.email);

        if (!user) {
          return null;
        }
        // const isPasswordValid = await verifyPassword(
        //   credentials.password,
        //   user.password
        // );

        // if (!isPasswordValid) {
        //   return null;
        // }

        return { name: user.name, email: user.email } as User;
      },
    }),
  ],
  pages: {
    signIn: `/auth`,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
