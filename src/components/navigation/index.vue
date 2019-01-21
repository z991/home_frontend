<template>
  <div class="navigation">
    <el-input
      class="search"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="search"
      @input="searchResult">
    </el-input>
    <div class="section">
      <p class="title">我的收藏</p>
      <div class="clear">
        <div class="single" v-for="item in myCollect" :key="item.id">
          <a target="_blank" :href="item.url"><img class="iconLink" :src="item.image" alt="" /></a>
          <div class="collect" @mouseover="showCollect(item)" @mouseout="hideCollect(item)">
            <p class="nameLink">{{item.name_navigations}}</p>
            <transition name="fade">
              <div class="shade" v-show="item.is_show">
                <a class="addition" href="javascript:void(0)" @click="cancelCollect(item.id)">
                  <i style="font-size:12px;margin-right:6px;" class="el-icon-star-on"></i>取消
                </a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-show="item.ch.navigations_of.length" v-for="item in navigateData" :key="item.id">
      <p class="title">{{item.ch.name_type}}</p>
      <div class="clear">
        <div class="single" v-for="(child,index) in item.ch.navigations_of" :key="index">
          <a target="_blank" :href="child.url">
            <img class="iconLink" :src="child.image" alt="" />
          </a>
          <div class="collect" @mouseover="showCollect(child)" @mouseout="hideCollect(child)">
            <p class="nameLink">{{child.name_navigations}}</p>
            <transition name="fade">
              <div class="shade" v-show="child.is_show">
                <a class="addition" @click="addCollect(child.id)" href="javascript:void(0)"><i style="font-size:12px;margin-right:12px;" class="el-icon-star-off"></i>添加</a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
