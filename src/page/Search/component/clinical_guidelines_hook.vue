<template>
  <div class="hook-box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="中国专家共识" name="first">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          <p>中国专家共识是由中国权威专家基于药物基因组学信息达成的共识，简要介绍了基因与药物之间的相互影响，并提供可下载的共识PDF文件。</p>
          <p>更多中国专家共识详情请查看题目。</p>
        </div>
        <div class="table">
          <el-table border :data="chinaListData" style="width: 100%">
            <el-table-column width="150" label="药物" align="center">
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p>（{{scope.row.englishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column prop="geneName" label="基因" width="100" align="center"></el-table-column>
            <el-table-column prop="literName" align="center" label="题目">
              <template slot-scope="scope">
                <p
                  style="color:#398dbc;cursor: pointer;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.literName}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全球临床指南" name="second">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          <p>指南注释是由临床药物遗传学实施联盟（CPIC），荷兰皇家药剂师协会成立的药物遗传学工作组（DPWG），加拿大药物基因组学药品安全网（CPNDS），其他专业协会，中国专家共识基于PGx药物剂量发布的指南推荐，简要介绍了基于基因型的临床建议，并提供可下载的指南PDF文件。</p>
          <p>更多全球临床指南详情请查看题目。</p>
        </div>
        <div class="table">
          <el-table border :data="foreignListData" style="width: 100%">
            <el-table-column prop="genes" width="150" label="药物" align="center">
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p>（{{scope.row.englishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column prop="geneName" label="基因" width="100" align="center">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.geneName}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="porName" align="center" label="题目">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list) of scope.row.literatures"
                  :key="list.literId"
                  @click="toDetailPage(list)"
                >{{list.literName}}</p>
              </template>-->
              <template slot-scope="scope">
                <p
                  style="color:#398dbc;cursor: pointer;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.literName}}</p>
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
  getDrugGeneClinicalGuide,
  getDrugClinicalGuide,
  getGeneClinicalGuide
} from "@/api/labels_api.js";

import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "clinical_guidelines_hook",
  data() {
    return {
      activeName: "first",
      foreignListData: [],
      chinaListData: []
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
          ? getGeneClinicalGuide
          : this.queryData.type === "project"
          ? getDrugGeneClinicalGuide
          : getDrugClinicalGuide;
      queryData(param).then(res => {
        // console.log(res);
        this.chinaListData = res.domestic;
        this.foreignListData = res.foreign;
      });
    },
    toDetailPage(obj) {
      let id = obj["literId"];
      let routeData = this.$router.resolve({
        path: "/clinicalGuidelinesDeatil",
        query: {
          literId: id,
          type: this.activeName == "first" ? "1" : "2"
        }
      });
      this.setPageData();

      window.open(routeData.href, "_blank");
    },
    setPageData() {
      let pageData = [];
      if (this.activeName == "first") {
        // console.log(0);
        this.chinaListData.forEach(res => {
          if (res !== null) {
            let literatures = {
              literId: res.literId,
              literName: res.literName,
              drugName: res.drugName,
              geneName: res.geneName,
              href: this.$route.fullPath
            };
            pageData.push(literatures);
          }
        });
      } else {
        this.foreignListData.forEach(res => {
          if (res !== null) {
            let literatures = {
              literId: res.literId,
              literName: res.literName,
              drugName: res.drugName,
              geneName: res.geneName,
              href: this.$route.fullPath
            };
            pageData.push(literatures);
          }
        });
      }
      // console.log(2);、
      setStore("clinical_guidelines", pageData);
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
      .cell {
        padding: 0;
      }
      .td-li-text:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
