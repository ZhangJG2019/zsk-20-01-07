/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page style=" min-height: calc(100vh - 230px);">
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="drugs-genes-icon"></i>
          <span class="text">药物-基因(Drugs-Genes)</span>
        </h4>
        <p class="text">药物-基因通过汇总国内外指南，国内外药物标签，国内外临床试验，国内外专利，临床注释（基因），临床注释（位点），通路的信息，提供快速便捷检索的方式。</p>
        <p class="text">药物-基因的更多详情请查看全球临床指南，中国专家共识，全球药物标签，中国药物标签，中国临床试验等标签。</p>
      </div>
      <div slot="filter-box">
        <p class="fr">共{{listAllNum}}条药物-基因记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条</p>
        <div class="fl">
          <el-select v-model="filterSValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button class="filter-button" @click="getPageData()">筛选</el-button>
        </div>
      </div>
      <div class="content-box">
        <p v-if="!tableData.length&&!loading" style="text-align:center; padding-top:20px;">暂无数据</p>
        <ul v-loading="loading" style="min-height:150px;">
          <li class="content-list" v-for="(item,index) of tableData" :key="'pair+'+index">
            <span class="list-icon"></span>
            <p style="color:#999;">药物-基因</p>
            <p
              style="font-size:18px;color:#333; line-height:30px;cursor: pointer"
              @click="toSearchContent(item.id,item.name,'project','0',true)"
            >
              {{item.name}}
              <em style="color:#888; padding-left:10px;">({{item.englishName}})</em>
            </p>

            <div class="show-box bor-bot clearfix">
              <p
                @click="toSearchContent(item.id,item.name,'project','1',!!item.foreignClinicalGuidelines)"
                class="fl label"
                :class="{'black':item.foreignClinicalGuidelines=='0'||!item.foreignClinicalGuidelines}"
              >全球临床指南 ( {{item.foreignClinicalGuidelines}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','1',!!item.domesticClinicalGuidelines)"
                class="fl label"
                :class="{'black':item.domesticClinicalGuidelines=='0'||!item.domesticClinicalGuidelines}"
              >中国专家共识 ( {{item.domesticClinicalGuidelines}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','2',!!item.domesticDrugLabels)"
                class="fl label"
                :class="{'black':item.domesticDrugLabels=='0'||!item.domesticDrugLabels}"
              >中国药物标签 ( {{item.domesticDrugLabels}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','2',!!item.foreignDrugLabels)"
                class="fl label"
                :class="{'black':item.foreignDrugLabels=='0'||!item.foreignDrugLabels}"
              >全球药物标签 ( {{item.foreignDrugLabels}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','4',!!item.domesticClinicalTrial)"
                class="fl label"
                :class="{'black':item.domesticClinicalTrial=='0'||!item.domesticClinicalTrial}"
              >国内临床试验 ( {{item.domesticClinicalTrial}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','4',!!item.foreignClinicalTrial)"
                class="fl label"
                :class="{'black':item.foreignClinicalTrial=='0'||!item.foreignClinicalTrial}"
              >国外临床试验 ( {{item.foreignClinicalTrial}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','5',!!item.domesticPatent)"
                class="fl label"
                :class="{'black':item.domesticPatent=='0'||!item.domesticPatent}"
              >国内专利 ( {{item.domesticPatent}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','5',!!item.foreignPatent)"
                class="fl label"
                :class="{'black':item.foreignPatent=='0'||!item.foreignPatent}"
              >国外专利 ( {{item.foreignPatent}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','3',!!item.geneClinicalAnnotation)"
                class="fl label"
                :class="{'black':item.geneClinicalAnnotation=='0'||!item.geneClinicalAnnotation}"
              >临床注释(基因) ( {{item.geneClinicalAnnotation}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','3',!!item.porClinicalAnnotation)"
                class="fl label"
                :class="{'black':item.porClinicalAnnotation=='0'||!item.porClinicalAnnotation}"
              >临床注释（位点）( {{item.porClinicalAnnotation}} )</p>
              <p
                @click="toSearchContent(item.id,item.name,'project','6',!!item.pathway)"
                class="fl label"
                :class="{'black':item.pathway=='0'||!item.pathway}"
              >通路 ( {{item.pathway}} )</p>
            </div>
          </li>
        </ul>
        <div class="pagination clearfix">
          <div
            class="fl"
            style="color:#888;"
          >当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条记录,共{{listAllNum}}条记录</div>
          <div class="fr">
            <el-pagination
              background
              :page-size="pageSize"
              @current-change="pageChange"
              layout="prev, pager, next"
              :total="listAllNum"
            ></el-pagination>
          </div>
        </div>
      </div>
    </label-page>
    <y-footer></y-footer>
  </div>
</template>
<script>
import YHeader from "/common/header";
import YFooter from "/common/footer";
import LabelPage from "@/components/label-page.vue";
import { getDrugGeneSortLable } from "@/api/labels_api.js";
import styleConfig, { splitLabel } from "@/utils/style_config.js";

export default {
  name: "drugGenePair",
  // 生命周期函数

  components: {
    LabelPage,
    YHeader,
    YFooter
  },
  data() {
    return {
      options: styleConfig.drugGenePair,
      search: false,
      searchField: null,
      searchString: null,
      searchOper: null,
      filterValue: "",
      filterSValue: "",
      pageSize: 10,
      pageNum: 1,
      listAllNum: 0,
      tableData: [],
      loading: false
    };
  },
  created() {
    this.getListDatas();
  },
  mounted() {},
  methods: {
    pageChange(v) {
      if (v == this.pageNum) return;
      this.pageNum = v;
      this.getListDatas();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    getPageData() {
      this.pageNum = 1;
      this.search = true;
      this.searchField = splitLabel(this.filterSValue)
        ? splitLabel(this.filterSValue)[0]
        : null;
      this.searchOper = "link";
      this.searchString = splitLabel(this.filterSValue)
        ? splitLabel(this.filterSValue)[1]
        : null;
      this.getListDatas();
    },
    getListDatas() {
      var params = {
        search: this.search,
        searchField: this.searchField,
        searchString: this.searchString,
        searchOper: this.searchOper,
        rows: this.pageSize,
        page: this.pageNum
      };
      this.tableData = [];
      this.loading = true;
      getDrugGeneSortLable(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.list || [];
          this.listAllNum = res.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    toSearchContent(geneId, name, type, str, num) {
      // console.log(num);
      if (!num) return;
      if (geneId !== "") {
        var routeData = this.$router.resolve({
          path: "/searchContent",
          query: {
            key: name,
            projectId: geneId,
            type: type,
            tabs: str
          }
        });
      } else if (geneId === "") {
        var routeData = this.$router.resolve({
          path: "/searchContent",
          query: {
            key: name,
            type: type,
            tabs: str
          }
        });
      }
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style  lang="scss" >
.table {
  .el-table {
    border: 1px solid #ccc;
  }
  .el-table th {
    background: #ebf3f8;
    border: none;
    padding: 4px 0;
  }
  .el-table td {
    border-bottom: none;
    color: #333;
    font-size: 14px;
    border-right: 1px solid #ccc;
  }
}
.pagination {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #368ebe;
  }
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
.taskhall {
  background: #fff;
  .input-with-select {
    margin-left: 15px;
  }
  .content-box {
    min-height: 100px;
    padding-bottom: 30px;
    .content-list {
      position: relative;
      padding-left: 80px;
      margin-top: 20px;
      min-height: 50px;
      .list-icon {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 0;
        left: 0;
        border: 1px solid #eee;
        border-radius: 15px;
        text-align: center;
        padding-top: 9px;
        &::after {
          content: "";
          background: url("../../public/images/drugs-genes-icon2.png") no-repeat;
          background-size: contain;
          width: 34px;
          height: 40px;
          display: inline-block;
        }
      }
      .table {
        margin-top: 20px;
        .el-table th {
          background: #ebf3f8;
          border: none;
        }
      }
      .list-text {
        padding-top: 10px;
        line-height: 26px;
        font-size: 14px;
        color: #666;
        padding-bottom: 10px;
        border-bottom: 1px solid #e9e9e9;
      }
      .bor-bot {
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 15px;
      }
    }
    .pagination {
      margin-top: 40px;
    }
    .show-box {
      padding-top: 3px;
      .label {
        cursor: pointer;
        background: #e3f0f7;
        color: #368ebe;
        font-size: 14px;
        line-height: 30px;
        padding: 0 10px;
        margin: 10px 10px 0 0;
        cursor: pointer;
        &.black {
          background: #ededed;
          color: #666;
        }
        &:hover {
          color: #1577ac;
          box-shadow: 0 0 5px #cbe6f5;
        }
      }
    }
  }
  .filter-button {
    height: 35px;
    vertical-align: middle;
    line-height: 35px;
    padding: 0 15px;
    background: #eee;
  }
}
</style>
