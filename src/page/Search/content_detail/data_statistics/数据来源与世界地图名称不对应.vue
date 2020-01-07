<template>
  <dir>
    <p class="detail-tab">
      <el-button :class="{'tabcur':tabCur=='1','tabdefault':tabCur!='1'}" @click="toShowBox('1')">图示</el-button>
      <el-button :class="{'tabcur':tabCur=='2','tabdefault':tabCur!='2'}" @click="toShowBox('2')">列表</el-button>
    </p>
    <div class="china-box" style="margin-top:25px;" v-show="this.tabCur=='1'">
      <div class="echarts-box">
        <div :style="{height:height,width:width,backgroundColor:backgroundColor}" ref="myEchart"></div>
      </div>
    </div>
    <div class="china-box" style="margin-top:25px;" v-show="this.tabCur=='2'">
      <p>(数据来源：3G生物)</p>
      <div style="margin-top:20px;">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="列表数据" name="first">
            <div class="table">
              <el-table border style="width: 100%" :data="areaTData">
                <el-table-column prop="fatherRace" label="种族" align="center"></el-table-column>
                <el-table-column prop="area" label="所属地区" align="center"></el-table-column>
                <el-table-column label="样本量" prop="testSmounts" align="center"></el-table-column>
                <el-table-column label="基因型" align="center" width="100%">
                  <el-table-column label="AA" align="center">
                    <el-table-column label="n" align="center">
                      <template slot-scope="scope">{{scope.row.porKeyValueList[1].testSmounts}}</template>
                    </el-table-column>
                    <el-table-column label="%" align="center">
                      <template slot-scope="scope">{{scope.row.porKeyValueList[1].proportion}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="GG" align="center">
                    <el-table-column label="n" align="center">
                      <template slot-scope="scope">{{scope.row.porKeyValueList[0].testSmounts}}</template>
                    </el-table-column>
                    <el-table-column label="%" align="center">
                      <template slot-scope="scope">{{scope.row.porKeyValueList[0].proportion}}</template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="AG" align="center">
                    <el-table-column label="n" align="center">
                      <template slot-scope="scope">{{scope.row.porKeyValueList[2].testSmounts}}</template>
                    </el-table-column>
                    <el-table-column label="%" align="center">
                      <template slot-scope="scope">{{scope.row.porKeyValueList[2].proportion}}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </dir>
</template>
<script>
import Vue from "vue";
import echarts from "echarts"; //引入组件
import "../../../../../node_modules/echarts/map/js/world.js";
import { setStore, getStore } from "@/utils/storage.js";

require("echarts/lib/chart/bar"); // 引入柱状图组件
require("echarts/lib/chart/pie"); // 引入饼状图组件
require("echarts/map/js/china.js"); // 引入中国地图组件
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/theme/macarons"); //引入主题
require("echarts/theme/shine"); //引入主题
import { getForeignDataInfo, getChinaDataInfo } from "@/api/labels_api.js";
export default {
  name: "dataStatisticsWorld",
  props: {
    width: { type: String, default: "100%" },
    height: { type: String, default: "500px" },
    // backgroundColor:{#fff}
    backgroundColor: "#fff"
  },
  // 生命周期函数
  data() {
    return {
      dataWorld:[],
      // nameMap:{},
      chart: null,
      tabCur: "1",
      areaTData: [],
      activeName2: "first",
      queryObj: {}
    };
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    this.getDataInfo();
  },
  mounted() {
   
  },

  methods: {
    // 切换地图和表格
    toShowBox(str) {
      if (this.tabCur == str) return;
      this.tabCur = str;
    },
    // 显示地图
    initChart(areaData) {
      this.chart = echarts.init(this.$refs.myEchart);
      window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
         backgroundColor: '#FFFFFF',
        title: {
          //地图显示标题
          text: "全球数据",
          // subtext: "Global ranking of country area",
          // sublink: "http://www.baidu.com",
          top: "30px",
          left: "center",
          textStyle: { color: "#3c8cbf" }
        },
        visualMap: {
          //图列显示柱
          type: "continuous",
          min: 0,
          left: 30,
          max: 200000,
          text: ["大", "小"],
          realtime: false,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"]
        },

        tooltip: {
          //提示框组件
          trigger: "item",
          formatter: function (params) {
              var res = params.name;
              console.log("格式化"+params.value)
              res += "<br />总数：" + Number(params.value);
              return res;
          }
        },
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "world",
            roam: true,
            mapLocation: { y: 100 },
            data: areaData, //绑定数据
            // nameMap: this.nameMap,
            symbolSize: 12,
            label: {//展示到地图上的数据
              normal: { show: false },
              emphasis: { show: false }
            },
            itemStyle: {
              emphasis: {
                borderColor: "#ccc",
                borderWidth: 1
              }
            }
          }
        ]
      });
    },
    
    // 获取数据
    getDataInfo() {
      getForeignDataInfo({
        id: this.queryObj.id
      }).then(res => {
        this.areaTData = res;
        this.dataWorld = res.map(r => {
          return {
              name: r.race,
              value: r.testSmounts?r.testSmounts:0
            }
        });

        console.log(this.dataWorld)
        this.initChart(this.dataWorld);
      });
    },
  },
  updated() {
    if (!this.chart) {
      this.initChart(this.dataWorld);
    }
  },
  mounted() {
    this.initChart(this.dataWorld);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style lang="scss" scoped>
.d-flex {
  display: flex;
}
.left-box {
  width: 290px;
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
      // padding-bottom: 10px;
      .page-title-name {
        font-size: 26px;
        color: #333;
        padding: 15px 0;
        line-height: 38px;
      }
      p {
        // line-height: 30px;
        line-height: 27px;
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
  ß .right-content-box {
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
</style>
