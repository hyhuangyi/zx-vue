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
 @import "./assets/css/main.css";
 @import "./assets/css/color-dark.css";     /*深色主题*/
/* @import "./assets/css/theme-green/color-green.css";   浅绿色主题 */
</style>