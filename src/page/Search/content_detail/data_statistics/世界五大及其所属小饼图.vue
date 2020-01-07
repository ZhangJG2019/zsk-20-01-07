<template>
  <div>
    <p class="detail-tab">
      <el-button :class="{'tabcur':tabCur=='1','tabdefault':tabCur!='1'}" @click="toShowBox('1')">图示</el-button>
      <el-button :class="{'tabcur':tabCur=='2','tabdefault':tabCur!='2'}" @click="toShowBox('2')">列表</el-button>
    </p>
    <div class="china-box" v-show="this.tabCur=='1'">
      <div style="margin-top:20px;">
        <el-tabs v-model="activeName1" type="card">
          <el-tab-pane label="1000 Genomes" name="first">
            <div class="detail-box-top">
              <div id="Genomes" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="African" name="second">
            <div class="detail-box-top">
              <div id="African" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="American" name="third">
            <div class="detail-box-top">
              <div id="American" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="East Asian" name="fourth">
            <div class="detail-box-top">
              <div id="EastAsian" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="European" name="five">
            <div class="detail-box-top">
              <div id="European" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="South Asian" name="six">
            <div class="detail-box-top">
              <div id="SouthAsian" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Chinese" name="seven">
            <div class="detail-box-top">
              <div id="Chinese" style="width: 900px;height:500px;border:1px solid #eee;"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="china-box" style="margin-top:25px;" v-show="this.tabCur=='2'">
      <!-- <p>(数据来源：3G生物)</p> -->
      <div style="margin-top:20px;">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="1000 Genomes" name="first">
            <div class="table">
              <el-table border style="width: 100%" :data="this.chinaData">
                <el-table-column prop="area" width="130" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" width="170" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <!-- <el-tab-pane label="1000 Genomes" name="first">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_Genomes">
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <el-tab-pane label="African" name="second">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_African">
                <el-table-column prop="area" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <el-tab-pane label="American" name="third">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_American">
                <el-table-column prop="area" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <el-tab-pane label="East Asian" name="fourth">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_EastAsian">
                <el-table-column prop="area" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <el-tab-pane label="European" name="five">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_European">
                <el-table-column prop="area" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <el-tab-pane label="South Asian" name="six">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_SouthAsian">
                <el-table-column prop="area" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          <el-tab-pane label=" Chinese" name="seven">
            <div class="table">
              <el-table border style="width: 100%" :data="this.newArr_Chinese">
                <el-table-column prop="area" label="地区" align="center"></el-table-column>
                <el-table-column prop="race" label="种族" align="center"></el-table-column>
                <el-table-column prop="testSmounts" label="样本量" align="center"></el-table-column>
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
          </el-tab-pane>-->
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
//引入主题
import echartFun2 from "./map-option2";
import { setStore, getStore } from "@/utils/storage.js";
import { getForeignDataInfo } from "@/api/labels_api.js";
export default {
  name: "dataStatisticsChina",
  // 生命周期函数
  data() {
    return {
      // msg: "Welcome to Your Vue.js App",
      chart: null,
      tabCur: "1",
      ageGroupData: [],
      sampleTypeData: [],
      yearData: [],
      chinaData: [],
      activeName1: "first",
      activeName2: "first",
      queryObj: {},
      newArr_Genomes: [],
      newArr_Genomes2: [],
      newArr_Chinese: [],
      newArr_Chinese2: [],
      newArr_African: [],
      newArr_African2: [],
      newArr_American: [],
      newArr_American2: [],
      newArr_EastAsian: [],
      newArr_EastAsian2: [],
      newArr_European: [],
      newArr_European2: [],
      newArr_SouthAsian: [],
      newArr_SouthAsian2: [],
      dataCount: []
    };
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    this.getDataInfo();
  },
  methods: {
    getDataInfo() {
      getForeignDataInfo({
        id: this.queryObj.id
      }).then(res => {
        this.chinaData = res;
        console.log(this.chinaData);
        Object.keys(res).forEach(r => {
          // r是每个数组名称
          this.filterTableData(res[r], r); //将数据划分为7大类
        });
      });
    },
    filterTableData(data, str) {
      if (typeof data == "string") return;
      let copyArr = JSON.parse(JSON.stringify(data)); //展示33条数居中得一条
      if (copyArr.fatherRace === null && copyArr.race === "1000 Genomes") {
        this.newArr_Genomes.push(data);
        let pkvl = this.newArr_Genomes[0].porKeyValueList;
        this.newArr_Genomes2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0
          };
        });
      }
      if (copyArr.fatherRace === null && copyArr.race === "Chinese") {
        this.newArr_Chinese.push(data);
        let pkvl = this.newArr_Chinese[0].porKeyValueList;
        this.newArr_Chinese2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        this.drawSex("Chinese");
      }
      if (copyArr.fatherRace === null && copyArr.race === "American") {
        this.newArr_American.push(data);
        let pkvl = this.newArr_American[0].porKeyValueList;
        this.newArr_American2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        this.drawSex("American");
      }
      if (copyArr.fatherRace === null && copyArr.race === "African") {
        this.newArr_African.push(data);
        let pkvl = this.newArr_African[0].porKeyValueList;
        this.newArr_African2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        this.drawSex("African");
      }
      if (copyArr.fatherRace === null && copyArr.race === "East Asian") {
        this.newArr_EastAsian.push(data);
        let pkvl = this.newArr_EastAsian[0].porKeyValueList;
        this.newArr_EastAsian2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        this.drawSex("EastAsian");
      }
      if (copyArr.fatherRace === null && copyArr.race === "European") {
        this.newArr_European.push(data);
        let pkvl = this.newArr_European[0].porKeyValueList;
        this.newArr_European2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        this.drawSex("European");
      }
      if (copyArr.fatherRace === null && copyArr.race === "South Asian") {
        this.newArr_SouthAsian.push(data);
        let pkvl = this.newArr_SouthAsian[0].porKeyValueList;
        this.newArr_SouthAsian2 = pkvl.map(r => {
          return {
            name: r.porName,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        this.drawSex("SouthAsian");
      }
      if (copyArr.fatherRace === "American") {
        this.newArr_American.push(data);
        let pkvl = this.newArr_American;
        this.newArr_American2 = pkvl.map(r => {
          return {
            name: r.area,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        // this.drawSex("American");
      }
      if (copyArr.fatherRace === "African") {
        this.newArr_African.push(data);
        let pkvl = this.newArr_African;
        this.newArr_African2 = pkvl.map(r => {
          return {
            name: r.area,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        // this.drawSex("African");
      }
      if (copyArr.fatherRace === "East Asian") {
        this.newArr_EastAsian.push(data);
        let pkvl = this.newArr_EastAsian;
        this.newArr_EastAsian2 = pkvl.map(r => {
          return {
            name: r.area,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        // this.drawSex("EastAsian");
      }
      if (copyArr.fatherRace === "European") {
        this.newArr_European.push(data);
        let pkvl = this.newArr_European;
        this.newArr_European2 = pkvl.map(r => {
          return {
            name: r.area,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        // this.drawSex("European");
      }
      if (copyArr.fatherRace === "South Asian") {
        this.newArr_SouthAsian.push(data);
        let pkvl = this.newArr_SouthAsian;
        this.newArr_SouthAsian2 = pkvl.map(r => {
          return {
            name: r.area,
            value: r.testSmounts ? r.testSmounts : 0,
            fatherRace: r.fatherRace,
            race: r.race
          };
        });
        // this.drawSex("SouthAsian");
      }
    },
    drawSex(str) {
      if (str == "Chinese") {
        echartFun2.pie("Chinese", { data: this.newArr_Chinese2 });
      }
      if (str == "American") {
        echartFun2.pie("American", { data: this.newArr_American2 });
      }
      if (str == "African") {
        echartFun2.pie("African", { data: this.newArr_African2 });
      }
      if (str == "EastAsian") {
        echartFun2.pie("EastAsian", { data: this.newArr_EastAsian2 });
      }
      if (str == "European") {
        echartFun2.pie("European", { data: this.newArr_European2 });
      }
      if (str == "SouthAsian") {
        echartFun2.pie("SouthAsian", { data: this.newArr_SouthAsian2 });
      }
    },
    toShowBox(str) {
      if (this.tabCur == str) return;
      this.tabCur = str;
    },
    drawChinaMap() {
      let option = echartFun2.pie2(this.newArr_Genomes2);
      this.chart = this.$echarts.init(
        document.getElementById("Genomes"),
        "macarons"
      );
      this.chart.setOption(option);
    }
  },
  updated() {
    if (!this.chart) {
      this.drawChinaMap();
    }
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
