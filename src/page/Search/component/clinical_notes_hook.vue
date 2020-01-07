<template>
  <div class="hook-box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="临床注释(基因)" name="first">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          <p>临床注释（基因）是基于数据库中的文献做支撑，提供药物-基因-多个基因位点的信息，描述多个基因位点对药物，表型的影响。</p>
          <p>在临床注释中，报告了多个基因位点结果对药物的影响，例如：当CYP2C19*2(G681A)的位点结果为GA_突变杂合,AA_突变纯合,GG_野生型，CYP2C19*3(G636A)的位点结果为GG_野生型,GA_突变杂合,AA_突变纯合时，毒副风险较高；CYP2C19*2(G681A)的位点结果为GG_野生型，CYP2C19*3(G636A)的位点结果为GG_野生型时，使用常规方案治疗。查看更多临床注释（基因）详情请点击更多。</p>
        </div>
        <div class="table">
          <el-table border :data="combinedClinicalSuggest" style="width: 100%">
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <p class="ellipsis td-li-text href-text" @click="toDetailPage(scope.row)">查看更多</p>
              </template>
            </el-table-column>
            <el-table-column label="项目" align="center" width="180">
              <template slot-scope="scope">
                <p>{{scope.row.projectName}}</p>
                <p>({{scope.row.projectEnglishName}})</p>
              </template>
            </el-table-column>

            <el-table-column align="center" label="用药类型">
              <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list,index) of scope.row.genePorTypeInfoList"
                  :key="'medicationType'+index"
                >{{list.medicationType||"--"}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="表型">
              <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list,index) of scope.row.genePorTypeInfoList"
                  :key="'phenotypes'+index"
                >{{list.phenotypes||"--"}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="基因" width="100">
              <template slot-scope="scope">
                <p
                  v-for="(list,index) of scope.row.genePorTypeInfoList"
                  :key="'genes'+index"
                >{{list.genes||"--"}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="位点" width="120">
              <template slot-scope="scope">
                <p
                  v-for="(list,index) of scope.row.genePorTypeInfoList"
                  :key="'porName'+index"
                >{{list.porName||"--"}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="临床注释(位点)" name="second">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          <p>临床注释（位点）是基于数据库中的文献做支撑，提供药物-基因-基因位点的信息，描述基因型对药物，表型的影响。并根据“证据等级”划分为4类等级，其中等级1为最高标准。</p>
          <p>在临床注释中，报告了给定基因型与其他基因型的表型相对关系，例如：与CC，CT基因型相比，TT基因型可能与毒副风险增加有关，查看更多临床注释（位点）详情请点击更多。</p>
        </div>
        <div class="table">
          <el-table border :data="geneClinicalSuggest" style="width: 100%">
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <p class="ellipsis td-li-text href-text" @click="toDetailPage(scope.row)">查看更多</p>
              </template>
            </el-table-column>

            <el-table-column label="证据等级" prop="evidenceLevel" align="center" width="80"></el-table-column>
            <el-table-column prop="drugName" label="药物" align="center" width="120">
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p>（{{scope.row.drugEnglishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column label="基因" prop="geneName" align="center" width="90"></el-table-column>
            <el-table-column label="位点" prop="genePorName" align="center" width="110"></el-table-column>
            <el-table-column label="用药类型" prop="medicationType" align="center"></el-table-column>
            <el-table-column prop="phenotypes" label="表型" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  getClinicalAnnotationByDrugGene,
  getClinicalAnnotationByDrug,
  getClinicalAnnotationByGene
} from "@/api/labels_api.js";

import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "clinical_notes_hook",
  data() {
    return {
      activeName: "first",
      combinedClinicalSuggest: [],
      geneClinicalSuggest: []
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
          ? getClinicalAnnotationByGene
          : this.queryData.type === "project"
          ? getClinicalAnnotationByDrugGene
          : getClinicalAnnotationByDrug;
      queryData(param).then(res => {
        // console.log(res);
        this.combinedClinicalSuggest = res.combinedClinicalSuggest;
        this.geneClinicalSuggest = res.geneClinicalSuggest;
      });
    },
    toDetailPage(obj) {
      let routeData = null;
      if (this.activeName == "second") {
        routeData = this.$router.resolve({
          path: "/c-n-w-detail",
          query: {
            genePorId: obj.genePorId,
            taskId: obj.taskId
          }
        });
      } else {
        routeData = this.$router.resolve({
          path: "/c-n-g-detail",
          query: {
            projectId: obj.projectId,
            taskId: obj.taskId
          }
        });
      }
      this.setPageData();
      window.open(routeData.href, "_blank");
    },
    setPageData() {
      let pageData = [];
      if (this.activeName == "second") {
        pageData = this.geneClinicalSuggest || [];
      } else {
        this.combinedClinicalSuggest.forEach(res => {
          pageData.push({
            projectId: res.projectId,
            projectName: res.projectName,
            genePorName: res.genePorName
          });
        });
      }
      // console.log(pageData);
      setStore("clinical_notes", pageData);
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
  // border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
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
    }
  }
}
</style>
