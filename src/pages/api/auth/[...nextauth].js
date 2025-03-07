import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { tmdbAuth } from "apiRoutes/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "tmdb",
      name: "tmdb",
      authorize: async ({ requestToken }) => {
        return await tmdbAuth(requestToken);
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 365 * 24 * 60 * 60
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.user.accountId = token?.account_id;
      session.user.accessToken = token?.access_token;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user?.account_id) {
        token = user;
      }
      return token;
    }
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
