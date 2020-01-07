<template>
  <div class="taskhall">
    <!-- <y-header @sousuo="getNotice">
      <div slot="nav"></div>
    </y-header>-->
    <div class="top">
      <div class="top_center">
        <p>
          检索到
          <!-- <span>9999</span> -->
          <span v-text="this.count_num"></span>
          个在药物-基因、药物或基因名称中有“
          <span
            style="color:#c00d4a;font-weight:700;"
            v-text="this.search_name"
          ></span>
          ”的结果
        </p>
      </div>
    </div>
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <div class="content_title">
          <el-row>
            <!-- 左侧菜单栏 -->
            <el-col :span="6">
              <ul class="leftmenu">
                <li class="left_type" style="margin-bottom:1.25rem;">按类型筛选</li>
                <!-- <li class="left_type" style="font-size:15px;">实体类型</li> -->
                <li v-for="(item, key) in keytitle" :key="key" style="margin-bottom:0.8rem;">
                  <el-checkbox
                    name="check10"
                    class="checkboxs"
                    @change="handleCheckedTypesChange(item.code)"
                  >
                    <span :id="item.code" class="left_title" v-text="item.name"></span>
                    &nbsp;&nbsp; (
                    <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span>
                    )
                  </el-checkbox>
                </li>
              </ul>
            </el-col>
            <!-- 右侧内容区 -->
            <el-col :span="18" style="border-left:1px solid #ccc;padding-left:20px;">
              <!-- 下方具体数据展示列表 -->
              <p
                v-if="!geneList.length&&!loading"
                style="text-align:center;height: 200px;line-height: 200px;font-size: 18px;"
              >暂无数据</p>
              <ul class="gene_list" v-loading="loading">
                <li v-for="(item, key) in geneList" :key="key" style="cursor:pointer;">
                  <div
                    class="right_left"
                    style="float:left; margin:13px 20px 0 0; border:1px solid #e3f0f8;border-radius: 10px;"
                  >
                    <img
                      v-if="item.type == 'gene'"
                      src="../../../static/images/newimg/gene_logo.png"
                    />
                    <img
                      v-if="item.type == 'project'"
                      src="../../../static/images/newimg/gene_drug.png"
                    />
                    <img
                      v-if="item.type == 'drug'"
                      src="../../../static/images/newimg/drug_logo.png"
                    />
                  </div>
                  <div
                    class="right_right"
                    style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;cursor:pointer;"
                  >
                    <div
                      class="left_content"
                      style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:100%;"
                    >
                      <span class="right_title" v-text="item.typeName"></span>
                      <br />
                      <span
                        class="right_title"
                        v-text="item.name"
                        style="font-size: 1rem;color:#000;font-weight:700;"
                        @click="getContent(item.id, item.name, item.type)"
                      ></span>
                      <br />
                      <ul class="right_labels">
                        <li v-if="item.clinicalGuidelinesNum>0">
                          <span>临床指南</span> (
                          <span v-text="item.clinicalGuidelinesNum"></span> )
                        </li>
                        <li v-if="item.clinicalGuidelinesNum==0" class="num0">
                          <span>临床指南</span> (
                          <span v-text="item.clinicalGuidelinesNum"></span> )
                        </li>
                        <li v-if="item.clinicalAnnotationNum>0">
                          <span>临床注释</span> (
                          <span v-text="item.clinicalAnnotationNum"></span> )
                        </li>
                        <li v-if="item.clinicalAnnotationNum==0" class="num0">
                          <span>临床注释</span> (
                          <span v-text="item.clinicalAnnotationNum"></span> )
                        </li>
                        <li v-if="item.clinicalTrialNum>0">
                          <span>临床试验</span> (
                          <span v-text="item.clinicalTrialNum"></span> )
                        </li>
                        <li v-if="item.clinicalTrialNum==0" class="num0">
                          <span>临床试验</span> (
                          <span v-text="item.clinicalTrialNum"></span> )
                        </li>
                        <li v-if="item.drugLabelsNum>0">
                          <span>药物标签</span> (
                          <span v-text="item.drugLabelsNum"></span> )
                        </li>
                        <li v-if="item.drugLabelsNum==0" class="num0">
                          <span>药物标签</span> (
                          <span v-text="item.drugLabelsNum"></span> )
                        </li>
                        <li v-if="item.pathwayNum>0">
                          <span>通路</span> (
                          <span v-text="item.pathwayNum"></span> )
                        </li>
                        <li v-if="item.pathwayNum==0" class="num0">
                          <span>通路</span> (
                          <span v-text="item.pathwayNum"></span> )
                        </li>
                        <li v-if="item.patentNum>0">
                          <span>专利</span> (
                          <span v-text="item.patentNum"></span> )
                        </li>
                        <li v-if="item.patentNum==0" class="num0">
                          <span>专利</span> (
                          <span v-text="item.patentNum"></span> )
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li class="static_null gg" style="display:none">
                  <a>未检索到数据，请重新输入关键字~</a>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import YShelf from "/components/shelf";
