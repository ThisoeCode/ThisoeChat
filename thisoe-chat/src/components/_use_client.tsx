'use client'
import{useState}from"react"
import{session}from"@/lib/lib"

// 1.
export function SignInBtn({provider}:{provider:string}){
  const
    [txt,setTxt]=useState((
      <><i className={provider+' svg'}/>{'Sign In with '+provider}</>
    )as React.ReactNode),
    [isDisabled,disable]=useState('')

  return<button type="submit" className={isDisabled}
    onClick={()=>{
      if(isDisabled)return 0
      setTxt('Signing you in...')
      disable('disabled')
    }}
  >{txt}</button>
}

// 2.
export function BackBtn(){
  return<button onClick={()=>window.history.back()}><i className="back svg"/></button>
}

// 3.
export function ProfileSettings({s}:{s:session}){
  // TODO 1. change the `s:session` into us:uSession (from DB_USER)
  const
    [currObj,setObj]=useState({uid:s.email,uname:s.name}),
    [uid,modUid]=useState(s.email),
    [uname,modUname]=useState(s.name),
    // [ustat,modUstat]=useState(us.ustat),
    [saving,isSaving]=useState(false),
    save=async()=>{
      if(uid===currObj.uid&&uname===currObj.uname)
        return console.warn('[THISOE_WARNING] #proform:UNCHANGED')
      isSaving(true)
      const submit={uid,uname}

      // TODO 2. put {uid,uname}
        console.log('PUT:')
        console.dir({uid,uname})
        await new Promise(resolve=>setTimeout(resolve, 999))

      setObj(submit)
      isSaving(false)
    }
  return<i id="proform">
    <label>
      <p>Display Name:&nbsp;</p>
      <input value={uname} onChange={(e)=>modUname(e.target.value)}/>
    </label>
    <label>
      <p>ID: <span>@</span></p>
      <input value={uid} onChange={(e)=>modUid(e.target.value)}/>
    </label>
    <button onClick={save} disabled={saving} className={saving?'disabled':''}>Save</button>
  </i>
}