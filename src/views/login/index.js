import Vue from 'vue'
import axios from 'axios';
// import Qs from 'qs';
import axioIn from '../../store/axioIn'
import Router from '../../router/index';
axios.defaults.withCredentials=true;//配置cookie

export default {
    name:'login',
    data:function(){
      return{
        name: '',
        password: '',
        ident: '',
        msn: '',
        cc:'api/backend/verifycode/',
        dd:localStorage.name,
        showLogin: true,
        findPassword: false,
        formShow: true,
        newShow: false,
        codeShow: false,
        findUser: {username: '',email: ''},
        verCode: '',
        newCode: '',
        surePass: '',
        new_key: '',
      }
    },
    mounted:function(){
      this.oncc();
      if(sessionStorage.username!==undefined){
        router.push('./')
      }
    },
    methods:{
      login:function(){
        if(this.name===''||this.password===''||this.ident===''){
          this.$message.error('请完善登录信息')
        }else{
          axioIn.post('api/backend/login/',{username:this.name,password:this.password,check_code:this.ident})
          .then((response)=>{
            sessionStorage.setItem("username",this.name);
            this.$message({
              type: 'success',
              message: '登录成功',
              duration: 1000
            });
            Router.push({path: '/'});
          }).catch((err)=>{
            if(err.status==417){
              this.$message.error('验证码输入错误')
            }
            // else if(err.status==401){
            //   this.$message.error('账号或密码输入错误')
            // }
            this.oncc()
          });
        }
      },
      // 找回密码
      ToLogin(){
        console.log("已有账号?立即登录");
        this.showRegister = false; this.showLogin = true;
        this.findPassword = false;this.formShow = true;
        this.codeShow = false;this.newShow = false;
        this.newUsername ="";
        this.newPassword = "";
      },
      retrieve () {
        this.findPassword = true;this.formShow = true;this.showLogin = false;this.showRegister = false;
        this.codeShow = false;this.newShow = false;
        for(var attr in this.findUser){
          this.findUser[attr] = '';
        }
        this.verCode = '';this.newCode = '';this.new_key = '';
      },
      getBack () {
        axioIn.post('/api/account/reset_passwd/',this.findUser).then(res=>{
          this.formShow = false;this.codeShow = true;
        })
      },
      sureCode () {
        if(this.verCode === ''){
          this.$message.error('请输入验证码');return;
        }else{
          axioIn.get('/api/account/verify_code/?code='+this.verCode.trim()).then(res=>{
            this.newShow = true;this.codeShow = false;
            this.new_key = res.data.result;
            this.$message({
              message: res.data.error,
              type: 'success'
            });
          })
        }

      },
      changePass () {
        if(this.newCode === '' || this.surePass === ''){
          this.$message.error('请输入新密码');return;
        }else{
          if(this.newCode === this.surePass){
            axioIn.get('/api/account/reset/?new_key='+this.new_key.trim()+'&password='+encodeURIComponent(this.newCode)).then(res=>{
              this.$message({
                message: res.data.error,
                type: 'success'
              });
              for(var attr in this.findUser){
                this.findUser[attr] = '';
              }
              this.verCode = '';this.newCode = '';this.new_key = '';
              this.ToLogin();
            }).catch(err=>{
              this.$message.error(err.data.error);
            })
          }else{
            this.$message.error('两次输入的密码不一致');
          }

        }
      },
      oncc () {
          this.cc='api/backend/verifycode/?d='+Math.random();
      }

    }
}
