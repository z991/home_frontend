import axioIn from '../../store/axioIn';
import { mapGetters } from 'vuex';
export default {
  name:'userManage',
  data() {
    return {
      userList: [{userName: 'liuqian', peopleName: '刘茜'}],
      selectList: [{name: '餐厅',value: 1},{name: '的好时机',value:2}],
      select: '',
      searchContent: '',
      filterData: [],
      tableData: [],
      exhibition: true,
      data2: [{
        id: 'gitlab',
        view: '1',
        children: [{
          id: 'gitlab-user',
          view: '0'
        }]
      }, {
        id: 'Jenkins',
        view: '1',
        children: [{
          id: 'Jenkins-admin',
          view: '1'
        }, {
          id: 'Jenkins-user',
          view: '0'
        }]
      }, {
        id: 'Jira',
        view: '1',
        children: [{
          id: 'Jira-admin',
          view: '0'
        }, {
          id: 'Jira-user',
          view: '0'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'id'
      },
      pageAll: 1,
      userFill: {mail: "",permission: [],cn: "",sn: "",password: "",permission_list: []},
      pitchData: [],//权限管理树状结构选中的节点
      status: '',//新增或编辑的状态保存
      emailShow: true,//邮箱展示的控制
      currPage: 1,// 分页的当前的页数
      userAmend: false,//控制用户名栏是否禁用
      pageshow: true,//分页是否显示
      limitIs: true,
      clearData: true,//控制搜索可不可以写入数据，为了解决谷歌浏览器保存了账号的问题
      controlOpe: '编辑',
      limitUser: false,
      hidePass: true
    };
  },
  computed: {
    ...mapGetters([ 'getPower']),
  //   'juris' () {
  //     return this.getusertype;
  //   }
  },
  created() {
    if(this.searchContent === '' || this.searchContent === undefined){
      this.flipOver(1);this.currPage = 1;this.pageshow = true;
    }
  },
  mounted(){
    axioIn.get('/api/account/user_list/').then(res=>{
      this.filterData = res.data.result;
      this.tableData = res.data.total_result;
      this.pageAll = res.data.total_count;
      this.searchBtn();
    })
  },
  methods: {
    getCheckedNodes () {//保存
      var reg = /^[a-zA-Z]+$/;
      if(!reg.test(this.userFill.cn)){
        this.$message.error('用户名一栏只能输入字母哦');return;
      }
      var authority = this.$refs.tree.getCheckedNodes();//拿到树状结构选中的节点
      if(this.userFill.cn === '' || this.userFill.sn === '' || this.userFill.password === '' || authority.length === 0){
        this.$alert('请把必选项都填写完整', {confirmButtonText: '确定'});
        return;
      }
      this.userFill.permission = {}; // 把权限的数据改为后台要的数据格式
        this.userFill.permission_list.map(n=>{
          // var obj = {};
          this.userFill.permission[n.id] = {};
          n.children.map(m=>{
            this.userFill.permission[n.id][m.id] = 0;
          })
          // this.userFill.permission.push(obj)
        })

        authority.map(item=>{
          for(var i in this.userFill.permission){
            var str = this.userFill.permission[i];
            for(var pro in str){
              if(item.id == pro){
                str[pro] = 1;
              }
            }
          }
        });
      if(this.status === '编辑'){
        axioIn.put('api/account/user_put/',this.userFill).then(res=>{
          this.exhibition = true;
          this.$message({
            type: 'success',
            duration: '1500',
            message: '修改成功'
          });
          this.currPage = 1;this.flipOver(1);this.searchContent = '';
        })
      }else if(this.status === '新增'){
        axioIn.post('api/account/user_add/',this.userFill).then(res=>{
          this.exhibition = true;
          this.$message({
            type: 'success',
            duration: '1500',
            message: '新增成功'
          });
          this.currPage = 1;this.flipOver(1);this.searchContent = '';
        })
      }
    },
    searchBtn () { //搜索
      if(this.searchContent === '' || this.searchContent === undefined){
        this.flipOver(1);this.currPage = 1;this.pageshow = true;
      }else{
        let data = [];this.pageshow = false;
        let searchContent = this.searchContent.toLowerCase().trim();
        this.tableData.map(n=>{
          if(n.sn.toLowerCase().indexOf(searchContent) >= 0 || n.cn.toLowerCase().indexOf(searchContent) >= 0){
            data.push(n)
          }
        })
        this.filterData = data
      }

    },
    userVerify () {
      var reg = /^[a-zA-Z]+$/;
      if(!reg.test(this.userFill.cn)){
        this.$message.error('用户名一栏只能输入字母哦');
      }
    },
    flipOver (page) { //翻页
      axioIn.get('/api/account/user_list/?page='+page).then(res=>{
        this.filterData = res.data.result;
        this.tableData = res.data.total_result;
        this.pageAll = res.data.total_count;
      })
    },
    addUser () { // 新增
      this.status = '新增';this.emailShow = false;this.userAmend = false;this.hidePass = true;
      for(var attr in this.userFill){
        this.userFill[attr] = ''
      }
      this.userFill.permission = [];this.userFill.permission_list = [];this.pitchData = [];
      var arry = [];
      axioIn.get('/api/account/all_permission/').then(res=>{// 所有权限的接口，然后把拿到的数据转为树状结构需要的数据格式
        // res.data.map((n,index)=>{
          for(var attr in res.data){
            var obj = {};obj['id'] = attr;
            if(res.data[attr]){
              obj.children = [];
              for(var pro in res.data[attr]){
                var ses = {};ses.id = pro;
                ses.view = res.data[attr][pro]; obj.children.push(ses);
              }
            }
            arry.push(obj);
          }
        // })
        this.userFill.permission_list = arry;
        this.exhibition = false;
      })

    },
    editInfo (item) {  //编辑
      this.status = '编辑';this.exhibition = false;this.emailShow = true;this.userAmend = true;this.pitchData = [];this.hidePass = false;
      axioIn.get('/api/account/user_detail?user='+item.cn).then(res=>{
        this.userFill = res.data;this.userFill.permission_list = [];
        for(var attr in res.data.permission){
            var obj = {};obj['id'] = attr;
            if(res.data.permission[attr]){
              obj.children = [];
              for(var pro in res.data.permission[attr]){
                if(res.data.permission[attr][pro] == 1){
                  this.pitchData.push(pro)
                }
                var ses = {};ses.id = pro;
                ses.view = res.data.permission[attr][pro];obj.children.push(ses);
              }
            }
            this.userFill.permission_list.push(obj);
        }

      })
    },
    deleteInfo (item) { // 删除
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axioIn.delete('/api/account/user_delete?cn='+item.cn).then(res=>{
          this.$message({
            type: 'success',
            duration: '1500',
            message: '删除成功!'
          });
          this.currPage = 1;this.flipOver(1);this.searchContent = '';
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    cancle () { // 取消按钮
      this.exhibition = true;
      // this.searchContent = '';
    }
  }
}
