import"next-auth"
import type{ThisoeChatUserExtension}from"./ts"
// import type{AdapterUser}from"next-auth/adapters"

declare module "next-auth" {
  interface Session {
    thisoe?: ThisoeChatUserExtension | null
  }
  interface User {
    thisoe?: ThisoeChatUserExtension | null
  }
}