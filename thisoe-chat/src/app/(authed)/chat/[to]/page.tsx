import{session}from"@/lib/lib"
import{Aside,ChatHeader,MainChat}from"@/components/chat"
import{ChatForm}from"@/components/_use_client"
import{put}from"@/components/_use_server"
import type{chatData,chatID}from"@/lib/ts"

export default async function _({params}:{params:Promise<{to:string}>}){
  const
    s = await session(),
    to=(await params).to,
    action = async(data:chatData,IDs:chatID)=>{
      'use server'
      return put(`put/${IDs.from}/${IDs.to}`,data)
    }
  return<i id="chat">
    <Aside s={s}/>
    <main>
      <ChatHeader title={/* TODO */'Thisoe Chat!'}ava={s.ava}/>
      <MainChat s={s}chatWith={to}/>
      <ChatForm send={action} IDs={{from:s.id,to}}/>
    </main>
  </i>
}