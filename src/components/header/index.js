import Router from '../../router/index';
import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} from 'vuex';
import axioIn from '../../store/axioIn'
export default{
  name: 'YunHeader',
  data () {
    return {
      userName: '',
      activeIndex: '1',
      active: '',
      userShow: false,
      loginShow: true,
      menuShow: false,
      menuData1: [
        // {
        //   name: '导航页面',
        //   index: '2',
        //   component: 'Navigation',
        //   view: 1
        // },
        {
          name: '系统设置',
          index: '1',
          children: [
            {
              name: '用户管理',
              index: '1-1',
              component: 'UserManage',
              id: 'curd_user',
              view: 1
            },
            {
              name: '角色管理',
              index: '1-2',
              component: 'RoleAdmin',
              id: 'curd_group',
              view: 0
            },
            {
              name: '修改密码',
              index: '1-3',
              component: 'ChangePassword',
              id: 'password',
              view: 1
            },
            {
              name: '个性化设置',
              index: '1-4',
              view: 1,
              component: 'PersonalSetting',
              id: 'person_set'
            },
            {
              name: '系统日志',
              index: '1-6',
              component: 'LogSystem',
              id: 'log',
              view: 1
            }
          ]
        }
      ]
    }
  },
  created () {
    const user = window.sessionStorage.getItem("username");
    if(!user){
      this.userShow = false;this.menuShow = false
    }else{
      this.userShow = true;this.menuShow = true;
      this.active = this.getHistoryIndex;
      this.userName = window.sessionStorage.getItem("username");
      axioIn.get('/api/backend/permission/').then(res=>{
        this.menuData1[0].children.map(n=>{
          for(var attr in res.data){
            if(n.id === attr){
              n.view = res.data[attr].view;
            }
          }
        })
        // let obj = {};
        // obj.role = res.data.curd_group;obj.user = res.data.curd_user;
        // this.setPower(obj);// 存有没有修改用户和角色管理的权限
        // this.menuData1[0].children[0].view = res.data.view_user;
        // this.menuData1[0].children[1].view = res.data.view_group;
      })
    }
  },
  computed: {
    ...mapGetters(['getHistoryIndex', 'getHistory']),
    'Currindex' () {
      console.log(this.getHistory)
      return this.getHistory
    },
    'menuData' () {
      return this.menuData1
    }
  },
  methods: {
    ...mapMutations(['setHistoryIndex', 'setPower']),
    //异步的一个commit (处理componets 指向))
    ...mapActions(['setHistory']),

    handleSelect (key, keyPath) {
      // console.log(key, keyPath);
    },

    Handover (tab,currindex) {
      // console.log(tab,'click')
      var that=this;
     this.$store.dispatch("setHistory",tab)
     this.setHistoryIndex(currindex);
      // const loading = this.$loading({
      //   lock: true,
      //   text: '加载中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      // setTimeout(() => {
      //   this.setHistory(tab);
      //   this.setHistoryIndex(currindex);
      //   loading.close();
      // }, 1000);
    },
    logout () {
      axioIn.get('/api/backend/logout/').then(res=>{
        const _this = this;
        window.sessionStorage.clear();
        this.$store.state.History=null;
        this.$message({
          type: 'success',
          message: '退出成功',
          duration: 800,
          onClose () {
            console.log('guanbi')
            _this.userShow = false;_this.menuShow = false;
            _this.$store.dispatch("setHistory",'Navigation')
            _this.setHistoryIndex('11');
            // Router.push({path: '/'})
          }
        });
      })
    },
    cutNaviga () {
      var that=this;
      this.$store.dispatch("setHistory",'Navigation')
      this.setHistoryIndex('11');
    },
    loginPage () {
      Router.push({path: '/login'})
    }
  },
  watch: {
    // 导航切换
    // 'Currindex' (res) {
    //   console.log(res);
    //   this.setHistory(res);
    //   // this.activeIndex=res;
    // }
  }
}
