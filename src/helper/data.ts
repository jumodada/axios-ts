import { typeOf } from './util'

export function transformRequest(data: any): any {
  if (!typeOf<Object>(data, 'Object')) return data
  return JSON.stringify(data)
}
