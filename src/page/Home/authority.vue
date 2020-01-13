/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page
      ref="homePage"
      style="min-height: calc(100vh - 230px);"
    >
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="authority-icon"></i>
          <span class="text">临床指南(Clinical Guidelines)</span>
        </h4>
        <p class="text">
          临床指南是由临床药物遗传学实施联盟、（CPIC），荷兰皇家药剂师协会成立的药物遗传学工作组（DPWG），加拿大药物基因组学药品安全网（CPNDS），其他专业协会，中国专家共识基于PGx药物剂量发布的指南推荐，简要介绍了基于基因型的临床建议，并提供可下载的指南PDF文件。
        </p>
        <p class="text">
          我们欢迎已发布的有关PGx剂量准则的任何信息-请与我们联系。
        </p>
      </div>
      <div slot="filter-box">
        <p class="fr">
          共{{listAllNum}}条临床记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}
        </p>
        <div class="fl">
          <el-select
            v-model="filterSValue"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-if="isTextInput"
            placeholder="请输入内容"
            v-model="searchString"
            class="input-with-select"
          >
            <el-button
              slot="append"
              @click="getPageData()"
            >筛选</el-button>
          </el-input>
          <el-button
            class="filter-button"
            @click="getPageData()"
            v-if="!isTextInput"
          >筛选</el-button>
        </div>
      </div>
      <div class="content-box">
        <p
          v-if="!tableData&&!loading"
          style="text-align:center; padding-top:20px;"
        >暂无数据</p>
        <div
          class="table authority"
          v-loading="loading"
          style="min-height:150px;"
        >
          <table
            class="table-box"
            cellspacing="0"
            cellpadding="0"
          >
            <thead>
              <tr>
                <th width="16%">
                  药物中文
                  <br />药物英文
                </th>
                <th width="16%">
                  CPIC
                  <br />
                  n={{tableData.cpicNum}}
                </th>
                <th width="16%">
                  DPWG
                  <br />
                  n={{tableData.dpwgNum}}
                </th>
                <th width="16%">
                  CPNDS
                  <br />
                  n={{tableData.cpndsNum}}
                </th>
                <th width="16%">
                  专家共识
                  <br />
                  n={{tableData.expertNum}}
                </th>
                <th width="16%">
                  Other
                  <br />
                  n={{tableData.otherNum}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(list,index) of tableData.clinicalGuidelinesDetailInfo"
                :key="'authority'+index"
              >
                <td>
                  <p
                    style="cursor: pointer;"
                    @click="toSearchContent(item.liteId,list.name,'drug','0',true)"
                  >{{list.name}}</p>
                  <p style="color:#999;">{{list.englishName}}</p>
                </td>
                <td>
                  <p
                    style="cursor: pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'CPIC')"
                    :key="'CPIC'+index"
                    @click="toSearchContent(item.liteId,item['geneName'],'gene','2',true)"
                  >
                    <el-tag
                      color="#c36"
                      class="el-tag"
                    >
                      <i class="el-icon-document"></i>
                      {{item["geneName"]}}
                    </el-tag>
                  </p>
                </td>
                <td>
                  <p
                    style="cursor: pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'DPWG')"
                    :key="'DPWG'+index"
                    @click="toSearchContent(item.liteId,item['geneName'],'gene','2',true)"
                  >
                    <el-tag
                      color="#c33"
                      class="el-tag"
                    >
                      <i class="el-icon-document"></i>
                      {{item["geneName"]}}
                    </el-tag>
                  </p>
                </td>
                <td>
                  <p
                    style="cursor: pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'CPNDS')"
                    :key="'CPNDS'+index"
                    @click="toSearchContent(item.liteId,item['geneName'],'gene','2',true)"
                  >
                    <el-tag
                      color="#c33"
                      class="el-tag"
                    >
                      <i class="el-icon-document"></i>
                      {{item["geneName"]}}
                    </el-tag>
                  </p>
                </td>
                <td>
                  <p
                    style="cursor: pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'专家共识')"
                    :key="'zjgs'+index"
                    @click="toSearchContent(item.liteId,item['geneName'],'gene','1',true)"
                  >
                    <el-tag
                      color="#f96"
                      class="el-tag"
                    >
                      <i class="el-icon-document"></i>
                      {{item["geneName"]}}
                    </el-tag>
                  </p>
                </td>
                <td>
                  <p
                    style="cursor: pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'Other')"
                    :key="'Other'+index"
                    @click="toSearchContent(item.liteId,item['geneName'],'gene','2',true)"
                  >
                    <el-tag
                      color="#368ebe"
                      class="el-tag"
                    >
                      <i class="el-icon-document"></i>
                      {{item["geneName"]}}
                    </el-tag>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination clearfix">
          <div
            class="fl"
            style="color:#888;"
          >当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条记录,共{{listAllNum}}条记录</div>
          <div class="fr">
            <el-pagination
              background
              :page-size="pageSize"
              @current-change="pageChange"
              layout="prev, pager, next"
              :total="listAllNum"
            ></el-pagination>
          </div>
        </div>
      </div>
    </label-page>
    <y-footer></y-footer>
  </div>
</template>
<script>
import YHeader from '/common/header'
import YFooter from '/common/footer'
import LabelPage from '@/components/label-page.vue'
import { getClinicalGuidelinesSortLable } from '@/api/labels_api.js'
import styleConfig, { splitLabel } from '@/utils/style_config.js' // 写死的下拉列表option

export default {
  name: 'authority',
  // 生命周期函数
  data() {
    return {
      clientHeight: '',
      isTextInput: true,
      options: styleConfig.authority,
      search: false,
      searchField: null,
      searchString: null,
      searchOper: null,
      filterValue: '',
      filterSValue: '',
      pageSize: 10,
      pageNum: 1,
      listAllNum: 0,
      tableData: {},
      loading: false
    }
  },
  created() {
    this.getListDatas()
  },
  mounted() {
    // 获取浏览器可视区域高度
    // this.clientHeight = `${document.documentElement.clientHeight}` // document.body.clientWidth;
    // // console.log(self.clientHeight);
    // window.onresize = function temp() {
    //   this.clientHeight = `${document.documentElement.clientHeight}`
    // }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    // clientHeight: function() {
    //   this.changeFixed(this.clientHeight)
    // },
    filterSValue(val) {
      this.isTextInput = splitLabel(val)[0] !== 'source'
    }
  },
  methods: {
    getPageData() {
      this.pageNum = 1
      this.search = true
      this.searchField = splitLabel(this.filterSValue)
        ? splitLabel(this.filterSValue)[0]
        : null
      this.searchString = this.isTextInput
        ? this.searchString
        : splitLabel(this.filterSValue)[1]
      this.searchOper = 'like'
      this.getListDatas()
    },
    getListDatas() {
      var params = {
        search: this.search,
        searchField: this.searchField,
        searchString: this.searchString,
        searchOper: this.searchOper,
        rows: this.pageSize,
        page: this.pageNum
      }
      this.tableData = []
      this.loading = true
      getClinicalGuidelinesSortLable(params)
        .then(res => {
          let data = JSON.parse(res.result)
          this.loading = false
          // console.log(data);
          this.tableData = data || {}
          this.listAllNum = data.total
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.loading = false
        })
    },
    // 动态修改样式
    // changeFixed(clientHeight) {
    //   // 动态修改样式
    //   console.log(clientHeight)
    //   this.$refs.homePage.style.height = clientHeight + 'px'
    // },
    pageChange(v) {
      if (v === this.pageNum) return // 当下一页与返回数据一样时，即说明已到达最后一页
      this.pageNum = v
      this.getListDatas()
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    returnObj(arr, str) {
      if (!arr.length) return false
      return arr.filter(res => res.source === str)
    },
    toSearchContent(geneId, name, type, str, num) {
      // console.log(num);
      if (!num) return
      // let routeData = this.$router.resolve({
      //   path: '/searchContent',
      //   query: {
      //     key: name,
      //     id: geneId,
      //     type: type,
      //     tabs: str
      //   }
      // })
      let routeData = this.$router.resolve({
        path: '/clinicalGuidelinesDeatil',
        query: {
          literId: geneId,
          type: str === '1' ? '1' : '2',
          num: num
        }
      })
      window.open(routeData.href, '_blank')
    }
  },
  components: {
    LabelPage,
    YHeader,
    YFooter
  }
}
</script>
<style  lang="scss" >
.pagination {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #368ebe;
  }
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
.taskhall {
  background: #fff;
  .input-with-select {
    margin-left: 15px;
  }
  .content-box {
    min-height: 100px;
    padding-bottom: 30px;
    .authority {
      position: relative;
      margin-top: -1px;
      .table-box {
        width: 100%;
        border: 1px solid #ccc;
        text-align: center;
        tr td:last-child {
          border-right: none;
        }
        th {
          background: #ebf3f8;
          border: none;
          padding: 6px 0;
          font-weight: normal;
          font-size: 12px;
          color: #333;
        }
        td {
          padding: 10px 0;
          color: #333;
          font-size: 15px;
          border-bottom: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
      }
      .el-tag {
        font-size: 15px;
        color: #fff;
        height: 40px;
        line-height: 30px;
        padding: 5px;
        min-width: 140px;
        text-align: left;
        .el-icon-document {
          font-size: 25px;
          vertical-align: sub;
          margin-right: 10px;
        }
      }
    }
    .pagination {
      margin-top: 40px;
    }
  }
}
</style>
