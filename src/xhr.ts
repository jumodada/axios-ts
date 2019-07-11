import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helper/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'GET', headers, responseType, timeout } = config

    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.open(method.toUpperCase(), url, true)

    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4) return

      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType === 'text' ? xhr.responseType : xhr.response
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }
      resolve(response)
    }

    xhr.ontimeout = function handleTimeout() {
      reject(new Error(`The connection could have timed out. timeout is ${timeout}ms`))
    }

    xhr.onerror = function handleError() {
      reject(new Error('Network Error'))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })
    xhr.send(data)
  })
}
