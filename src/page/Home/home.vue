<template>
  <div class="login">
    <!-- style="font-family:Times new roman,Times roman;" -->
    <YHeaders></YHeaders>
    <div
      class="searchBox"
      style="padding-top:3.3125rem;height:12rem;background-color:#1f7fb7; "
    >
      <!-- 中间搜索框 -->
      <ul style="text-align: center;">
        <li>
          <div class="nav-listss">
            <el-input
              class="top_input"
              size="large"
              style="width:700px;"
              placeholder="请输入基因/药物/药物-基因检索"
              icon="search"
              v-model="userinput"
              :minlength="1"
              :maxlength="100"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              suffix-icon="el-icon-search"
              @keydown.enter.native="handleIconClick"
              @change="handleIconClick"
            ></el-input>
          </div>
        </li>
      </ul>
      <!-- 中间搜索框 -->
      <!-- 热门 -->
      <div class="clearfix"></div>
      <div class="msgInf">
        <p class="hotMsg">
          <span>
            <strong>热门 :</strong>
          </span>
          <span>
            <a @click="handleIconClick2('氯吡格雷')">
              <strong>氯吡格雷</strong>
            </a>
          </span>
          <span>
            <a @click="handleIconClick2('CYP2C19')">
              <strong style="font-family:Times new roman,Times roman;">CYP2C19</strong>
            </a>
          </span>
          <span>
            <a @click="handleIconClick2('氨氯地平')">
              <strong>氨氯地平</strong>
            </a>
          </span>
          <span>
            <a @click="handleIconClick2('氟西汀')">
              <strong>氟西汀</strong>
            </a>
          </span>
          <span>
            <a @click="handleIconClick2('氯沙坦')">
              <strong>氯沙坦</strong>
            </a>
          </span>
        </p>
      </div>
      <div class="clearfix"></div>
      <!-- 热门 -->
    </div>
    <div class="activity-panel">
      <!-- 中间八大类 1-->
      <ul class="box">
        <!-- 中间内容区域 start -->
        <!-- style="background-color:rgba(254, 97, 129,0.3);margin:0 auto;" -->
        <li
          class="center_content"
          @click="gene"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/home-gene.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px;" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Genes</a>
          <a
            href
            class="title"
          >基因</a>
          <!-- <a class="num">123</a> -->
          <a
            class="num"
            v-text="genenum"
          ></a>
        </li>
        <li style="width:20px;height:100px;"></li>
        <!-- style="background-color:rgba(95, 196, 109,0.5);" -->
        <li
          class="center_content"
          @click="drug"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/home-drug.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Drugs</a>
          <a
            href
            class="title"
          >药物</a>
          <!-- <a class="num">456</a> -->
          <a
            class="num"
            v-text="drugnum"
          ></a>
        </li>
        <li style="width:20px;height:100px;"></li>
        <!-- style="background-color:rgba(102, 97, 213,0.5);" -->
        <li
          class="center_content"
          @click="drugGenePair"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/drug-gene.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Drugs-Genes</a>
          <a
            href
            class="title"
          >药物-基因</a>
          <!-- <a class="num">789</a> -->
          <a
            class="num"
            v-text="drugGenePairnum"
          ></a>
        </li>
        <li style="width:20px;height:100px;"></li>
        <!-- style="background-color:rgba(1, 196, 195,0.5);" -->
        <li
          class="center_content"
          @click="authority"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/linchuangzhinan.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Clinical Guidelines</a>
          <a
            href
            class="title"
          >临床指南</a>
          <!-- <a class="num">987</a> -->
          <a
            class="num"
            v-text="authoritynum"
          ></a>
        </li>
        <!-- 中间内容区域 end-->
      </ul>
      <ul class="box">
        <!-- 中间内容区域 start -->
        <!-- style="background-color:rgba(98, 182, 229,0.5);" -->
        <li
          class="center_content"
          @click="drugLabels"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/drug-title.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Drug Labels</a>
          <a
            href
            class="title"
          >药物标签</a>
          <!-- <a class="num">654</a> -->
          <a
            class="num"
            v-text="drugLabelsnum"
          ></a>
        </li>
        <li style="width:20px;height:100px;"></li>
        <!-- style="background-color:rgba(255, 103, 101,0.5);" -->
        <li
          class="center_content"
          @click="clinicalNotes"
        >
          <!-- <li class="center_content"> -->
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/linchuangzhushi.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Clinical Annotations</a>
          <a
            href
            class="title"
          >临床注释</a>
          <!-- <a class="num">321</a> -->
          <a
            class="num"
            v-text="clinicalNotesnum"
          ></a>
        </li>
        <li style="width:20px;height:100px;"></li>
        <!-- style="background-color:rgba(125, 198, 145,0.5);" -->
        <li
          class="center_content"
          @click="clinicalTrials"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/linchuangshiyan.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Clinical Trial</a>
          <a
            href
            class="title"
          >临床试验</a>
          <!-- <a class="num">1314</a> -->
          <a
            class="num"
            v-text="clinicalTrialsnum"
          ></a>
        </li>
        <li style="width:20px;height:100px;"></li>
        <!-- style="background-color:rgba(254, 171, 28,0.5);" -->
        <li
          class="center_content"
          @click="patent"
        >
          <div style="width:60px;height:60px;float:left;margin: 20px; border-radius: 50%;  background-image: url(/static/images/newimg/home-partents.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"></div>
          <!-- style="width:50px;height:50px" -->
          <a
            style="font-family:Times new roman,Times roman;"
            href
            class="ENGtitle"
          >Patents</a>
          <a
            href
            class="title"
          >专利</a>
          <!-- <a class="num">521</a> -->
          <a
            class="num"
            v-text="patentnum"
          ></a>
        </li>
        <!-- 中间内容区域 end-->
      </ul>
      <div class="clearfix"></div>
      <!-- 中间八大类 2-->
      <!-- 底部最新任务和最新动态区域 start (OK)-->
      <div class="guide_ul">
        <div
          class="cent_left"
          style="width:60%;float:left;"
        >
          <div class="left_title">
            <p>
              <span>
                <strong style="font-size:16px;margin:0 10px;">最新任务</strong>
              </span>
              <span
                style="float:right;text-align: center;cursor:pointer;font-size:12px;"
                @click="More"
              >更多></span>
            </p>
          </div>
          <div class="left_cent">
            <ul>
              <li
                style="width:100%;"
                v-for="(item, key) in newTask"
                :key="key"
              >
                <div
                  class="right_left"
                  style="float:left; padding:2rem 1rem 0 0 ;"
                >
                  <!-- <span
                    class="iconfont icon-jiyinsuanfa"
                    style="font-size:40px;"
                  ></span>-->
                  <img
                    style="width:40px;height:40px; "
                    src="../../../static/images/newimg/taskLogo.png"
                    alt
                  />
                </div>
                <div
                  class="right_right"
                  style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
                >
                  <div
                    class="left_content"
                    style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:83%;"
                  >
                    <span style="font-size: 1rem;">
                      <strong v-text="item.name"></strong>
                    </span>
                    <p class="buildTime">
                      创建时间
                      <strong>:</strong>
                      <span
                        style="font-size: 0.5rem;padding-left:1.25rem;margin-right:1.25rem;color:#999999;"
                        v-text="item.createTime"
                      ></span>
                      <!-- </p>
                      <p class="builder">-->
                      创建者
                      <strong>:</strong>
                      <span
                        style="font-size: 0.5rem;padding-left:2rem;color:#999999;"
                        v-text="item.createrName"
                      ></span>
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    @click="More()"
                    style="padding:10px 20px"
                  >参与任务</el-button>
                </div>
              </li>
              <li
                class="static_null gg"
                style="display:none"
              >
                <a>未有新任务，请等待有缘人发布~</a>
              </li>
              <br />
            </ul>
          </div>
        </div>
        <div
          class="cent_right"
          style="width:30%;float:right;"
        >
          <div class="left_title">
            <p>
              <strong style="font-size:16px;">最新动态</strong>
            </p>
          </div>
          <div class="right_cent">
            <ul>
              <li
                v-for="(item, key) in topNewss"
                :key="key"
              >
                <a
                  @click="See(item.linkUrl)"
                  v-text="item.title"
                ></a>
              </li>
              <li
                class="static_null zuixin"
                style="display:none"
              >
                <a>暂无最新动态，请耐心等待~</a>
              </li>
            </ul>
          </div>
          <!-- <div class="right_img">
            <img src="../../../static/images/newimg/u166.png" alt="" />
          </div>-->
        </div>
      </div>
      <!-- 底部最新任务和最新动态区域 end -->
    </div>
    <div
      class="clearfix"
      style="background-color:#f8f9fd;"
    ></div>
    <YFooter></YFooter>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YHeaders from '/common/headers'
