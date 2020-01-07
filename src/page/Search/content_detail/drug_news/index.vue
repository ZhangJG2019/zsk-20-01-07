<template>
  <div class="drug-news">
    <div class="box-top-title gene-box">
      <p class="w">
        <i class="icon-box"></i>
        {{this.drugName}}
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
            <i class="el-icon-arrow-right icon-right"></i>药物商品名
          </li>
          <li
            class="list-box"
            :class="{'cur':tabsCur=='2'}"
            @click="tabsliClick('2')"
          >
            <i class="el-icon-arrow-right icon-right"></i>药物说明书
          </li>
          <li
            class="list-box"
            :class="{'cur':tabsCur=='3'}"
            @click="tabsliClick('3')"
          >
            <i class="el-icon-arrow-right icon-right"></i>药物医保目录
          </li>
          <li
            class="list-box"
            :class="{'cur':tabsCur=='4'}"
            @click="tabsliClick('4')"
          >
            <i class="el-icon-arrow-right icon-right"></i>药物相互作用
          </li>
        </ul>
        <span
          class="tips-border"
          :style="{top:(tabIndex*40+35)+'px'}"
        ></span>
      </div>
      <div class="right-content-box detail-box-content">
        <div v-if="tabsCur=='0'">
          <div class="detail-box-top">
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物中文名称:</strong>
              </label>
              {{zongji.name}}
            </p>
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物英文名称:</strong>
              </label>
              {{zongji.englishName}}
            </p>
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物ATC编码:</strong>
              </label>
              {{zongji.atcCode}}
            </p>
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物I类:</strong>
              </label>
              {{zongji.drugType1}}
            </p>
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物II类:</strong>
              </label>
              {{zongji.drugType2}}
            </p>
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物III类:</strong>
              </label>
              {{zongji.drugType3}}
            </p>
            <p>
              <label style="width: 120px;display: inline-block;color: #666;">
                <strong>药物IV类:</strong>
              </label>
              {{zongji.drugType4}}
            </p>
          </div>
        </div>

        <div v-if="tabsCur=='1'">
          <h4
            style="float:left;"
            class="section-box"
          >药物商品名</h4>
          <h4
            style="float:right;"
            class="section-box"
          >共 {{this.shopName.length}} 条药物记录</h4>
          <div class="clearfix"></div>
          <div class="drug-news-box">
            <ul class="section-box-word">
              <li
                class="word-list"
                v-for="(item, index) in shopName"
                :key="'shop'+index"
              >
                <i class="word-icon"></i>
                <div class="boxes">
                  <p style="font-size:16px; font-weight:600; color:#222">{{item.drugGenericName}}</p>
                  <p style=" margin-top:10px;">
                    <span class="tips">
                      <strong style="color:#000;">规格：</strong>
                      {{item.specifications}}
                    </span>
                    <span class="tips">
                      <strong style="color:#000;">批准文号：</strong>
                      {{item.approvalNumber}}
                    </span>
                  </p>
                  <p style=" margin-top:5px;">
                    <span class="tips">
                      <strong style="color:#000;">品牌：</strong>
                      {{item.drugTradeName}}
                    </span>
                    <span class="tips">
                      <strong style="color:#000;">国家/厂家：</strong>
                      {{item.originPlace}}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="tabsCur=='2'">
          <h4
            class="section-box"
            style="float:left;"
          >药物说明书</h4>
          <h4
            style="float:right;"
            class="section-box"
          >共 {{this.shuoMingShu.length}} 条药物记录</h4>
          <div class="clearfix"></div>
          <div class="drug-news-box">
            <ul class="section-box-word">
              <li
                class="word-list"
                v-for="(item, index) in shuoMingShu"
                :key="'sms'+index"
              >
                <i class="word-icon"></i>
                <div class="boxes">
                  <p style="font-size:16px; font-weight:600; color:#222">
                    {{item.name}}
                    <span style="font-size:12px; padding-left:12px;">(英文名：{{item.englishName}})</span>
                  </p>
                  <p style=" margin-top:10px;">
                    <span class="tips">
                      <strong style="color:#000;">说明书来源：</strong>
                      {{item.pmid}}
                    </span>
                    <span class="tips">
                      <strong style="color:#000;">规格：</strong>
                      {{item.specification}}
                    </span>
                    <span class="tips">
                      <strong style="color:#000;">批准文号：</strong>
                      {{item.approvalNumber}}
                    </span>
                  </p>
                  <p style=" margin-top:5px;">
                    <span class="tips">
                      <strong style="color:#000;">适应症：</strong>
                      {{item.approvalIndications}}
                    </span>
                  </p>
                  <p style=" margin-top:15px;">
                    <span
                      class="undline-text"
                      @click="topageURL(item.accessoryUrl)"
                    >查看全文</span>
                    <em class="line-black">|</em>
                    <a
                      :href="burl+item.accessoryUrl"
                      download="pdf"
                      class="undline-text"
                    >下载</a>
                    <em class="line-black">|</em>
                    <span
                      @click="imgShow(item.accessoryImageId)"
                      class="undline-text"
                    >包装图片</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="tabsCur=='3'">
          <h4
            class="section-box"
            style="float:left;"
          >医保目录</h4>
          <h4
            style="float:right;"
            class="section-box"
          >共 {{this.yiBao.length}} 条药物记录</h4>
          <div class="clearfix"></div>
          <div class="drug-news-box">
            <ul class="section-box-word">
              <li
                class="word-list"
                v-for="(item, index) in yiBao"
                :key="'yb'+index"
              >
                <i class="word-icon"></i>
                <div class="boxes">
                  <p style="font-size:16px; font-weight:600; color:#222">{{item.drugName}}</p>
                  <p style=" margin-top:10px;">
                    <span class="tips">
                      <strong style="color:#444;">编号：</strong>
                      {{item.number}}
                    </span>
                    <span class="tips">
                      <strong style="color:#444;">医保地区：</strong>
                      {{item.medicalInsuranceArea}}
                    </span>
                    <span class="tips">
                      <strong style="color:#444;">医保类别：</strong>
                      {{item.medicalInsuranceCategory}}
                    </span>
                    <span class="tips">
                      <strong style="color:#444;">增补情况：</strong>
                      {{item.supplementaryInformation}}
                    </span>
                  </p>
                  <p style=" margin-top:5px;">
                    <span class="tips">
                      <strong style="color:#444;">药品类别：</strong>
                      {{item.drugClassification}}
                    </span>
                  </p>
                  <p style=" margin-top:5px;">
                    <span class="tips">
                      <strong style="color:#444;">剂型：</strong>
                      {{item.drugForm}}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="tabsCur=='4'">
          <h4
            class="section-box"
            style="float:left;"
          >药物相互作用</h4>
          <h4
            style="float:right;"
            class="section-box"
          >共 {{this.xiangHu.length}} 条药物记录</h4>
          <div class="clearfix"></div>
          <div class="drug-news-box">
            <ul class="section-box-word">
              <li
                class="word-list"
                v-for="(item, index) in xiangHu"
                :key="'xhzy'+index"
              >
                <i class="word-icon"></i>
                <div class="boxes">
                  <p style="font-size:16px; font-weight:600; color:#222">{{item.name}}</p>
                  <p style=" margin-top:10px;">
                    <span class="tips">
                      <strong style="color:#444;">相互作用药物：</strong>
                      {{item.interactiveDrugs}}
                    </span>
                  </p>
                  <p style=" margin-top:5px;">
                    <span class="tips">
                      <strong style="color:#444;">作用效果：</strong>
                      {{item.effectiveness}}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="640px"
    >
      <el-carousel
        :autoplay="false"
        trigger="click"
        height="600px"
        width="600px"
      >
        <el-carousel-item
          v-for="item in imgArr"
          :key="item"
        >
          <a
            :href="burl+item.accessoryImageUrl"
            download="img"
          >
            <img
              :src="burl+item.accessoryImageUrl"
              width="600px"
              height="600px"
            />
          </a>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  getMoreDrugInfoByDrug,
  getMoreDrugTradeInfoByDrug,
  getMoreDrugInstructionsInfoByDrug,
  getMoreDrugCatalogueInfoByDrug,
  getMoreDrugInteractInfoByDrug
} from '@/api/labels_api.js'

