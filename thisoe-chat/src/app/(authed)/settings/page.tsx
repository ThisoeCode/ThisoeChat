import{ProfileSettings,BackBtn}from"@/components/_use_client"
import{signOut}from"@/lib/auth"
import{session}from"@/lib/server"
import Image from "next/image"

export default async function _(){
  const s = await session()
  return<>
    <header>
      <BackBtn/>
      <h2>Profile Settings</h2>
      <i/>
    </header>
    <i id="setting">
      <i id="profile">
        <Image className="ava"
          alt="avatar" src={s.ava}
          width={99} height={99}
        />
        <ProfileSettings s={s}/>
      </i>
      <form id="signout" action={async()=>{"use server";await signOut()}}>
        <button type="submit">
          <i className="signout svg"/>Sign Out
        </button>
      </form>
    </i>
  </>
}