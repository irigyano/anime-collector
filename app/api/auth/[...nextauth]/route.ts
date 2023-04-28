import prisma from "@/lib/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "JaMorant" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { username: credentials.username } });

        if (!user) {
          console.log("No user found");
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log("invalid pw");
          return null;
        }

        return { id: user.id, name: user.username };
      },
    }),
    // ...add more providers here
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
