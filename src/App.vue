<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body,div,p,span,a,em,i,ul,li,img,input,select,table,tr,td,th{
  margin:0;padding:0;font-family: 'Microsoft YaHei';font-size:14px;
}
a{text-decoration:none;}
li{list-style:none;}
</style>
