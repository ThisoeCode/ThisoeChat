import{useState}from"react"

// TODO add param to pass in sender/receiver's ID

export default function useThisoeChatSSE(){
  const
    [sse,setSSE]=useState<EventSource |null>(null),
    selfURL=process.env.NEXT_PUBLIC_SELF_URL!,
    [haisin,setHS]=useState(false),
    open=()=>{
      const newsse = new EventSource(selfURL+'/api/sse')
      setSSE(newsse)
      setHS(true)

      newsse.onmessage = (e)=>{
        alert(e.data)
      }

      newsse.onerror = ()=>{
        alert('SSE stream error!')
        newsse.close()
        setSSE(null)
        setHS(false)
      }
    },
    close=()=>{
      sse?.close()
      setSSE(null)
      setHS(false)
    },
    toggle=()=>haisin?open():close()

  return{sse,open,close,toggle,isStreaming:haisin}
}