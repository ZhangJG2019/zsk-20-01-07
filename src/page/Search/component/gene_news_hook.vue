<template>
  <div class="hook-box">
    <div class="right_centent">
      <p class="big_title">基因信息</p>
      <p class="two_title">概述</p>
      <P>
        了解基因，基因位于染色体的位置，基因别名，基因ID，基因位点，以及基因涉及的药物关系等信息，请点击“更多”进入基因相关信息。
        知识库提供与药物相关的基因信息，包括基因的位置，基因的描述，基因别名等数据。
      </P>
      <p>点击更多查看基因详情数据。。</p>
      <p
        v-if="!geneLabel.length&&!loading"
        style="text-align:center;height: 200px;line-height: 200px;font-size: 18px;"
      >暂无数据</p>
      <ul class="gene_list" v-loading="loading">
        <li v-for="(item, key) in geneLabel" :key="key" style="cursor:pointer;">
          <div
            class="right_left"
            style="float:left; margin:30px 20px 0 0; border:1px solid #e3f0f8;border-radius: 10px;"
          >
            <img src="../../../../static/images/newimg/gene_logo.png" />
          </div>
          <div
            class="right_right"
            style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;cursor:pointer;"
          >
            <div
              class="left_content"
              style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:100%;"
            >
              <!-- class="right_title" -->
              <span v-text="item.name" style="font-size: 1rem;color:#000;font-weight:700;"></span>
              <!-- @click="getContent(item.geneID, item.name)" -->
              <br />
              <span>别名:</span>
              <span class="right_title" v-text="item.alias"></span>
              <br />
              <span>基因ID</span>
              <span class="right_title" v-text="item.geneID"></span>
            </div>
          </div>
        </li>
        <li class="static_null gg" style="display:none">
          <a>未检索到数据，请重新输入关键字~</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  getGeneInfoListByGeneId,
  getGeneInfoListByProjectId,
  getGeneInfoListByDrugId
} from "@/api/labels_api.js";
export default {
  name: "gene_news_hook",
  data() {
    return {
      searchKey: "", //搜索关键字
      id: "", //搜索内容id
      type: "", //搜索内容类型
      loading: false,
      activeName: "first",
      geneLabel: [] // 基因扩展标签=基因信息
    };
  },
  props: ["queryData"],
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    this.handleClick();
  },
  methods: {
    handleClick(tab, event) {
      // let a = window.location.href;
      // let b = a.split("?");
      // let c = b[1].split("&");
      // let d = c[0].split("=");
      // let searchKey = d[1];
      // this.searchKey = decodeURI(searchKey);
      // let e = c[1].split("=");
      // this.id = e[1];
      // let f = c[2].split("=");
      // this.type = f[1];
      // if (this.type === "gene") {
      //   var url =
      //     "/apis/taskApi/getGeneInfoListByGeneId?id=" +
      //     this.id +
      //     "&name=" +
      //     this.searchKey;
      // } else if (this.type === "project") {
      //   var url = "/apis/taskApi/getGeneInfoListByProjectId?id=" + this.id;
      //   +"&name=" + this.searchKey;
      // } else if (this.type === "drug") {
      //   var url =
      //     "/apis/taskApi/getGeneInfoListByDrugId?id=" +
      //     this.id +
      //     "&name=" +
      //     this.searchKey;
      // }
      // this.loading = true;
      // axios({
      //   method: "get",
      //   url: url
      // });
      let param =
        this.queryData.type === "gene"
          ? { id: this.queryData.id || "", name: this.queryData.key || "" }
          : this.queryData.type === "project"
          ? {
              id: this.queryData.id || this.queryData.projectId || "",
              name: this.queryData.key || ""
            }
          : {
              id: this.queryData.id || "",
              name: this.queryData.key || ""
            };

      let queryData =
        this.queryData.type === "gene"
          ? getGeneInfoListByGeneId
          : this.queryData.type === "project"
          ? getGeneInfoListByProjectId
          : getGeneInfoListByDrugId;
      queryData(param)
        .then(res => {
          // console.log(res);
          this.loading = false;

          this.geneLabel = res;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.right_centent {
  padding-left: 20px;
}
.big_title {
  font-size: 24px;
  font-weight: 700;
  padding: 10px 0;
  border-bottom: 1px solid #000;
}
.two_title {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0.625rem;
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
