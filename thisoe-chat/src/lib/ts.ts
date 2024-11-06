import{WithId,WithoutId}from"mongodb"
import{NextRequest}from"next/server"

/** A preparation of everything type. */
export type preThisoe =
string|number|boolean|undefined|null|
Date|Error|NextRequest|React.ReactNode|
WithId<Document>|WithoutId<Document>|
Promise<preThisoe>|preThisoe[]|
(()=>preThisoe)

/** An everything type. */
export type Thisoe = preThisoe|Record<string,preThisoe>|Readonly<preThisoe>
