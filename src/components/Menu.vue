<template>
<div class="row">
  <!--菜单-->
  <div class="col-sm-12 col-md-8">
    <table class="table">
      <thead class="thead-default">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>加入</th>
        </tr>
      </thead>
      <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td><strong>{{item.name}}</strong></td>
        </tr>
        <tr v-for="option in item.options">
          <td>{{option.size}}</td>
          <td>{{option.price}}</td>
          <td><button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-success">+</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4">
      <div v-if="backets.length>0">
        <table class="table">
          <thead class="thead-default">
            <tr>
              <th>数量</th>
              <th>品种</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody v-for="item in backets" :key="item.name">
            <tr>
              <td>
                <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                <span>{{item.quantity}}</span>
                <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
              </td>
              <td>{{item.name}}{{item.size}}</td>
              <td>{{item.price*item.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <p>总价:{{total+"RMB"}}</p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>
        {{backetText}}
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  data() {
    return {
      backets: [],
      backetText:"购物车没有任何商品",
      // getMenuItems: {
      //   1: {
      //     name: "榴莲pizza",
      //     description: "这是喜欢吃榴莲朋友的最佳选择",
      //     options: [
      //       {
      //         size: 9,
      //         price: 38
      //       },
      //       {
      //         size: 12,
      //         price: 48
      //       }
      //     ]
      //   },
      //   2: {
      //     name: "芝士pizza",
      //     description: "芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚",
      //     options: [
      //       {
      //         size: 9,
      //         price: 38
      //       },
      //       {
      //         size: 12,
      //         price: 48
      //       }
      //     ]
      //   },
      //   3: {
      //     name: "夏威夷pizza",
      //     description: "众多人的默认选择",
      //     options: [
      //       {
      //         size: 9,
      //         price: 36
      //       },
      //       {
      //         size: 12,
      //         price: 46
      //       }
      //     ]
      //   }
      // }
    };
  },
  created(){
    this.fecthData()
  },computed:{
    getMenuItems:function(){
      //在vuex中获取数据
      // return  this.$store.state.menuItems
      // 通过getters 获取数据
      return this.$store.getters.getMenuItems
    },
    total(){
      let totalCost=0

      for(let index in this.backets){
        let individualItem=this.backets[index]
        totalCost+=individualItem.quantity*individualItem.price
      }
      return totalCost
    }
  },
  methods: {
    fecthData(){
      // fetch("https://wd2468178309upkmpi.wilddogio.com/menu.json").then(res=>{
      //     return res.json()
      //   }).then(data=>{
      //     this.getMenuItems=data
      //   })

      // axios.get("menu.json")
      // .then(res=>this.getMenuItems=res.data)


      //配置过 Vue 原型就可以这么写
      // this.http.get("menu.json")
      //   .then(res=>this.getMenuItems=res.data)

      //将请求下来的数据存储到Vuex 中
     this.http.get("menu.json")
         .then(res=>this.$store.commit("setMenuItems",res.data))

    },
    addToBasket(item, option) {
      let basket={
        name: item.name,
        size: option.size,
        price: option.price,
        quantity: 1
      }
      if(this.backets.length>0){
          //过滤
          //filter
        let result=this.backets.filter((basket)=>{
          return (basket.name===item.name&&basket.price===option.price)
        })
        if(result!=null&&result.length>0){
          result[0].quantity++
        }else{
          this.backets.push(basket)
        }
      }else{
          this.backets.push(basket);
      }


    
    },
    decreaseQuantity(item){
      //可能会有bug
      item.quantity<=1?this.removeFromBasket(item):item.quantity--
    },increaseQuantity(item){
      item.quantity++
    },
    removeFromBasket(item){
      this.backets.splice(this.backets.indexOf(item),1)
    }
  }
};
</script>
<style>

</style>
