import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"

export default async function _(
  {children}:Readonly<{children:React.ReactNode}>
){
  const session = await auth()
  if(!session)r('/')
  return<>{children}</>
}