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

export interface Users {
/** reference to Authjs user */
  _ref: ObjectId
  uid: string
  uname: string
  ustat: number
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
export type Thisoe = preThisoe|Record<string,preThisoe>|Readonly<preThisoe>
