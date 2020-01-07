<template>
  <div class="hook-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="中国临床试验" name="first">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          临床试验注释是由中国临床试验注册中心收录的有关基因多态性对药物，表型影响的试验数据，提供试验药物的作用、不良反应，或者是试验药物的吸收、分布、代谢和排泄等数据。
          更多中国临床试验详情内容请查看题目。
        </div>
        <div class="table">
          <el-table border style="width: 100%" :data="china_clinical_trials">
            <el-table-column label="药物" width="150" align="center">
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
            <el-table-column prop="registerNumber" width="130" label="登记号" align="center">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.registerNumber}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="literName" align="center" label="题目">
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
                  @click="toDetailPage(scope.row)"
                  style="color:#398dbc;cursor: pointer;"
                >{{scope.row.literName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="indication" align="center" width="120" label="适应症">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.indication}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="registerTime" width="100" align="center" label="登记时间">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.registerTime}}</p>
              </template>-->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全球临床试验" name="second">
        <h6 style="margin-top:10px; font-size:20px; color:#333;">概述</h6>
        <div class="text-box">
          临床试验注释是由美国临床试验网站收录的有关基因多态性对药物，表型影响的试验数据，提供试验药物的作用、不良反应，或者是试验药物的吸收、分布、代谢和排泄等数据。
          更多全球临床试验详情内容请查看题目。
        </div>
        <div class="table">
          <el-table border style="width: 100%" :data="foreign_clinical_trials">
            <el-table-column label="药物" width="150" align="center">
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
            <el-table-column prop="experimentTitle" align="center" label="试验题目">
              <template slot-scope="scope">
                <!-- <p
                  class="ellipsis td-li-text href-text"
                  v-for="(list) of scope.row.literatures"
                  :key="list.literId"
                  @click="toDetailPage(list)"
                >{{list.literName}}</p>-->
                <p
                  style="color:#398dbc;cursor: pointer;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.literName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="diseases" label="疾病" align="center">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.diseases}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="intervene" align="center" label="干预">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.intervene}}</p>
              </template>-->
            </el-table-column>
            <el-table-column prop="startTime" align="center" width="100" label="开始时间">
              <!-- <template slot-scope="scope">
                <p
                  class="ellipsis td-li-text"
                  v-for="(list,index) of scope.row.literatures"
                  :key="'gene'+index"
                >{{list.startTime}}</p>
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
  getClinicalTrialInfoByProjectId,
  getClinicalTrialInfoByGeneId,
  getClinicalTrialInfoByDrugId
} from "@/api/labels_api.js";
import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "clinical_trials_hook",
  data() {
    return {
      activeName: "first",
      china_clinical_trials: [], //中国临床实验
      foreign_clinical_trials: [] //全球临床实验
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
      //     let param = this.queryData.type === "gene"
      // ? {geneId:this.queryData.id||""}
      // : this.queryData.type === "project"
      // ? {projectId:this.queryData.id||""}
      // : {drugId:this.queryData.id||""};
      let queryData =
        this.queryData.type === "gene"
          ? getClinicalTrialInfoByGeneId
          : this.queryData.type === "project"
          ? getClinicalTrialInfoByProjectId
          : getClinicalTrialInfoByDrugId;
      queryData(param)
        .then(res => {
          // console.log(res);
          this.loading = false;
          this.china_clinical_trials = res.domestic;
          this.foreign_clinical_trials = res.foreign;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    toDetailPage(obj) {
      // console.log(1212);
      // console.log(obj);
      if (!obj || !obj.literId) return;
      let id = obj.literId;
      let routeData;
      if (this.activeName === "first") {
        routeData = this.$router.resolve({
          path: "/c-t-c-detail",
          query: {
            literId: obj.literId,
            type: this.activeName == "first" ? "1" : "2"
          }
        });
      } else {
        routeData = this.$router.resolve({
          path: "/c-t-f-detail",
          query: {
            literId: obj.literId,
            type: this.activeName == "first" ? "1" : "2"
          }
        });
      }
      this.setPageData();

      window.open(routeData.href, "_blank");
    },
    setPageData() {
      let pageData = [];
      if (this.activeName === "first") {
        this.china_clinical_trials.forEach(res => {
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
        // setStore("clinical_trials", pageData);
      } else {
        this.foreign_clinical_trials.forEach(res => {
          if (res !== null) {
            // var literatures = {};
            let literatures = {
              literId: res.literId,
              drugName: res.drugName,
              literName: res.literName,
              geneName: res.geneName
            };
            pageData.push(literatures);
          }
        });
        // setStore("clinical_trials", pageData);
      }
      setStore("clinical_trials", pageData);
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
      .td-li-text:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
