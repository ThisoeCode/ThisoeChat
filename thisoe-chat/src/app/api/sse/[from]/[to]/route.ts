import{NextResponse}from'next/server'
import{mainDB,userDB}from'@/lib/_insu'
import{NJ}from'@/lib/logsys'
import type{Chat,SSEdata}from'@/lib/ts'

export async function GET(req:Request,{params}:{
  params:Promise<{from:string,to:string}>,
}){
  const
    {from,to}=await params,
    {readable,writable} = new TransformStream(),
    writer = writable.getWriter(),
    data=(_:SSEdata)=>`data: ${JSON.stringify(_)}\n\n`

  try{
    const
      getE=async(uid:string)=>
        (await userDB.findOne(
          {uid},
          {projection:{_id:0,e:1}}
        )as {e:string}|null)?.e,
      e1=await getE(from),
      e2=await getE(to),

      cs = mainDB.watch(),
      abort=()=>{
        cs.close()
        writer.close()
      }

    if(!e1||!e2){
      abort()
      return NJ({error:'[WARNING:４２２] THISOECHAT_SSE_AUTH_BAD_REQ'},422)
    }

    req.signal.addEventListener('abort',abort)

    cs.on('change',(change:{fullDocument:Chat,operationType:string})=>{
      if(req.signal.aborted)return;
      const doc=change.fullDocument
      if(change.operationType==='insert'){
        if(doc.e2===e2&&doc.e1===e1)
          writer.write(data({
            itsMe:true,
            dt:doc.dt,
            c:doc.c,
          }))
        if(doc.e2===e1&&doc.e1===e2)
          writer.write(data({
            itsMe:false,
            dt:doc.dt,
            c:doc.c,
          }))
      }
    })

    // sweep
    writer.closed.finally(()=>{
      cs.close()
      req.signal.removeEventListener('abort',abort)
    })
  }catch(e){
    writer.write(`data: UNEXPECTED_SSE_ERROR ${e}\n\n`)
    console.error('[THISOE ERR] SSE ERROR unexpected::'+e)
    writer.close()
  }

  return new NextResponse(readable,{
    headers:{
      'Content-Type':'text/event-stream',
      'Connection':'keep-alive',
    }
  })
}

