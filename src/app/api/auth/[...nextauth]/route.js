/* eslint-disable no-underscore-dangle */
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { findUser } from "@/db/crud/userCrud"
import brcypt from "bcryptjs"
import { mwdb } from "@/api/mwdb"

await mwdb()
export const authOptions = {
  providers: [
    // eslint-disable-next-line new-cap
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          const user = await findUser({ email })

          if (!user) {
            return null
          }

          const isMatchPassword = await brcypt.compare(password, user.password)

          if (!isMatchPassword) {
            return null
          }

          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // eslint-disable-next-line require-await
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.userId = user._id
        token.email = user.email
        token.isAdmin = user.isAdmin
        token.isModerator = user.isModerator
      }

      return token
    },
    // eslint-disable-next-line require-await
    async session({ session, token }) {
      session.user.username = token.username || ""
      session.user.userId = token.userId || ""
      session.user.email = token.email || ""
      session.user.isAdmin = token.isAdmin || false
      session.user.isModerator = token.isModerator || false

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authentication",
  },
}
// eslint-disable-next-line new-cap
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
