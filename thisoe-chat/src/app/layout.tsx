import{Metadata}from"next"
import"./thisoe.css"
import Link from"next/link"

export const metadata:Metadata={
  title: "Thisoe Chat!",
  description: "[BETA] Thisoe Chat! - Chatting Project based on Next.js \n Thisoe Projects - Coding practice",
  keywords:['Thisoe','chatting app','NextJS'],
}

export default function RootLayout(
  {children}:Readonly<{children:React.ReactNode}>
){
  return <html lang="en">
    <body>
    <div id='bangs'>
      <header>Thisoe Chat!</header>
      <nav>
        <Link href='/'>Bulletin Board System</Link>
      </nav>
    </div>

      <main>{children}</main>

      <footer>
        <p>
          <a href="https://thisoe.dev/" target="_blank">Thisoe.dev</a> | <a href="https://thisoe.dev/project/">Showcase</a>
          <br/>
          © 2024 Thisoe
        </p>
      </footer>
    </body>
  </html>
}