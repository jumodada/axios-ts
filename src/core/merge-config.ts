import { AxiosRequestConfig } from '../types'
import { preservePreVal, notPreservePreVal, _assignsDeepMerge } from '../helper/merge-config'

const _assigns = Object.create(null)
const _assignKeysFromCurVal = ['url', 'params', 'data']
_assignKeysFromCurVal.forEach(key => (_assigns[key] = notPreservePreVal))

const _assignKeysDeepMerge = ['headers', 'auth']

_assignKeysDeepMerge.forEach(key => (_assigns[key] = _assignsDeepMerge))

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
