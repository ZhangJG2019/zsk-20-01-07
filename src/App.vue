<template>
  <div id="app" ref="homePage">
    <router-view class="main"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      clientHeight: ""
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  },
  methods: {
    // 动态修改样式
    changeFixed(clientHeight) {
      //动态修改样式
      console.log(clientHeight);
      this.$refs.homePage.style.height = clientHeight + "px";
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "assets/style/index.scss";

// #app {
//   // height: 100%;
// }
.main {
  // min-height: calc(100vh - 230px);
  background: #fff;
  width: 100%;
}

// .el-card__body {
//   // min-height: 370px !important;
//   // min-height: calc(100vh - 230px);
// }
.main {
  background: #fff;
}
</style>
