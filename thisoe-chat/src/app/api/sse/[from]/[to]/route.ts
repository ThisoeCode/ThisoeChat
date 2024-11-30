import{NextResponse}from'next/server'
import{mainDB,userDB}from'@/lib/_insu'
import{NJ}from'@/lib/logsys'
import type{Chat,SSEdata}from'@/lib/ts'

// TODO DELETE_IF_VERCEL_NOT_EDGING
export const config = {
  runtime: 'edge',
}

export async function GET(req:Request,{params}:{
  params:Promise<{from:string,to:string}>,
}){
  const
    {from,to}=await params,
    {readable,writable} = new TransformStream(),
    writer = writable.getWriter(),
    data=(_:SSEdata)=>`data: ${JSON.stringify(_)}\n\n`

  try{
    // console.log(' === SSE API TRYING TO OPEN === ') // TODO DELETELINE
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
        // console.log(' === API SSE ABORTING === ') // TODO DELETELINE
        cs.close()
        writer.close()
      }

    if(!e1||!e2){
      abort()
      return NJ({error:'[WARNING:４２２] THISOECHAT_SSE_AUTH_BAD_REQ'},422)
    }

    // TODO DELETE_IF_VERCEL_NOT_EDGING
    setInterval(()=>{
      if(!writer.closed){
        writer.write(`:\n\n`)
      }
    }, 9999)

    req.signal.addEventListener('abort',abort)

    cs.on('change',(change:{fullDocument:Chat,operationType:string})=>{
      // console.log(' === SSE NEW CHANGE === ') // TODO DELETELINE
      if(req.signal.aborted)return;
      const doc=change.fullDocument
      if(change.operationType==='insert'){
        // console.log(`     FROM ${doc.e1} TO ${doc.e2}\n     ${doc.c}`) // TODO DELETELINE
        // console.dir({e1,e2,doc:{e1:doc.e1,e2:doc.e2},itsmeFalse:doc.e2===e1&&doc.e1===e2,itsmeTrue:doc.e2===e2&&doc.e1===e1}) // TODO DELETELINE
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

