import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, DefaultSession } from "next-auth";

// Define the user type that NextAuth expects
type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

// Extend session to include `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          // If user exists, verify password
          if (existingUser) {
            const passwordValidation = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );

            if (passwordValidation) {
              return {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
              };
            }
            return null;
          }

          // If user doesn't exist, create new user
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: credentials.email.split("@")[0], // Optional: Set default name
            },
          });

          if (user) {
            await prisma.balance.create({
              data: {
                userId: user.id,
                amount: 0,
                locked: 0,
              },
            });
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (e) {
          console.error("Authentication error:", e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        (session.user as { id: string }).id = token.sub as string; // Type assertion to avoid TS error
      }
      return session;
    },
  },
};
