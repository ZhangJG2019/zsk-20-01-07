<template>
  <div class="show-box">
    <span
      style="color:#333; cursor:pointer;"
      @click="show = !show"
    >{{titleName}}<i :class="{'el-icon-caret-bottom':show,'el-icon-caret-top':!show}"></i></span>
    <div
      class="clearfix"
      v-show="show"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'labelShow',
  data() {
    return {
      show: true
    }
  },
  props: ['titleName']
}
</script>
<style lang="scss" scoped>
.show-box {
  padding-top: 3px;
  .label {
    background: #e3f0f7;
    color: #368ebe;
    font-size: 14px;
    line-height: 30px;
    padding: 0 10px;
    margin: 10px 10px 0 0;
    cursor: pointer;
    &:hover {
      color: #1577ac;
      box-shadow: 0 0 5px #cbe6f5;
    }
  }
}
</style>
