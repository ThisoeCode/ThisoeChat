export const

/** Get visitor's timezone */
TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone,

unixToDate=($uts:number)=>{
  const
    dt = new Date($uts),
    months=['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sep.','Oct.','Nov.','Dec.'],
    dig2=(_:number)=>{
      const n=_+''
      return n.length<2 ? '0'+n : n
    }
  return{
    yr: dt.getFullYear()+'',
    mo: dt.getMonth()+'',
    d: dt.getDate()+'',
    h: dig2(dt.getHours()),
    m: dig2(dt.getMinutes()),
    s: dig2(dt.getSeconds()),
    shortMonth: months[dt.getMonth()],
  }
}