import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import{Provider}from"next-auth/providers"
import{MongoDBAdapter}from"@auth/mongodb-adapter"
import{con,userDB}from"./_insu"
import type{Auser}from"./ts"

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
    async signIn({user}){
      const auser = await userDB.findOne({e:user.email})
      if(!auser&&user.email&&user.id&&user.name){
        const aNewUser:Auser = {
          e:user.email,
          uid:user.id.slice(3,9),
          uname:user.name,
          ustat:1,rc:[],pin:[],
        }
        await userDB.insertOne(aNewUser)
      }
      return true
    },
  },
})