import YFooter from '/common/footer'
import { userInfo } from '/api/index.js'
import 'element-ui'
import 'jquery'
import axios from 'axios'
import { setStore, getStore } from '/utils/storage.js'
// 格式化时间函数 1
var formatDate = function(value) {
  let a = value.split('')
  return a[0]
}
// 格式化时间函数 2
export default {
  // 生命周期函数
  created() {
    this.getNum() // 八大类数量
    this.getTopNewss() // 最新动态
    // this.getname(); // 获取用户信息
  },
  data() {
    return {
      // 新版界面  开始
      // 中间八个分类 1
      genenum: '',
      drugnum: '',
      drugGenePairnum: '',
      authoritynum: '',
      drugLabelsnum: '',
      clinicalNotesnum: '',
      clinicalTrialsnum: '',
      patentnum: '',
      // 中间八个分类 2
      newTask: [],
      // 新版界面  结束
      userinput: '',
      total: '',
      columnTitle: '', // 分组大标题
      columnLinkUrl: '', // 分组大标题链接【最新事件，最新研究内容，公告】
      error: false,
      home: [],
      loading: true,
      notify: '1',
      // 最新动态5条
      topNewss: [],
      // 接收最新事件列表信息
      topNews: [],
      // 接收最新研究内容列表信息
      newContent: [],
      // 接收公告列表信息
      notice: []
    }
  },
  computed: {
    count() {
      return this.$store.state.login
    }
  },
  methods: {
    // 新版界面  开始
    // 搜索框
    handleIconClick(ev) {
      // console.log(ev)
      if (this.$route.path === '/queryAllResult') {
        this.$router.push({
          path: '/queryAllResult',
          query: {
            key: this.userinput
          }
        })
        this.$emit('sousuo', this.userinput)
      } else {
        this.$router.push({
          path: '/queryAllResult',
          query: {
            key: this.userinput
          }
        })
        this.$emit('sousuo', this.userinput)
      }
    },
    handleIconClick2(ev) {
      // console.log(ev)
      if (this.$route.path === '/queryAllResult') {
        this.$router.push({
          path: '/queryAllResult',
          query: {
            key: ev
          }
        })
        this.$emit('sousuo', this.userinput)
      } else {
        this.$router.push({
          path: '/queryAllResult',
          query: {
            key: ev
          }
        })
        this.$emit('sousuo', this.userinput)
      }
    },
    // 首页八大模块数据数量(改造未完成，缺少最新任务)
    getNum() {
      var url1 = '/apis/taskApi/countAllNum'
      axios({
        method: 'get',
        url: url1
      }).then(res => {
        // console.log(res)
        // console.log(res.data)
        let a = JSON.parse(res.data)
        console.log(a)
        for (let i in a) {
          // console.log(i)
          if (i === 'patent') {
            this.patentnum = a[i]
          } else if (i === 'drugsGenes') {
            this.drugGenePairnum = a[i]
          } else if (i === 'drugs') {
            this.drugnum = a[i]
          } else if (i === 'genes') {
            this.genenum = a[i]
          } else if (i === 'clinicalGuidelines') {
            this.authoritynum = a[i]
          } else if (i === 'drugLabels') {
            this.drugLabelsnum = a[i]
          } else if (i === 'clinicalAnnotation') {
            this.clinicalNotesnum = a[i]
          } else if (i === 'clinicalTrial') {
            this.clinicalTrialsnum = a[i]
          }
        }
        if (a.taskInfoes !== []) {
          this.newTask = JSON.parse(a.taskInfoes)
        } else {
          let gg = '.gg'
          this.showdiv(gg)
        }
      })
    },
    // 获取用户信息
    getname() {
      userInfo().then(res => {
        if (
          res !== [] ||
          res !== {} ||
          res !== null ||
          res !== '' ||
          res !== undefined
        ) {
          let menuCode = new Set()
          if (
            res.data.user !== '' &&
            res.data.user !== null &&
            res.data.user !== undefined
          ) {
            let user = res.data.user
            this.userName = user.username
            this.loginShow = true
            let role = user.roleVo
            if (role !== null) {
              role.permissionVoList.map(item =>
                item.menuList.map(it => menuCode.add(it.code))
              )
            }
            user.roleVo = menuCode
            setStore('userInfo', user)
          } else {
            this.$message({
              message: '用户信息未获取到',
              type: 'error'
            })
          }
        }
      })
    },
    // 最新动态
    getTopNewss() {
      var url = '/apis/cms/api/getColumnNewList?num=7'
      // var url = '../../../static/data/home_topNews.json'
      axios.defaults.withCredentials = true
      // axios.defaults.headers.common['Authentication-Token'] =
      //   window.localStorage.token
      axios({
        method: 'get',
        url: url,
        withCredentials: true
      }).then(res => {
        // 把获得好的最新事件 赋予topNews 给成员
        if (res.data !== []) {
          this.topNewss = res.data
          if (this.topNewss.length > 0) {
            this.columnLinkUrl = res.data[0].columnLinkUrl
            let url = this.columnLinkUrl.split('/html/')
            let u = url[1].split('/')
            let a = u[0]
            if (a === '') {
              a = u[1]
            }
            this.columnLinkUrl = url[0] + '/' + a + '/index.html'
          }
        } else {
          let zuixin = '.zuixin'
          this.showdiv(zuixin)
        }
      })
    },
    // 领取任务,更多
    More() {
      let userInfo = getStore('userInfo')
      if (
        userInfo !== undefined &&
        userInfo !== null &&
        userInfo !== '' &&
        userInfo !== [] &&
        userInfo !== {}
      ) {
        let routeData = this.$router.resolve({ path: '/taskhall' })
        window.open(routeData.href, '_blank')
      } else {
        this.$confirm('您未登录, 是否登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href =
            'http://47.105.75.254:9100/cas?service=http://47.105.75.254:8080/jump'
        })
        // .catch(() => {
        //   window.location.href = this.$route.query.href;
        // });
      }
    },
    // cms页面跳转
    See(e) {
      // console.log(e)
      window.open(e, '_blank')
    },
    // 当公告、最新事件、最新研究内容没有数据时显示提示
    showdiv(e) {
      if ($(e).css('display') === 'none') {
        // 如果show是隐藏的
        $(e).css('display', 'block') // show的display属性设置为block（显示）
      } else {
        // 如果show是显示的
        $(e).css('display', 'none') // show的display属性设置为none（隐藏）
      }
    },
    querySearchAsync(queryString, cb) {
      if (this.userinput === undefined) {
        cb([])
        return
      }
      this.userinput = this.userinput.trim()
      if (this.userinput === '') {
        cb([])
        return
      } else {
        this.loadAll()
        setTimeout(() => {
          cb(this.searchResults)
        }, 300)
      }
    },
    handleSelect(item) {
      this.userinput = item.value
    },
    // 基因
    gene() {
      let routeData = this.$router.resolve({ path: '/gene' })
      window.open(routeData.href, '_blank')
    },
    // 药物
    drug() {
      let routeData = this.$router.resolve({ path: '/drug' })
      window.open(routeData.href, '_blank')
    },
    // 药物基因对
    drugGenePair() {
      let routeData = this.$router.resolve({ path: '/drugGenePair' })
      window.open(routeData.href, '_blank')
    },
    // 权威指南
    authority() {
      let routeData = this.$router.resolve({ path: '/authority' })
      window.open(routeData.href, '_blank')
    },
    // 药物标签
    drugLabels() {
      let routeData = this.$router.resolve({ path: '/drugLabels' })
      window.open(routeData.href, '_blank')
    },
    // 临床注释
    clinicalNotes() {
      let routeData = this.$router.resolve({ path: '/clinicalNotes' })
      window.open(routeData.href, '_blank')
    },
    // 临床实验
    clinicalTrials() {
      let routeData = this.$router.resolve({ path: '/clinicalTrials' })
      window.open(routeData.href, '_blank')
    },
    // 专利
    patent() {
      let routeData = this.$router.resolve({ path: '/patent' })
      window.open(routeData.href, '_blank')
    }
    // 新版界面  结束
  },
  mounted() {
    // 背景添加函数
    // function bgc(color, tagName) {
    //   $(tagName).each(function(i, e) {
    //     $(e).css('background-color', color[i])
    //   })
    // }
    // 业务划分区域
    // bgc(['#35be9b', '#8bc255', '#56bde3', '#f78228'], '.guide_ul li')
    // 中间内容区域
    // bgc(
    //   [
    //     '#fe6181',
    //     '#5fc46d',
    //     '#6661d5',
    //     '#01c4c3',
    //     '#62b6e5',
    //     '#ff6765',
    //     '#7dc691',
    //     '#feab1c'
    //   ],
    //   ' .slide_center ul li'
    // )
    // 业务划分区域页面跳转 1
    // $('.guide_ul li').click(function() {
    //   $('a', this)[0].click()
    // })
  },
  components: {
    YHeaders,
    YFooter,
    YShelf
  },
  filters: {
    formatDate: formatDate // 最新事件的时间处理函数
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.left_cent .static_null,
.right_cent .zuixin {
  width: 100%;
  height: 270px;
  border: 1px solid #eee;
  border-radius: 20px;
  text-align: center;
}
.left_cent .static_null a {
  height: 270px;
  line-height: 270px;
  font-size: 25px;
  color: #000;
}
.right_cent .zuixin a {
  height: 270px;
  line-height: 270px;
  font-size: 20px;
  color: #000;
}
.buildTime {
  margin: 10px 0;
  color: #999999;
}
.msgInf {
  margin-bottom: 3.9375rem;
}
.main {
  background-color: #fff !important;
}
.right_cent ul {
  padding-left: 25px;
}
.right_cent ul li {
  height: 40px;
  list-style: disc;
  font-size: 15px;
  cursor: pointer;
}
.right_cent ul li a {
  color: #000;
}
.left_title {
  padding: 10px;
  padding-top: 30px;
  margin-bottom: 20px;
}
.right_img {
  float: right;
  margin: 3rem 1.25rem 0 0;
}
.right_title .search_title li {
  float: left;
  background-color: #eee;
  margin-left: 5px;
}
.right_title .search_title li:hover {
  background-color: #ddd;
}
.right_title {
  padding-left: 1.4rem;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

.right_right img {
  width: 3.125rem;
  height: 3.8125rem;
}
.hotMsg {
  // display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 1.25rem;
  // margin: 0 0 0 27.5rem;
}

.hotMsg strong,
.hotMsg span {
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
  line-height: 0;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.el-textarea .el-textarea__inner {
  // 然后找到对应的类名，在这里将拉伸去掉即可
  resize: none;
}
// 自己加的
#box {
  display: flex;
}
.left {
  width: 326px;
}
.right {
  width: 286px;
}
#center {
  background: pink;
  /*flex:1*/
  /*等价于*/
  flex-grow: 1;
  text-align: center;
}
.left_content {
  border-top: 0;
  // padding-top: 10px;
  box-sizing: border-box;
  // background-color: #fff;
}

.center_content {
  width: 100%;
  // height: 12.5rem;
  // text-align: center;
  cursor: pointer;
}

ul.box .center_content img {
  width: 50px;
  height: 50px;
  float: left;
  margin: 20px;
  // padding-left: 1.25rem;
  box-sizing: content-box;
  padding: 5px;
  background-color: #e8f0f5;
  border-radius: 50%;
}
.center_content a.ENGtitle {
  display: block;
  font-size: 18px;
  color: #9ca1ba;
  margin-top: 10px;
  // margin-left: 20px;
  // float: left;
  width: 100%;
}
.center_content a.title {
  display: block;
  font-size: 17px;
  color: #000;
  font-weight: 700;
  margin-bottom: 6px;
  // margin-left: 20px;
  // float: left;
}
.center_content .num {
  font-size: 20px;
  color: #1d7fb5;
  width: 50px;
  height: 40px;
  // float: left;
  // margin-left: 20px;
}
.el-form--label-top .el-form-item__label {
  font-size: 16px !important;
  padding-left: 10px;
}
.el-form-item {
  margin: 10px 0 10px 0;
}
/* 底部业务划分区域 */

.guide_ul {
  width: 90%;
  // height: 400px;
  margin: 40px auto 0;
}

/* 底部轮播图 */
* {
  margin: 0px;
  padding: 0px;
}
#box {
  width: 1200px;
  height: 65px;
  overflow: hidden;
  position: relative;
  background: #f2f2f2;
}
#box ul {
  position: absolute;
  left: 0px;
  right: 0px;
}
#box ul li {
  float: left;
  list-style: none;
  width: 118px;
  height: 58px;
  padding: 10px 0;
  box-sizing: border-box;
}

