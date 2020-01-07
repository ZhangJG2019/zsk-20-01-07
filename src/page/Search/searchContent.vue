<template>
  <div class="searchContent">
    <div class="box-top-title" :class="[queryObj.type+'-box']">
      <p class="w">
        <i class="icon-box"></i>
        {{queryObj.key}}
      </p>
    </div>
    <div class="w clearfix d-flex">
      <div class="left-box">
        <ul class="tips-list">
          <li
            class="list-box"
            :class="{'cur':item.value==tabsCur}"
            v-for="(item, index) in tabs"
            @click="tabsliClick(item,index)"
            :key="'tabs'+index"
          >
            <i class="el-icon-arrow-right icon-right"></i>
            {{item.label}}
          </li>
        </ul>
        <span class="tips-border" :style="{top:(tabIndex*40+35)+'px'}"></span>
      </div>
      <div class="right-content-box">
        <keep-alive>
          <component :is="componentVue" :queryData="queryObj"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { tabs } from "@/utils/style_config.js";

export default {
  name: "searchContent",
  // 生命周期函数
  data() {
    return {
      componentVue: "",
      tabs: tabs,
      tabsCur: "",
      tabIndex: "",
      queryObj: ""
    };
  },
  created() {
    this.queryObj =
      Object.keys(this.$route.query).length > 0 ? this.$route.query : {};
    let tabsIndex = this.queryObj.tabs ? this.queryObj.tabs : 0;
    this.tabsliClick(this.tabs[tabsIndex], tabsIndex);
    // console.log(this.tabs[tabsIndex], tabsIndex);
    // console.log(111111111);
    // console.log(this.queryObj);
  },
  components: {},
  methods: {
    tabsliClick(obj, index) {
      if (this.tabIndex === index) return;
      this.tabIndex = index;
      this.tabsCur = obj.value;
      // console.log(obj.value);
      this.getComponentVue(obj.value);
    },
    // 根据点击标签获取组件
    getComponentVue(str) {
      let path = `component/${str}_hook.vue`;
      var b = import(/* webpackChunkName: "[request]" */ "./" + path);

      Vue.component(str, () => b);
      b.then(() => {
        this.componentVue = str;
      }).catch(err => {
        this.componentVue = "";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.searchContent {
  background: #fff;
  .box-top-title {
    height: 138px;
    padding: 30px 0;
    line-height: 75px;
    font-size: 32px;
    color: #fff;
    .icon-box {
      margin-right: 20px;
    }
    &.gene-box {
      background: #ff9a66;
      .icon-box {
        background: url("../../public/images/jiyin-icon.png") no-repeat;
        background-size: contain;
        width: 36px;
        height: 78px;
        display: inline-block;
        vertical-align: top;
      }
    }
    &.drug-box {
      background: #9bc9a4;
      .icon-box {
        background: url("../../public/images/drugs-icon.png") no-repeat;
        background-size: contain;
        width: 50px;
        height: 50px;
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        margin-left: 5px;
      }
    }
    &.project-box {
      background: #368ebe;
      .icon-box {
        background: url("../../public/images/drugs-genes-icon.png") no-repeat;
        background-size: contain;
        width: 59px;
        height: 70px;
        display: inline-block;
        vertical-align: top;
      }
    }
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
  }
}
</style>

