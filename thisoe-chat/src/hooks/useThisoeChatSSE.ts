import{useState,useEffect}from"react"
import type{SSEdata}from"@/lib/ts"

export default function useSSE(
  url:string,
  defaultOpen:boolean=true,
){
  const
    [sse,setSSE]=useState<EventSource|null>(null),
    [haisin,setHS]=useState(false),
    [flush,setFlush]=useState<SSEdata|null>(null),
    open=()=>{
      if(sse)return;

      const newsse = new EventSource(url)
      setSSE(newsse)
      setHS(true)

      newsse.onmessage=e=>setFlush(JSON.parse(e.data))

      newsse.onerror=()=>{
        newsse.close()
        setSSE(null)
        setHS(false)
        // TODO DELETE_IF_VERCEL_STILL_DIES
        setTimeout(open,999)
      }
    },
    close=()=>{
      sse?.close()
      setSSE(null)
      setHS(false)
    },
    toggle=()=>haisin?open():close()

  // mount default
  useEffect(()=>{
    if(defaultOpen)open()
    return close
  },[])

  return{
    flush, open,
    ctrl:{
      open,
      close,
      toggle,
      isStreaming:haisin,
    },
  }
}