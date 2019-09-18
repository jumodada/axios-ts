import  axios from '../../src/index'

// document.cookie = 'a=c'
//
// axios.get('/more/get').then(res=>{
//   console.log(res)
// })
//
// axios.post('http://127.0.0.1:8088/more/server2',
//   {},{
//   withCredentials:true
//   }).then(res=>{
//     console.log(res)
// })


// const instance = axios.create({
//   xsrfCookieName:'XSRF-TOKEN-D',
//   xsrfHeaderName:'X-XSRF-TOKEN-D'
// })
//
//
// instance.get('/more/get').then(res=>{
//   console.log(res)
// })
//
//
// axios.post('/more/post',{
//   a:1
// },{
//   auth:{
//     username:'admin',
//     password:'123456'
//   }
// }).then(res=>{
//   console.log(res)
// })

axios.get('/more/get',{
  params:new URLSearchParams('a=b&c=d')
}).then(res=>{
  console.log(res)
})

axios.get('/more/get',{
  params:'a=b&c=d'
}).then(res=>{
  console.log(res)
})
