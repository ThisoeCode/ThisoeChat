// API stuff
const selfurl=process.env.NEXT_PUBLIC_SELF_URL
if(!selfurl)throw new Error('[THISOE🩵DEBUG] Missing environment variables `PUBLIC_SELF_URL`.')
export const API = selfurl+'/api/'
export const headJ = {'Content-Type':'application/json'}

/** Get visitor's timezone */
export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
