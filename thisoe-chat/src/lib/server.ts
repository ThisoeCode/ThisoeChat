// 1. API stuff
const selfurl=process.env.NEXT_PUBLIC_SELF_URL
if(!selfurl)throw new Error('[THISOE🩵DEBUG] Missing environment variable `SELF_URL`.')
export const
  API = selfurl+'/api/',
  headJ = {'Content-Type':'application/json'}


// 2. auth
import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"
import{userDB}from"./_insu"
import type{Asession,Auser}from"./ts"

export const

/** The base number of `Auser.su` */
su_=1730386800000,
suDb=(unixMs:number=Date.now()-su_)=>{
  return unixMs
},

bigAva = (url:string|null|undefined)=>{
  if(!url||!url.includes("lh3.googleusercontent.com"))return'/favicon.ico'
  return url.replace(/=s\d+-c?/,'=s0')
},

session =async(needRedirect:boolean=true)=>{
  const
    s = await auth(),
    e = s?.user?.email?.split('@')[0],
    img = s?.user?.image,
    doc=await userDB.findOne(
      {e,ustat:1},
      {projection:{_id:0,ustat:0}}
    )as Auser|null,
    id=doc?.uid,
    name=doc?.uname,
    recent=doc?.rc,
    pin=doc?.pin
  if(!(s&&e&&doc&&img&&id&&name)&&needRedirect)r('/')
  return{
    e,id,name,recent,pin,
    ava:bigAva(img),
  }as Asession
}