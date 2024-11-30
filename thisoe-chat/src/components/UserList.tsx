import Image from "next/image"
import Link from "next/link"
import{API}from"@/lib/server"
import type{Asession,Auser}from"@/lib/ts"

export const

/** `nav` */
UserList =async({selfID}:{selfID:string})=>{
  const
    {list,/* prev */}:{list:Auser[],prev:number} =
      await(await fetch(API+'list/users/0',{
        // next:{revalidate:2333}
      })).json(),
    cards:JSX.Element[]=[]

  // render
  list.forEach(({uid,uname,ava})=>{
    if(uid!==selfID) cards.push(
      <UserCard id={uid}name={uname}ava={ava}key={'UC'+uid}/>
    )
  })

  // TODO: make pinned users list
  // * Maybe need to re-design the whole API, DB structure, and `UserCard`
  // * Big project. Chill.

  // TODO: use `prev` to load more users
  // (global search `newPrev=list[list.length-1].su` for API modification)

  return<nav>{cards}</nav>
},

/** `nav a` */
UserCard =({id,name,ava}:Partial<Asession>)=>{
  return<Link href={'/chat/'+id} title={name+'\n@'+id}>
    <Image className="ava"
      alt={name+"'s avatar"}
      src={ava||'/favicon.ico'}
      width={55} height={55}
    />
    <i>
      <b>{name}</b>
      <p>@{id}</p>
    </i>
  </Link>
}