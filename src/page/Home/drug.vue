/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page style=" min-height: calc(100vh - 230px);">
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="drugs-icon"></i>
          <p
            class="text"
            style="display:inline-block;line-height: 80px; padding:0;   text-indent: 0.8em;"
          >药物(<span style="font-family:Times new roman,Times roman;"> Drugs </span>)</p>
          <!-- <span class="text">药物(Drugs)</span> -->
        </h4>
        <p class="text">知识库收录的是与基因相关的药物，并提供与药物相关的药物-基因信息以及所属科室，所属药物分类。</p>
        <p class="text">更多详情请查看具体药物。</p>
      </div>
      <div slot="filter-box">
        <p class="fr">共{{listAllNum}}条药物记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条</p>
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
            :key="'drug'+index"
          >
            <span class="list-icon"></span>
            <p style="color:#999;">药物</p>
            <p
              style="font-size:18px;color:#333; line-height:30px; cursor: pointer"
              @click="toSearchContent('',item.name,'drug')"
            >
              {{item.name}}
              <em style="color:#888; padding-left:10px; font-family:Times new roman,Times roman;">({{item.englishName}})</em>
            </p>
            <label-show titleName="相关项目名称">
              <div class="clearfix">
                <p
                  class="fl label"
                  style="cursor: pointer;"
                  v-for="(list,index) of item.drugGeneNames"
                  :key="'drugGeneNames+'+index"
                  @click="toSearchContent(list.id,list.name,'project')"
                >{{list.name}}</p>
              </div>
            </label-show>
            <div class="list-text">
              <p>科室：{{item.tradeName||"--"}}</p>
              <p>ATC编码：{{item.atcCode||"--"}}</p>
              <p>药物IV类：{{item.drugType4}}</p>
              <p>药物III类：{{item.drugType3}}</p>
              <p>药物II类：{{item.drugType2}}</p>
              <p>药物I类：{{item.drugType1}}</p>
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
import { getDrugSortLable } from '@/api/labels_api.js'
import styleConfig, { splitLabel } from '@/utils/style_config.js'

export default {
  name: 'drug',
  // 生命周期函数

  data() {
    return {
      options: styleConfig.drug,
      search: false,
      searchField: null,
      searchString: null,
      searchOper: null,
      filterValue: '',
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
      getDrugSortLable(params)
        .then(res => {
          this.loading = false
          this.tableData = res.list || []
          this.listAllNum = res.total
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          this.loading = false
        })
    },
    toSearchContent(geneId, name, type) {
      let routeData = this.$router.resolve({
        path: '/searchContent',
        query: {
          key: name,
          id: geneId,
          type: type
        }
      })

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
        padding-top: 13px;
        &::after {
          content: '';
          background: url('../../public/images/drugs-icon2.png') no-repeat;
          background-size: contain;
          width: 30px;
          height: 30px;
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
      .list-text {
        padding-top: 10px;
        line-height: 26px;
        font-size: 14px;
        color: #666;
        padding-bottom: 10px;
        border-bottom: 1px solid #e9e9e9;
      }
    }
    .pagination {
      margin-top: 40px;
    }
  }
}
</style>
