'use server'

// 1. PUT
import type{Thisoe}from"@/lib/ts"
export const PUT = async(
  data:{[key:string]:Thisoe},
  url:string,
  method:string='PUT'
)=>{
  const SERV_ID = crypto.randomUUID().replace('-','')
  try{
    const res=await fetch(url,{
      method,
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data),
    })
    if(res.ok)return 0
    console.error(`[Thisoe] Error: PUTFAILED. (SERV_ID::${SERV_ID})`)
    return SERV_ID
  }catch(e){
    console.error(`[Thisoe] Error: USESERVER_NOTPUTTING {{ ${e} }} WITH SERV_ID::`+SERV_ID)
    return SERV_ID
  }
}