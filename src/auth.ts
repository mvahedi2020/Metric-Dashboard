import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      name: "Guest",
      credentials: {},
      async authorize() {
        return {
          id: "guest",
          name: "Guest Explorer",
          email: "guest@vantagemetrics.dev",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        }
      }
    })
  ],
})
