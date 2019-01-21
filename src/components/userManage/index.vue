<template>
  <div class="userManage daily_container block">
    <div class="listShow" v-show="exhibition">
      <div class="addBtn">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" @input="searchBtn" v-model="searchContent" :readonly="clearData" @focus="clearData=false" class="input-with-select">
          <!-- <el-select style="width:200px;" v-model="select" slot="prepend" placeholder="请选择">
            <el-option v-for="(item,index) in selectList" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select> -->
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div style="height:100%;">
    <div class="userData daily_content">
      <div class="daily_table">
        <el-table
          :data="filterData"
          highlight-current-row
          height="100%"
          style="width: 100%">
          <el-table-column
            prop="cn"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="sn"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
            <el-button @click="editInfo(scope.row)" size="small" type="primary">编辑</el-button>
            <el-button @click="deleteInfo(scope.row)" size="small" type="danger" v-show="limitIs">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page daily_pages block" v-show="pageshow">
        <el-pagination
            background
            @current-change="flipOver"
            :current-page.sync="currPage"
            layout="total,prev, pager, next,jumper"
            :total="pageAll">
          </el-pagination>
      </div>
    </div>

    </div>
  </div>
    <div class="userInfo" v-show="!exhibition">
      <div><label for=""><em>*</em>用户名</label><el-input v-model="userFill.cn" @blur="userVerify" :disabled="userAmend" placeholder="请输入内容"></el-input></div>
      <div v-show="emailShow"><label for=""><em>*</em>邮箱</label><el-input v-model="userFill.mail" placeholder="请输入内容"></el-input></div>
      <div><label for=""><em>*</em>姓名(中文)</label><el-input v-model="userFill.sn"  placeholder="请输入内容"></el-input></div>
      <div v-show="hidePass"><label for=""><em>*</em>密码</label><el-input v-model="userFill.password" placeholder="请输入内容" type="password"></el-input></div>
      <div class="control">
        <label for="" style="vertical-align:top;"><em>*</em>权限管理</label>
        <el-tree
          :data="userFill.permission_list"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-checked-keys="pitchData"
          :props="defaultProps">
        </el-tree>
      </div>
      <div style="margin-left:172px;" >
        <el-button size="small" @click="cancle">取消</el-button>
        <el-button type="primary" size="small" @click="getCheckedNodes" v-show="limitIs">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
