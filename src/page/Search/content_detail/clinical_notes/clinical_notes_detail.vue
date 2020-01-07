<template>
  <div class="detail-content">
    <div class="clearfix breadcrumb-nav">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>临床注释</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.queryObj.type=='1'?'临床注释(基因)':'临床注释(位点)'}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.queryObj.type=='1'?'国内证据内容详情':'国外证据内容详情'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="border-top:1px solid #eee;">
      <div class="w clearfix d-flex">
        <div class="left-box">
          <!-- <div class="left-box" :class="{'noshow':this.type!==undefined}"> -->
          <b style="font-size:16px; color:#333;">题目</b>
          <ul class="tips-list">
            <li
              class="list-box"
              v-for="(item, index) in tabs"
              :class="{'cur':item.id==tabsCur}"
              @click="tabsliClick(item,index)"
              :key="'tabs'+index"
              :title="item.name||item.title"
            >
              <i class="icon-right">{{index+1}}、</i>
              <p
                class="ellipsis"
                style="color:#888;font-size:15px;padding-top:12px;"
              >{{item.name||item.title}}</p>
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
          <div
            class="china-box"
            v-if="this.queryObj.type=='1'"
          >
            <div class="detail-box-top">
              <h3 class="page-title-name">{{dataObj.title}}</h3>
              <p>作者:{{dataObj.author}}</p>
              <p>来源:{{dataObj.source}}</p>
              <p>年份:{{dataObj.year}}</p>
              <p>卷期:{{dataObj.volume}}</p>
              <p>文献类型:{{dataObj.articleTypes}}</p>
            </div>
            <div class="detail-box-content">
              <h4 class="section-box">摘要</h4>
              <p class="text-box">{{dataObj.abstracts}}</p>
              <ul>
                <li
                  v-for="(item, index) in zongjie_china "
                  :key="index"
                  class="zongjie_border"
                  style="margin-top:20px;padding:0 20px 20px;border:1px solid #e4e4e4;border-top:7px solid #aaa;"
                >
                  <h4 class="section-box">总结</h4>
                  <div class="table">
                    <!-- <table style="border:1px solid #ccc;width:100%;height:100%;border-spacing: 0;border-bottom:none;">
                      <tr>
                        <td
                          class="td_left hui"
                          style="height:40px;width:90px;text-align:center;"
                        >案例</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >类型</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >药物</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >疾病</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >基因</td>
                      </tr>
                      <tr>
                        <td
                          class="td_left"
                          style="width:90px;text-align:center;"
                          v-text="item.ofCase"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.type"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.chemicals"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.disease"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.gene"
                        ></td>
                      </tr>
                      <tr>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >等位基因</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >假定值</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >研究方法</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >种族</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >人口学特征</td>
                      </tr>
                      <tr>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.otherGenes"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.pValue"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.typeOfStudy"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.race"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.populationCharacteristics"
                        ></td>
                      </tr>
                    </table> -->
                    <table style="border:1px solid #ccc;width:100%;height:100%;border-spacing: 0;border-bottom:none;">
                      <tr>
                        <td
                          class="td_left hui"
                          style="height:40px;width:90px;text-align:center;"
                        >人口学特征</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >疾病</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >药物</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >基因</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >等位基因</td>
                      </tr>
                      <tr>
                        <td
                          class="td_left"
                          style="width:100px;text-align:center;"
                          v-text="item.populationCharacteristics"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.disease"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.chemicals"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.gene"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.otherGenes"
                        ></td>
                      </tr>
                      <tr>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >类型</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >研究方法</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >种族</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >假定值</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >案例</td>
                      </tr>
                      <tr>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.type"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.typeOfStudy"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.race"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.pValue"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.ofCase"
                        ></td>
                      </tr>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="china-box"
            v-if="this.queryObj.type=='2'"
          >
            <div class="detail-box-top">
              <h3 class="page-title-name">{{dataObj.name}}</h3>
              <p>PMID:{{dataObj.pmid}}</p>
              <p>作者:{{dataObj.author}}</p>
              <p>来源:{{dataObj.journal}}</p>
              <p>年份:{{dataObj.year}}</p>
              <p>卷期:{{dataObj.volume}}</p>
              <p>文献类型:{{dataObj.articleTypes}}</p>
              <p>文献中的其他基因:{{dataObj.otherGenes}}</p>
            </div>
            <div class="detail-box-content">
              <h4 class="section-box">摘要</h4>
              <p class="text-box">{{dataObj.abstracts}}</p>
              <ul>
                <li
                  v-for="(item, index) in zongjie "
                  :key="index"
                  class="zongjie_border"
                  style="margin-top:20px;padding:0 20px 20px;border:1px solid #e4e4e4;border-top:7px solid #aaa;"
                >
                  <h4 class="section-box">总结</h4>
                  <p class="text-box">{{item.sentence}}</p>
                  <div class="table">
                    <table style="border:1px solid #ccc;width:100%;height:100%;border-spacing: 0;border-bottom:none;">
                      <tr>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >人口学特征</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >表型</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >药物</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >基因</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >等位基因</td>
                      </tr>
                      <tr>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.populationCharacteristics"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.phenotypes"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.chemicals"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.gene"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.otherGenes"
                        ></td>
                      </tr>
                      <tr>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >类型</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >研究方法</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >种族</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >假定值</td>
                        <td
                          class="td_left hui"
                          style="height:40px;text-align:center;"
                        >案例</td>
                      </tr>
                      <tr>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.type"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.typeOfStudy"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.race"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.pValue"
                        ></td>
                        <td
                          class="td_left"
                          style="text-align:center;"
                          v-text="item.ofCase"
                        ></td>
                      </tr>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  getLiteSciVODetailInfo,
  getLiteCoreVODetailInfo
} from '@/api/labels_api.js'
import { setStore, getStore } from '@/utils/storage.js'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  name: 'clinicalNotesDetail',
  // 生命周期函数
  data() {
    return {
      tabsCur: '',
      tabs: [],
      queryObj: {},
      dataObj: {},
      curDefault: {},
      type: '',
      zongjie: [],
      zongjie_china: [],
      chemicals: '',
      gene: '',
      ofCase: '',
      pValue: '',
      phenotypes: '',
      populationCharacteristics: '',
      race: '',
      sentence: '',
      type: '',
      typeOfStudy: '',
      phenotypes: ''
    }
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
    this.tabsCur = this.queryObj.literId
    this.tabs = getStore('clinical_nodes_detail')
      ? JSON.parse(getStore('clinical_nodes_detail'))
      : []
  },
  mounted() {
    this.queryData()
  },
  methods: {
    tabsliClick(obj, index) {
      this.tabsCur = obj.id

      this.$nextTick(function() {
        this.queryData()
      })
    },
    queryData() {
      let type = this.queryObj.type
      let queryDetailData =
        type == '1' ? getLiteCoreVODetailInfo : getLiteSciVODetailInfo
      queryDetailData({ literId: this.tabsCur }).then(res => {
        this.dataObj = res
        this.zongjie = res.liteSciDetailInfoList
        this.zongjie_china = res.liteCoreDetailInfoList
        // console.log(this.zongjie);
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
.hui {
  background-color: #e4e4e4;
}
.td_right {
  padding-left: 20px;
  border-bottom: 1px solid #ccc;
}
.td_left {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 50px;
  width: 100px;
  // text-align: center;
  padding-left: 15px;
}
.noshow {
  display: none;
}
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
    // min-height: 500px;
    padding-top: 25px;
    .tips-list {
      max-height: 570px;
      overflow: auto;
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
    .tips-list::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      /**/
    }
    .tips-list::-webkit-scrollbar-track {
      background: rgb(255, 255, 255);
      // background: rgba(0, 0, 0, 0.5);
      border-radius: 2px;
    }
    .tips-list::-webkit-scrollbar-thumb {
      //鼠标滚动条默认样式
      // background: #fff;
      background: #ccc;
      border-radius: 10px;
    }
    .tips-list::-webkit-scrollbar-thumb:hover {
      //鼠标悬浮滚动条样式
      background: #ccc;
      // background: #00ff00;
    }
    .tips-list::-webkit-scrollbar-corner {
      background: #ddd;
      // background: #0000ff;
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
