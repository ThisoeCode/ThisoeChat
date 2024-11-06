import{NextRequest,NextResponse}from"next/server"
import{Thisoe}from"./ts"

/** NextResponse.json */
export const NJ = (
  data:Record<string,Thisoe>,
  status:number = 200
)=>{
  return NextResponse.json(data,{status})
}

const t1 = (req:NextRequest)=>{
  let ip = req.headers.get('x-forwarded-for')?.split(',')[0]
  if(!ip){
    console.log(`\n[Thisoe API_LAUNCH 100] (Launcher's IP cannot be found.)`)
    return void 1
  }
  if(['::1',null,'127.0.0.1'].includes(ip)){
    ip='localhost'
  }else{
    ip=ip?ip.trim():'0.0.0.0'
  }
  let geo = req.headers.get('x-real-ip')
  geo=geo?geo.trim():'--'
  console.log(`\n[Thisoe API_LAUNCH 100] FromIP: ${ip} [${geo}]`)
  return void 1
}
const t2 = 'Thisoe msg::'
const t3 = 'Thisoe WARNING::'
const t4 = 'Thisoe FATAL::'
const t422 = (SERV_ID:string)=>{
  console.error('[WARNING:４２２] SERV_ID::'+SERV_ID)
  return NJ({thisoeERR:'Unprocessable Entity'},422)
}
const t500 =(process:string)=>{
  console.error(`[${t4+process} 500] UNKNOWN ERROR!!!!!!!`)
}
const NJ500 = NJ({},500)
export const servTitle = {t1,t2,t3,t4,t422,t500,NJ500}