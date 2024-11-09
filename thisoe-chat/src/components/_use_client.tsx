'use client'
import{useState}from"react"

export function SignInBtn({provider}:{provider:string}){
  const
    [txt,setTxt]=useState((
      <>{'Sign In with '}<i className={provider+' svg'}/>{provider}</>
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