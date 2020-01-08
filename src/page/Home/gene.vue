/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page style=" min-height: calc(100vh - 230px);">
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="jiyin-icon"></i>
          <p
            class="text"
            style="display:inline-block;line-height: 80px; padding:0;   text-indent: 0.8em;"
          >基因(<span style="font-family:Times new roman,Times roman;"> Genes </span>)</p>
          <!-- <span class="text">基因(Genes)</span> -->
          <!-- style="font-family:Times new roman,Times roman;" -->
        </h4>
        <p class="text">知识库收录的是与药物相关的基因，并提供与基因相关的药物-基因信息以及来自中国北京人群的基因突变频率数据。</p>
        <p class="text">更多详情请查看具体基因。</p>
      </div>
      <div slot="filter-box">
        <p class="fr">共{{listAllNum}}条基因记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条</p>
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
            placeholder="请输入内容"
            v-model="searchString"
            class="input-with-select"
          >
            <el-button
              slot="append"
              @click="getPageData()"
            >筛选</el-button>
          </el-input>
        </div>
      </div>
      <div class="content-box">
        <p
          v-if="!tableData.length&&!loading"
          style="text-align:center; padding-top:20px;"
        >暂无数据</p>
        <ul
          v-loading="loading"
          style="min-height:150px;"
        >
          <li
            class="content-list"
            v-for="(item,index) of tableData"
            :key="'gene+'+index"
          >
            <span class="list-icon"></span>
            <p style="color:#999;">基因</p>
            <p
              style="font-family:Times new roman,Times roman;font-size:18px;color:#333; line-height:30px; cursor: pointer"
              @click="toSearchContent(item.id,item.name,'gene')"
            >{{item.name}}</p>
            <label-show titleName="相关项目名称">
              <div class="clearfix">
                <p
                  style="cursor: pointer;"
                  class="fl label"
                  v-for="(list,index) of item.drugGeneNames"
                  :key="'drugGeneNames+'+index"
                  @click="toSearchContent(list.id,list.name,'project')"
                >{{list.name}}</p>
              </div>
            </label-show>
            <div class="table">
              <el-table
                :data="item.genePorInfo"
                border
                style="width: 100%;"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
              >
                <el-table-column
                  style="font-family:Times new roman,Times roman;"
                  prop="genePor"
                  label="位点"
                  align="center"
                  width="240"
                ></el-table-column>
                <el-table-column
                  prop="rsId"
                  label="位点RSID"
                  align="center"
                  width="180"
                ></el-table-column>
                <el-table-column
                  align="center"
                  label="频率"
                >
                  <template slot-scope="scope">
                    <p>{{scope.row.frequency&&scope.row.frequency.join("|")||"--"}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                  width="180"
                  align="center"
                  label="来源"
                >
                  <template slot-scope="scope">
                    <p>{{scope.row.source||"--"}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </li>
        </ul>
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
import LabelShow from '@/components/label-show.vue'
import { getGeneSortLable } from '@/api/labels_api.js'
import styleConfig, { splitLabel } from '@/utils/style_config.js'
export default {
  name: 'gene',
  // 生命周期函数

  data() {
    return {
      options: styleConfig.gene,
      search: false,
      searchField: null,
      searchString: null,
      searchOper: null,
      filterSValue: '',
      pageSize: 10,
      pageNum: 1,
      listAllNum: 0,
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getListDatas()
  },
  mounted() {},
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'font-family:Times new roman,Times roman;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'font-family:SimSun;'
      }
    },
    pageChange(v) {
      if (v === this.pageNum) return
      this.pageNum = v
      this.getListDatas()
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    getPageData() {
      this.pageNum = 1
      this.search = true
      this.searchField = splitLabel(this.filterSValue)
        ? splitLabel(this.filterSValue)[0]
        : null
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
      getGeneSortLable(params)
        .then(res => {
          this.loading = false
          this.tableData = res.list || []
          this.listAllNum = res.total
          // console.log(this.tableData);
          // console.log(this.tableData[0].geneID);
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.loading = false
        })
    },
    toSearchContent(geneID, name, type) {
      let routeData = this.$router.resolve({
        path: '/searchContent',
        query: {
          key: name,
          id: geneID,
          type: type
        }
      })
      // console.log(geneID);
      // console.log(name);
      // console.log(type);
      window.open(routeData.href, '_blank')
    }
  },
  components: {
    LabelPage,
    LabelShow,
    YHeader,
    YFooter
  }
}
</script>
<style  lang="scss" >
.table {
  .el-table {
    border: 1px solid #ccc;
  }
  .el-table th {
    background: #ebf3f8;
    border: none;
    padding: 4px 0;
    font-weight: normal;
    color: #333;
  }
  .el-table td {
    border-bottom: none;
    color: #333;
    font-size: 14px;
    border-right: 1px solid #ccc;
  }
}
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
    .content-list {
      position: relative;
      padding-left: 80px;
      margin-top: 20px;
      min-height: 50px;
      .list-icon {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0;
        left: 0;
        border: 1px solid #eee;
        border-radius: 15px;
        text-align: center;
        padding-top: 5px;
        &::after {
          content: '';
          background: url('../../public/images/jiyin-icon2.png') no-repeat;
          background-size: contain;
          width: 24px;
          height: 50px;
          display: inline-block;
        }
      }
      .table {
        margin-top: 20px;
        .el-table th {
          background: #ebf3f8;
          border: none;
        }
      }
    }
    .pagination {
      margin-top: 40px;
    }
  }
}
</style>
