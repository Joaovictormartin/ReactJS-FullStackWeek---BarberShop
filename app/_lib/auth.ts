// import { AuthOptions } from "next-auth"
// import { Adapter } from "next-auth/adapters"
// import GoogleProvider from "next-auth/providers/google"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { db } from "@/app/_lib/prisma"

// interface User {
//   id: string
//   name: string
//   email: string
// }

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       session.user = { ...session.user, id: user.id } as User

//       return session
//     },
//   },
//   secret: process.env.NEXT_AUTH_SECRET,
// }
