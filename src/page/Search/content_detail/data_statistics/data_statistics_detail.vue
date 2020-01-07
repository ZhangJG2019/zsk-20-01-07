<template>
  <div class="data-statistics">
    <div class="clearfix breadcrumb-nav" style="border-bottom:1px solid #eee;">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>内容详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="w clearfix d-flex">
      <div class="left-box">
        <b style="font-size:16px; color:#333;">题目</b>
        <ul class="tips-list">
          <!-- v-for="(item, index) in tabs" -->
          <!-- :key="'tabs'+index" -->
          <li class="list-box" :class="{'cur':tabsCur=='0'}" @click="tabsliClick('0')">
            <i class="el-icon-arrow-right icon-right"></i>
            <p class="ellipsis">{{this.tabs.genePorName}}--{{this.tabs.geneName}}</p>
            <p class="ellipsis">3GBio基因位点频率地理分布(中国)</p>
          </li>
          <li class="list-box" :class="{'cur':tabsCur=='1'}" @click="tabsliClick('1')">
            <i class="el-icon-arrow-right icon-right"></i>
            <p class="ellipsis">{{this.tabs.genePorName}}--{{this.tabs.geneName}}</p>
            <p class="ellipsis">3GBio基因位点频率地理分布(世界)</p>
          </li>
        </ul>
        <!-- <span class="tips-border" :style="{top:(tabIndex*40+35)+'px'}"></span> -->
      </div>
      <div class="right-content-box detail-box-content">
        <keep-alive>
          <component :is="componentVue"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import ChinaMapBox from "./data_statistics_china";
import WorldMapBox from "./data_statistics_world";
import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "data-statistics-detail",

  data() {
    return {
      tabsCur: "",
      queryObj: "",
      tabIndex: "0",
      componentVue: null
    };
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    this.tabs = JSON.parse(getStore("data_statistics_hook")) || [];
    // console.log(11111111111111111);
    // console.log(this.tabs);
  },
  watch: {
    tabsCur(v) {
      this.componentVue = v == "0" ? ChinaMapBox : WorldMapBox;
    }
  },
  mounted() {
    this.tabsCur = this.queryObj.typemap; //判断返回的字符串是不是"0"
  },
  methods: {
    tabsliClick(index) {
      if (this.tabsCur == index) return;
      this.tabsCur = index;
      this.tabIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.data-statistics {
  background: #fff;
  .breadcrumb-nav {
    border-top: 1px solid #eee;
    padding: 15px 0 15px;
    line-height: 35px;
  }
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
        background: url("../../../../public/images/home-drug.png") no-repeat;
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
    padding-top: 25px;

    .tips-list {
      padding-top: 35px;
      // .list-box {
      //   position: relative;
      //   height: 40px;
      //   line-height: 40px;
      //   font-size: 15px;
      //   color: #333;
      //   padding-left: 30px;
      //   cursor: pointer;
      //   &:hover {
      //     color: #3c8cbf;
      //   }
      //   .icon-right {
      //     position: absolute;
      //     display: none;
      //     left: 0;
      //     font-size: 22px;
      //     top: 9px;
      //   }
      //   &.cur {
      //     color: #3c8cbf;
      //     .icon-right {
      //       display: block;
      //     }
      //   }
      // }
      .list-box {
        position: relative;
        line-height: 25px;
        font-size: 14px;
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
            background: url("../../../../public/images/home-drug.png") no-repeat;
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
.data-statistics {
}
</style>