// .right_bottom {
//   // padding: 10px !important;
// }

.home {
  display: flex;
  flex-direction: column;
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page {
  position: absolute;
  width: 100%;
  top: 470px;
  z-index: 30;
  .dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .dot-active {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: whitesmoke;
      border-radius: 8px;
      margin-right: 10px;
      cursor: pointer;
    }
    .dot {
      opacity: 0.2;
    }
  }
}

.activity-panel {
  width: 1220px;
  margin: 0 auto;
  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    // margin-top: 40px;
    box-sizing: border-box;
    // border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    // background: #ededed;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
  .content {
    float: left;
    position: relative;
    box-sizing: border-box;
    width: 25%;
    height: 200px;
    text-align: center;
  }
  .content ::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border-left: 1px solid #f2f2f2;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    content: '';
    pointer-events: none;
  }
  .i {
    width: 305px;
    height: 200px;
  }
  .cover-link {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
      repeat;
  }
  a {
    color: #5079d9;
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-decoration: none;
  }
  a:hover {
    // box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
    transition: all 0.15s ease;
  }
}

.banner,
.banner span,
.banner div {
  font-family: 'Microsoft YaHei';
  transition: all 0.3s;
  transition-timing-function: linear;
}

.banner {
  cursor: pointer;
  perspective: 3000px;
  position: relative;
  z-index: 19;
  margin: 0 auto;
  width: 1220px;
}

