import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as argon from "argon2";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prismadb";
import { SessionInterface } from "@/types";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      //@ts-expect-error
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        //finding if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }

        //comparing password
        const isCorrectPassword = await argon.verify(
          user.password,
          credentials.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user?.username,
        };
      }
      return token;
    },

    async session({ session }: any) {
      const email = session?.user?.email as string;
      try {
        const data = await prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            image: true,
            coverImage: true,
            createdAt: true,
            hasNotification: true,
            profileImage: {
              select: {
                public_id: true,
                url: true,
                userId: true,
              },
            },
            userCoverImage: {
              select: {
                public_id: true,
                url: true,
                userId: true,
              },
            },
            Following: true,
            Followers: true,
            notifications: true,
          },
        });

        if (data) {
          const newSession = {
            ...session,
            user: {
              ...session.user,
              ...data,
            },
          };

          return newSession as SessionInterface;
        }
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session as SessionInterface;
}
