import{session}from"@/lib/lib"
import Image from "next/image"
import Link from "next/link"

export async function UserList(){
  const s:session = await session()
  return<nav>
    <Link href={'/chat/'+s.id}>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={55} height={55}
      />
      <b>{s.name}</b>
    </Link>
    <Link href={'/chat/'+s.id}>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={55} height={55}
      />
      <b>{s.name} A TEST OF VERY LONG USERNAME LOREM IPSUM BLAHBLAH</b>
    </Link>
    <Link href={'/chat/'+s.id}>
      <Image className="ava"
        alt={s.name+"'s avatar"}
        src={s.ava}
        width={55} height={55}
      />
      <b>{s.name}</b>
    </Link>
  </nav>
}