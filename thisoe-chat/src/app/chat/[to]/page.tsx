export default async function _({params}:{params:Promise<{to:string}>}){
  return<>{(await params).to}</>
}