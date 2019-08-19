import { typeOf } from './util'

function preservePreVal(preVal: any, curVal: any): any {
  return typeof curVal === 'undefined' ? preVal : curVal
}

function notPreservePreVal(preVal: any, curVal: any): any {
  if (typeof curVal !== 'undefined') {
    return curVal
  }
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
  return mergeObj
}

function _assignsDeepMerge(preVal: any, curVal?: any): any {
  if (typeOf(curVal, 'Object')) {
    return deepMerge(preVal, curVal)
  } else if (typeof curVal !== 'undefined') {
    return curVal
  } else if (typeOf(preVal, 'Object')) {
    return deepMerge(preVal)
  } else if (typeof preVal !== 'undefined') {
    return preVal
  }
}

export { preservePreVal, notPreservePreVal, _assignsDeepMerge }
