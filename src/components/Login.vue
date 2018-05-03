<template>
  <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img calss="mx-auto d-block" src="../../src/assets/icon.png" alt="">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="email" class="form-control" v-model="email">
            </div>
             <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button type="submit" class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      email:'',
      password:''
    }
  },
  //组件内的守卫
  beforeRouteEnter: (to, from, next) => {
    //这里直接this 无法访问到
    next(vm=>vm.$store.dispatch("setUser",null))  
  },
  methods:{
    onSubmit(){
      axios.get('/users.json').then(res=>{
          // console.log(res)
          const data=res.data
          const users=[]

          //遍历返回的json 数据  存入数组users中 供下方筛选数据
      for(let key in data){
        const user=data[key]
          // console.log(user)
          users.push(user)
      }

      //实现  数组 过滤  filter 是es6的方法
     let result=users.filter((user)=>{
          return user.email===this.email&&user.password===this.password
      })
   
      if(result!=null&&result.length>0){
        this.$store.state.isLogin=true
        console.log(this.$store.state.isLogin)
        this.$store.dispatch("setUser",result[0].email)
        this.$router.push({name:'homeLink'})
        
      
      }else{
        alert("账号或密码错误")
        this.$store.dispatch("setUser",null)
      }

      })
     
      }
      
    }
  }

</script>

