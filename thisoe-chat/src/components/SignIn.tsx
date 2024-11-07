import{signIn}from"@/lib/auth"

export function SignIn({className}:{className:string}){
  return<form action={async()=>{
    "use server"
    await signIn()
  }} className={className}>
    <button type="submit"><i className='google svg'/>Sign in</button>
  </form>
}