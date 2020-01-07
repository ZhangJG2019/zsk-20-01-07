<template>
  <div class="hook-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="中国专利" name="first">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          专利注释是由专利网站收录的与药物基因相关的国内外专利文献，提供并保护检测基因多态性的引物或方法等内容，用于个体化用药临床指导。可全面反映涉及药物基因科研及产业化领域的最新进展。
          更多中国专利详情内容请查看题目。
        </div>
        <div class="table">
          <el-table border style="width: 100%" :data="china_patent_hook">
            <el-table-column prop="drugName" width="150" label="药物" align="center">
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p>（{{scope.row.englishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column prop="geneName" width="100" label="基因" align="center">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.geneName}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="literName" align="center" label="题目">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list) of scope.row.literatures"
                  :key="list.liteId"
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
            <el-table-column prop="applicant" width="250" align="center" label="申请人（专利权）">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.applicant}}</p>
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全球专利" name="second">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          专利注释是由专利网站收录的与药物基因相关的国内外专利文献，提供并保护检测基因多态性的引物或方法等内容，用于个体化用药临床指导。可全面反映涉及药物基因科研及产业化领域的最新进展。
          更多全球专利详情内容请查看题目。
        </div>
        <div class="table">
          <el-table border style="width: 100%" :data="foreign_patent_hook">
            <el-table-column prop="drugName" label="药物" width="150" align="center">
              <template slot-scope="scope">
                <p>{{scope.row.drugName}}</p>
                <p>（{{scope.row.englishName}}）</p>
              </template>
            </el-table-column>
            <el-table-column prop="geneName" width="100" label="基因" align="center">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.geneName}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="title" align="center" label="题目">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list) of scope.row.literatures"
                  :key="list.liteId"
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
            <el-table-column prop="applicant" align="center" label="申请人（专利权）">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.applicant}}</p>
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  getPatentInfoByProjectId,
  getPatentInfoByDrugId,
  getPatentInfoByGeneId
} from "@/api/labels_api.js";
import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "patent_hook",
  data() {
    return {
      activeName: "first",
      china_patent_hook: [],
      foreign_patent_hook: []
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
          ? getPatentInfoByGeneId
          : this.queryData.type === "project"
          ? getPatentInfoByProjectId
          : getPatentInfoByDrugId;
      queryData(param)
        .then(res => {
          // console.log(res.data);
          this.loading = false;
          this.china_patent_hook = res.domestic;
          this.foreign_patent_hook = res.foreign;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    toDetailPage(obj) {
      // console.log(obj);
      if (!obj || !obj["literId"]) return;
      // console.log(1212);
      let id = obj["literId"];

      if (this.activeName === "first") {
        var routeData = this.$router.resolve({
          path: "/p-c-detail",
          query: {
            literId: id,
            type: this.activeName == "first" ? "1" : "2"
          }
        });
      } else {
        var routeData = this.$router.resolve({
          path: "/p-f-detail",
          query: {
            literId: id,
            type: this.activeName == "first" ? "1" : "2"
          }
        });
      }
      this.setPageData();
      window.open(routeData.href, "_blank");
    },
    setPageData() {
      let pageData = [];
      if (this.activeName == "first") {
        this.china_patent_hook.forEach(res => {
          if (res !== null) {
            // var literatures = {};
            let literatures = {
              literId: res.literId,
              literName: res.literName,
              drugName: res.drugName,
              geneName: res.geneName
            };
            pageData.push(literatures);
          }
        });
      } else {
        this.foreign_patent_hook.forEach(res => {
          if (res !== null) {
            // var literatures = {};
            let literatures = {
              literId: res.literId,
              literName: res.literName,
              drugName: res.drugName,
              geneName: res.geneName
            };
            pageData.push(literatures);
          }
        });
      }

      setStore("patent", pageData);
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
