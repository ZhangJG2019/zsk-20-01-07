<template>
  <div class="detail-content">
    <div class="clearfix breadcrumb-nav">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>临床注释</el-breadcrumb-item>
          <el-breadcrumb-item>临床注释(位点)</el-breadcrumb-item>
          <el-breadcrumb-item>内容详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="border-top:1px solid #eee;">
      <div class="w clearfix d-flex">
        <div
          class="left-box"
          v-if="this.tabs.length>1"
        >
          <b style="font-size:16px; color:#333;">题目</b>
          <ul class="tips-list">
            <li
              v-for="(item, index) in tabs"
              class="list-box"
              :class="{'cur':item.genePorId==tabsCur&&item.taskId==taskId}"
              @click="tabsliClick(item,index)"
              :key="'tabs'+index"
              :title="item.projectName"
            >
              <i class="icon-right">{{index+1}}、</i>
              <p
                class="ellipsis"
                style="font-size:15px;"
              >{{item.projectName}}-{{item.genePorName}}</p>
            </li>
          </ul>
        </div>
        <div class="right-content-box">
          <p class="detail-tab">
            <el-button class="tabcur">注释查看</el-button>
          </p>
          <div class="china-box">
            <div class="detail-box-top">
              <h3 class="page-title-name">{{dataObj.projectName}}</h3>
            </div>
            <div class="detail-box-top">
              <ul class="clearfix">
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:110px; font-weight:600">项目英文名称:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.projectEnglishName}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:95px; font-weight:600">证据等级:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;">{{dataObj.evidenceLevel}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:110px; font-weight:600">项目编码:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.code}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:95px; font-weight:600">药物:</span>
                  <span style="float:left; width:300px;"> {{dataObj.drugName}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:110px; font-weight:600">用药类型:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.medicationType}}</span>
                </li>

                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:95px; font-weight:600">基因:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.geneName}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:110px; font-weight:600">种族:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.race}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:95px; font-weight:600">单倍型:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.haploidType}}</span>
                </li>
                <!-- <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">种族详情:</label>
                  {{dataObj.raceDetails}}
                </li> -->
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:110px; font-weight:600">种族详情:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;">{{dataObj.raceDetails}}</span>
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <span style="float:left; width:95px; font-weight:600">位点:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;">{{dataObj.genePorName}}</span>
                </li>
                <li style="width:50%; line-height:35px;  color:#333;">
                  <span style="float:left; width:110px; font-weight:600">表型:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;">{{dataObj.phenotypes}}</span>
                </li>
                <!-- <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">表型:</label>
                  {{dataObj.phenotypes}}
                </li> -->
                <li style="width:50%; line-height:35px; float:right; color:#333;">
                  <span style="float:left; width:95px; font-weight:600">位点RSID:</span>
                  <span style="float:left; width:300px;font-family:Times new roman,Times roman;"> {{dataObj.rsId}}</span>
                </li>
              </ul>
            </div>
            <div class="detail-box-content notes-box">
              <div
                class="table"
                style="margin-top:20px;"
              >
                <el-table
                  border
                  style="width: 100%"
                  :data="dataObj.chResultList"
                >
                  <!-- <el-table-column prop="result" width="180" label="位点值" align="center"></el-table-column> -->
                  <el-table-column
                    prop="result"
                    width="180"
                    label="基因型"
                    align="center"
                  ></el-table-column>
                  <!-- <el-table-column prop="genotype" align="left" label="临床建议"></el-table-column> -->
                  <el-table-column
                    prop="genotype"
                    align="center"
                    label="临床注释（位点）"
                  ></el-table-column>
                </el-table>
              </div>
              <!-- <div class="table" style="margin-top:20px;">
                <el-table border style="width: 100%" :data="dataObj.enResultList">
                  <el-table-column prop="result" width="180" label="Gence" align="center"></el-table-column>
                  <el-table-column prop="genotype" label="Clinical recommendations" align="left"></el-table-column>
                </el-table>
              </div>-->
              <h4 class="section-box">证据</h4>
              <div class="table">
                <el-table
                  border
                  style="width: 100%"
                  :data="dataObj.literatureSciInfoList"
                >
                  <el-table-column
                    type="index"
                    width="50"
                    label="序号"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    width="110"
                    label="PMID"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <p style="font-family:Times new roman,Times roman;">（{{scope.row.pmid}}）</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="题目"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <p
                        style="color:#398dbc;cursor: pointer;border-bottom:none;font-family:Times new roman,Times roman;"
                        @click="toDetailPage(scope.row)"
                      >{{scope.row.name||"--"}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="130"
                    align="center"
                    label="期刊"
                  >
                    <template slot-scope="scope">
                      <p style="font-family:Times new roman,Times roman;">（{{scope.row.journal}}）</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="year"
                    width="130"
                    align="center"
                    label="年份"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { getGeneClinicalDetails } from '@/api/labels_api.js'
import { setStore, getStore } from '@/utils/storage.js'
export default {
  name: 'clinicalNotesWeidDetail',
  // 生命周期函数
  data() {
    return {
      tabsCur: '',
      taskId: '',
      tabs: [],
      dataObj: {},
      queryObj: {},
      curDefault: {}
    }
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
    this.tabsCur = this.queryObj.genePorId
    this.taskId = this.queryObj.taskId
    this.tabs = JSON.parse(getStore('clinical_notes')) || []
  },
  mounted() {
    this.curDefault = this.tabs.filter(
      res =>
        res.genePorId == this.queryObj.genePorId &&
        res.taskId == this.queryObj.taskId
    )[0]
    // console.log(this.curDefault);

    this.queryData()
  },
  methods: {
    tabsliClick(obj, index) {
      this.tabsCur = obj.genePorId
      this.taskId = obj.taskId

      this.curDefault = this.tabs.filter(
        // res => res.genePorId == obj.genePorId
        res => res.genePorId == this.tabsCur && res.taskId == this.taskId
      )[0]
      this.$nextTick(function() {
        this.queryData()
      })
    },
    queryData() {
      let param = {
        genePorId: this.tabsCur,
        taskId: this.taskId
      }
      getGeneClinicalDetails(param).then(res => {
        this.dataObj = res
        // console.log(this.dataObj);
      })
    },
    toDetailPage(obj) {
      let id = obj['id']
      let routeData = this.$router.resolve({
        path: '/c-n-detail',
        query: {
          literId: id,
          type: '2'
        }
      })
      this.setPageData()
      window.open(routeData.href, '_blank')
    },
    setPageData() {
      //
      let pageData = []
      pageData = this.dataObj.literatureSciInfoList
      setStore('clinical_nodes_detail', pageData)
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
        font-size: 15px;
        color: #333;
        padding-left: 20px;
        padding-bottom: 15px;
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
          line-height: 25px;
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
      &.notes-box {
        .section-box-word {
          .word-list {
            position: relative;
            line-height: 20px;
            padding: 15px 0 12px 48px;
            font-size: 14px;
            color: #333;
            .word-icon {
              position: absolute;
              left: 0;
              top: 19px;
              font-size: 35px;
              color: #3c8cbf;
              background: url('../../../../public/images/linchuangzhushi.png')
                no-repeat;
              background-size: contain;
              width: 30px;
              height: 30px;
            }
            .qkuang-list {
              margin-top: 8px;
              border: 1px solid #eee;
              padding: 8px;
              dd {
                float: left;
                padding: 0 10px;
                border-right: 1px solid #ededed;
                margin: 10px 0;
                color: #666;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .text-box {
      line-height: 30px;
      font-size: 14px;
      color: #333;
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
  
