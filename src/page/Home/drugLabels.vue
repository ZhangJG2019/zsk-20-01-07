/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page style=" min-height: calc(100vh - 230px);">
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="druglabels-icon"></i>
          <span class="text">药物标签(Drug Labels)</span>
        </h4>
        <p
          class="text"
        >药物标签注释是由美国食品和药物管理局（FDA），欧洲药品管理局（EMA），瑞士医疗产品管理局（Swiss），日本医药品与医疗器械局（PMDA）和加拿大卫生部（HCSC），CFDA批准的有关药物基因组学信息的标签。</p>
        <p class="text">药物标签注释提供了药物，基因注释的摘要以及可下载的药物标签PDF文件，并使用“ PGx Level”标签解释每个标签中暗含的循证等级。</p>
        <p class="text">我们欢迎FDA，EMA，Swiss，PMDA，HCSC，CFDA或世界其他医学机构认可基于PGx的药物标签信息-请与我们联系。</p>
      </div>
      <div slot="filter-box">
        <p class="fr">共{{listAllNum}}条药物标签记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条</p>
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
          <li class="content-list" v-for="(item,index) of tableData" :key="'labels+'+index">
            <span class="list-icon"></span>
            <p style="color:#999;">药物标签</p>
            <p
              style="font-size:18px;color:#333; line-height:30px; cursor: pointer"
              @click="toSearchContent('',item.name,'project','0',true)"
            >
              {{item.name}}
              <em style="color:#888; padding-left:10px;">({{item.englishName}})</em>
            </p>
            <div class="table druglabels">
              <el-table :data="arrChange(item)" border style="width: 100%">
                <el-table-column label="FDA" align="center">
                  <template slot-scope="scope">
                    <ol class="tips-list">
                      <li
                        v-for="list of filterData(scope.row.drugLabelList,'FDA')"
                        :key="list.liteId"
                        @click="toSearchContent(item.id,item.name,'project','2',true)"
                      >
                        <el-tag :color="returnColor(list.pgxLevel)" class="el-tag">{{list.pgxLevel}}</el-tag>
                      </li>
                    </ol>
                  </template>
                </el-table-column>
                <el-table-column label="EMA" align="center">
                  <template slot-scope="scope">
                    <ol class="tips-list">
                      <li
                        v-for="list of filterData(scope.row.drugLabelList,'EMA')"
                        :key="list.liteId"
                        @click="toSearchContent(item.id,item.name,'project','2',true)"
                      >
                        <el-tag :color="returnColor(list.pgxLevel)" class="el-tag">{{list.pgxLevel}}</el-tag>
                      </li>
                    </ol>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="HCSC">
                  <template slot-scope="scope">
                    <ol class="tips-list">
                      <li
                        v-for="list of filterData(scope.row.drugLabelList,'HCSC')"
                        :key="list.liteId"
                        @click="toSearchContent(item.id,item.name,'project','2',true)"
                      >
                        <el-tag :color="returnColor(list.pgxLevel)" class="el-tag">{{list.pgxLevel}}</el-tag>
                      </li>
                    </ol>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="PMDA">
                  <template slot-scope="scope">
                    <ol class="tips-list">
                      <li
                        v-for="list of filterData(scope.row.drugLabelList,'PMDA')"
                        :key="list.liteId"
                        @click="toSearchContent(item.id,item.name,'project','2',true)"
                      >
                        <el-tag :color="returnColor(list.pgxLevel)" class="el-tag">{{list.pgxLevel}}</el-tag>
                      </li>
                    </ol>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="CFDA">
                  <template slot-scope="scope">
                    <ol class="tips-list">
                      <li
                        v-for="list of filterData(scope.row.drugLabelList,'CFDA')"
                        :key="list.liteId"
                        @click="toSearchContent(item.id,item.name,'project','2',true)"
                      >
                        <el-tag :color="returnColor(list.pgxLevel)" class="el-tag">{{list.pgxLevel}}</el-tag>
                      </li>
                    </ol>
                  </template>
                </el-table-column>
              </el-table>
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
import { getDrugLabelsSortLable } from "@/api/labels_api.js";
import styleConfig, { splitLabel } from "@/utils/style_config.js";

export default {
  name: "druglabels",
  // 生命周期函数

  data() {
    return {
      options: styleConfig.druglabels,
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
    filterData(arr, str) {
      return arr.filter(res => res.source == str);
    },
    arrChange(obj) {
      if (Object.prototype.toString.call(obj) === "[object Array]") return obj;
      return [obj];
    },
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
      getDrugLabelsSortLable(params)
        .then(res => {
          this.loading = false;
          // console.log(res.list);
          this.tableData = res.list;
          // this.tableData = res.list || []
          this.listAllNum = res.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    returnColor(str) {
      let colorV = "";
      switch (str) {
        case "Testing required":
          colorV = "#c36";
          break;
        case "Testing recommended":
          colorV = "#f96";
          break;
        case "Informative PGx":
          colorV = "#368ebe";
          break;
        case "Actionable PGx":
          colorV = "#9ac9a3";
          break;
        default:
          colorV = "#ccc";
      }
      return colorV;
    },
    toSearchContent(geneId, name, type, str, num) {
      // console.log(num);
      if (!num) return;
      let routeData = this.$router.resolve({
        path: "/searchContent",
        query: {
          key: name,
          id: geneId,
          type: type,
          tabs: str
        }
      });

      window.open(routeData.href, "_blank");
    }
  },
  components: {
    LabelPage,
    YHeader,
    YFooter
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
    font-weight: normal;
    color: #333;
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
        padding-top: 14px;
        &::after {
          content: "";
          background: url("../../public/images/druglabels-icon2.png") no-repeat;
          background-size: contain;
          width: 30px;
          height: 30px;
          display: inline-block;
        }
      }
      .table {
        margin-top: 10px;
        .el-table th {
          background: #ebf3f8;
          border: none;
        }
        &.druglabels {
          .el-tag {
            font-size: 15px;
            color: #fff;
            height: 30px;
            line-height: 18px;
            padding: 5px 20px;
            min-width: 100px;
          }
          .tips-list {
            text-align: left;
            li {
              padding-left: 15px;
              margin-bottom: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .pagination {
      margin-top: 40px;
    }
  }
}
</style>
