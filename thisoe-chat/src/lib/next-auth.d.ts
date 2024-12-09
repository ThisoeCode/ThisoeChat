import"next-auth"
import { Session } from "next-auth"
import type { Awaitable } from "@auth/core/types"
import { NextRequest } from "next/server"
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"

// lib `next-auth/src/lib/types`
interface NextAuthRequest extends NextRequest {
  auth: Session | null
}
type AppRouteHandlerFnContext = {
  params: Awaitable<Record<string, string|string[]>>
}
type AppRouteHandlerFn = (
  req: NextRequest,
  ctx: AppRouteHandlerFnContext
) => void | Response | Promise<void | Response>

// merge
declare module "next-auth" {
  interface NextAuthResult {
    auth: ((...args: [NextApiRequest, NextApiResponse]) => Promise<Session | null>) & ((...args: []) => Promise<Session | null>) & ((...args: [GetServerSidePropsContext]) => Promise<Session | null>) & ((...args: [
      (req: NextAuthRequest, ctx: AppRouteHandlerFnContext) => ReturnType<AppRouteHandlerFn>
  ]) => AppRouteHandlerFn),
  }
}