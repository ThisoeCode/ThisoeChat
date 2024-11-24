import Image from "next/image"
import Link from "next/link"
import{session}from"@/lib/lib"
import type{Asession}from"@/lib/ts"

export async function UserList(){
  const{id,name,ava}:Asession = await session()
  return<nav>
    <Auser/>
    <Link href={'/chat/'+id} title={name+' A TEST OF VERY LONG USERNAME LOREM IPSUM BLAHBLAH\n@'+id}>
      <Image className="ava"
        alt={name+"'s avatar"}
        src={ava}
        width={55} height={55}
      />
      <i><b>{name} A TEST OF VERY LONG USERNAME LOREM IPSUM BLAHBLAH</b>
      <p>@{id}</p></i>
    </Link>
    <Auser/><Auser/><Auser/><Auser/><Auser/><Auser/>
  </nav>
}


async function Auser(){
  const{id,name,ava}:Asession = await session()
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