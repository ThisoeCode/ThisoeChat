'use client'
import{put}from"./_use_server"
import{Fragment,useEffect,useState,useRef,type KeyboardEvent as K}from"react"
import useSSE from "@/hooks/useThisoeChatSSE"
import{Amsg}from"./Amsg"
import{API}from"@/lib/client"
import type{Asession,chatData,chatID}from"@/lib/ts"

export type fta = {fta:{from:string,to:string,ava:{from:string,to:string}}}

const // lib
  servAlert=(SERV_ID:string)=>alert(`The server ran into an unexpected error.\nPlease contact Thisoe with the error ID: ${SERV_ID}`)


export const
// 1. homepage sign in
/** `form.{className}>button` */
SignInBtn = ({provider}:{provider:string})=>{
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
},


// 2. window.history.back button
BackBtn = ()=>{
  return<button onClick={()=>window.history.back()}><i className="back svg"/></button>
},


// 3. send chat form
/** `#prompt` */
ChatForm = ({sendF,IDs}:{
  sendF: (data:chatData,IDs:chatID)=>ReturnType<typeof put>
  IDs:chatID
})=>{
  const
    [c,setc]=useState(''),
    [disable,sending]=useState(false),
    inputRef=useRef<HTMLInputElement>(null),
    action=async()=>{
      if(!!c){
        sending(true)
        const res = await sendF({c},IDs)
        if(res.ok){
          setc('')
          sending(false)
        }
      }
    }

  useEffect(()=>{
    if(inputRef.current&&!disable)inputRef.current.focus()
  },[disable])

  return<i id="prompt">
    <input value={c}
      onChange={(_)=>setc(_.target.value)}
      disabled={disable}
      onKeyDown={({key}:K<HTMLInputElement>)=>{
        if(key==='Enter')action()
      }}
      autoComplete="off"required
      ref={inputRef}autoFocus
    />
    <button
      onClick={action}
      disabled={disable||!c}
    >{disable?'...':'Send'}</button>
  </i>
},


// 4. chat SSE
RealTime=({fta}:fta)=>{
  const
    {from,to,ava}=fta,
    {flush}=useSSE(
      API+(API.includes('localhost')?'':'vercel/')
      +`sse/${from}/${to}`
    ),
    [msgs,setMsg]=useState<JSX.Element[]>([])

  useEffect(()=>{
    if(flush) setMsg([
      <Amsg data={flush}ava={flush.itsMe?ava.from:ava.to} key={'RT'+crypto.randomUUID().slice(24)}/>
    ,...msgs])
  },[flush])

  return<>{msgs}</>
},


// 5. `/settings`
/** `i#proform` */
ProfileSettings = ({s}:{s:Asession})=>{
  const
    [currObj,setObj]=useState({uid:s.id,uname:s.name}),
    [uid,modUid]=useState(s.id),
    [uname,modUname]=useState(s.name),
    [isSaving,saving]=useState(false),
    save=async()=>{
      if(uid===currObj.uid&&uname===currObj.uname)
        return console.warn('[THISOE_WARNING] #proform:UNCHANGED')
      saving(true)
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
      }
      saving(false)
    },
    revoke=()=>{
      if(confirm(
        'Changes will not be saved.\nAre you sure to refill with last profile?'
      )){
        modUid(currObj.uid)
        modUname(currObj.uname)
      }
    },
    btnDisable = isSaving||(currObj.uid===uid && currObj.uname===uname)
  return<i id="proform">
    <label>
      <p>Display Name:&nbsp;</p>
      <input value={uname} onChange={(_)=>modUname(_.target.value)}/>
    </label>
    <label>
      <p>ID: <span>@</span></p>
      <input value={uid} onChange={(_)=>modUid(_.target.value)}/>
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