'use client'
import{useState}from"react"
import{type Asession}from"@/lib/lib"
import{put}from"./_use_server"

const // lib
  servAlert=(SERV_ID:string)=>alert(`The server ran into an unexpected error.\nPlease contact Thisoe with the error ID: ${SERV_ID}`)


// 1. homepage sign in
/** `form.{className}>button` */
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

// 2. history back
export function BackBtn(){
  return<button onClick={()=>window.history.back()}><i className="back svg"/></button>
}

// 3. `/settings`
/** `i#proform` */
export function ProfileSettings({s}:{s:Asession}){
  // TODO 1. change the `s:Asession` into us:uSession (from DB_USER)
  const
    [currObj,setObj]=useState({uid:s.id,uname:s.name}),
    [uid,modUid]=useState(s.id),
    [uname,modUname]=useState(s.name),
    // [ustat,modUstat]=useState(us.ustat),
    [saving,isSaving]=useState(false),
    save=async()=>{
      if(uid===currObj.uid&&uname===currObj.uname)
        return console.warn('[THISOE_WARNING] #proform:UNCHANGED')
      isSaving(true)
      const
        submit={uid,uname,e:s.e,isIDchange:!(uid===currObj.uid)},
        ret = await put('settings',submit)
      if(ret.ok){
        switch(ret.thisoe.err){
          case'UIDBADFORMAT':
            alert('ID is not valid.\n1. Only letters, numbers and underscores are allowed;\n2. No longer than 16 characters;\n3. First character must be a letter.')
            break
          case'NAMETOOLONG':
            alert('Please enter a shorter name...')
            break
          case'UIDEXIST':
            alert(`Account @${uid} already exists.\nPlease change another one.`)
            break
          default:
            setObj(submit)
        }
      }
      else{
        servAlert(ret.SERV_ID||'SERVERIDGENERATEFAIL')
        console.dir(ret)
      }
      isSaving(false)
    },
    revoke=()=>{
      if(confirm(
        'Changes will not be saved.\nAre you sure to refill with last profile?'
      )){
        modUid(currObj.uid)
        modUname(currObj.uname)
      }
    },
    btnDisable = saving||(currObj.uid===uid && currObj.uname===uname)
  return<i id="proform">
    <label>
      <p>Display Name:&nbsp;</p>
      <input value={uname} onChange={(e)=>modUname(e.target.value)}/>
    </label>
    <label>
      <p>ID: <span>@</span></p>
      <input value={uid} onChange={(e)=>modUid(e.target.value)}/>
    </label>
    <i className="btn-wrap">
      <button
        onClick={revoke}
        disabled={btnDisable}
        className={'revoke'+(btnDisable?' disabled':'')}
      >Revoke</button>
      <button
        onClick={save}
        disabled={btnDisable}
        className={btnDisable?'disabled':''}
      >Save</button>
    </i>
  </i>
}