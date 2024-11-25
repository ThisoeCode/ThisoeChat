// import{NextRequest}from"next/server"
import{userDB}from"@/lib/_insu"
import{NJ,servTitle as t}from"@/lib/logsys"

export async function GET({}:Request,{params}:{params:Promise<{prev:string}>}){
  try{
    const
      {prev} = await params,
      list = await userDB
        .find({su:{$gt:Number(prev)}})
        .project({_id:0,uid:1,uname:1,ava:1,su:1})
        .sort({su:1})
        .limit(30)
        .toArray(),
      newPrev=list[list.length-1].su
    return NJ({list,newPrev})
  }catch(_){
    return t.t422('none \nCaught error::'+_)
  }
}