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

export const bigAva = (url:string|null|undefined)=>{
  if(!url||!url.includes("lh3.googleusercontent.com"))return'/favicon.ico'
  return url.replace(/=s\d+-c?/,'=s0')
}
export const session =async(needRedirect:boolean=true)=>{
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


// 3. datetime
export const timeDiff = ($uts:number)=>{
  const
  now = Math.floor(Date.now() / 1000),
  seconds = now-$uts,
  units=[
    { unit:'year', s:31536000 },
    { unit:'month', s:2592000 },
    { unit:'day', s:86400 },
    { unit:'hr', s:3600 },
    { unit:'min', s:60 },
    { unit:'s', s:1 },
  ]

  if(seconds<9){return 'just now'}

  for(const{unit,s} of units){
    const x = Math.floor(seconds / s)
    if(x>=1){
      return `${x} ${unit}${x>1&&unit!='s' ? 's':''}${['hr','min','s'].includes(unit)?'':' ago'}`
    }
  }
  return 'just now'
}

/** Get visitor's timezone */
export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

export const unixToDate=($uts:number)=>{
  const
    dt = new Date($uts*1000),
    months=['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sep.','Oct.','Nov.','Dec.'],
    dig2=(_:number)=>{
      const n=_+''
      return n.length<2 ? '0'+n : n
    }
  return{
    yr: dt.getFullYear()+'',
    mo: dt.getMonth()+'',
    d: dt.getDate()+'',
    h: dig2(dt.getHours()),
    m: dig2(dt.getMinutes()),
    s: dig2(dt.getSeconds()),
    shortMonth: months[dt.getMonth()],
  }
}