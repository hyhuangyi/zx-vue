<template>
  <div id="app">
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      />
  </div>
</template>
<style scoped>
#app{
    /* width: 100%;
    height: 100%; */
    background: url(../assets/images/login-bg.png) no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
}
</style>