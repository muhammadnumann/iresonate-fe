import { devWebsiteUrl, webHostData, websiteUrl } from './enums'
import { copyCodeToClipboard } from './helper'

export const copyScriptLink = (vendorIdentity:string,id?:string) => {
  const isDev = process.env.NODE_ENV === "development"
  var url = new URL(isDev ? devWebsiteUrl : websiteUrl)
  url.searchParams.append(webHostData.webHostId, vendorIdentity)
  id && url.searchParams.append(webHostData.contentWriterId,id)
  return (
      <a onClick={() => copyCodeToClipboard(url.href)}>{webHostData.copyScriptURL}</a>
  )
}