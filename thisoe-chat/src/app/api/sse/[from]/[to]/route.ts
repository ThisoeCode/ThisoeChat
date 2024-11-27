import{NextResponse}from'next/server'
import{mainDB}from'@/lib/_insu'
import type{Chat,SSEdata}from'@/lib/ts'

export async function GET(req:Request,{params}:{
  params:Promise<{from:string,to:string}>,
}){
  const
    {from,to}=await params,
    {readable,writable} = new TransformStream(),
    writer = writable.getWriter(),
    data=(_:SSEdata)=>`data: ${JSON.stringify(_)}\n\n`
  writer.write('SSE_OPEN')

  try{
    const
      cs = mainDB.watch(),
      abort=()=>{
        cs.close()
        writer.close()
      }

    req.signal.addEventListener('abort',abort)

    cs.on('change',(change:{fullDocument:Chat})=>{
      if(req.signal.aborted)return;
      const doc=change.fullDocument
      if(doc.e2===from&&doc.e1===to)
        writer.write(data({
          itsMe:true,
          dt:doc.dt,
          c:doc.c,
        }))
      if(doc.e2===to&&doc.e1===from)
        writer.write(data({
          itsMe:false,
          dt:doc.dt,
          c:doc.c,
        }))
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

