import axioIn from '../../store/axioIn'
import {mapGetters} from 'vuex';
import {ContainerMixin, ElementMixin} from 'vue-slicksort';
const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `,
};
const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}}</li>
  `,
};
export default {
    components: { SortableItem,SortableList },
    data() {
      return {
        content: [],    //排序前数据
        sort_info: {},  // 排序后数据
        arr: [],        //排序对象列表
      }
    },
    created() { // 获取请求列表数据
      this.content = JSON.parse(this.getGroupList) || JSON.parse(window.localStorage.groupList);
    },
    computed: {
      ...mapGetters(['getGroupList']),
    },
    methods: {
      // 排序后请求处理
      reorder(newContent) {
        newContent.forEach((key,value) => {
          this.sort_info[value + 1] =  key.ch.id
        });
        axioIn.post('/api/navigation/set_sort',{sort_info: this.sort_info}).then((res)=>{
            this.$message({type: 'success',duration: '1000',message: res.data.info});
        }).catch((res)=>{
          if(res.data.error) {this.$message({type: 'error',duration: '1000',message: res.data.error})}
          else{this.$message({type: 'error',duration: '1000',message: '设置失败'})}
        })
      }
    }
};