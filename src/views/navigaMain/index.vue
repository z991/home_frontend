<template>
  <div style="height:100%;">
    <YunHeader></YunHeader>
    <el-main class="main">
      <!-- <div class="matter"> -->
        <HomeMain :is="currentScreen"></HomeMain>
      <!-- </div> -->
    </el-main>
  </div>

</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
