import{NextResponse}from'next/server'
import{mainDB}from'@/lib/_insu'
import{Thisoe}from'@/lib/ts'

export async function GET(req:Request){
  const
    {readable,writable} = new TransformStream(),
    writer = writable.getWriter(),
    data=(_:Thisoe)=>`data: ${_}\n\n`
  writer.write('SSE_OPEN')

  try{
    const
      cs = mainDB.watch(),
      abort=()=>{
        cs.close()
        writer.close()
      }

    req.signal.addEventListener('abort',abort)

    cs.on('change',(change:{fullDocument:{[_:string]:Thisoe}})=>{
      if(req.signal.aborted)return;
      writer.write(data(change.fullDocument.c))
    })

    // sweep
    writer.closed.finally(()=>{
      cs.close()
      req.signal.removeEventListener('abort',abort)
    })
  }catch(e){
    writer.write(data(`UNEXPECTED_SSE_ERROR ${e}`))
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

