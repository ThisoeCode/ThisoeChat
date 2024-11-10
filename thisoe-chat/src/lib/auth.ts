import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import{Provider}from"next-auth/providers"
import{MongoDBAdapter}from"@auth/mongodb-adapter"
import{con}from"./_insu"

const providers:Provider[]=[
  Google,
]

export const providerMap = providers.map((provider)=>{
  if(typeof provider==="function"){
    const providerData = provider()
    return{id:providerData.id,name:providerData.name}
  }
  return{id:provider.id,name:provider.name}
}).filter((provider)=>provider.id!=="credentials")

export const{handlers,auth,signIn,signOut}=NextAuth({
  providers,
  adapter:MongoDBAdapter(con,{
    databaseName:process.env.DB_AUTH,
  }),
  session:{strategy:"jwt"},
  callbacks:{
    // Attach custom data
    async session({session,user}){
      console.log('========================')
      console.dir(session)
      // if(!user.thisoe&&user.name){
      //   user.thisoe={
      //     uid: user.id,
      //     uname: user.name,
      //     ustat: 1,
      //   }
      //   console.log(`[NEW/UPDATE USER TRIGGERED] @${user.id}'s user profile has been auto added from auth provider.`)
      // }

      // if(session.thisoe&&user.thisoe){
        session.thisoe.uid = user.thisoe.uid
        session.thisoe.uname = user.thisoe.uname
        session.thisoe.ustat = user.thisoe.ustat
        console.log('=-=-=-=-=-=')
        console.dir(session)
      // }
      return session
    },
    // async jwt({token,user}){
    //   if(user.thisoe){
    //     token.thisoe = user.thisoe
    //   } return token
    // },

    // signIn({profile}){
    //   console.dir(profile)
    //   return true
    // },
  },
})