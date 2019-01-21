<template>
  <div class="change">
    <div class="formChan">
      <p><label class="hint" for="">旧密码：</label><el-input class="inpPass" type="password" v-model="passInfo.oldPass" placeholder="请输入旧密码" prefix-icon="el-icon-document"></el-input></p>
      <p><label class="hint" for="">新密码：</label><el-input type="password" class="inpPass" v-model="passInfo.newPass" placeholder="请输入新密码" prefix-icon="el-icon-document"></el-input></p>
      <p><label class="hint" for="">确认新密码：</label><el-input type="password" class="inpPass" v-model="passInfo.surePass" placeholder="请输入新密码" prefix-icon="el-icon-document"></el-input></p>
      <p class="sure">
        <el-button size="small" type="primary" @click="sureChange">确定</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </p>
    </div>
  </div>
</template>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<script src="./index.js"></script>
