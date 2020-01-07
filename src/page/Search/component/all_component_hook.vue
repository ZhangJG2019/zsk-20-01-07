<template>
  <div class="hook-box">
    <el-col :span="24" style="padding-left:15px;">
      <!-- <p style="font-size:1.5rem;margin-left:20px;"><strong>总结</strong></p> -->
      <div class="left_cent">
        <ul class="box">
          <li style="width:100%;">
            <div
              style="width:60px;height:60px;float:left;margin: 15px; border-radius: 50%;  background-image: url(/static/images/newimg/linchuangzhinan.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"
            ></div>
            <div
              class="right_right"
              style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
            >
              <div class="left_content">
                <p>
                  <span style="font-size: 1.2rem;">
                    <strong>临床指南</strong>
                  </span>
                  <span style="font-size: 1.2rem;color:#aaa;">(Clinical Guildelines)</span>
                </p>
                <p class="buildTime" style="margin-top:10px;">
                  <strong style="font-size:19px;color:#358fbe;" v-text="this.clinicalGuidelines"></strong>
                </p>
              </div>
              <div class="drug_title">
                <ul>
                  <li>
                    全球临床指南 (
                    <span v-text="this.CGforeignnum"></span> )
                  </li>
                  <li>
                    中国专家共识 (
                    <span v-text="this.CGchina"></span> )
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li style="width:100%;">
            <div
              style="width:60px;height:60px;float:left;margin: 15px; border-radius: 50%;  background-image: url(/static/images/newimg/drug-title.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"
            ></div>
            <div
              class="right_right"
              style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
            >
              <div class="left_content">
                <p>
                  <span style="font-size: 1.2rem;">
                    <strong>药物标签</strong>
                  </span>
                  <span style="font-size: 1.2rem;color:#aaa;">(Drug Labels)</span>
                </p>
                <p class="buildTime" style="margin-top:10px;">
                  <strong style="font-size:19px;color:#358fbe;" v-text="this.drugTitle"></strong>
                </p>
              </div>
              <div class="drug_title">
                <ul>
                  <li>
                    全球药物标签 (
                    <span v-text="this.DTforeignnum"></span> )
                  </li>
                  <li>
                    中国药物标签 (
                    <span v-text="this.DTchina"></span> )
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li style="width:100%;">
            <div
              style="width:60px;height:60px;float:left;margin: 15px; border-radius: 50%;  background-image: url(/static/images/newimg/linchuangshiyan.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"
            ></div>
            <div
              class="right_right"
              style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
            >
              <div class="left_content">
                <p>
                  <span style="font-size: 1.2rem;">
                    <strong>临床试验</strong>
                  </span>
                  <span style="font-size: 1.2rem;color:#aaa;">(Clinical Trial)</span>
                </p>
                <p class="buildTime" style="margin-top:10px;">
                  <strong style="font-size:19px;color:#358fbe;" v-text="this.clinicalTest"></strong>
                </p>
              </div>
              <div class="drug_title">
                <ul>
                  <li>
                    全球临床试验 (
                    <span v-text="this.CTforeignnum"></span> )
                  </li>
                  <li>
                    中国临床试验 (
                    <span v-text="this.CTchina"></span> )
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li style="width:100%;">
            <div
              style="width:60px;height:60px;float:left;margin: 15px; border-radius: 50%;  background-image: url(/static/images/newimg/linchuangzhushi.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"
            ></div>
            <div
              class="right_right"
              style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
            >
              <div class="left_content">
                <p>
                  <span style="font-size: 1.2rem;">
                    <strong>临床注释</strong>
                  </span>
                  <span style="font-size: 1.2rem;color:#aaa;">(Clinical Annotations)</span>
                </p>
                <p class="buildTime" style="margin-top:10px;">
                  <strong style="font-size:19px;color:#358fbe;" v-text="this.LCzhushi"></strong>
                </p>
              </div>
              <div class="drug_title">
                <ul>
                  <li>
                    临床注释(基因) (
                    <span v-text="this.CADnum"></span> )
                  </li>
                  <li>
                    临床注释(位点) (
                    <span v-text="this.CAFnum"></span> )
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li style="width:100%;">
            <div
              style="width:60px;height:60px;float:left;margin: 15px; border-radius: 50%;  background-image: url(/static/images/newimg/home-partents.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"
            ></div>
            <div
              class="right_right"
              style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
            >
              <div class="left_content">
                <p>
                  <span style="font-size: 1.2rem;">
                    <strong>专利</strong>
                  </span>
                  <span style="font-size: 1.2rem;color:#aaa;">(Patents)</span>
                </p>
                <p class="buildTime" style="margin-top:10px;">
                  <strong style="font-size:19px;color:#358fbe;" v-text="this.patent"></strong>
                </p>
              </div>
              <div class="drug_title">
                <ul>
                  <li>
                    全球专利 (
                    <span v-text="this.PTforeignnum"></span> )
                  </li>
                  <li>
                    中国专利 (
                    <span v-text="this.PTchina"></span> )
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li style="width:100%;">
            <div
              style="width:60px;height:60px;float:left;margin: 15px; border-radius: 50%;  background-image: url(/static/images/newimg/tonglu2.png);background-repeat:no-repeat;background-size:60%;background-position:center center;background-color:#e7eff2;"
            ></div>
            <div
              class="right_right"
              style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;"
            >
              <div class="left_content">
                <p>
                  <span style="font-size: 1.2rem;">
                    <strong>通路</strong>
                  </span>
                  <span style="font-size: 1.2rem;color:#aaa;">(Pathways)</span>
                </p>
                <p class="buildTime" style="margin-top:10px;">
                  <strong style="font-size:19px;color:#358fbe;" v-text="this.pathwaysNum"></strong>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="search_gene" v-if="this.type=='drug'">
          <p style="margin:30px 0 10px 0;font-size:20px;">
            <strong>药物基本信息</strong>
          </p>
          <p style="margin-bottom:10px;">
            <span style="font-size:15px;margin-bottom:8px;">
              <strong>药物中文名称 :</strong>
            </span>
            <span v-text="this.drugName"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>药物英文名称 :</strong>
            </span>
            <span v-text="this.englishName"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>药物I :</strong>
            </span>
            <span v-text="this.drugType1"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>药物II类 :</strong>
            </span>
            <span v-text="this.drugType2"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>药物III类 :</strong>
            </span>
            <span v-text="this.drugType3"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>药物VI类 :</strong>
            </span>
            <span v-text="this.drugType4"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>药物ATC编码 :</strong>
            </span>
            <span v-text="this.atcCode"></span>
          </p>
          <p style="margin-bottom:8px;">
            <span style="font-size:15px;">
              <strong>商标名 :</strong>
            </span>
            <span v-text="this.tradeName"></span>
          </p>
        </div>
        <div class="search_drug" v-if="this.type=='gene'">
          <p style="margin:30px 0 10px 0;font-size:20px;">
            <strong>名称&代码</strong>
          </p>
          <p style="margin-bottom:10px;">
            <span>
              <strong>别名:</strong>
            </span>
            <span v-text="this.alias"></span>
          </p>
          <p>
            <span>
              <strong>基因ID:</strong>
            </span>
            <span v-text="this.geneId"></span>
          </p>
        </div>
        <div class="search_drugGene" v-if="this.type=='project'">
          <p style="margin:30px 0 10px 0;font-size:20px;">
            <strong>基本信息</strong>
          </p>
          <p style="margin-bottom:10px;">
            <span style="font-size:15px;">
              <strong>项目中文名称:</strong>
            </span>
            <span v-text="this.name"></span>
          </p>
          <p style="margin-bottom:10px;">
            <span style="font-size:15px;">
              <strong>项目英文名称:</strong>
            </span>
            <span v-text="this.englishName"></span>
          </p>
          <p style="margin-bottom:10px;">
            <span style="font-size:15px;">
              <strong>项目编码:</strong>
            </span>
            <span v-text="this.code"></span>
          </p>
          <p style="margin-bottom:10px;">
            <span style="font-size:15px;">
              <strong>描述:</strong>
            </span>
            <span
              v-if="this.projectRelationshipDescription===''||this.projectRelationshipDescription===[]||this.projectRelationshipDescription===null||this.projectRelationshipDescription===undefined"
            >暂无描述~</span>
            <span
              v-text="this.projectRelationshipDescription"
              v-if="this.projectRelationshipDescription!=''"
            ></span>
          </p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "clinical_guidelines_hook",
  data() {
    return {
      activeName: "first",

      searchKey: "", // 子组件Yheader传过来的搜索关键字
      type: "", // 搜索点击详情
      id: "", // 搜索点击详情
      menuName: "summary", // 搜索点击详情

      alias: "", //基因别名
      geneId: "", //基因ID

      name: "", //药物中文名称
      englishName: "", //药物英文名称
      code: "", //code
      projectRelationshipDescription: "", //描述

      drugName: "", // 药物中文名称:
      englishName: "", // 药物英文名称
      drugType1: "", // 药物I
      drugType2: "", // 药物II类:
      drugType3: "", // 药物III类:
      drugType4: "", // 药物VI类:
      atcCode: "", // 药物ATC编码:
      tradeName: "", // 商标名

      clinicalGuidelines: 0, // 临床指南
      CGforeignnum: 0, // 国外临床指南
      CGchina: 0, // 国内专家共识
      drugTitle: 0, // 药物标签
      DTforeignnum: 0, // 国外药物标签
      DTchina: 0, // 国内CFDA
      clinicalTest: 0, // 临床试验
      CTforeignnum: 0, // 国外临床试验
      CTchina: 0, // 国内临床试验
      LCzhushi: 0, // 临床注释
      CADnum: 0, // 临床注释(位点)
      CAFnum: 0, // 临床注释（基因）
      pathwaysNum: 0, // 通路
      patent: 0, // 专利
      PTforeignnum: 0, // 国外专利
      PTchina: 0 // 国内专利
    };
  },
  created() {
    this.handleClick();
  },
  methods: {
    handleClick(tab, event) {
      let a = window.location.href;
      let b = a.split("?");
      let c = b[1].split("&");
      let d = c[0].split("=");
      let searchKey = d[1];
      this.searchKey = decodeURI(searchKey);
      let e = c[1].split("=");
      this.id = e[1];
      let f = c[2].split("=");
      this.type = f[1];
      // console.log(this.type);
      if (this.type === "drug") {
        var url =
          "/apis/taskApi/getDrugSummaryInfo?name=" +
          this.searchKey +
          "&id=" +
          this.id;
      } else if (this.type === "gene") {
        var url =
          "/apis/taskApi/getGeneSummaryInfo?name=" +
          this.searchKey +
          "&id=" +
          this.id;
      } else if (this.type === "project") {
        var url =
          "/apis/taskApi/getDrugGeneSummaryInfo?name=" +
          this.searchKey +
          "&id=" +
          this.id;
      }
      axios.defaults.withCredentials = true;
      axios({
        method: "get",
        url: url
      }).then(res => {
        // let a = JSON.parse(res)
        let a = res.data;
        if (this.type === "drug") {
          this.drugName = a.name; // 药物中文名称:
          this.englishName = a.englishName; // 药物英文名称:
          this.tradeName = a.tradeName; // 商标名
          this.atcCode = a.atcCode; // 药物ATC编码:
          this.drugType1 = a.drugType1; // 药物I类:
          this.drugType2 = a.drugType2; // 药物II类:
          this.drugType3 = a.drugType3; // 药物III类:
          this.drugType4 = a.drugType4; // 药物VI类:
        } else if (this.type === "gene") {
          this.alias = a.alias; //基因别名
          this.geneId = a.geneID; //基因ID
        } else if (this.type === "project") {
          this.name = a.name; //药物中文名称
          this.englishName = a.englishName; //药物英文名称
          this.code = a.code; //code
          this.projectRelationshipDescription =
            a.projectRelationshipDescription; //描述
        }
        this.pathwaysNum = a.pathway; // 通路
        this.CGforeignnum = a.clinicalGuidelinesForeign; // 全球临床指南
        this.CGchina = a.clinicalGuidelinesDomestic; // 中国专家共识
        this.clinicalGuidelines = this.CGforeignnum + this.CGchina; // 临床指南
        this.DTforeignnum = a.drugLabelsForeign; // 国外药物标签
        this.DTchina = a.drugLabelsDomestic; // 国内CFDA
        this.drugTitle = this.DTforeignnum + this.DTchina; // 药物标签
        this.CTforeignnum = a.clinicalTrialForeign; // 国外临床试验
        this.CTchina = a.clinicalTrialDomestic; // 国内临床试验
        this.clinicalTest = this.CTforeignnum + this.CTchina; // 临床试验
        this.CADnum = a.clinicalAnnotationGene; // 临床注释(基因)
        this.CAFnum = a.clinicalAnnotationPor; // 临床注释(位点)
        this.LCzhushi = this.CADnum + this.CAFnum; // 临床注释
        this.PTforeignnum = a.patentForeign; // 国外专利
        this.PTchina = a.patentDomestic; // 国内专利
        this.patent = this.PTforeignnum + this.PTchina; // 专利
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.left_content {
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 50%;
  // background-color: red;
}
.drug_title {
  background-color: green;
}
.drug_title li {
  width: 190px;
  padding: 10px 0;
  text-align: center;
  color: #368ebe;
  background-color: #e3f0f7;
  float: left;
  margin: 9px 9px 0 0;
}
.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  // margin-top: 40px;
  box-sizing: border-box;
  // border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  // background: #ededed;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.text-box {
  line-height: 30px;
  color: #888;
  margin-top: 15px;
  font-size: 13px;
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
