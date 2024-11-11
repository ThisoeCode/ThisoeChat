import{session}from"@/lib/lib"
import Image from "next/image"
import Link from "next/link"

export async function UserList(){
  const s:session = await session()
  return<nav>
    <Auser/>
    <Link href={'/chat/'+s.name}>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={55} height={55}
      />
      <b>{s.name} A TEST OF VERY LONG USERNAME LOREM IPSUM BLAHBLAH</b>
    </Link>
    <Auser/><Auser/><Auser/><Auser/><Auser/><Auser/>
    <Auser/><Auser/><Auser/><Auser/><Auser/><Auser/>
  </nav>
}


async function Auser(){
  const s:session = await session()
  return<Link href={'/chat/'+s.name}>
    <Image className="ava"
      alt={s.name+"'s avatar"}
      src={s.ava}
      width={55} height={55}
    />
    <b>{s.name}</b>
  </Link>
}