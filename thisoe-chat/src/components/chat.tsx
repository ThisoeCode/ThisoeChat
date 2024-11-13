import{session}from"@/lib/lib"
import{UserList}from"@/components/UserList"
import{Amsg}from"./Amsg"
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
  return<i id='main-chat' className="chat-bg">
    <Amsg data={{c:"me! woohooooooooo",dt:1725799900}}/>
    <Amsg data={{c:"톡",dt:1725799900}}/>
    <Amsg ava={s.ava} data={{c:"ruaaaa  iu ;ug i u iu ;u ;u ;ou ; ou ;ou b; ub ;ub ib lkj bkj hb kjh v kuh vkuv kuhv kuhv kjhv kj hvkj hvkj hvkjhbasdilhbv a aaaa aaa aaaa twrgfrga tr wrae aaa aa awefa ",dt:1725799923}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:`chat as ${s.name}<br/>with ${chatWith}`,dt:1725772333}}/>
    <Amsg data={{c:"me! test",dt:1725799900}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"b",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"blahblah",dt:1725772333}}/>
    <Amsg data={{c:"bruh",dt:1725772333}}/>
    <Amsg ava={s.ava} data={{c:"lol",dt:1725772333}}/>
  </i>
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
    <hr/>
    <UserList/>
  </aside>
}