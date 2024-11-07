import{Db,MongoClient,ServerApiVersion}from"mongodb"

const{DB_HOST,DB_NAME,DB_CLCT}=process.env
console.log(DB_HOST,DB_NAME,DB_CLCT)
if(!DB_HOST||!DB_NAME||!DB_CLCT){ // TS mustdo
  throw new Error('[THISOE🩵DEBUG] Missing environment variables.')
}

export const con = new MongoClient(DB_HOST,{serverApi:{version:ServerApiVersion.v1,strict:true,deprecationErrors:true}})

// Create async connection
let cachedClient:null|MongoClient = null
let cachedDb:null|Db = null
export default async function insu(){
  if(cachedClient&&cachedDb){
    return {client:cachedClient, db:cachedDb}
  }
  await con.connect()
  const db = con.db(DB_NAME)
  cachedClient = con
  cachedDb = db
  return {client:cachedClient, db:cachedDb}
}

// Export COLLECTIONs
export const DB = async ()=>{
  const {db} = await insu()
  return db.collection(DB_CLCT)
}