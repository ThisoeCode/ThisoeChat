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
  su: number
/** email: reference to Authjs user */
  e: string
  uid: string
  uname: string
  ava:string
  ustat: number
/** recent chats uid[ ] */
  rc: string[]
/** pinned users' uid[ ] */
  pin: string[]
}

import type{ObjectId}from"mongodb"
export type Chat = {
    _id?:ObjectId
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

export type SSEdata={
  itsMe:boolean
  dt:number
  c:string
}

export type SettingProfile = {
  e:string
  uid:string
  uname:string
  isIDchange:boolean
}

// chat action func
export type chatID = {from:string,to:string}
export type chatData = {c:string}


import type{Awaitable}from"@auth/core/types"
export type awaitable<_>=Awaitable<_>


// DEV TYPES
import type{WithId,WithoutId}from"mongodb"
import type{NextRequest}from"next/server"
/** A preparation of the Everything Type `Thisoe`. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
WithId<Document>|WithoutId<Document>|ObjectId|
Promise<preThisoe>|preThisoe[]|(()=>preThisoe)|
Chat|chatID|chatData|Asession|Auser|SSEdata|Aobj
/** The Everything Type */
export type Thisoe = preThisoe|{[_:string]:preThisoe}|Readonly<preThisoe>
export type Aobj = {[_:string]:Thisoe}