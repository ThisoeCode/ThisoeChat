export type sn = string|null|undefined
export type sna = string[]|undefined

export type Asession = {
  e:string
  id:string
  name:string
  ava:string
  recent:string[]
  pin:string[]
}

export type Auser = {
/**
 * Signed-up timestamp (milliseconds since Nov 01 2024)
 * - type `int64`
 */
  su: {$numberLong:string} | number
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

export type Chat = {
  /** sender */
    e1:string
  /**
   * recipient
   * - `null` when self-sending
   */
    e2:string|null
  /** message */
    c:string
  /** is read */
    read:boolean
  /** unix timestamp */
    dt:number
}

// chat action func
export type chatID = {from:string,to:string}
export type chatData = {c:string}



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