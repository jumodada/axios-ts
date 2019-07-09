import { typeOf } from './util'

const normalizeHeader = (headers: any, normalizedName: string): void => {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeader(headers, 'Content-Type')
  if (typeOf<Object>(data, 'Object')) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
      console.log(headers['Content-Type'])
    }
  }
  return headers
}
