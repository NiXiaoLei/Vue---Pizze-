import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'

import {store} from './store/store.js'

// import Home from './components/Home'
// import Menu from './components/Menu'
// import Admin from './components/Admin'
// import About from './components/about/About'
// import Login  from './components/Login'
// import Register from './components/Register'

// //二级路由
// import Contact from './components/about/Contact'
// import Delivery from './components/about/Deliver'
// import History from './components/about/History'
// import OrderingGuide from './components/about/OrderingGuide'

// //三级路由
// import  Phone from './components/about/contact/Phone'
// import  PersonName from './components/about/contact/PersonName'

Vue.use(VueRouter)

//设置axios默认路径
axios.defaults.baseURL='https://wd2468178309upkmpi.wilddogio.com/'

//配置Vue原型(在任何组件中都可以正常使用axios)  http是随便起的
Vue.prototype.http=axios



// const routes=[
//   {path:'/',name:'homeLink',component:Home},
//   {path:'/menu',name:'menuLink',component:Menu},

//   {path:'/admin',name:'adminLink',component:Admin//,beforeEnter: (to, from, next) => {
//       //这里是路由独享的守卫
//     // alert("非登陆状态不能访问此页面")
//     //next()
//   },//}
//   {path:'/login',name:'loginLink',component:Login},
//   {path:'/register',name:'registerLink',component:Register},
//   // 设置多级路由,并通过redirect 来控制默认显示的路由
//   {path:'/about',name:'aboutLink',redirect:'/about/history',component:About,children:[
//     {path:'/about/contact',name:"contactLink",redirect:'/about/contact/phone',component:Contact,children:[
//       {path:'/about/contact/phone',name:'phoneNumeber',component:Phone},
//       {path:'/about/contact/personname',name:'personName',component:PersonName}
//     ]},
//     {path:'/about/history',name:"historyLink",component:History},
//     {path:'/about/delivery',name:"deliveryLink",component:Delivery},
//     {path:'/about/orderingGuide',name:"orderingGuideLink",component:OrderingGuide},
//   ]},
//   //如果路径错误则跳转到主页
//   {path:'*',redirect:'/'}
// ]

const router=new VueRouter({
  routes,
  mode:'history',
  //控制页面载入时的滚动条位置
  scrollBehavior(to,from,savedPosition){
      // return {x:0,y:0}
      // return {selector:".btn"}
      

      //期望滚动到哪个位置
      if(savedPosition){
        return savedPosition
      }else{
        return{x:0,y:0}
      }
  }
})






/* 全局守卫
  to,from,next 这是全局守卫传过来的三个参数
  to 作用是 你要进入哪个路由去
  from 是 你要从哪个路由离开
  next 我们对应的函数, 这个决定是否展示你要看的页面 
*/
// router.beforeEach((to,from,next)=>{
//   // alert("还没有登陆,请先登陆")
//   // next()
//     console.log(to);
    
//   //判断 stroe.gettes.isLogin==false
//   if(to.path=='/login'||to.path=='/register'){
//     next()
//   }else{
//     alert("还没有登陆,请先登陆")
//     next('/login')
//   }
// })



router.beforeEach((to,from,next)=>{
  if(!store.state.isLogin){
    if(to.path=='/login'||to.path=='/register'){
      next()
    }else{
      alert("尚未登录")
      next('/login')
    }
  }else{
    next()
  }
 })




//全局守卫--后置钩子  先进入再执行
// router.afterEach((to,from)=>{
//   //  alert("after each")
// })




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


