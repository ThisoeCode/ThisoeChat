import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import{MongoDBAdapter}from"@auth/mongodb-adapter"
import{con}from"./_insu"
 
export const{handlers,auth,signIn,signOut}=NextAuth({
  providers:[Google],
  adapter:MongoDBAdapter(con,{
    databaseName:process.env.DB_AUTH,
  }),
})