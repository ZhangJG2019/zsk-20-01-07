<template>
  <div class="path-ways">
    <div class="box-top-title gene-box">
      <p class="w">
        <i class="icon-box"></i>
        {{pathWays}}
      </p>
    </div>
    <div class="w clearfix d-flex">
      <div class="left-box">
        <ul class="tips-list">
          <li
            class="list-box"
            :class="{'cur':tabsCur=='0'}"
            @click="tabsliClick('0')"
          >
            <i class="el-icon-arrow-right icon-right"></i>总结
          </li>
          <li
            class="list-box"
            :class="{'cur':tabsCur=='1'}"
            @click="tabsliClick('1')"
          >
            <i class="el-icon-arrow-right icon-right"></i>通路组成部分
          </li>
          <li
            class="list-box"
            :class="{'cur':tabsCur=='2'}"
            @click="tabsliClick('2')"
          >
            <i class="el-icon-arrow-right icon-right"></i>相关通路
          </li>
          <li
            class="list-box"
            :class="{'cur':tabsCur=='3'}"
            @click="tabsliClick('3')"
          >
            <i class="el-icon-arrow-right icon-right"></i>相关文献
          </li>
        </ul>
        <span
          class="tips-border"
          :style="{top:(tabIndex*40+35)+'px'}"
        ></span>
      </div>
      <div class="right-content-box detail-box-content">
        <div v-if="tabsCur=='0'">
          <h4 class="section-box">摘要</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.summary"
          ></div>
          <h4 class="section-box">相关通路</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.relatedPathways"
          ></div>
          <h4 class="section-box">参考文献</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.publication"
          ></div>
          <!-- <ul class="section-box-word">
            <li class="word-list">
              <i class="el-icon-document word-icon"></i>
              <p>Literature</p>
              <p
                style="font-size:14px;color:#333;font-weight: 600;"
              >CYP2D6 as a treatment decision aid for ER-positive non-metastatic breast cancer patients: a systematic review with accompanying clinical practice guidelines.</p>
              <p>PMID: 30411242 (opens in new window) DOI: 10.1007/s10549-018-5027-0 (opens in new window)</p>
            </li>
            <li class="word-list">
              <i class="el-icon-document word-icon"></i>
              <p>Literature</p>
              <p
                style="font-size:14px;color:#333;font-weight: 600;"
              >CYP2D6 as a treatment decision aid for ER-positive non-metastatic breast cancer patients: a systematic review with accompanying clinical practice guidelines.</p>
              <p>PMID: 30411242 (opens in new window) DOI: 10.1007/s10549-018-5027-0 (opens in new window)</p>
            </li>
          </ul>-->
          <h4 class="section-box">描述</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.description"
          ></div>
          <h4 class="section-box">作者</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.authors"
          ></div>
          <h4 class="section-box">引文</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.citation"
          ></div>
          <h4 class="section-box">治疗类别</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.therapaeutic"
          ></div>
          <!-- <ul class="section-box-text">
            <li>Clinical Pharmacogenetics Implementation Consortium (CPIC) Guideline for CYP2D6 and Tamoxifen Therapy</li>
            <li>2018 supplement</li>
          </ul>-->
          <h4 class="section-box">日志</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zongji.history"
          ></div>
        </div>

        <div v-if="tabsCur=='1'">
          <h4 class="section-box">通路</h4>
          <div
            class="text-box"
            style="font-family:Times new roman,Times roman;"
          >{{zuchengbufen.pathways}}</div>
          <h4 class="section-box">基因</h4>
          <div
            class="text-box"
            style="font-family:Times new roman,Times roman;"
          >{{zuchengbufen.genes}}</div>
          <h4 class="section-box">药物</h4>
          <div
            class="text-box"
            style="font-family:Times new roman,Times roman;"
          >{{zuchengbufen.drugs}}</div>
          <h4 class="section-box">疾病</h4>
          <div
            class="text-box"
            style="font-family:Times new roman,Times roman;"
          >{{zuchengbufen.diseases}}</div>
          <h4 class="section-box">相互作用</h4>
          <!-- <div
            class="text-box"
            align="center"
            v-html="zuchengbufen.interactions"
          ></div> -->
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zuchengbufen.interactions"
          ></div>
          <h4 class="section-box">通路中的关系</h4>
          <div
            style="font-family:Times new roman,Times roman;"
            class="text-box"
            v-html="zuchengbufen.relationships"
          ></div>
        </div>

        <div v-if="tabsCur=='2'">
          <h4 class="section-box">相关通路</h4>
          <div
            class="flex-center flex-between"
            style="padding:10px 0;"
          >
            <div class="demo-input-suffix">
              筛选
              <el-input
                style="width:250px; margin-left:10px;"
                v-model="relatedParhwaysValue"
                placeholder="请输入内容"
                @keydown.enter.native="searchWord"
                @change="searchWord"
                @click="searchWord"
                suffix-icon="el-icon-search"
              ></el-input>
            </div>
            <p>{{relatedParhways.length?relatedParhways.length:'0'}}条相关通路</p>
          </div>
          <div class="table">
            <el-table
              border
              style="width: 100%"
              :data="relatedParhways"
            >
              <el-table-column
                label="通路"
                align="center"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.relatedPathways}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                label="药物"
                align="center"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.cf1}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="基因"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.cf2}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                width="80"
                align="center"
                label="表型"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.cf3}}）</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div v-if="tabsCur=='3'">
          <h4 class="section-box">相关文献</h4>
          <div
            class="flex-center flex-between"
            style="padding:10px 0;"
          >
            <div class="demo-input-suffix">
              筛选
              <el-input
                style="width:250px; margin-left:10px;"
                v-model="relatedParhwaysValue"
                placeholder="请输入内容"
                @keydown.enter.native="searchWord(relatedParhwaysValue)"
                @change="searchWord(relatedParhwaysValue)"
                @click="searchWord(relatedParhwaysValue)"
              ></el-input>
            </div>
            <p>{{pathways_Data.length?pathways_Data.length:'0'}}条相关文献</p>
          </div>
          <div class="table table3">
            <el-table
              stripe
              highlight-current-row
              style="width: 100%"
              :data="pathways_Data"
            >
              <el-table-column
                width="120"
                align="center"
                label="药物"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.chemicals}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                width="110"
                align="center"
                label="基因"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.gene}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="120"
                label="PMID"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.pmid}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="题目"
              >
                <template slot-scope="scope">
                  <p
                    style="color:#398dbc;cursor: pointer;border-bottom:none;font-family:Times new roman,Times roman;"
                    @click="toDetailPage(scope.row)"
                  >{{scope.row.name||"--"}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="160"
                label="期刊"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.journal}}）</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="80"
                label="年份"
              >
                <template slot-scope="scope">
                  <p style="font-family:Times new roman,Times roman;">（{{scope.row.year}}）</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  getGenePathwaysContentByPathways,
  getGenePathwaysFormByPathways,
  getRelatedParhwaysByPathways,
  getLiteratrueByPathways
} from '@/api/labels_api.js'
import 'element-ui/lib/theme-chalk/index.css'
import { setStore, getStore } from '@/utils/storage.js'

