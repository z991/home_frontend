import axioIn from "../../store/axioIn";
import Router from '../../router/index';
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      passInfo: {oldPass: '',newPass: '',surePass: ''}
    }
  },
  created(){

  },
  methods: {
    ...mapMutations(['setHistory', 'setHistoryIndex']),
    sureChange () {
      var fillInfo = Object.values(this.passInfo), flag = false;
      fillInfo.map(n=>{if(n === ''){flag = true;}})
      if(flag){
        this.$message.error('请填写完毕');return;
      }else{
        var _this = this;
        if(this.passInfo.newPass === this.passInfo.surePass){
          axioIn.post('api/account/change_pwd/',{
            old_password: this.passInfo.oldPass,
            new_password: this.passInfo.newPass
          }).then(res=>{
            this.$message({
              type: 'success',
              message: '修改成功,请重新登录！',
              duration: 1500,
              onClose: function (){
                window.sessionStorage.clear();
                _this.$store.state.History=null;
                Router.push('/');
              }
            });
          })
        }else{
          this.$message.error('新密码两次填写不一致');this.passInfo.newPass = this.passInfo.surePass = '';
        }
      }
    },
    cancel () {
      this.setHistory('Navigation');
    }
  }
}
