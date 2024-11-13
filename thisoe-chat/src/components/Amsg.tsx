import{unixToDate}from"@/lib/lib"
import Image from "next/image"

export function Amsg({data,ava}:{ava?:string,data:{
  dt:number,
  c:string,
}}){
  const
    // display time
    t=unixToDate(data.dt),
    now=unixToDate(Math.floor(Date.now()/1000)),
    time=`${t.h}:${t.m}`,
    date=`, ${t.shortMonth}${t.d}`,
    yr=`, ${t.yr}`,
    displayTime = now.yr!==t.yr ? time+date+yr
      : now.mo!==t.mo&&now.d!==t.d ? time+date
        : time

  return<i className={ava?"amsg":"amsg me"}>
    {ava&&
      <Image className="ava"
        alt="avatar" src={ava}
        width={30} height={30}
      />
    }
    <i className="p">
      <p>{data.c}</p>
      <span>{displayTime}</span>
    </i>
  </i>
}