export default {
  name: 'path_ways',
  // 生命周期函数
  data() {
    return {
      pathWays: '',
      tabsCur: '0',
      queryObj: '',
      tabIndex: '0',
      zongji: {},
      zuchengbufen: {},
      relatedParhwaysValue: '',
      relatedParhways: [],
      inputValue: '',
      pathwaysData: [],
      pathways_Data: []
    }
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
  },
  mounted() {
    this.pathWays = getStore('path_ways')
    this.queryData()
    setTimeout(this.queryDataAll.bind(this), 1500)
  },
  methods: {
    // 筛选
    searchWord(relatedParhwaysValue) {
      // console.log(relatedParhwaysValue);
      // console.log(this.relatedParhwaysValue);
      let pwd = this.pathways_Data
      if (this.pathways_Data !== '') {
        pwd.filter(item => {
          if (
            item.chemicals.includes(relatedParhwaysValue) ||
            item.gene.includes(relatedParhwaysValue) ||
            item.journal.includes(relatedParhwaysValue) ||
            item.pmid.includes(relatedParhwaysValue) ||
            item.name.includes(relatedParhwaysValue) ||
            item.year.includes(relatedParhwaysValue) ||
            item.volume.includes(relatedParhwaysValue)
          ) {
            // console.log(item);
            this.pathways_Data = []
            return this.pathways_Data.push(item)
          }
        })
      }
    },
    tabsliClick(index) {
      this.tabsCur = index
      this.tabIndex = index
    },
    filterD(arr, str) {
      return arr.filter(res => res.pathways && res.pathways.indexOf(str) >= '0')
    },
    queryData() {
      getGenePathwaysContentByPathways({ pathways: this.queryObj.key }).then(
        res => {
          this.zongji = res
        }
      )
    },
    queryDataAll() {
      getGenePathwaysFormByPathways({ pathways: this.queryObj.key }).then(
        res => {
          this.zuchengbufen = res
        }
      )
      getRelatedParhwaysByPathways({ pathways: this.queryObj.key }).then(
        res => {
          if (res !== '') {
            // this.relatedParhways = [res];
            this.relatedParhways = res
          }
          //
        }
      )
      getLiteratrueByPathways({ pathways: this.queryObj.key }).then(res => {
        this.pathways_Data = res
        //
      })
    },
    toDetailPage(obj) {
      let id = obj['literId']
      let routeData = this.$router.resolve({
        path: '/p-w-detail',
        query: {
          literId: id,
          key: this.queryObj.key
        }
      })

      this.setPageData()
      window.open(routeData.href, '_blank')
    },
    setPageData() {
      let pageData = []
      pageData = this.pathways_Data
      //
      setStore('path_ways_detail', pageData)
    }
  }
  // ,
  // computed: {
  //   searchWord() {
  //     let relatedParhwaysValue = this.relatedParhwaysValue.toLowerCase();
  //     return (this.channels || []).filter(
  //       channel =>
  //         channel.channelName.toLowerCase().indexOf(relatedParhwaysValue) !== -1
  //     );
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.path-ways {
  background: #fff;
  .box-top-title {
    padding: 25px 0;
    line-height: 65px;
    font-size: 32px;
    color: #fff;
    .icon-box {
      margin-right: 20px;
    }
    &.gene-box {
      background: #368ebe;
      .icon-box {
        background: url('../../../../public/images/path-ways-icon.png')
          no-repeat;
        background-size: contain;
        width: 64px;
        height: 63px;
        display: inline-block;
        vertical-align: top;
      }
    }
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
    .tips-list {
      padding-top: 35px;
      .list-box {
        position: relative;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        color: #333;
        padding-left: 30px;
        cursor: pointer;
        &:hover {
          color: #3c8cbf;
        }
        .icon-right {
          position: absolute;
          display: none;
          left: 0;
          font-size: 22px;
          top: 9px;
        }
        &.cur {
          color: #3c8cbf;
          .icon-right {
            display: block;
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
  }
  .right-content-box {
    flex: 1;
    padding: 25px 0 60px 40px;
    position: relative;
    z-index: 1;
    &.detail-box-content {
      .flex-center {
        display: flex;
        align-items: center;
        &.flex-between {
          justify-content: space-between;
        }
        &.flex-around {
          justify-content: space-around;
        }
      }
      .section-box {
        font-size: 16px;
        color: #444;
        padding: 15px 0 0;
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
      color: #666;
      word-break: break-all;
    }
  }
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
.table3 .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f1f1f1 !important;
}
.path-ways {
  .table {
    margin-top: 10px;
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
</style>
