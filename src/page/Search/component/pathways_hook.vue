<template>
  <div class="hook-box">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="参与通路"
        name="first"
      >
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          <p>通路注释是基于临床文献给出的关系注释，主要描述了药物与药物之间，药物与基因之间，基因与基因之间的关系。</p>
          <p>更多药物-基因通路详情信息请查看通路。</p>
        </div>
        <div class="table">
          <el-table
            border
            :data="dataList"
            style="width: 100%"
          >
            <el-table-column
              label="通路"
              align="center"
              width="160"
            >
              <template slot-scope="scope">
                <p
                  style="color:#398dbc;cursor: pointer;font-family:Times new roman,Times roman;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.pathways||"--"}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="drugs"
              label="药物"
              align="center"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.drugs}}）</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="基因"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.genes}}）</p>
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              align="center"
              label="疾病"
            >
              <template slot-scope="scope">
                <p style="font-family:Times new roman,Times roman;">（{{scope.row.diseases}}）</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  getGenePathwaysFormByProject,
  getGenePathwaysFormByDrug,
  getGenePathwaysFormByGene
} from '@/api/labels_api.js'

import { setStore, getStore } from '@/utils/storage.js'
export default {
  name: 'pathways_hook',
  data() {
    return {
      activeName: 'first',
      dataList: []
    }
  },
  props: ['queryData'],
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
    this.handleClick()
  },
  methods: {
    handleClick(tab, event) {
      let param =
        this.queryData.type === 'gene'
          ? { geneId: this.queryData.id || '', name: this.queryData.key || '' }
          : this.queryData.type === 'project'
          ? {
              projectId: this.queryData.id || this.queryData.projectId || '',
              name: this.queryData.key || ''
            }
          : {
              drugId: this.queryData.id || '',
              name: this.queryData.key || ''
            }

      let queryData =
        this.queryData.type === 'gene'
          ? getGenePathwaysFormByGene
          : this.queryData.type === 'project'
          ? getGenePathwaysFormByProject
          : getGenePathwaysFormByDrug
      queryData(param).then(res => {
        // console.log(res);

        this.dataList = res
      })
    },
    toDetailPage(obj) {
      console.log(1111)
      debugger
      let routeData = null
      if (this.activeName == 'first') {
        routeData = this.$router.resolve({
          path: '/path-ways',
          query: {
            key: obj.pathways
          }
        })
      }
      setStore('path_ways', obj.pathways)
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
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
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 14px;
      border-right: 1px solid #ccc;
      padding: 8px 0;
    }
  }
}
</style>
