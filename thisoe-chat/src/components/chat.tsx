import type{Asession}from"@/lib/ts"
import{UserList}from"@/components/UserList"
import{ChatHistory,RealTime,type fta}from"./_use_client"
import Image from "next/image"
import Link from "next/link"

/** `header` */
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


/** `i#main-chat` */
export function MainChat({s,chatWith:to}:{s:Asession,chatWith:string}){
  const fta:fta['fta']={
    from:s.id,
    to,
    ava:s.ava,
  }
  return<i id='main-chat'>
    <ChatHistory fta={fta}/>
    <RealTime fta={fta}/>
  </i>
}



/** `aside` */
export function Aside({s}:{s:Asession}){
  return<aside>
    <Link id="s-ava" href='/settings'>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={99} height={99}
      />
    </Link>
    <Link id="s-txt" href='/settings'>Profile Settings</Link>
    <hr/>
    <UserList selfID={s.id}/>
  </aside>
}