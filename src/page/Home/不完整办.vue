/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page
      ref="homePage"
      style=" min-height: calc(100vh - 230px);"
    >
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="authority-icon"></i>
          <p
            class="text"
            style="display:inline-block;line-height: 80px; padding:0;   text-indent: 0.8em;"
          >临床指南(<span style="font-family:Times new roman,Times roman;"> Clinical Guidelines </span>)</p>
          <!-- <span class="text">临床指南(Clinical Guidelines)</span> -->
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
          共{{listAllNum}}条临床记录，当前显示{{(pageNum*pageSize-9)+"-"+pageSize*pageNum}}条
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
          style="text-align:center;padding-top:20px;"
        >暂无数据</p>
        <div
          class="table authority"
          v-loading="loading"
          style="min-height:150px;"
        >
          <table
            class="table-box"
            cellspacing="0"
            cellpading="0"
          >
            <thead>
              <tr>
                <th width="16%">药物中文<br>药物英文</th>
                <th width="16%">

                  <span style="font-family:Times new roman,Times roman;">CPIC</span>
                  <br>
                  <span style="font-family:Times new roman,Times roman;">n=</span>
                  {{tableData.cpicNum}}
                </th>
                <th width="16%">
                  <span style="font-family:Times new roman,Times roman;">DPWG</span>
                  <br>
                  <span style="font-family:Times new roman,Times roman;">n=</span>{{tableData.dpwgNum}}
                </th>
                <th width="16%">
                  <span style="font-family:Times new roman,Times roman;">CPNDS</span>

                  <br>
                  <span style="font-family:Times new roman,Times roman;">n=</span>{{tableData.cpndsNum}}
                </th>
                <th width="16%">
                  专家共识
                  <br>
                  <span style="font-family:Times new roman,Times roman;">n=</span>{{tableData.expertNum}}
                </th>
                <th width="16%">

                  <span style="font-family:Times new roman,Times roman;">Other</span>
                  <br>
                  <span style="font-family:Times new roman,Times roman;">n=</span>{{tableData.otherNum}}
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
                    style="currsor:pointer;"
                    @click="toSearchContent('',list.name,'drug','0',true)"
                  >{{list.name}}</p>
                  <p style="color:#999;font-family:Times new roman,Times roman;">{{list.englishName}}</p>
                </td>
                <td>
                  <p
                    style="cursor:pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'CPIC')"
                    :key="'CPIC'+index"
                    @click="toSearchContent('',item['geneName'],'gene','1',true)"
                  >
                    <el-tag
                      color="#c36"
                      class="el-tag"
                      style="font-family:Times new roman,Times roman;"
                    >
                      <i class="el-icon-document"></i>
                      {{item['geneName']}}
                    </el-tag>
                  </p>
                </td>
                <td>
                  <p
                    style="cursor:pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'DPWG')"
                    :key="'DPWG'+index"
                    @click="toSeachContent('',item['geneName'],'gene','1',true)"
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
                    style="cursor:pointer;"
                    v-for="(item,index) of returnObj(list.clinicalGuidelinesList,'CPNDS')"
                    :key="'CPNDS'+index"
                    @click="toSearchContent('',item['geneName'],'gene','1',true)"
                  >
                    <el-tag
                      color="#c33"
                      class="el-tag"
                    >
                      <i class="el-icon-document"></i>
                      {{item["geneName "]}}
                    </el-tag>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
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
      isTextInput: true,
      options: styleConfig.authority,
      filterSValue: '', // 下拉列表待选项
      pageSize: 10,
      pageNum: 1,
      listAllNum: 0,
      tableData: {},
      search: false,
      searchField: null,
      searchString: null, // 简单筛选
      searchOper: null,
      loading: false
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    getPageData() {
      this.page = 1
      this.search = true
      this.searchField = splitLabel(this.filterSValue)
        ? splitLabel(this.filterSValue)[0]
        : null
      this.searchString = this.isTextInput
        ? this.searchString
        : splitLabel(this.filterSValue)[1]
      this.searchPer = 'like'
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
          this.tableData = data || {}
          this.listAllNum = data.total
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.loading = false
        })
    },
    toSearchControl(geneId, name, type, str, num) {
      if (!num) return
      let routeData = this.$router.resolve({
        path: '/toSearchContent',
        query: {
          key: name,
          id: geneId,
          type: type,
          tabs: str
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
