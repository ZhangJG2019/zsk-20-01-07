<template>
  <div class="detail-content">
    <div class="clearfix breadcrumb-nav">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>参与通路</el-breadcrumb-item>
          <el-breadcrumb-item>相关文献内容详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="border-top:1px solid #eee;">
      <div class="w clearfix d-flex">
        <div class="left-box">
          <b style="font-size:16px; color:#333;">题目</b>
          <ul class="tips-list">
            <li
              class="list-box"
              :class="{'cur':item.literId==tabsCur}"
              v-for="(item, index) in tabs"
              @click="tabsliClick(item,index)"
              :key="'tabs'+index"
              :title="item.name"
            >
              <i class="icon-right">{{index+1}}、</i>
              <p
                class="ellipsis"
                style="color:#888;font-size:15px;font-family:Times new roman,Times roman;"
              >{{item.gene}}-{{item.chemicals}}</p>
              <p
                class="ellipsis"
                style="font-family:Times new roman,Times roman;"
              >{{item.name}}</p>
            </li>
          </ul>
        </div>
        <div class="right-content-box">
          <p class="detail-tab">
            <el-button class="tabcur">注释查看</el-button>
            <el-button
              class="tabdefault"
              @click="topageURL"
            >原文查看</el-button>
          </p>
          <div class="china-box">
            <div class="detail-box-top">
              <h3
                class="page-title-name"
                style="font-family:Times new roman,Times roman;"
              >{{dataObj.name}}</h3>
              <p> <strong>通路:</strong> <span style="font-family:Times new roman,Times roman;">{{dataObj.pathways}}</span></p>
              <p> <strong>作者:</strong> <span style="font-family:Times new roman,Times roman;">{{dataObj.author}}</span></p>
              <p> <strong>PMID:</strong> <span style="font-family:Times new roman,Times roman;">{{dataObj.pmid}}</span></p>
              <p> <strong>期刊:</strong><span style="font-family:Times new roman,Times roman;"> {{dataObj.journal}}</span></p>
              <p> <strong>年，卷(期 ):</strong><span style="font-family:Times new roman,Times roman;">{{dataObj.volume}}</span></p>
              <p> <strong>基因:</strong> <span style="font-family:Times new roman,Times roman;">{{dataObj.gene}}</span></p>
              <p> <strong>位点:</strong> <span style="font-family:Times new roman,Times roman;">{{dataObj.name}}</span></p>
              <p> <strong>药物:</strong> <span style="font-family:Times new roman,Times roman;">{{dataObj.chemicals}}</span></p>
              <p> <strong>表型:</strong><span style="font-family:Times new roman,Times roman;"> {{dataObj.phenotypes}}</span></p>
            </div>
            <div class="detail-box-content">
              <h4 class="section-box">摘要</h4>
              <p
                class="text-box"
                style="font-family:Times new roman,Times roman;"
              >{{dataObj.abstracts}}</p>

              <h4 class="section-box">位点注释</h4>
              <div
                class="table"
                style="width:1000px; overflow:auto;font-family:Times new roman,Times roman;"
                v-html="dataObj.variantAnnotations"
              >
                <!-- <el-table border style="width: 100%">
                  <el-table-column prop="genes" label="变体" align="center"></el-table-column>
                  <el-table-column prop="genes" label="基因" align="center"></el-table-column>
                  <el-table-column prop="porName" align="center" label="化学"></el-table-column>
                  <el-table-column prop="porName" align="center" label="讨论"></el-table-column>
                  <el-table-column prop="porName" align="center" label="生物地质学"></el-table-column>
                </el-table> -->
              </div>
              <h4 class="section-box">处方信息</h4>
              <p
                class="text-box"
                style="font-family:Times new roman,Times roman;"
              >{{dataObj.prescribingInfo}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { getLitePathwayDetail } from '@/api/labels_api.js'
import { getStore } from '@/utils/storage.js'
export default {
  name: 'pathWaysDetail',
  // 生命周期函数
  data() {
    return {
      tabsCur: '1',
      tabs: [],
      queryObj: {},
      dataObj: {}
    }
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
    this.tabsCur = this.queryObj.literId
    this.tabs = JSON.parse(getStore('path_ways_detail')) || []
    // eslint-disable-next-line no-debugger
  },
  mounted() {
    this.queryData()
  },
  methods: {
    tabsliClick(obj, index) {
      if (this.tabsCur == obj.literId) return
      this.tabsCur = obj.literId
      this.$nextTick(function() {
        this.queryData()
      })
    },

    queryData() {
      getLitePathwayDetail({ literId: this.tabsCur }).then(res => {
        this.dataObj = res
      })
    },
    topageURL() {
      if (this.dataObj.fileUrl == null) {
        this.$message({
          message: '网站暂时无这篇原文可查看~',
          type: 'warning'
        })
        return
      }
      window.open(this.dataObj.fileUrl, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-content {
  background: #fff;
  .breadcrumb-nav {
    border-top: 1px solid #eee;
    padding: 15px 0 15px;
    line-height: 35px;
  }
  .d-flex {
    display: flex;
  }
  .left-box {
    width: 265px;
    position: relative;
    z-index: 2;
    border-right: 1px solid #eee;
    min-height: 500px;
    padding-top: 25px;
    .tips-list {
      padding-top: 15px;
      .list-box {
        position: relative;
        line-height: 25px;
        font-size: 13px;
        color: #333;
        padding-left: 20px;
        padding-bottom: 10px;
        cursor: pointer;
        &:hover {
          color: #3c8cbf;
        }
        .icon-right {
          position: absolute;
          left: 0;
          font-size: 14px;
          top: 0;
          color: #566;
          line-height: 50px;
        }
        &.cur {
          p {
            color: #3c8cbf !important;
          }
        }
      }
    }
    .tips-border {
      position: absolute;
      right: -1px;
      width: 2px;
      height: 40px;
      background: #3c8cbf;
      transition: top 0.3s;
    }
    .pagination {
      padding-top: 10px;
    }
  }
  .right-content-box {
    flex: 1;
    padding: 25px 0 60px 40px;
    position: relative;
    z-index: 1;
    .detail-box-top {
      padding-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      .page-title-name {
        font-size: 26px;
        color: #333;
        padding: 15px 0;
        line-height: 38px;
      }
      p {
        line-height: 30px;
        color: #333;
      }
    }
    .detail-box-content {
      .section-box {
        font-size: 16px;
        color: #444;
        padding: 20px 0 10px;
        line-height: 30px;
        font-weight: 600;
      }
      .section-box-text {
        li {
          color: #333;
          font-size: 14px;
          line-height: 30px;
          &::before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            background: #ccc;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
      }
      .section-box-word {
        .word-list {
          position: relative;
          padding-left: 45px;
          line-height: 20px;
          padding-bottom: 12px;
          .word-icon {
            position: absolute;
            left: 0;
            top: 7px;
            font-size: 35px;
            color: #3c8cbf;
          }
        }
      }
    }
    .text-box {
      line-height: 30px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
<style lang="scss">
.detail-tab {
  .tabcur {
    padding: 9px 30px;
    background: #d7e8f2;
    border-color: #d7e8f2;
    color: #3c8cbf;
  }
  .tabdefault {
    padding: 9px 30px;
    background: #fff;
    border-color: #3c8cbf;
    color: #3c8cbf;
  }
}
.table {
  margin-top: 5px;
  .el-table {
    border: 1px solid #ccc;
  }
  .el-table th {
    background: #ebf3f8;
    padding: 4px 0;
    font-weight: normal;
    color: #333;
  }
  .el-table td {
    color: #333;
    font-size: 14px;
    border-right: 1px solid #ccc;
    padding: 8px 0;
  }
}
</style>
