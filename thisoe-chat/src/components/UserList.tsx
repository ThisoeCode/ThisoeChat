import Image from "next/image"
import Link from "next/link"
import{API, session}from"@/lib/lib"
import type{Asession,Auser}from"@/lib/ts"

export const

/** `nav` */
UserList =async()=>{
  const
    {id,name,ava}:Asession = await session(),
    {list,prev}:{list:Auser[],prev:string} = await(await fetch(API+'list/users/0')).json(),
    rows:JSX.Element[] = [],
    jsx=list.forEach((v,i)=>{
      rows.push(/* TODO */)
    })

  return<nav>
    {jsx}
  </nav>
},

/** `nav a` */
UserCard =async({id,name,ava}:Asession)=>{
  return<Link href={'/chat/'+id} title={name+'\n@'+id}>
    <Image className="ava"
      alt={name+"'s avatar"}
      src={ava}
      width={55} height={55}
    />
    <i>
      <b>{name}</b>
      <p>@{id}</p>
    </i>
  </Link>
}