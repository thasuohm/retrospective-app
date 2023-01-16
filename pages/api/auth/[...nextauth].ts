import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'

declare module 'next-auth' {
  interface Session {
    token: any
  }
}

declare module 'next-auth' {
  interface Profile {
    id: any
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    async encode({secret, token}) {
      return jwt.sign(token as any, secret, {algorithm: 'HS256'})
    },
    async decode({secret, token}) {
      return jwt.verify(token as string, secret, {
        algorithms: ['HS256'],
      }) as any
    },
  },
  callbacks: {
    async session({session, user, token}) {
      session.user = user
      session.token = token
      return session
    },
    async jwt({token, account, profile}) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.id
      }
      return token
    },
  },
})
