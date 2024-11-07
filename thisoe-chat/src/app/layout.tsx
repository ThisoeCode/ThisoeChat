import{Metadata}from"next"
import"./thisoe.css"

export const metadata:Metadata={
  title: "Thisoe Chat!",
  description: "[BETA] Thisoe Chat! - Chatting Project based on Next.js \n Thisoe Projects - Coding practice",
  keywords:['Thisoe','chatting app','NextJS'],
}

export default function RootLayout(
  {children}:Readonly<{children:React.ReactNode}>
){
  return<html lang="en"><body>{children}</body></html>
}