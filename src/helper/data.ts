import { typeOf } from './util'

export function transformRequest(data: any): any {
  if (!typeOf<Object>(data, 'Object')) return data
  return JSON.stringify(data)
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.warn('data is not a JSON string')
    }
  }
  return data
}
