import { Transform } from '../types'

export default function transform(data: any, headers: any, fns?: Transform | Transform[]): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => (data = fn(data, headers)))
  return data
}
