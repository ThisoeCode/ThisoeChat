export type sn = string|null|undefined
export type sna = string[]|undefined

export type Chat = {
  /** sender */
    n1:string
  /** recipient */
    n2:string
  /** message */
    c:string
  /** is read */
    read:boolean
  /** unix timestamp */
    dt:number
}

export type Auser = {
/** email: reference to Authjs user */
  e: string
  uid: string
  uname: string
  ustat: number
/** recent chats uid[ ] */
  rc: string[]
/** pinned users' uid[ ] */
  pin: string[]
}



// DEV TYPES
import type{ObjectId,WithId,WithoutId}from"mongodb"
import type{NextRequest}from"next/server"
/** A preparation of everything type. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
WithId<Document>|WithoutId<Document>|ObjectId|
Promise<preThisoe>|preThisoe[]|
(()=>preThisoe)
/** An everything type. */
export type Thisoe = preThisoe|{[_:string]:preThisoe}|Readonly<preThisoe>
export type Aobj = {[_:string]:Thisoe}