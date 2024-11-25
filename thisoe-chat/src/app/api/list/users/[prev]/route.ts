// import{NextRequest}from"next/server"
import{userDB}from"@/lib/_insu"
import{NJ,servTitle as t}from"@/lib/logsys"

export async function GET({params}:{params:Promise<{prev:string}>}){
  try{
    const
      {prev} = await params,
      list = await userDB
        .find({su:{$gt:prev}})
        .project({_id:0,})
        .sort({su:1})
        .limit(30)
        .toArray(),
      newPrev=list[list.length-1]
    return NJ({list,newPrev})
  }catch(_){
    return t.t422('none \nCaught error::'+_)
  }
}