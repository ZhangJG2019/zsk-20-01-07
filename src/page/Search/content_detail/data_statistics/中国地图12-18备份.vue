<template>
  <div>
    <p class="detail-tab">
      <el-button :class="{'tabcur':tabCur=='1','tabdefault':tabCur!='1'}" @click="toShowBox('1')">图示</el-button>
      <el-button :class="{'tabcur':tabCur=='2','tabdefault':tabCur!='2'}" @click="toShowBox('2')">列表</el-button>
    </p>

    <div class="china-box" v-show="this.tabCur=='1'">
      <div style="margin-top:20px;">
        <el-tabs v-model="activeName1" type="card">
          <el-tab-pane label="地区" name="first">
            <div class="detail-box-top">
              <div id="myMap" ref="myMap" style="width: 900px; height: 500px;"></div>
              <div id="areabox" style="width: 900px; height: 500px; display:none;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="性别" name="second">
            <div class="detail-box-top">
              <!-- <div id="sex" style="width: 900px;height:500px;"></div> -->
              <div id="sexbox" style="width: 900px; height: 500px;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="年龄段" name="third">
            <div class="detail-box-top">
              <!-- <div id="agegroup" style="width: 900px;height:500px;"></div> -->
              <div id="ageGroupbox" style="width: 900px; height: 500px;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="样本类型" name="fourth">
            <div class="detail-box-top">
              <!-- <div id="sample-type" style="width: 900px;height:500px;"></div> -->
              <div id="sampleTypebox" style="width: 900px; height: 500px;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="年份" name="five">
            <div class="detail-box-top">
              <!-- <div id="year" style="width: 900px;height:500px;"></div> -->
              <div id="yearbox" style="width: 900px; height: 500px;"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="china-box" style="margin-top:25px;" v-show="this.tabCur=='2'">
      <p>(数据来源:{{this.from}})</p>
      <div style="margin-top:20px;">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="地区" name="first">
            <div class="table">
              <el-table border style="width: 100%" :data="areaTData">
                <el-table-column prop="typeName" label="地区" align="center"></el-table-column>
                <el-table-column label="样本量" align="center">
                  <template
                    slot-scope="scope"
                  >{{addNumder(scope.row[param[0]],scope.row[param[1]],scope.row[param[2]])}}</template>
                </el-table-column>
                <el-table-column label="基因型" align="center" width="100%">
                  <el-table-column :label="param[0]?param[0]:'CC'" align="center">
                    <el-table-column :prop="param[0]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[0]]?(Number(scope.row[param[0]])/addNumder(scope.row[param[0]],scope.row[param[1]],scope.row[param[2]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[1]?param[1]:'CT'" align="center">
                    <el-table-column :prop="param[1]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[1]]?(Number(scope.row[param[1]])/addNumder(scope.row[param[0]],scope.row[param[1]],scope.row[param[2]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[2]?param[2]:'TT'" align="center">
                    <el-table-column :prop="param[2]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[2]]?(Number(scope.row[param[2]])/addNumder(scope.row[param[0]],scope.row[param[1]],scope.row[param[2]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="性别" name="second">
            <div class="table">
              <el-table border style="width: 100%" :data="sexTData">
                <el-table-column prop="typeName" label="性别" align="center">
                  <template slot-scope="scope">{{["女", "男", "保密", "未记录性别"][scope.row.typeName]}}</template>
                </el-table-column>
                <el-table-column label="样本量" align="center">
                  <template
                    slot-scope="scope"
                  >{{addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])}}</template>
                </el-table-column>
                <el-table-column label="基因型" align="center" width="100%">
                  <el-table-column :label="param[0]?param[0]:'C'" align="center">
                    <el-table-column :prop="param[0]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[0]]?(Number(scope.row[param[0]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[1]" align="center">
                    <el-table-column :prop="param[1]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[1]]?(Number(scope.row[param[1]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[2]" align="center">
                    <el-table-column :prop="param[2]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[2]]?(Number(scope.row[param[2]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="年龄段" name="third">
            <div class="table">
              <el-table border style="width: 100%" :data="ageTGroupData">
                <el-table-column prop="typeName" label="年龄段" align="center"></el-table-column>
                <el-table-column label="样本量" align="center">
                  <template
                    slot-scope="scope"
                  >{{addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])}}</template>
                </el-table-column>
                <el-table-column label="基因型" align="center" width="100%">
                  <el-table-column :label="param[0]?param[0]:'C'" align="center">
                    <el-table-column :prop="param[0]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[0]]?(Number(scope.row[param[0]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[1]" align="center">
                    <el-table-column :prop="param[1]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[1]]?(Number(scope.row[param[1]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[2]" align="center">
                    <el-table-column :prop="param[2]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[2]]?(Number(scope.row[param[2]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="样本类型" name="fourth">
            <div class="table">
              <el-table border style="width: 100%" :data="sampleTypeTData">
                <el-table-column prop="typeName" label="样本类型" align="center"></el-table-column>
                <el-table-column label="样本量" align="center">
                  <template
                    slot-scope="scope"
                  >{{addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])}}</template>
                </el-table-column>
                <el-table-column label="基因型" align="center" width="100%">
                  <el-table-column :label="param[0]?param[0]:'C'" align="center">
                    <el-table-column :prop="param[0]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[0]]?(Number(scope.row[param[0]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[1]" align="center">
                    <el-table-column :prop="param[1]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[1]]?(Number(scope.row[param[1]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[2]" align="center">
                    <el-table-column :prop="param[2]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[2]]?(Number(scope.row[param[2]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="年份" name="five">
            <div class="table">
              <el-table border style="width: 100%" :data="yearTData">
                <el-table-column prop="typeName" label="年份" align="center"></el-table-column>
                <el-table-column label="样本量" align="center">
                  <template
                    slot-scope="scope"
                  >{{addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])}}</template>
                </el-table-column>
                <el-table-column label="基因型" align="center" width="100%">
                  <el-table-column :label="param[0]?param[0]:'C'" align="center">
                    <el-table-column :prop="param[0]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[0]]?(Number(scope.row[param[0]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[1]" align="center">
                    <el-table-column :prop="param[1]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[1]]?(Number(scope.row[param[1]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="param[2]" align="center">
                    <el-table-column :prop="param[2]" label="n" align="center"></el-table-column>
                    <el-table-column label="%" align="center">
                      <template
                        slot-scope="scope"
                      >{{scope.row[param[2]]?(Number(scope.row[param[2]])/addNumder(scope.row[param[0]],scope.row[param[2]],scope.row[param[1]])*100).toFixed(2):'--'}}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
