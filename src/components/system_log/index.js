import axioIn from '../../store/axioIn';

export default {
  name:'LogSystem',
  data() {
    return {
      system_log:{
        from_date: '', //时间值
        to_date:'',
        username:'',//人员
        action: '', //

      },
      time:'',
      SearchType:'',
      tableData: [], // 表格当前数据
      pagesize: 10, //默认每页数据量
      currentPage: 1, //当前页码
      totalCount: 20, //默认数据总数

      actions: [{
        value: '1',
        label: '增加'
      }, {
        value: '2',
        label: '删除'
      }, {
        value: '3',
        label: '修改'
      }, {
        value: '4',
        label: '登录'
      }, {
        value: '5',
        label: '退出'
      },
      {
        value: '6',
        label: '查看'
      }
    ]
      ,

      loading: false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  created() {
    this.loadData('1');
  },
  methods: {
    loadData (listen,pageIndex,search) {
      if(listen=='1'){
        axioIn.get('/api/log/system-log/').then((res)=>{
          let params=res.data.page_num;
          this.tableData=res.data.results;
          this.fiterData(this.tableData)
          this.currentPage=params.current;
          this.totalCount = params.total_count;
          this.buttonMessage('获取列表成功','success',1000);
        })
      }else if(listen=='2'){
        axioIn.get('/api/log/system-log/?page='+pageIndex).then((res)=>{
          this.tableData=res.data.results;
          this.fiterData(this.tableData)
          this.currentPage=params.current;
          this.totalCount = this.tableData.length;
        })
      }else if(listen=='3'){
        axioIn.get('/api/log/system-log/?page='+pageIndex+'&='+search).then((res)=>{
          let params=res.data.page_num;
          this.tableData=res.data.results;
          this.totalCount = params.total_count;
          this.fiterData(this.tableData)
          this.currentPage=params.current;
          // this.totalCount = this.tableData.length;
        })
      }else if(listen=='4'){
        axioIn.get('/api/log/system-log/?'+search).then((res)=>{
          if(res.data.results==0){
            let params=res.data.page_num;
            this.tableData=res.data.results;
            this.totalCount = this.tableData.length;
            this.currentPage=params.current;
            this.buttonMessage('暂无数据','warning',1000);

          }else{
            let params=res.data.page_num;
            this.tableData=res.data.results;
            this.fiterData(this.tableData)
            this.currentPage=params.current;
            this.totalCount = params.total_count;
            this.buttonMessage('检索数据成功','success',1000);

          }

        })
      }

    },
    fiterData(data){
      let newArr=['','新增','删除','修改','登录','退出','查看'];
      data.map(n=>n.action=newArr[n.action])
    },
    handleSizeChange(val) {
    },
    // 当前页变动时候触发的事件
    handleCurrentChange(val) {


      if(this.time){
        this.loadData('3',val,this.SearchType)
      }else{
        this.loadData('2',val);
      }

    },
    // 搜索
    Searstatus(val) {
    },

    // 获取时间日期
    dateChangebirthday(val) {
      this.time = val;
      console.log("起始时间：" + this.time[0] + "，结束时间：" + this.time[1]);
    },
    buttonMessage(data,types,time){
      this.$notify({
        title: '提示信息',
        message:data,
        position: 'top-right',
        type: types,
        duration:time,
      });
    },
    // 搜索
    search() {
      this.system_log.from_date=this.time[0];
      this.system_log.to_date=this.time[1];
      var searchData='';
      for(let i in this.system_log){
          if(this.system_log[i]!==''){
              if(searchData.length===0){searchData=i+'='+this.system_log[i]}
              else{searchData=searchData+'&'+i+'='+this.system_log[i]}
          }
      }
      this.SearchType=searchData;
      if(searchData=='from_date=undefined&to_date=undefined'){

      }else{
        this.loadData('4','',searchData)

      }



    },

    // 重置
    reset() {
      this.system_log = {};
      this.time = "";
      this.loadData('1')
    }
  }
}
