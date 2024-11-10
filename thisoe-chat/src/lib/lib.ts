// 1. API stuff
const selfurl=process.env.NEXT_PUBLIC_SELF_URL
if(!selfurl)throw new Error('[THISOE🩵DEBUG] Missing environment variables `PUBLIC_SELF_URL`.')
export const API = selfurl+'/api/'
export const headJ = {'Content-Type':'application/json'}


// 2. auth
import{auth}from"@/lib/auth"
import{redirect as r}from"next/navigation"
export const bigAva = (url:string|null|undefined)=>{
  if(!url||!url.includes("lh3.googleusercontent.com"))return'/favicon.ico'
  return url.replace(/=s\d+-c?/,'=s0')
}
export interface session {email:string,ava:string,id:string,name:string}
export const session =async(needRedirect:boolean=false)=>{
  const
    s = await auth(),
    email = s?.user?.email,
    img = s?.user?.image,
    id = s?.user?.id,
    name = s?.user?.name
  if(s&&email&&img&&id&&name&&needRedirect)r('/')
  const ava = bigAva(img)
  return{email,ava,id,name}as session
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
  const dt = new Date($uts*1000),
  months=['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sep.','Oct.','Nov.','Dec.']
  return{
    yr: dt.getFullYear(),
    mo: dt.getMonth(),
    d: dt.getDate(),
    h: dt.getHours(),
    m: dt.getMinutes(),
    s: dt.getSeconds(),
    shortMonth: months[dt.getMonth()],
  }
}