import { credentialsAuth, tmdbAuth } from 'api/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      authorize: async (payload) => {
        return await credentialsAuth(payload);
      }
    }),
    CredentialsProvider({
      id: 'tmdb',
      name: 'tmdb',
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
      session.user.sessionId = token?.session_id;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user?.session_id) {
        token = user;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
});
