import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'

function handleResponse(
  response: AxiosResponse,
  resolve: any,
  reject: any,
  config: AxiosRequestConfig,
  xhr: any
): void {
  if (response.status >= 200 && response.status <= 300) {
    resolve(response)
  } else {
    reject(createError(`Request failed with status code ${response.status}`, config, xhr, response))
  }
}

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'GET',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = config

    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }

    if (timeout) {
      xhr.timeout = timeout
    }

    if (withCredentials) {
      xhr.withCredentials = withCredentials
    }

    xhr.open(method.toUpperCase(), url!, true)
    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4 || xhr.status === 0) return

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
      handleResponse(response, resolve, reject, config, xhr)
    }

    xhr.ontimeout = function handleTimeout() {
      reject(
        createError(
          `The connection could have timed out. timeout is ${timeout}ms`,
          config,
          'ECONNABORTED',
          xhr
        )
      )
    }
    xhr.onerror = function handleError() {
      reject(createError('Network Error', config))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })
    if (cancelToken) {
      cancelToken.promise.then(res => {
        xhr.abort()
        reject(res)
      })
    }
    xhr.send(data)
  })
}
