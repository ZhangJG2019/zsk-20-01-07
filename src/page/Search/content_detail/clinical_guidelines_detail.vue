<template>
  <div class="detail-content">
    <div class="clearfix breadcrumb-nav">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>
            <span @click="prev(1)">搜索结果</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span @click="prev(2)">临床指南</span>
          </el-breadcrumb-item>-->
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>临床指南</el-breadcrumb-item>
          <el-breadcrumb-item>内容详情</el-breadcrumb-item>
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
              :title="item.literName"
            >
              <i class="icon-right">{{index+1}}、</i>
              <p
                class="ellipsis"
                v-if="item.liteName!==''||item.source!==null"
              >{{item.drugName}}--{{item.geneName}}</p>
              <p class="ellipsis" v-if="item.liteName!==''||item.source!==null">{{item.literName}}</p>
            </li>
          </ul>
        </div>
        <div class="right-content-box">
          <p class="detail-tab">
            <el-button class="tabcur">注释查看</el-button>
            <el-button class="tabdefault" @click="topageURL">原文查看</el-button>
          </p>
          <div class="china-box" v-if="this.queryObj.type=='1'">
            <div class="detail-box-top">
              <h3 class="page-title-name">{{dataObj.title}}</h3>
              <p>发布日期:{{dataObj.releaseDate}}</p>
              <p>制定者:{{dataObj.formulator}}</p>
              <p>出处:{{dataObj.source}}</p>
            </div>
            <div class="detail-box-content">
              <h4 class="section-box">内容介绍</h4>
              <p class="text-box">{{dataObj.contentIntroduce}}</p>
            </div>
          </div>
          <div class="english-box" v-if="this.queryObj.type=='2'">
            <div class="detail-box-top">
              <h3 class="page-title-name">{{dataObj.title}}</h3>
            </div>
            <div class="detail-box-content">
              <h4 class="section-box">摘要</h4>
              <p class="text-box">{{dataObj.summary}}</p>
              <h4 class="section-box">注释</h4>
              <p class="text-box" v-html="dataObj.annotation"></p>
              <h4 class="section-box">参考文献</h4>
              <div class="text-box" v-html="dataObj.publications"></div>
              <h4 class="section-box">日志</h4>
              <div class="text-box" v-html="dataObj.history"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { setStore, getStore } from "@/utils/storage.js";
import "element-ui/lib/theme-chalk/index.css";
import {
  getClinicalGuidelinesDomesticDetail,
  getClinicalGuidelinesForeignDetail
} from "@/api/labels_api.js";
export default {
  // 生命周期函数
  data() {
    return {
      tabsCur: "12",
      tabs: [],
      queryObj: {},
      dataObj: {}
    };
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    this.tabsCur = this.queryObj.literId;
    this.tabs = JSON.parse(getStore("clinical_guidelines")) || [];
    // console.log(this.tabs[0].href);
  },
  mounted() {
    // console.log(123);
    this.queryData();
  },
  methods: {
    prev(num) {
      if (num == 1) {
        let url = "http://localhost:9999/#" + this.tabs[0].href;
        window.location.href = url;
      } else if (num == 2) {
        // let url = "http://localhost:9999/#" + this.tabs[0].href;
        // window.location.href = url;

        this.$router.go(-2);
      }
    },
    tabsliClick(obj, index) {
      if (this.tabsCur == obj.id) return;
      this.tabsCur = obj.literId;
      this.$nextTick(function() {
        this.queryData();
      });
    },
    queryData() {
      let type = this.queryObj.type;
      let queryDetailData =
        type == "1"
          ? getClinicalGuidelinesDomesticDetail
          : getClinicalGuidelinesForeignDetail;
      queryDetailData({ literId: this.tabsCur }).then(res => {
        this.dataObj = res;
      });
    },
    topageURL() {
      if (this.dataObj.fileUrl == null) {
        this.$message({
          message: "网站暂时无这篇原文可查看~",
          type: "warning"
        });
        return;
      }
      window.open(this.dataObj.fileUrl, "_blank");
    }
  }
};
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
            content: "";
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
</style>