import YButton from "/components/YButton";
import YHeader from "/common/header";
import YFooter from "/common/footer";
// import $ from 'jquery'
import "element-ui";
import axios from "axios";
export default {
  // 生命周期函数
  data() {
    return {
      loading: false,
      search_name: "", // 搜索关键字
      count_num: 0, // top中搜索总数
      searchKey: "", // 子组件Yheader传过来的搜索关键字
      getGene: [], // 获取列表所有具体数据存放的数组，点击复选框，发ajax重新请求所对应的新数据
      geneList: [],
      totalNum: 0, // 复选框数据（括号里面的数字）的总数
      keytitle: [],
      type: "",
      filter_input: "",
      map: new Map(),
      ids: ""
    };
  },
  created() {
    this.getNoticeTitle();
    this.getNotice();
  },
  methods: {
    // 点击标题跳转到对应
    getContent(id, name, type) {
      // 触发 绑定的 事件，并向外传递参数
      if (type === "project") {
        let routeData = this.$router.resolve({
          path: "/searchDruGenePair",
          query: {
            key: name,
            id: id,
            type: type
          }
        });
        window.open(routeData.href, "_blank");
      } else if (type === "gene") {
        let routeData = this.$router.resolve({
          path: "/searchContent",
          query: {
            key: name,
            id: id,
            type: type
          }
        });
        window.open(routeData.href, "_blank");
      } else if (type === "drug") {
        let routeData = this.$router.resolve({
          path: "/searchDrug",
          query: {
            key: name,
            id: id,
            type: type
          }
        });
        window.open(routeData.href, "_blank");
        // this.$router.push({
        //   path: '/searchDrug',
        //   query: {
        //     word: type,
        //     key: id
        //   }
        // })
      }
    },
    // 接收子组件header传过来的搜索关键字，发送ajax
    getNotice() {
      this.map.clear();
      // let searchKey = $('input[icon="search"]').val() // 获取顶部搜索框用户输入的值
      let a = window.location.href;
      let b = a.split("=");
      let searchKey = b[1];
      searchKey = decodeURI(searchKey);
      this.search_name = searchKey;
      if (typeof searchKey === "undefined" || searchKey === null) {
        searchKey = "all";
        this.search_name = " ";
      }
      var url = "apis/taskApi/queryAllResult?name=" + searchKey;
      this.loading = true;
      axios({
        method: "get",
        url: url
      })
        .then(res => {
          this.loading = false;
          // 把获得好的数据 赋予 给getGene成员
          // if (res.data !== [] && res.data === '') {
          if (res.data !== []) {
            this.getGene = JSON.parse(res.data);
            this.geneList = this.getGene;
            this.count_num = this.geneList.length;
            this.totalNum = this.geneList.length;
            for (let i = 0; i < this.geneList.length; i++) {
              this.map.set(
                this.geneList[i].type,
                this.map.get(this.geneList[i].type) == null
                  ? 1
                  : this.map.get(this.geneList[i].type) + 1
              );
            }
          } else {
            let gg = ".gg";
            this.showdiv(gg);
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    showdiv(e) {
      if ($(e).css("display") === "none") {
        // 如果show是隐藏的
        $(e).css("display", "block"); // show的display属性设置为block（显示）
      } else {
        // 如果show是显示的
        $(e).css("display", "none"); // show的display属性设置为none（隐藏）
      }
    },
    // 基因数据左侧标题获取
    getNoticeTitle() {
      // var biaoti = '标题'
      // var url = '/apis/cms/api/getColumnNewList?title=' + biaoti
      var url = "static/data/getGenetitle.json";
      axios({
        method: "get",
        url: url
      }).then(res => {
        // 把获得好的数据 赋予 给getGene成员
        this.keytitle = res.data;
      });
    },
    // 点击基因数据标题获取对应列表数据
    handleCheckedTypesChange(code) {
      this.geneList = [];
      if (this.ids.indexOf(code + ",") === -1) {
        this.ids += code + ",";
      } else {
        this.ids = this.ids.replace(code + ",", "");
      }
      if (this.ids === "") {
        this.geneList = this.getGene;
        return;
      }
      for (let i = 0; i < this.getGene.length; i++) {
        let id = this.getGene[i].type + ",";
        if (this.ids.indexOf(id) !== -1) {
          this.geneList.push(this.getGene[i]);
        }
      }
    }
  },
  components: {
    YShelf,
    YButton,
    YHeader,
    YFooter
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.num0 {
  background-color: #ededed !important;
  color: #666;
}
.gene_list .static_null {
  width: 800px;
  height: 270px;
  // background-color: red;
  border: 1px solid #eee;
  border-radius: 20px;
  text-align: center;
}
.gene_list .static_null a {
  height: 270px;
  line-height: 270px;
  font-size: 30px;
  color: #000;
}
.right_labels {
  margin-top: 10px;
  text-align: center;
  background-color: red;
  color: #5594ac;
}
.left_content .right_labels li {
  float: left;
  width: 100px;
  padding: 2px 5px;
  margin-right: 10px;
  background-color: #e3f0f8;
}
.left_content .right_labels li:hover {
  float: left;
  width: 100px;
  margin-right: 10px;
  background-color: #e3f0f8;
}
.top {
  height: 3.75rem;
  // background-image: url(/static/images/newimg/search-top.png);
  background-color: #e3eaf0;
  background-size: 100%;
  .top_center {
    color: #000;
    font-size: 16px;
    // font-weight: 700;#efefef
    line-height: 3.75rem;
    height: 3.75rem;
    width: 76.25rem;
    margin: 0 auto;
  }
}

.right_title .search_title li {
  float: left;
  background-color: #eee;
  margin-left: 5px;
}
.right_title .search_title li:hover {
  background-color: #ddd;
}
.gene_list {
  width: 50rem;
}
.gene_list li {
  width: 100%;
  height: 100%;
}

.right_title {
  // padding-left: 1.4rem;
  font-size: 0.8rem;
  line-height: 1.5;
  font-weight: 300;
}
.left_type {
  font-size: 20px;
}
.leftmenu {
  padding-top: 20px;
}
.leftmenu li {
  margin-top: 5px;
}

.leftmenu li .left_title {
  font-size: 17px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
<style lang="scss">
.taskhall .el-card__body {
  // min-height: 370px;
  padding-top: 0px !important;
}
.content_title .el-loading-spinner {
  margin-top: 70px !important;
}
</style>