//引入主题

import echartFun from "./map-option";
import { setStore, getStore } from "@/utils/storage.js";
import { getChinaDataInfo } from "@/api/labels_api.js";
export default {
  name: "dataStatisticsChina",
  // 生命周期函数
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      chinaChart: null,
      tabCur: "1",
      areaData: [],
      sexData: [],
      ageGroupData: [],
      sampleTypeData: [],
      yearData: [],
      areaTData: [],
      sexTData: [],
      ageTGroupData: [],
      sampleTypeTData: [],
      yearTData: [],
      chinaData: {},
      activeName1: "first",
      activeName2: "first",
      queryObj: {},
      from: "",
      param: []
    };
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    this.getDataInfo(); // 获取后台返回总数据
  },

  methods: {
    getDataInfo() {
      getChinaDataInfo({
        genePorId: this.queryObj.id
      }).then(res => {
        console.log(res);
        this.chinaData = res;
        this.from = res.dataSource;
        Object.keys(res).forEach(r => {
          this.filterTableData(res[r], r);
        });
        if (res.area) {
          let areaD = this.joinData(res.area, "typeName");
          this.areaData = areaD.map(list => {
            return {
              name: list.typeName.replace("市", "").replace("省", ""),
              value: list.amount
            };
          });
          this.drawChinaMap();
        }
        // if (res.sex) {
        //   let sexData = this.joinData(res.sex, "typeName");
        //   this.sexData = sexData.map(list => {
        //     return {
        //       name: ["女", "男", "保密", "未记录性别"][list.typeName],
        //       value: list.amount
        //     };
        //   });
        //   this.drawSex("sex");
        // }
        // if (res.ageGroup) {
        //   let ageGroup = this.joinData(res.ageGroup, "typeName");
        //   this.ageGroupData = ageGroup.map(list => {
        //     return {
        //       name: list.typeName,
        //       value: list.amount
        //     };
        //   });
        //   this.drawSex("ageGroup");
        // }
        // if (res.sampleType) {
        //   let sampleType = this.joinData(res.sampleType, "typeName");
        //   this.sampleTypeData = sampleType.map(list => {
        //     return {
        //       name: list.typeName,
        //       value: list.amount
        //     };
        //   });
        //   this.drawSex("sampleType");
        // }
        // if (res.year) {
        //   let year = this.joinData(res.year, "typeName");
        //   this.yearData = year.map(list => {
        //     return {
        //       name: list.typeName,
        //       value: list.amount
        //     };
        //   });
        //   this.drawSex("year");
        // }
      });
    },
    drawChinaMap() {// 首次加载，绘制中国地图
      let option = echartFun.map(this.areaData);

      this.chinaChart = echarts.init(document.getElementById("myMap"));
      this.chinaChart.setOption(option);
    },
    addNumder(n1, n2, n3) {
      let pad = s => {
        return s ? Number(s) : 0;
      };
      return pad(n1) + pad(n2) + pad(n3);
    },
    toShowBox(str) {
      if (this.tabCur == str) return;
      this.tabCur = str;
    },

    drawSex(str) {
      if (str == "sex") {
        echartFun.pie("sex", { data: this.sexData });
      }
      if (str == "ageGroup") {
        echartFun.pie("agegroup", { data: this.ageGroupData });
      }
      if (str == "sampleType") {
        echartFun.pie("sample-type", { data: this.sampleTypeData });
      }
      if (str == "year") {
        echartFun.pie("year", { data: this.yearData });
      }
    },
    joinData(arr, str) {
      let newArr = [];
      let copyArr = JSON.parse(JSON.stringify(arr));
      for (let i = 0; i < copyArr.length; i++) {
        let filterD = newArr.findIndex(res => res[str] == copyArr[i][str]);

        if (filterD < 0) {
          newArr.push(copyArr[i]);
        } else {
          newArr[filterD].amount += copyArr[i].amount;
        }
      }
      return newArr;
    },
    filterTableData(data, str) {
      if (typeof data == "string") return;
      let newArr = [];
      let copyArr = JSON.parse(JSON.stringify(data));
      let paramArr = [];
      for (let i = 0; i < copyArr.length; i++) {
        let filterD = newArr.findIndex(
          res => res.typeName == copyArr[i].typeName
        );

        if (filterD < 0) {
          let obj = {};
          obj.typeName = copyArr[i].typeName;
          obj[copyArr[i]["resultName"]] = copyArr[i]["amount"];
          newArr.push(obj);
        } else {
          newArr[filterD][copyArr[i]["resultName"]] = copyArr[i]["amount"];
        }
      }
      switch (str) {
        case "area":
          this.areaTData = newArr;
          break;
        case "ageGroup":
          this.ageTGroupData = newArr;
          break;
        case "sampleType":
          this.sampleTypeTData = newArr;
          break;
        case "sex":
          this.sexTData = newArr;
          break;
        case "year":
          this.yearTData = newArr;
          break;
      }
      newArr.forEach(function(dat) {
        let obj = Object.keys(dat);
        paramArr.push(...obj);
      });
      this.param = [...new Set(paramArr)].filter(res => res != "typeName");
      this.barLineEchart(str, newArr);
    },
    barLineEchart(str, arr) {
      let $dom = str + "box";
      let param = JSON.stringify(this.param);
      let dataArr = JSON.parse(JSON.stringify(arr));
      echartFun.bar($dom, { data: dataArr }, param);
    }
  },
  mounted() {}
  // updated() {
  //   if (!this.chart) {
  //     this.drawChinaMap();
  //   }
  // },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return;
  //   }
  //   this.chart.dispose();
  //   this.chart = null;
  // }
};
</script>

<style lang="scss" scoped>
.left-title {
  height: 40px;
  line-height: 40px;
}
.left-title .title {
  font-weight: 700;
  width: 8.75rem;
  display: inline-block;
}
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

    .text-box {
      line-height: 30px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
<style lang="scss">
.data-statistics {
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
      border-color: #dedede;
      color: #999;
    }
  }
  .table {
    margin-top: 5px;
    .el-table {
      border: 1px solid #ccc;
    }
    .el-table th {
      background: #ebf3f8;
      padding: 4px 0;
      font-weight: normal;
      color: #333;
    }
    .el-table td {
      color: #333;
      font-size: 14px;
      border-right: 1px solid #ccc;
      padding: 8px 0;
    }
  }
}
</style>
