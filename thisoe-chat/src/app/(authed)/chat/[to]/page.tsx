import{session}from"@/lib/lib"
import{Aside,ChatHeader,MainChat}from"@/components/chat"
import{ChatForm}from"@/components/_use_client"
import{put}from"@/components/_use_server"
import type{chatData,chatID}from"@/lib/ts"

// meta -> title
type prop={params:Promise<{to:string}>}
import type{Metadata}from"next"
export async function generateMetadata():Promise<Metadata>{
  return{title:`w/${(await session()).name} | Thisoe Chat!`}
}

export default async function _({params}:prop){
  const
    s = await session(),
    to=(await params).to,
    action = async(data:chatData,IDs:chatID)=>{
      'use server'
      return put(`put/${IDs.from}/${IDs.to}`,data)
    }
  return<i id="chat">
    <Aside s={s}/>
    <main className="chat-bg">
      <ChatHeader title={'w/ '+s.name}ava={s.ava}/>
      <MainChat s={s}chatWith={to}/>
      <ChatForm send={action} IDs={{from:s.id,to}}/>
    </main>
  </i>
}