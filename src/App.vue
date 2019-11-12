<template>
  <div id="app">
   <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
   </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
html,body,ul,li,a,p,img,input,span{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
ul li{
  list-style: none;
}
html,body{
  width: 100%;
  height: 100%;
}
</style>