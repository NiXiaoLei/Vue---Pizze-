
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login  from './components/Login'
import Register from './components/Register'

//二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Deliver'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//三级路由
import  Phone from './components/about/contact/Phone'
import  PersonName from './components/about/contact/PersonName'






export const routes=[
    {path:'/',name:'homeLink',components:{
      // 分情况跳转
        default:Home,
        'orderingGuide':OrderingGuide,
        'delivery':Delivery,
        'history':History
    }},
    {path:'/menu',name:'menuLink',component:Menu},

    {path:'/admin',name:'adminLink',component:Admin//,beforeEnter: (to, from, next) => {
        //这里是路由独享的守卫
      // alert("非登陆状态不能访问此页面")
      //next()
    },//}
    {path:'/login',name:'loginLink',component:Login},
    {path:'/register',name:'registerLink',component:Register},
    // 设置多级路由,并通过redirect 来控制默认显示的路由
    {path:'/about',name:'aboutLink',redirect:'/about/history',component:About,children:[
      {path:'/about/contact',name:"contactLink",redirect:'/about/contact/phone',component:Contact,children:[
        {path:'/about/contact/phone',name:'phoneNumeber',component:Phone},
        {path:'/about/contact/personname',name:'personName',component:PersonName}
      ]},
      {path:'/about/history',name:"historyLink",component:History},
      {path:'/about/delivery',name:"deliveryLink",component:Delivery},
      {path:'/about/orderingGuide',name:"orderingGuideLink",component:OrderingGuide},
    ]},
    //如果路径错误则跳转到主页
    {path:'*',redirect:'/'}
  ]
