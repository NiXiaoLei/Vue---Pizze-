<template>
  <div id="app" >
   <div class="container">
      <appHeader></appHeader>
    </div>
    <div class="container">
      <router-view></router-view>

    </div>
    <br/>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <router-view name="orderingGuide"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="delivery"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="history"></router-view>
        </div>
      </div>
    </div>
     </div>
</template>

<script>
import Headers from "./components/Header"
import Home from "./components/Home"
import Menu from "./components/Menu"
export default {
  components: {
    appHeader: Headers
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
