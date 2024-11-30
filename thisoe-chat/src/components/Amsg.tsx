import Image from "next/image"
import{unixToDate}from"@/lib/client"
import type{SSEdata}from"@/lib/ts"

/** `i#amsg` */
export function Amsg({data,ava}:{data:SSEdata|null,ava:string}){
  if(!data)return<></>
  const
    // display time
    t=unixToDate(data.dt),
    now=unixToDate(Math.floor(Date.now())),
    time=`${t.h}:${t.m}`,
    date=`, ${t.shortMonth}${t.d}`,
    yr=`, ${t.yr}`,
    displayTime = now.yr!==t.yr ? time+date+yr
      : now.mo!==t.mo&&now.d!==t.d ? time+date
        : time

  return<i className={data.itsMe?"amsg me":"amsg"}>
    <Image className="ava"
      src={ava} alt="avatar"
      width={30} height={30}
    />
    <i className="p">
      <p>{data.c}</p>
      <span>{displayTime}</span>
    </i>
  </i>
}