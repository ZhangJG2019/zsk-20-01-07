<template>
  <div class="detail-content">
    <div class="clearfix breadcrumb-nav">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>临床注释</el-breadcrumb-item>
          <el-breadcrumb-item>临床注释(基因)</el-breadcrumb-item>
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
              :class="{'cur':item.projectId==tabsCur}"
              @click="tabsliClick(item,index)"
              :key="'tabs'+index"
              :title="item.projectName"
            >
              <i class="icon-right">{{index+1}}、</i>
              <p
                class="ellipsis"
                style="font-size:15px;"
              >{{item.projectName}}</p>
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
                  <label style="display:inline-block; width:110px; font-weight:600">项目英文名称：</label>
                  {{dataObj.projectEnglishName}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">药物：</label>
                  {{dataObj.drugName}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">项目编码：</label>
                  {{dataObj.code}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">基因：</label>
                  {{dataObj.geneName}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">用药类型：</label>
                  {{dataObj.medicationType}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">单倍型：</label>
                  {{dataObj.haploidType}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">种族：</label>
                  {{dataObj.race}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">位点：</label>
                  {{dataObj.genePorName}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">种族详情：</label>
                  {{dataObj.raceDetails}}
                </li>
                <li style="width:50%; line-height:35px; float:left; color:#333;">
                  <label style="display:inline-block; width:110px; font-weight:600">表型：</label>
                  {{dataObj.phenotypes}}
                </li>
              </ul>
            </div>
            <div class="detail-box-content notes-box">
              <ul class="section-box-word">
                <li
                  class="word-list"
                  v-for="(item,index) of dataObj.useDrugSuggestList"
                  :key="'useDrug'+index"
                >
                  <i class="word-icon"></i>
                  <p>{{dataObj.projectName}}</p>
                  <p style="color:#c7285e; margin-top:5px;">{{item.conclusion}}</p>
                  <p style=" margin-top:10px;">该基因位点-位点结果情况说明:</p>
                  <dl class="clearfix qkuang-list">
                    <dd
                      v-for="(list,index) of item.resultList"
                      :key="'result'+index"
                    >{{list}}</dd>
                  </dl>
                </li>
              </ul>
              <h4 class="section-box">证据</h4>
              <div class="table">
                <el-tabs
                  v-model="activeName2"
                  type="card"
                >
                  <el-tab-pane
                    label="国内文献"
                    name="first"
                  >
                    <el-table
                      border
                      style="width: 100%"
                      :data="dataObj.literatureCoreInfoList"
                    >
                      <el-table-column
                        type="index"
                        width="50"
                        label="序号"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        label="题目"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <p
                            style="color:#398dbc;cursor: pointer;"
                            @click="toDetailPage(scope.row)"
                          >{{scope.row.title||"--"}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="source"
                        width="180"
                        align="center"
                        label="期刊"
                      ></el-table-column>
                      <el-table-column
                        prop="year"
                        width="80"
                        align="center"
                        label="年份"
                      ></el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane
                    label="国外文献"
                    name="second"
                  >
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
                        prop="pmid"
                        width="100"
                        label="PMID"
                        align="center"
                      ></el-table-column>
                      <el-table-column
                        label="题目"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <p
                            style="border-bottom:none;color:#368ebe;text-align:left;cursor: pointer"
                            @click="toDetailPage(scope.row)"
                          >{{scope.row.name||"--"}}</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="journal"
                        width="180"
                        align="center"
                        label="期刊"
                      ></el-table-column>
                      <el-table-column
                        prop="year"
                        width="80"
                        align="center"
                        label="年份"
                      ></el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
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
import { getCombinedClinicalDetails } from '@/api/labels_api.js'
import { setStore, getStore } from '@/utils/storage.js'
export default {
  name: 'clinicalNotesGeneDetail',
  // 生命周期函数
  data() {
    return {
      tabsCur: '12',
      tabs: [],
      activeName2: 'first',
      dataObj: {},
      queryObj: {}
    }
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
    this.tabsCur = this.queryObj.projectId
    this.tabs = JSON.parse(getStore('clinical_notes')) || []
    let a = this.tabs.lenght
  },
  mounted() {
    this.queryData()
  },
  methods: {
    tabsliClick(obj, index) {
      this.tabsCur = obj.projectId
      this.$nextTick(function() {
        this.queryData()
      })
    },
    queryData() {
      //
      let param = {
        id: this.tabsCur
      }
      getCombinedClinicalDetails(param).then(res => {
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
          type: this.activeName2 == 'first' ? '1' : '2'
        }
      })

      this.setPageData()
      window.open(routeData.href, '_blank')
    },
    setPageData() {
      let pageData = []
      if (this.activeName2 == 'first') {
        this.pageData = this.dataObj.literatureCoreInfoList
      } else {
        this.pageData = this.dataObj.literatureSciInfoList
      }
      pageData = this.pageData
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
              // border: 1px solid #eee;
              border: 1px solid #aaaaaa;
              padding: 8px;
              dd {
                float: left;
                padding: 0 10px;
                // border-right: 1px solid #ededed;
                border-right: 1.5px solid #000;
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
