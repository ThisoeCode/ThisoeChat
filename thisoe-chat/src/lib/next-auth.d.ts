
import"next-auth"
import type { Awaitable } from "@auth/core/types"
declare module "next-auth" {
  interface AppRouteHandlerFnContext {
    params: Awaitable<Record<string, string | string[]>>
  }
}