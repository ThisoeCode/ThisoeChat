import{useState,useEffect}from"react"
import type{SSEdata}from"@/lib/ts"

// TODO add param to pass in sender/receiver's ID

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

      newsse.onmessage = (e)=>{
        setFlush(JSON.parse(e.data))
      }

      newsse.onerror = ()=>{
        newsse.close()
        setSSE(null)
        setHS(false)
        alert('SSE stream error! Please contact Thisoe with message "SSE_ERR".\n')
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
  },[defaultOpen])

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