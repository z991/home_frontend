import {
  mapState,
  mapMutations,
  mapGetters,
} from 'vuex';
import YunHeader from "@/components/header/index.vue"
import UserManage from "@/components/userManage/index.vue"
import Navigation from "@/components/navigation/index.vue"
import HomeMain from "@/components/homeMain/index.vue"
import RoleAdmin from "@/components/roleadmin/index.vue"
import ChangePassword from "@/components/changePassword/index.vue"
import LogSystem from '@/components/system_log/index.vue';

// 个性化设置
import PersonalSetting from '@/components/personal_seeting/index.vue'

export default{
  name: 'navigaMain',
  components: {
    YunHeader,
    UserManage,
    Navigation,
    HomeMain,
    RoleAdmin,
    ChangePassword,
    LogSystem,
    PersonalSetting
  },
  data () {
    return {
      currentScreen: 'Navigation'
    }
  },
  created(){
    this.currentScreen = this.getHistory || 'Navigation';
    // console.log(this);

  },
  computed: {
    ...mapGetters(['getHistory']),
    'CurrHistory' () {
      // console.log(this.getHistory)
      return this.getHistory
    }
  },
  methods: {
    ...mapMutations(['setHistory'])
  },
  watch: {
    'CurrHistory' (res){
      // console.log(res);
      this.currentScreen = res;
    }
  }
}
