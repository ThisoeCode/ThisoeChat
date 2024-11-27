'use server'
import{API}from"@/lib/server"
import type{Aobj}from"@/lib/ts"

export const

// 1. PUT
put = async(
  urlSuffix:string,
  data:Aobj,
  method:string='PUT'
)=>{
  const SERV_ID = crypto.randomUUID().replace('-','')
  try{
    const res=await fetch(API+urlSuffix,{
      method,
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data),
    })
    if(res.ok)return{thisoe:(await res.json()),ok:1,status:res.status}
    console.error(`[Thisoe] Error: PUTFAILED. (SERV_ID::${SERV_ID}) ${res.status}`)
    return{ok:0,SERV_ID}
  }catch(_){
    console.error(`[Thisoe] Error: USESERVER_NOTPUTTING {{ ${_} }} WITH SERV_ID::`+SERV_ID)
    return{ok:0,SERV_ID}
  }
}