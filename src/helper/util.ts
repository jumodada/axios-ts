const toString = Object.prototype.toString

export type type = 'Date' | 'Object'

const types: { [key: string]: string } = {
  Date: '[object Date]',
  Object: '[object Object]'
}

export const typeOf = <T>(val: any, typeName: type): val is T =>
  toString.call(val) === types[typeName]
