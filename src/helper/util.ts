const toString = Object.prototype.toString

export type type = 'Date' | 'Object'

const types: { [key: string]: string } = {
  Date: '[object Date]',
  Object: '[object Object]'
}

export const typeOf = <T>(val: any, typeName: type): val is T =>
  toString.call(val) === types[typeName]

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const mergeObj = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]

        if (typeOf(val, 'Object')) {
          mergeObj[key] = typeOf(mergeObj[key], 'Object')
            ? deepMerge(mergeObj[key], val)
            : deepMerge(val)
        } else {
          mergeObj[key] = val
        }
      })
    }
  })
}
