// Docs: https://authjs.dev/guides/pages/signin
import{signIn,providerMap}from"@/lib/auth"
import{SignInBtn}from"./_use_client"

/** `form.{className}` */
export function SignIn({className}:{className:string}){
  return<form className={className}
  action={async()=>{
    "use server"
    await signIn(providerMap[0].id,{redirectTo:"/chat"})
  }}>
    <SignInBtn provider={providerMap[0].name}/>
  </form>
}