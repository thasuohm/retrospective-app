import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? ''

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
})
