import { AxiosRequestConfig } from '../types'
import { typeOf } from '../helper/util'
import { deepMerge } from '../helper/util'

const _assigns = Object.create(null)
const _assignKeysFromCurVal = ['url', 'params', 'data']

_assignKeysFromCurVal.forEach(key => (_assigns[key] = notPreservePreVal))

function preservePreVal(preVal: any, curVal: any): any {
  return typeof curVal !== 'undefined' ? preVal : curVal
}

function notPreservePreVal(preVal: any, curVal: any): any {
  if (typeof curVal !== 'undefined') {
    return curVal
  }
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

const _assignKeysDeepMerge = ['headers']

_assignKeysDeepMerge.forEach(key => {
  _assigns[key] = _assignsDeepMerge
})

export default function mergeConfig(preConfig: AxiosRequestConfig, curConfig: AxiosRequestConfig) {
  if (!curConfig) {
    curConfig = {}
  }
  const config = Object.create(null)
  for (let key in curConfig) {
    merge(key)
  }
  for (let key in preConfig) {
    if (!curConfig[key]) {
      merge(key)
    }
  }

  function merge(key: string): void {
    const _assign = _assigns[key] || preservePreVal
    config[key] = _assign(preConfig[key], curConfig[key])
  }
  return config
}
