<template>
    <div class="hello">
        <div class="leftp">
            <p class="lo"><img src='../../assets/logo.png'/><span>小能导航系统</span></p>
            <div class="userInp"  v-show="showLogin">
              <div class="inpu">
                  <p>账号:</p>
                  <input type="text" v-model="name" />
                  <p>密码:</p>
                  <input type="password" v-model="password"/>
                  <p>验证:</p>
                  <input type="text" style="ime-mode:disabled" v-model="ident" v-on:keyup.enter="login()" />
                  <img :src="cc" alt="" class="tu" v-on:click="oncc()">
              </div>
              <!-- <p class="login" v-on:click="login()">登录</p> -->
              <div style="width:400px;">
                <el-button class="login" type="primary" v-on:click="login()">登录</el-button>
                <a class="forget" href="javascript:void(0)" @click="retrieve">忘记密码？</a>
              </div>
            </div>
            <!--找回密码-->
            <div class="find" v-show="findPassword">
              <form name='form' class="form">
                  <h2>重置密码</h2>
                  <div class="editText" v-show="formShow">
                    <el-input placeholder="请输入要找回密码的账号" prefix-icon="el-icon-search" v-model="findUser.username" aria-required="" maxlength="20" minlength="4" class="input" type="text"></el-input>
                    <!-- <el-input placeholder="请输入要找回密码的邮箱" prefix-icon="el-icon-search" v-model="findUser.email"  minlength="4" maxlength="40" class="input" type="text"></el-input> -->
                    <el-button type="primary" class="btn" @click="getBack">发送邮件</el-button>
                    <el-button type="primary" class="btn" @click="ToLogin">返回登录页</el-button>
                  </div>
                  <div class="cueWord" v-show="codeShow">
                    <p>请输入发送到邮箱的验证码</p>
                    <el-input placeholder="请输入验证码" prefix-icon="el-icon-search" v-model="verCode" minlength="4" maxlength="10" class="input" type="text"></el-input>
                    <el-button type="primary" class="btn" @click="sureCode">确定</el-button>
                    <el-button type="primary" class="btn" @click="ToLogin">返回登录页</el-button>
                  </div>
                  <div class="newPass" v-show="newShow">
                    <span class="codePass">输入新密码：</span><el-input style="margin-bottom:15px;" prefix-icon="el-icon-search" v-model="newCode" type="password" placeholder="请输入新密码" class="inp"></el-input>
                    <span class="codePass">确认新密码：</span><el-input prefix-icon="el-icon-search" v-model="surePass" type="password" placeholder="请输入新密码" class="inp"></el-input>
                    <el-button type="primary" class="btn" @click="changePass">确定</el-button><!-- @blur="changePass"-->
                  </div>
              </form>
            </div>
            <p class="wen">如有登录问题联系运维部门维护人员</p>
        </div>
        <img src="../../assets/ima.png" alt="" class="ima">
   </div>
</template>
<script>

</script>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
