import{signOut}from"@/lib/auth"
import type{Session}from"next-auth"
import Link from "next/link"

export function ChatHeader({title}:{
  title:string,
}){
  return<header>
    <Link href={'/users'} id="menu"><i className="menu svg"/></Link>
    <h2>{title}</h2>
    <form action={async()=>{"use server";await signOut()}}>
      <button className="signout svg" type="submit"></button>
    </form>
  </header>
}



export function Aside({session}:{
  session:Session,
}){
  return<aside>
    <Link id="settings" href='/settings'><i className="gear svg"/>Settings</Link>
    <nav>nav</nav>
  </aside>
}