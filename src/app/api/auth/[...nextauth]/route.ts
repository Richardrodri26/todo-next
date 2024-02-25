import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {



      return true  
    },

    async jwt({ account, token, user, profile, session, trigger }) {

      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })

      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'

      return token;
    },
    async session({newSession, session, token, trigger, user }) {

      console.log('token', token)

      if(session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }


      return session;
    }
  }
}

const handler =  NextAuth(authOptions)

export { handler as GET, handler as POST}