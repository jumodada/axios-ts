import { typeOf } from './util'
import { Method } from '../types'
import { deepMerge } from './merge-config'

const normalizeHeader = (headers: any, normalizedName: string): void => {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function handleHeaders(headers: any, data: any): any {
  normalizeHeader(headers, 'Content-Type')
  if (typeOf<Object>(data, 'Object')) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed
  headers.split('\r\n').forEach(item => {
    let [key, val] = item.split(':')
    key = key.trim().toLowerCase()
    if (!key || !val) return
    val = val.trim()
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'post', 'options', 'patch', 'put', 'head', 'common']
  methodsToDelete.forEach(method => delete headers[method])
  return headers
}
