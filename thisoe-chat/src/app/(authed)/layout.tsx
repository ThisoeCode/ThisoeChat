import{session}from"@/lib/lib"

export default async function _({children}:Readonly<{children:React.ReactNode}>){
  await session(true)
  return<>{children}</>
}