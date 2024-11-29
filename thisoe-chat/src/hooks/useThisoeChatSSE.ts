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

      newsse.onerror = ()=>{
        newsse.close()
        setSSE(null)
        setHS(false)
        alert('An error occurred while receiving chat message.\nPlease contact Thisoe with message "SSE_ERR_1".')
      }
    },
    close=()=>{
      sse?.close()
      setSSE(null)
      setHS(false)
    },
    toggle=()=>haisin?open():close()

  // default
  useEffect(()=>{
    if(defaultOpen)open()
    return close
  },[])

  return{
    flush,open,
    ctrl:{
      open,
      close,
      toggle,
      isStreaming:haisin,
    },
  }
}