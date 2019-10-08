import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'
import { isURLSameOrigin } from '../helper/url'
import { cookie } from '../helper/cookie'
import { isFormData } from '../helper/util'

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
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const xhr = new XMLHttpRequest()
    configureRequest()
    addEvents()
    handleHeaders()
    handleCancel()

    function configureRequest(): void {
      if (responseType) {
        xhr.responseType = responseType
      }

      if (timeout) {
        xhr.timeout = timeout
      }

      if (withCredentials) {
        xhr.withCredentials = withCredentials
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            xhr,
            response
          )
        )
      }
    }

    function addEvents(): void {
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
        handleResponse(response)
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
      if (onDownloadProgress) {
        xhr.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        xhr.upload.onprogress = onUploadProgress
      }
    }

    function handleCancel() {
      if (cancelToken) {
        cancelToken.promise
          .then(res => {
            xhr.abort()
            reject(res)
          })
          .catch(
            /* istanbul ignore next  */
            err => {
              console.log(err)
            }
          )
      }
    }

    function handleHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          xhr.setRequestHeader(name, headers[name])
        }
      })
    }

    xhr.send(data)
  })
}
