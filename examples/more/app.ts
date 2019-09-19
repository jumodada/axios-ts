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

// axios.get('/more/get',{
//   params:new URLSearchParams('a=b&c=d')
// }).then(res=>{
//   console.log(res)
// })
//
// axios.get('/more/get',{
//   params:'a=b&c=d'
// }).then(res=>{
//   console.log(res)
// })
// let params = new URLSearchParams();
// params.append('name', 'admin');
// params.append('age', '18');
// axios({
//   method: 'get',
//   url: '/more/get',
//   params
// }).then(res=>{
//   console.log(res)
// })


const instance =  axios.create({
  baseURL:'http://a.hiphotos.baidu.com/'
})

instance.get('image/pic/item/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg')

