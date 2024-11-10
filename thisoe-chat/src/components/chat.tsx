import{signOut}from"@/lib/auth"
import{session}from"@/lib/lib"
import{UserList}from"@/components/UserList"
import Image from "next/image"
import Link from "next/link"

export function ChatHeader({title}:{
  title:string,
}){
  return<header>
    <Link href={'/chat'} id="menu"><i className="menu svg"/></Link>
    <h2>{title}</h2>
    <form action={async()=>{"use server";await signOut()}}>
      {/* TODO replace this signout btn with user profile (phone only) */}
      <button className="signout svg" type="submit"></button>
    </form>
  </header>
}



export function MainChat({s,chatWith}:{s:session,chatWith:string}){
  // TODO
  return<div id='main-chat' className="chat-bg">
    chat as {s.id}<br/>with {chatWith}
  </div>
}



export function Aside({s}:{s:session}){
  return<aside>
    <Link id="settings-ava" href='/settings'>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={99} height={99}
      />
    </Link>
    <Link id="settings" href='/settings'>Profile Settings</Link>
    <UserList/>
  </aside>
}