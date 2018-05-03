<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
        <!-- 品种展示 -->
        <h3 class="text-muted my-5">菜单</h3>
        <table class="table">
          <thead class="table table-default">
            <tr>
              <th>品种</th>
              <th>删除</th>
            </tr>
          </thead>
          <tbody v-for="item in getMenuItems" :key="item.name">
            <tr>
              <td>{{item.name}}</td>
              <td><button @click="deleteData(item)"  class="btn btn-outline-danger btn-sm">&times;</button></td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
<script>
import NewPizza from './NewPizza'
//组件内的守卫
export default {
  data(){
      return{
        // getMenuItems:[]
      }
  },
  components:{
        'app-new-pizza':NewPizza
  },computed:{
    getMenuItems:{
      //vuex中获取数据
      get(){
        // return this.$store.state.menuItems
        // 通过getters 获取数据
         return  this.$store.getters.getMenuItems
      },set(){
        
      }
    }
  },created(){
    fetch("https://wd2468178309upkmpi.wilddogio.com/menu.json")
    .then(res=>{
      return res.json()
    })
    .then(data=>{
      // console.log(data);
      let menuArray=[]
      for(let key in data){
        // console.log(key)
        // console.log(data[key])
        data[key].id=key
        menuArray.push(data[key])
      }
      //数据同步
      this.$store.commit('setMenuItems',menuArray)
      // this.getMenuItems=menuArray
      console.log(this.getMenuItems)
    })
  },methods:{
    deleteData(item){
      fetch("https://wd2468178309upkmpi.wilddogio.com/menu/"+item.id+".json",{
        method:"DELETE",
        headers:{
          'Content-type':'application/json'
        }
      }).then(res=>res.json())
         // .then(data=>this.$router.push({name:'menuLink'}))
      //进行数据同步
      .then(data=>this.$store.commit('removeMenuItems',item))
     
      .catch(err=>console.log(err))
    }
  }
  
  //,
  // beforeRouteEnter: (to, from, next) => {
  //   // alert("Hello"+this.name)   //Hello underfind

  //   next(vm=>{
  //      alert("Hello"+vm.name)
  //   })
  // }



  //当用户要离开的时候触发
  // beforeRouteLeave: (to, from, next) => {
  //   if(confirm("确定离开了吗")){
  //     next()
  //   }else{
  //     next(false)
  //   }
  // }
}
</script>
