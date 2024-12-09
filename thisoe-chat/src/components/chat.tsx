import{UserList}from"@/components/UserList"
import{RealTime,type fta}from"./_use_client"
import{userDB}from"@/lib/_insu"
import Image from "next/image"
import Link from "next/link"
import{retrieveHistory}from"@/lib/server"
import type{Asession}from"@/lib/ts"
import{Amsg}from"./Amsg"

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
export async function MainChat({s,chatWith:to}:{s:Asession,chatWith:string}){
  const
  // chat history
    ChatHistory=async({fta,me}:fta&{me:string})=>{
      const
        {from,to,ava}=fta,
        chats=await retrieveHistory({from,to}),
        list:JSX.Element[] = []
      chats.forEach((v,i)=>{
        const itsMe=v.e1===me
        list.push(<Amsg
          data={{c:v.c,dt:v.dt,itsMe}}
          ava={itsMe?ava.from:ava.to}
          key={'CH'+i}
        />)
      })
      return<>
        {list}
        <button style={{display:'none'}}>Show More History</button>
      </>
    },
    toava=await userDB.findOne({uid:to},{projection:{_id:0,ava:1}}),
    fta:fta['fta']={
      from:s.id,
      to,
      ava:{from:s.ava,to:toava?.ava||'/favicon.ico'},
    }
  return<i id='main-chat'>
    <RealTime fta={fta}/>
    <ChatHistory fta={fta}me={s.e}/>
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