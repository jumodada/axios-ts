import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
}).then(res=>{
  console.log(res)
})

axios.request({
  url: '/extend/get',
  method: 'get'
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/extend/post',{
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi,hi,hi'
  }
})




interface ResponseData<T = any> {
  code: number
  result: T
  message: string,
  xxx:string
}

interface User {
  name: number
  age: number
}

function getUser<T>(){
  return axios<ResponseData<T>>('/extend/user')
    .then(res =>res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