.bg {
  position: relative;
  width: 1220px;
  height: 500px;
  margin: 20px auto;
  background-size: 100% 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  & div {
    position: relative;
    height: 100%;
    width: 100%;
  }
}

.img1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.img2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background-size: 95% 100%;
  border-radius: 10px;
}

.img3 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.a {
  z-index: 20;
  transform: translateZ(40px);
}

.b {
  z-index: 20;
  transform: translateZ(30px);
}

.c {
  transform: translateZ(0px);
}

.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}

.box {
  margin-top: 40px;
  overflow: hidden;
  position: relative;
  z-index: 0;
  // margin-top: 29px;
  box-sizing: border-box;
  // border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

ul.box {
  display: flex;
  li {
    // flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}

.mt30 {
  margin-top: 30px;
}

.hot {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}

.floors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 50%;
      height: 430px;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
        repeat;
    }
    .cover-link:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
      transition: all 0.15s ease;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss">
.left_cent .el-button--primary {
  background-color: #0cb5b0;
  border: #0cb5b0;
}
.nav-listss > .el-input > input {
  height: 2.5rem !important;
  line-height: 2.5rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.298039215686275);
  font-size: 18px;
  padding-right: 2.5rem;
}
.nav-listss > .top_input > .el-input__suffix {
  right: 0px !important;
  background-color: #0cb6b0;
  width: 2.5rem;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
