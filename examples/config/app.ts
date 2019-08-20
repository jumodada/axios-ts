import axios from '../../src/index'
// import axios from 'axios'
import qs from 'qs'

// axios.defaults.headers.common['com'] = 'xx.com'

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res)
})

axios({
  transformRequest: [(function (data) {

      //return qs.stringify(data)
      return data
  }),...axios.defaults.transformRequest as any],
  transformResponse: [...axios.defaults.transformResponse as any, function (data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 3
  }
}).then((res) => {
  console.log(res)
})
