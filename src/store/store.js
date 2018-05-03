import Vue from 'vue'
import Vuex from 'vuex'


//第一种模块化方法
// import * as actions from './actions'
// import * as mutations from './mutations'
// import * as getters from './getters'

//第二种模块化方法
import menu from './module/menu'
import users from './module/users'
import status from './module/status'


Vue.use(Vuex)

export const store=new Vuex.Store({
        //第二种方法
        modules:{
            menu,
            users,
            status
        }



    //第一种方法
    // state:{
    //     //设置属性
    //     // menuItems:{},
    //     // currentUser:null,
    //     // isLogin:false
    // },
    //  //获取属性的状态/具体值
    // getters,
    // //改变属性的状态
    // mutations,
    // //不直接操作  应用mutations
    // //这里处理等多的mutations方法的逻辑
    // actions
})
