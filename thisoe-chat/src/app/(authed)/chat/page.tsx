import{UserList}from"@/components/UserList"
import{session}from"@/lib/server"
import Image from "next/image"
import Link from "next/link"

export default async function _(){
  const s = await session()
  return<i id="home">
    <header>
      <i/>
      <h2>Thisoe Chat!</h2>
      <Link href='/settings'>
        <Image className="ava"
          alt="avatar" src={s.ava}
          width={30} height={30}
        />
      </Link>
    </header>
    <i className="chat-bg"> <UserList selfID={s.id}/> </i>
  </i>
}