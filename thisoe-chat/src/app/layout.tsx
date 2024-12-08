import{Metadata}from"next"
import"./thisoe.css"
import{AP}from"@/components/_AuthProvider"

export const metadata:Metadata={
  title: "Thisoe Chat!",
  description: "[BETA] Thisoe Chat! - Chatting Project based on Next.js \n Thisoe Projects - Coding practice",
  keywords:['Thisoe','chatting app','NextJS'],
}

export default function RootLayout(
  {children}:Readonly<{children:React.ReactNode}>
){
  return<html lang="en"><body>
    <AP>{children}</AP>
    <footer>
      <p>
        <a href="https://thisoe.dev/" target="_blank">Thisoe.dev</a> | <a href="https://thisoe.dev/project/">Showcase</a>
        <br/> © 2024 Thisoe
      </p>
    </footer>
  </body></html>
}