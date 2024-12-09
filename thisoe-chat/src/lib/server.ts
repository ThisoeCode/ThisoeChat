// 1. API stuff
const selfurl=process.env.NEXT_PUBLIC_SELF_URL
if(!selfurl)throw new Error('[THISOE🩵DEBUG] Missing environment variable `SELF_URL`.')
export const
  API = selfurl+'/api/',
  headJ = {'Content-Type':'application/json'}


// 2. auth
import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"
import{mainDB,userDB}from"@/lib/_insu"
import type{Asession,Auser, awaitable}from"./ts"

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

// 3. retrieve history chat
import type{Chat}from"@/lib/ts"
export const retrieveHistory = async(
  params:awaitable<{from:string,to:string}>
)=>{
  const
    {from,to}=await params,
    [d1,d2]=(await userDB
      .find({uid:{$in:[from,to]}})
      .project({_id:0,e:1})
      .toArray()
    ), e1=d1.e, e2=d2.e
  return await mainDB
      .find({$or:[
        {$and:[{ e1 },{ e2 }]},
        {$and:[{ e1:e2 },{ e2:e1 }]}
      ]})
      .project({_id:0})
      .sort({dt:-1})
      .limit(30)
      .toArray() as Chat[]
}