<template>
  <div class="label-box">
    <div class="banner-text">
      <div class="w">
        <slot name="banner-text"></slot>
      </div>
    </div>
    <div class="w">
      <div class="filter-box clearfix">
        <slot name="filter-box"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'labelPage'
}
</script>
<style lang="scss">
.filter-box {
  .el-select {
    width: 155px;
  }
  .el-input-group {
    width: 300px;
  }
  .el-input__inner {
    height: 35px;
    line-height: 35px;
  }
}
</style>
<style lang="scss" scoped>
.label-box {
  .banner-text {
    background: #368ebe;
    // min-height: 250px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .box-title {
      line-height: 80px;
      .jiyin-icon {
        background: url('../public/images/jiyin-icon.png') no-repeat;
        background-size: contain;
        width: 36px;
        height: 78px;
        display: inline-block;
        vertical-align: top;
      }
      .drugs-icon {
        background: url('../public/images/drugs-icon.png') no-repeat;
        background-size: contain;
        width: 50px;
        height: 50px;
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        margin-left: 5px;
      }
      .drugs-genes-icon {
        background: url('../public/images/drugs-genes-icon.png') no-repeat;
        background-size: contain;
        width: 59px;
        height: 70px;
        display: inline-block;
        vertical-align: top;
      }
      .authority-icon {
        background: url('../public/images/authority-icon.png') no-repeat;
        background-size: contain;
        width: 49px;
        height: 50px;
        margin-top: 8px;
        display: inline-block;
        vertical-align: top;
      }
      .druglabels-icon {
        background: url('../public/images/druglabels-icon.png') no-repeat;
        background-size: contain;
        width: 50px;
        height: 50px;
        margin-top: 8px;
        display: inline-block;
        vertical-align: top;
      }
      .text {
        font-size: 32px;
        color: #fff;
        font-weight: 500;
        padding-left: 25px;
      }
    }
    .text {
      color: #fff;
      font-size: 15px;
      line-height: 30px;
      text-indent: 2em;
      // padding-top: 10px;
    }
  }
  .filter-box {
    padding: 20px 0 15px;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
    .input-box {
      display: inline-block;
    }
  }
}
</style>
