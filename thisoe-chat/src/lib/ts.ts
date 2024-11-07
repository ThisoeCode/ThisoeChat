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



// DEV TYPES
import type{WithId,WithoutId}from"mongodb"
import type{NextRequest}from"next/server"
/** A preparation of everything type. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
WithId<Document>|WithoutId<Document>|
Promise<preThisoe>|preThisoe[]|
(()=>preThisoe)
/** An everything type. */
export type Thisoe = preThisoe|Record<string,preThisoe>|Readonly<preThisoe>
