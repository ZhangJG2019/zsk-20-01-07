<template>
  <div class="hook-box">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="中国药物标签"
        name="first"
      >
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          中国药物标签是由中国食品和药物管理局（CFDA）批准的有关药物基因组学信息的标签。
          中国药物标签注释提供了药物，基因注释的摘要以及可下载的药物标签PDF文件。
        </div>
        <div class="table">
          <el-table
            border
            style="width: 100%"
            :data="china_CFDA_hook"
          >
            <el-table-column
              prop="drugName"
              width="150"
              label="药物"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.englishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              label="基因"
              align="center"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.geneName}}）</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="literName"
              align="center"
              label="题目"
            >
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list) of scope.row.drugLabelList"
                  :key="list.liteId"
                  @click="toDetailPage(list)"
                >{{list.liteName}}</p>
              </template>-->
              <template slot-scope="scope">
                <p
                  style="color:#398dbc;cursor: pointer;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.literName}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="source"
              width="100"
              label="来源"
              align="center"
            >
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.drugLabelList"
                  :key="'gene'+index"
                >{{list.source}}</p>
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="全球药物标签"
        name="second"
      >
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          全球标签注释是由美国食品和药物管理局（FDA），欧洲药品管理局（EMA），瑞士医疗产品管理局（Swiss），日本医药品与医疗器械局（PMDA）和加拿大卫生部（HCSC），CFDA批准的有关药物基因组学信息的标签。
          药物标签注释提供了药物，基因注释的摘要以及可下载的药物标签PDF文件，并使用“ PGx Level”标签解释每个标签中暗含的循证等级。
          更多全球药物标签详情请查看题目。
        </div>
        <div class="table">
          <el-table
            border
            style="width: 100%"
            :data="foreign_drug_hook"
          >
            <el-table-column
              prop="drugName"
              width="150"
              label="药物"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.englishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="geneName"
              width="120"
              label="基因"
              align="center"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.geneName}}）</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="pgxLevel"
              width="150"
              label="循证等级"
              align="center"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.geneName}}）</p>
              </template>
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.drugLabelList"
                  :key="'gene'+index"
                >{{list.pgxLevel}}</p>
              </template>-->
            </el-table-column>
            <el-table-column
              prop="literName"
              align="center"
              label="题目"
            >
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list) of scope.row.drugLabelList"
                  :key="list.liteId"
                  @click="toDetailPage(list)"
                >{{list.liteName}}</p>
              </template>-->
              <template slot-scope="scope">
                <p
                  style="color:#398dbc;cursor: pointer;font-family:Times new roman,Times roman;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.literName}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="source"
              width="100"
              label="来源"
              align="center"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.source}}）</p>
              </template>
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.drugLabelList"
                  :key="'gene'+index"
                >{{list.source}}</p>
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { setStore, getStore } from '@/utils/storage.js'
import {
  getDrugLabelsByDrugGene,
  getDrugLabelsByDrug,
  getDrugLabelsByGene
} from '@/api/labels_api.js'
export default {
  name: 'drug_labels_hook',
  data() {
    return {
      activeName: 'first',
      china_CFDA_hook: [],
      foreign_drug_hook: []
    }
  },
  props: ['queryData'],
  created() {
    this.handleClick()
  },
  methods: {
    handleClick(tab, event) {
      let param = {
        id: this.queryData.id || '',
        name: this.queryData.key || ''
      }
      let queryData =
        this.queryData.type === 'gene'
          ? getDrugLabelsByGene
          : this.queryData.type === 'project'
          ? getDrugLabelsByDrugGene
          : getDrugLabelsByDrug
      queryData(param)
        .then(res => {
          // console.log(res);
          this.loading = false
          this.china_CFDA_hook = res.chDrugLabelDetailsList
          this.foreign_drug_hook = res.enDrugLabelDetailsList
        })
        .catch(err => {
          this.loading = false
        })
    },
    toDetailPage(obj) {
      // console.log(1212);
      // console.log(obj);
      debugger
      if (!obj || !obj.literId) return
      let id = obj.literId
      let routeData
      if (this.activeName === 'first') {
        routeData = this.$router.resolve({
          path: '/d-l-c-detail',
          query: {
            literId: obj.literId,
            type: this.activeName == 'first' ? '1' : '2'
          }
        })
      } else {
        routeData = this.$router.resolve({
          path: '/d-l-f-detail',
          query: {
            literId: obj.literId,
            type: this.activeName == 'first' ? '1' : '2'
          }
        })
      }

      this.setPageData()
      window.open(routeData.href, '_blank')
    },
    setPageData() {
      let pageData = []
      if (this.activeName == 'first') {
        this.china_CFDA_hook.forEach(res => {
          if (res !== null) {
            let literatures = {
              literId: res.literId,
              literName: res.literName,
              drugName: res.drugName,
              geneName: res.geneName
            }
            pageData.push(literatures)
          }
        })
      } else {
        this.foreign_drug_hook.forEach(res => {
          if (res !== null) {
            let literatures = {
              literId: res.literId,
              literName: res.literName,
              drugName: res.drugName,
              geneName: res.geneName
            }
            pageData.push(literatures)
          }
        })
      }
      setStore('drug_labels', pageData)
    }
  }
}
</script>
<style lang="scss" scoped>
.tips-list,
.left-box {
  width: 290px;
}
.text-box {
  line-height: 30px;
  color: #888;
  margin-top: 15px;
  font-size: 13px;
}
.td-li-text {
  height: 35px;
  line-height: 35px;
  // border-bottom: 1px solid #eee;
  &.href-text {
    color: #398dbc;
    padding: 0 10px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.hook-box {
  .el-tabs__nav-scroll {
    height: 45px;
    .el-tabs__nav {
      height: 45px;
      .el-tabs__active-bar {
        background: #398dbc;
      }
      .el-tabs__item {
        font-size: 24px;
        color: #888;
        &.is-active {
          color: #398dbc;
        }
      }
    }
  }
  .table {
    margin-top: 25px;
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
      padding: 8px 0;
    }
  }
}
.table {
  margin-top: 25px;
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
    padding: 8px 0;
    .td-li-text:last-child {
      border-bottom: none;
    }
  }
}
</style>
