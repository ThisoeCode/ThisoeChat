import{session}from"@/lib/lib"
import{UserList}from"@/components/UserList"
import Image from "next/image"
import Link from "next/link"

export function ChatHeader({title,ava}:{
  title:string,
  ava:string,
}){
  return<header>
    <Link href={'/chat'} id="menu"><i className="menu svg"/></Link>
    <h2>{title}</h2>
    <Link href='/settings' id="s-phone">
      <Image className="ava"
        alt="avatar" src={ava}
        width={30} height={30}
      />
    </Link>
  </header>
}



export function MainChat({s,chatWith}:{s:session,chatWith:string}){
  // TODO
  return<div id='main-chat' className="chat-bg">
    chat as {s.name}<br/>with {chatWith}
  </div>
}



export function Aside({s}:{s:session}){
  return<aside>
    <Link id="s-ava" href='/settings'>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={99} height={99}
      />
    </Link>
    <Link id="s-txt" href='/settings'>Profile Settings</Link>
    <UserList/>
  </aside>
}