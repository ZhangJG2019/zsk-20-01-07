<template>
  <div class="hook-box">
    <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
    <div class="text-box">
      数据统计指的是知识库中收录的与药物相关的基因位点频率的分析，通过不同维度的分析比较不同基因位点或同一基因位点，获取不同地区，不同人种，不同性别，不同年龄段的基因频率。
      更多信息请点击位点，查看基因位点的数据
    </div>
    <div class="table">
      <el-table border style="width: 100%" :data="data_statistics">
        <el-table-column prop="geneName" label="基因" width="220" align="center"></el-table-column>
        <el-table-column prop="genePorName" label="位点" width="180" align="center"></el-table-column>
        <el-table-column prop="rsId" label="RSID" width="220" align="center"></el-table-column>
        <el-table-column prop="gene_pinlu" align="center" label="基因频率">
          <template slot-scope="scope">
            <p class="ellipsis td-li-text href-text" @click="toDetailPage(scope.row)">查看</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { setStore, getStore } from "@/utils/storage.js";
import {
  getDataStatisticsListVOByDrugId,
  getDataStatisticsListVOByGeneId,
  getDataStatisticsListVOByProjectId
} from "@/api/labels_api.js";
export default {
  name: "data_statistics_hook",
  data() {
    return {
      activeName: "first",
      data_statistics: []
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
          ? getDataStatisticsListVOByGeneId
          : this.queryData.type === "project"
          ? getDataStatisticsListVOByProjectId
          : getDataStatisticsListVOByDrugId;
      queryData(param)
        .then(res => {
          // console.log(res);
          this.loading = false;
          this.data_statistics = res;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    toDetailPage(obj) {
      // console.log(obj);

      let routeData = null;
      if (this.activeName == "first") {
        routeData = this.$router.resolve({
          path: "/d-s-detail",
          query: {
            id: obj.genePorId,
            typemap: "0"
          }
        });
      }
      setStore("data_statistics_hook", obj);
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
      border-bottom: none;
      color: #333;
      font-size: 14px;
      border-right: 1px solid #ccc;
      padding: 8px 0;
    }
  }
}
</style>
