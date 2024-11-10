import{signOut}from"@/lib/auth"
import type{Session}from"next-auth"
import Image from "next/image"
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



export function MainChat({session,chatWith}:{session:Session,chatWith:string}){
  // TODO
  return<div id='main-chat' className="chat-bg">
    chat as {session.user?.id}<br/>with {chatWith}
  </div>
}



export function Aside({session}:{
  session:Session,
}){
  const bigAva = (url:string|null|undefined)=>{
    if(!url||!url.includes("lh3.googleusercontent.com"))return'/favicon.ico'
    return url.replace(/=s\d+-c?/,'=s0')
  }
  return<aside>
    <Link id="settings-ava" href='/settings'>
      <Image className="ava"
        alt={session.user?.name+"'s avatar"}
        src={bigAva(session.user?.image)}
        width={99} height={99}
      />
    </Link>
    <Link id="settings" href='/settings'>Profile Settings</Link>
    <nav>nav</nav>
  </aside>
}