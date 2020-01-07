/* eslint-disable no-debugger */
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import './assets/icon/font-yewuhuafen/iconfont.css'
import './assets/icon/font_jiyinguanlian/iconfont.css'
import './assets/icon/font_top/iconfont.css'
import './assets/icon/font_zhuce/iconfont.css'
import $ from 'jquery'
import axios from 'axios'
import {
  setCookie,
  getCookie,
  delCookie
} from './assets/cookie'
// 富文本编辑器
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.axios = axios
// import {
//   userInfo
// } from './api'
import {
  Autocomplete,
  Button,
  Badge,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  Col,
  CheckboxGroup,
  Card,
  Dialog,
  Divider,
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Icon,
  Loading,
  Message,
  Menu,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Row,
  Steps,
  Step,
  Select,
  Tabs,
  Tooltip,
  TabPane,
  Table,
  TableColumn,
  Tag,
  TimePicker,
  Upload,
  Carousel,
  CarouselItem

} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  getStore
} from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'

const whiteList = ['/d-s-detail', '/drug-news', '/p-w-detail', '/path-ways', '/d-s-c-detail', '/d-s-w-detail', '/p-c-detail', '/p-f-detail', '/c-t-f-detail', '/c-t-c-detail', '/d-l-c-detail', '/d-l-f-detail', '/c-n-detail', '/c-n-g-detail', '/c-n-w-detail', '/clinicalGuidelinesDeatil', '/searchDrug', '/searchDruGenePair', '/searchContent', '/queryAllResult', '/authority', '/clinicalNotes', '/clinicalTrials', '/drugGenePair', '/drugLabels', '/patent', '/taskUser', '/help', '/download', '/taskhall', '/home', '/drug', '/gene', '/getajax', '/register', '/forgetpwd'] // 不需要登陆的页面
//
router.beforeEach(function (to, from, next) {
  let userInfo = getStore('userInfo')
  // if (whiteList.indexOf(to.path) !== -1) { // 白名单,如果在白名单中，就免登录
  //   next()
  // } else {
  //   if (userInfo !== null || userInfo !== '') {
  //     next({
  //       path: '/taskall'
  //     })
  //   } else {
  //     this.$message({
  //       message: '请登录后查看',
  //       type: 'error'
  //     })
  //     next({
  //       path: '/'
  //     })
  //   }
  // }
  if (whiteList.indexOf(to.path) !== -1) { // 白名单,如果在白名单中，就免登录
    next()
  } else {
    if (userInfo !== null && userInfo !== '') {
      next({
        path: '/taskall'
      })
    } else {
      // this.$message.error({
      //   message: '请登录后查看',
      //   type: 'error'
      // })
    }
  }
})
Vue.use(Autocomplete)
Vue.use(Button)
Vue.use(Badge)
Vue.use(ButtonGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Checkbox)
Vue.use(Card)
Vue.use(Col)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(infiniteScroll)
Vue.use(Loading.directive)
Vue.use(Menu)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Steps)
Vue.use(Select)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(TabPane)
Vue.use(VueContentPlaceholders)
Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(Upload)
Vue.use(Carousel)
Vue.use(CarouselItem)
// 给axios配置给Vue的$http成员
// Vue.prototype.$http = axios

Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})

Vue.config.productionTip = false
/* eslint-disable no-new */
// console.log(router)
new Vue({
  el: '#app',
  store,
  router,
  $,
  render: h => h(App)
})
