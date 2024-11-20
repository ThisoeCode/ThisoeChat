import{Db,MongoClient,ServerApiVersion}from"mongodb"

const{DB_HOST,DB_NAME,DB_CLCT,DB_USER}=process.env
if(!DB_HOST||!DB_NAME||!DB_CLCT||!DB_USER){ // TS mustdo
  throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
}

export const con = new MongoClient(DB_HOST,{serverApi:{version:ServerApiVersion.v1,strict:true,deprecationErrors:true}})

// Create async connection
let
  /** Cached MongoClient */
  CMC:null|MongoClient = null,
  /** Cached DB */
  CDB:null|Db = null
export default async function insu(){
  if(CMC&&CDB){
    return {client:CMC, db:CDB}
  }
  await con.connect()
  const db = con.db(DB_NAME)
  CMC = con
  CDB = db
  return {client:CMC, db:CDB}
}

// Export COLLECTIONs
const DB = async(isUsersData:boolean=false)=>{
  const {db} = await insu()
  return db.collection(isUsersData?DB_USER:DB_CLCT)
}
export const mainDB = await DB()
export const userDB = await DB(true)