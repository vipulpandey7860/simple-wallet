import NextAuth from "next-auth"
import { authOptionsMerch } from "../../../../lib/auth"

const handler = NextAuth(authOptionsMerch)

export { handler as GET, handler as POST }