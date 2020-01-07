<template>
  <div class="hook-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="药物信息" name="first">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          <p>知识库提供与基因相关的药物信息，包括药物商品名，药物说明书，药物医保目录，药物相互作用等数据。</p>
          <p>点击更多查看药物详情数据。</p>
        </div>
        <div class="drug-news-box">
          <ul class="section-box-word">
            <li
              class="word-list"
              v-for="(item, index) in dataList"
              :key="index"
              @click="toDetailPage(item)"
            >
              <i class="word-icon"></i>
              <div style="border-bottom:1px solid #ddd; padding-bottom:10px;">
                <p style="font-size:18px; color:#222">
                  {{item.name}}
                  <span style="padding-left:15px;font-size:14px; color:#666;"></span>
                  (英文:{{item.englishName}})
                </p>
                <p class="clearfix" style=" margin-top:10px; color:#666;">
                  <span class="fr">查看更多</span>
                  <span>ATC编码:{{item.atcCode}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  getDrugInfoListByProject,
  getDrugInfoListByDrug,
  getDrugInfoListByGene
} from "@/api/labels_api.js";

import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "drug_news_hook",
  data() {
    return {
      activeName: "first",
      dataList: []
    };
  },
  props: ["queryData"],
  created() {
    this.handleClick();
  },
  methods: {
    handleClick(tab, event) {
      let param = {
        id: this.queryData.id || "",
        name: this.queryData.key || ""
      };
      let queryData =
        this.queryData.type === "gene"
          ? getDrugInfoListByGene
          : this.queryData.type === "project"
          ? getDrugInfoListByProject
          : getDrugInfoListByDrug;
      queryData(param).then(res => {
        // console.log(res);
        this.dataList = res;
      });
    },
    toDetailPage(obj) {
      let routeData = null;
      if (this.activeName == "first") {
        routeData = this.$router.resolve({
          path: "/drug-news",
          query: {
            id: obj.id
          }
        });
      }
      setStore("drug_news", obj.name);
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.text-box {
  line-height: 30px;
  color: #888;
  margin-top: 15px;
  font-size: 13px;
}

.drug-news-box {
  margin-top: 28px;
  .section-box-word {
    .word-list {
      position: relative;
      line-height: 20px;
      padding: 15px 0 5px 48px;
      font-size: 14px;
      color: #333;
      .word-icon {
        position: absolute;
        left: 0;
        top: 19px;
        font-size: 35px;
        color: #3c8cbf;
        background: url("../../../public/images/linchuangzhushi.png") no-repeat;
        background-size: contain;
        width: 30px;
        height: 30px;
      }
    }
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
