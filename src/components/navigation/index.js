import axioIn from '../../store/axioIn'
import {
  mapMutations
} from 'vuex';
export default{
  name: 'navigation',
  data () {
    return {
      navigateData: [],
      myCollect: [],
      allNavigate: [],
      allMine: [],
      search: ''
    }
  },
  created () {
    axioIn.get('/api/navigation/type/').then(res=>{
      this.navigateData = res.data;
      this.navigateData.map(n=>{
        n.ch.navigations_of.map(m=>{this.$set(m,'is_show',false);})
      });
      this.allNavigate = Object.assign(this.navigateData);
      this.setGroupList(res.data);
    })
    if(window.sessionStorage.getItem("username")){
      this.collectShow();//我的收藏数据展示
    }
  },
  methods: {
    ...mapMutations(['setGroupList']),
    showCollect (item) {
      this.$set(item,'is_show',true);
    },
    hideCollect (item) {
      this.$set(item,'is_show',false)
    },
    addCollect (id) {
      if(window.sessionStorage.getItem("username")){
        axioIn.post('/api/navigation/post_myfavourite/',{'na_id': id}).then(res=>{
          this.collectShow();
          this.$notify({
            title: '成功',
            message: '收藏成功',
            type: 'success'
          });
        })
      }else{
        this.$notify.error({
          title: '错误',
          message: '请先登录'
        });
      }
    },
    cancelCollect (id) {// 取消收藏
      axioIn.delete('/api/navigation/delete_myfavourite/?na_id='+id).then(res=>{
        this.collectShow();
        this.$notify({
          title: '成功',
          message: '成功取消收藏',
          type: 'success'
        });
      })
    },
    collectShow () {
      axioIn.get('/api/navigation/get_myfavourite/').then(res=>{//我的收藏的数据
        this.myCollect = res.data.date;
        this.myCollect.map(n=>{this.$set(n,'is_show',false);})
        this.allMine = this.myCollect;
      })
    },
    searchResult () {//搜索
      if(this.search === '' || this.search === undefined){
        this.navigateData = this.allNavigate;
        this.myCollect = this.allMine;
      }else{
        let arr = [],obj = {},plans = '';
        this.navigateData = [];this.myCollect = [];
        let search = this.search.toLowerCase().trim();
        this.allNavigate.map((n,index)=>{ // 导航的筛选，待优化
          n.ch.navigations_of.map((m,i)=>{
            if(m.name_navigations.toLowerCase().indexOf(search) !== -1){
              var flag = false;
              this.navigateData.map((k,l)=>{
                if(k.ch.name_type === n.ch.name_type){
                  flag = true;plans = l;
                }
              })

              if(flag){
                this.navigateData[plans].ch.navigations_of.push(m);
              }else{
                obj = JSON.parse(JSON.stringify(n));// 去重
                obj.ch.navigations_of = [];
                obj.ch.navigations_of.push(m)
                this.navigateData.push(obj)
              }
            }
          })
        })
        this.allMine.map((n,index)=>{ // 我的收藏的筛选
          if(n.name_navigations.toLowerCase().indexOf(search) !== -1){
            this.myCollect.push(n)
          }
        })

      }
    }
  }
}