import { setStore, getStore } from '@/utils/storage.js'
export default {
  name: 'drug_news',
  // 生命周期函数
  data() {
    return {
      burl: window.BasicURL,
      tabsCur: '0',
      queryObj: '',
      tabIndex: '0',
      drugName: '',
      zongji: {},
      shopName: [],
      shuoMingShu: [],
      yiBao: [],
      xiangHu: [],
      dialogVisible: false,
      imgArr: []
    }
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {}
  },
  mounted() {
    this.drugName = getStore('drug_news')
    this.queryData()
    setTimeout(this.queryDataAll.bind(this), 1500)
  },
  methods: {
    tabsliClick(index) {
      if (this.tabsCur == index) return
      this.tabsCur = index
      this.tabIndex = index
    },
    queryData() {
      getMoreDrugInfoByDrug({ id: this.queryObj.id }).then(res => {
        this.zongji = res[0]
      })
    },
    queryDataAll() {
      getMoreDrugTradeInfoByDrug({ id: this.queryObj.id }).then(res => {
        this.shopName = res
      })
      getMoreDrugInstructionsInfoByDrug({ id: this.queryObj.id }).then(res => {
        this.shuoMingShu = res
      })
      getMoreDrugCatalogueInfoByDrug({ id: this.queryObj.id }).then(res => {
        this.yiBao = res
      })
      getMoreDrugInteractInfoByDrug({ id: this.queryObj.id }).then(res => {
        this.xiangHu = res
      })
    },
    topageURL(str) {
      if (str == null) {
        this.$message({
          message: '网站暂时无这篇原文可查看~',
          type: 'warning'
        })
        return
      }
      if (str.indexOf('.doc') > 0) {
        window.open(
          'http://view.officeapps.live.com/op/view.aspx?src=' + this.burl + str,
          '_blank'
        )
      } else {
        window.open(this.burl + str, '_blank')
      }
    },
    doword() {
      var doc = new ActiveXObject('Word.Application')
      doc.visible = true
      doc.Documents.Open(
        'http://47.105.75.254:8080/static/upload/20191107/深圳信立泰药业股份有限公司-2.doc'
      )
    },
    imgShow(str) {
      if (!str) {
        this.$message('暂无图片!')
        return false
      }
      let imgArr = JSON.parse(str)
      this.imgArr = imgArr
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.drug-news {
  background: #fff;
  .box-top-title {
    padding: 25px 0;
    line-height: 65px;
    font-size: 32px;
    color: #3c8cbf;
    .icon-box {
      margin-right: 20px;
    }
    &.gene-box {
      background: #eee;
      .icon-box {
        background: url('../../../../public/images/home-drug.png') no-repeat;
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
      .detail-box-top {
        padding-top: 20px;
        padding-bottom: 10px;
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
      .section-box {
        font-size: 16px;
        color: #444;
        padding: 15px 0 0;
        line-height: 30px;
        font-weight: 600;
      }
    }
    .text-box {
      line-height: 30px;
      font-size: 14px;
      color: #666;
    }
    .drug-news-box {
      margin-top: 15px;
      .section-box-word {
        .word-list {
          position: relative;
          line-height: 20px;
          padding: 15px 0 5px 80px;
          font-size: 14px;
          color: #333;
          .word-icon {
            position: absolute;
            left: 0;
            top: 19px;
            font-size: 35px;
            color: #3c8cbf;
            background: url('../../../../public/images/home-drug.png') no-repeat;
            background-size: contain;
            width: 55px;
            height: 55px;
          }
          .boxes {
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            color: #888;
            .tips {
              padding-right: 20px;
              &:last-child {
                padding-right: 0;
              }
            }
            .undline-text {
              text-decoration: underline;
              cursor: pointer;
              font-size: 12px;
            }
            .line-black {
              padding: 0 20px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
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
