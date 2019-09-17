const toString = Object.prototype.toString

export type type = 'Date' | 'Object'

const types: { [key: string]: string } = {
  Date: '[object Date]',
  Object: '[object Object]'
}

export const typeOf = <T>(val: any, typeName: type): val is T =>
  toString.call(val) === types[typeName]

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
