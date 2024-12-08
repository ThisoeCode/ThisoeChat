"use client"
import{SessionProvider}from"next-auth/react"

/** Auth Providers */
export function AP({children}:{children:React.ReactNode}){
  return<SessionProvider>{children}</SessionProvider>
}