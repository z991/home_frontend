<template>
  <div class="navHeader">
    <div class="header">
      <div class="headcolumn clear">
        <p class="fl"><img class="img" src="../../assets/header.png" alt="" @click="cutNaviga"></p>
          <span v-show="userShow">
            <a href="javascript:void(0)" class="logout" @click="logout"><img class="logImg" src="../../assets/pi.png" />退出</a>
            <span class="user">{{userName}}</span>
          </span>
          <span v-show="!userShow">
            <a href="javascript:void(0)" class="logout" @click="loginPage">登录</a>
          </span>
          <el-menu
          v-show="menuShow"
          :default-active="activeIndex"
          class="menu el-menu-demo"
          mode="horizontal"
          background-color="#393e4a"
          text-color="#fff"
          active-text-color="#fff"
          @select="handleSelect">
            <el-menu-item v-if="!im.children" v-for="im in menuData" :key="im.index" :index="im.index" @click="Handover(im.component,im.index)">{{im.name}}</el-menu-item>
            <el-submenu v-if="item.children" v-for="item in menuData" :key="item.index" :index="item.index">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-if="item.children && m.view" v-for="(m,n) in item.children" :key="n" :index="m.index" @click="Handover(m.component,m.index)">{{m.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- <span>{{userName}}</span> -->
        <!-- <el-input
          class="search"
          placeholder="请输入内容"
          prefix-icon="el-icon-search">
        </el-input> -->
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
