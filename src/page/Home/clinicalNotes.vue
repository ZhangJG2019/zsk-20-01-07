/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <label-page style=" min-height: calc(100vh - 230px);">
      <div slot="banner-text">
        <h4 class="box-title">
          <i class="jiyin-icon"></i>
          <span class="text">临床注释(Clinical Annotations)</span>
        </h4>
        <p
          class="text"
        >临床注释（基因/位点）是基于数据库中的文献做支撑，提供药物-基因-单个基因位点/多个基因位点的信息，描述基因型/多个基因位点对药物，表型的影响。其中临床注释（位点）根据“证据等级”划分为4类等级，其中等级1为最高标准。</p>
        <p class="text">更多临床注释信息请查看临床注释（基因），临床注释（位点）。</p>
      </div>
      <div slot="filter-box">
        <p class="fr">共{{listAllNum}}条临床注释记录，当前显示{{(pageNum*pageSize-9)+"-"+pageNum*pageSize}}条</p>
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
        <p v-if="!tableData.length&&!loading" style="text-align:center; padding-top:20px;">暂无数据</p>
        <ul v-loading="loading" style="min-height:150px;">
          <li class="content-list" v-for="(item,index) of tableData" :key="'notes'+index">
            <span class="list-icon"></span>
            <p style="color:#999;">临床注释</p>
            <p style="font-size:18px;color:#333; line-height:30px;">
              <span
                style="cursor: pointer;"
                @click="toSearchContent('',item.name,'project','0',true)"
              >
                {{item.name}}
                <em style="color:#888; padding-left:10px;">({{item.englishName||'--'}})</em>
              </span>
              <span style="cursor: pointer;" class="fr mores-text" @click="toGeneDetail(item)">
                查看临床注释(基因)
                <i class="el-icon-arrow-right"></i>
              </span>
            </p>

            <div class="table">
              <el-table :data="item.genePorTypeInfo" border style="width: 100%">
                <el-table-column label="证据等级" align="center" width="180">
                  <template slot-scope="scope">
                    <el-tag
                      color="#368ebe"
                      style="color:#fff; font-size:14px;"
                      class="el-tag"
                    >{{scope.row.evidenceLevel}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="genes" label="基因" align="center"></el-table-column>
                <el-table-column prop="porName" align="center" label="位点"></el-table-column>
                <el-table-column prop="rsId" align="center" label="位点RSID"></el-table-column>
                <el-table-column prop="medicationType" align="center" label="用药类型"></el-table-column>
                <el-table-column prop="phenotypes" align="center" label="表型"></el-table-column>
                <el-table-column prop="race" align="center" label="种族"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-tag
                      @click="toWeidDetail(scope.row)"
                      color="#d6e9f3"
                      class="el-tag"
                    >查看临床注释(位点)</el-tag>
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
import { getClinicalAnnotationSortLable } from "@/api/labels_api.js";
import styleConfig, { splitLabel } from "@/utils/style_config.js";
import { setStore, getStore } from "@/utils/storage.js";

export default {
  name: "clinicalnotes",
  // 生命周期函数

  data() {
    return {
      options: styleConfig.clinicalnotes,
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
      getClinicalAnnotationSortLable(params)
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
    toGeneDetail(obj) {
      let routeData = this.$router.resolve({
        path: "/c-n-g-detail",
        query: {
          projectId: obj.taskId
        }
      });
      let param = [
        {
          projectId: obj.taskId,
          projectName: obj.name
        }
      ];
      setStore("clinical_notes", param);
      window.open(routeData.href, "_blank");
    },
    toWeidDetail(obj) {
      // console.log(111111111111);
      // console.log(obj);
      let routeData = this.$router.resolve({
        path: "/c-n-w-detail",
        query: {
          genePorId: obj.porId,
          taskId: obj.liteId
        }
      });
      let param = [
        {
          genePorId: obj.porId,
          taskId: obj.liteId,
          projectName: obj.porName
        }
      ];
      setStore("clinical_notes", param);
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
        padding-top: 15px;
        &::after {
          content: "";
          background: url("../../public/images/clinicalnotes-icon2.png")
            no-repeat;
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
        .el-table td {
          .cell {
            padding: 0;
          }
        }

        .el-tag {
          min-width: 100px;
          cursor: pointer;
        }
      }
    }
    .pagination {
      margin-top: 40px;
    }
    .mores-text {
      font-size: 14px;
      color: #368ebe;
      cursor: pointer;
    }
  }
}
</style>
