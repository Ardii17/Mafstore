import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle, signIn } from "@/services/auth/services";

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
      }

      if (account?.provider === "google") {
        const data = {
          username: user.name,
          email: user.email,
          type: "google",
        };

        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.username = data.username;
          token.role = data.role;
        });
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("username" in session) {
        session.user.username = token.username;
      }

      if ("email" in session) {
        session.user.email = token.email;
      }

      if ("phone" in session) {
        session.user.phone = token.phone;
      }

      if ("role" in session) {
        session.user.role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOption);
