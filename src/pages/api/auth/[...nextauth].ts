import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle, signIn } from "@/services/auth/services";
import jwt from "jsonwebtoken";

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn(email);

        if (user) {
          const confirmPassword = await compare(password, user.password);
          if (confirmPassword) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.username = user.username;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
      }

      if (account?.provider === "google") {
        const data = {
          username: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };

        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.username = data.username;
          token.role = data.role;
          token.image = data.image;
          token.id = data.id;
        });
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("username" in token) {
        session.user.username = token.username;
      }

      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("phone" in token) {
        session.user.phone = token.phone;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      if ("image" in token) {
        session.user.image = token.image;
      }

      if ("id" in token) {
        session.user.id = token.id;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.accessToken = accessToken;

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOption);
