import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const clientId = process.env.GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.GOOGLE_SECRET ?? ''

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
})
