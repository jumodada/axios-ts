import axios, {Canceler} from '../../src/index'
const CancelToken = axios.CancelToken
const source1 = CancelToken.source()
const source2 = CancelToken.source()


let val: any = 0
axios.get('/cancel/get', {
  cancelToken: source1.token
}).then(res => {
  val = res.data
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log(e.message)
  }
})
axios.get('/cancel/get', {
  cancelToken: source2.token
}).then(res => {
  val = res.data
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log(e.message)
  }
})
setTimeout(()=>{
  source1.cancel('request is canceled')
},200)

setTimeout(()=>{
  console.log(val)
},2000)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
