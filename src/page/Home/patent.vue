/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page style=" min-height: calc(100vh - 230px);">
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="authority-icon"></i>
          <span class="text">专利Patents)</span>
        </h4>
        <p class="text">
          专利注释是由专利网站收录的与药物基因相关的国内外专利文献，提供并保护检测基因多态性的引物或方法等内容，用于个体化用药临床指导。可全面反映涉及药物基因科研及产业化领域的最新进展。
          更多专利详情内容请查看题目。
        </p>
      </div>
      <div slot="filter-box">
        <p class="fr">共{{listAllNum}}条专利记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条</p>
        <div class="fl">
          <el-select v-model="filterSValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input placeholder="请输入内容" v-model="searchString" class="input-with-select">
            <el-button slot="append" @click="getPageData()">筛选</el-button>
          </el-input>
        </div>
      </div>
      <div class="content-box">
        <div class="table authority">
          <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
            <el-table-column label="药物" align="center" width="180">
              <template slot-scope="scope">
                <p
                  style="cursor: pointer;"
                  @click="toSearchContent('',scope.row.drug,'drug','0',true)"
                >{{scope.row.drug}}</p>
              </template>
            </el-table-column>
            <el-table-column label="基因" align="center">
              <template slot-scope="scope">
                <p
                  style="cursor: pointer;"
                  @click="toSearchContent('',scope.row.genes,'gene','0',true)"
                >{{scope.row.genes}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" width="450px" label="题目">
              <template slot-scope="scope">
                <p
                  style="color:#368ebe;text-align:left;cursor: pointer;"
                  @click="toDetailPage(scope.row)"
                >{{scope.row.title||'--'}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="applicant" align="center" label="申请人(专利人)"></el-table-column>
            <el-table-column prop="filingDate" align="center" label="申请日期"></el-table-column>
          </el-table>
        </div>
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
import { getPatentSortLable } from "@/api/labels_api.js";
import styleConfig, { splitLabel } from "@/utils/style_config.js";
import { setStore, getStore } from "@/utils/storage.js";
export default {
  name: "patent",
  // 生命周期函数

  data() {
    return {
      options: styleConfig.patent,
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
      getPatentSortLable(params)
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
    },
    toDetailPage(obj) {
      if (obj.type === 1) {
        let routeData = this.$router.resolve({
          path: "/p-c-detail",
          query: {
            literId: obj.liteId,
            type: obj.type
          }
        });
        let param = [
          {
            literName: obj.title,
            literId: obj.liteId,
            drugName: obj.drug,
            geneName: obj.genes,
            type: obj.type
          }
        ];
        setStore("patent", param);
        window.open(routeData.href, "_blank");
      } else if (obj.type === 2) {
        let routeData = this.$router.resolve({
          path: "/p-f-detail",
          query: {
            literId: obj.liteId,
            type: obj.type
          }
        });
        let param = [
          {
            literName: obj.title,
            literId: obj.liteId,
            drugName: obj.drug,
            geneName: obj.genes,
            type: obj.type
          }
        ];
        setStore("patent", param);
        window.open(routeData.href, "_blank");
      }
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
    padding: 8px 0;
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
    .authority {
      position: relative;
      margin-top: -1px;

      .el-tag {
        font-size: 15px;
        color: #fff;
        height: 40px;
        line-height: 30px;
        padding: 5px;
        min-width: 140px;
        text-align: left;
        .el-icon-document {
          font-size: 25px;
          vertical-align: sub;
          margin-right: 10px;
        }
      }
    }
    .pagination {
      margin-top: 40px;
    }
  }
}
</style>
