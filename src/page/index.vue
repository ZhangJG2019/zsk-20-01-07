<template>
  <div ref="homePage">
    <y-header></y-header>
    <router-view class="main"></router-view>
    <y-footer></y-footer>
    <!--抛物图片-->
    <transition @after-enter="afterEnter" @before-enter="beforeEnter">
      <!--整张图片-->
      <div
        class="move_img"
        v-if="showMoveImg"
        :style="{
          left: cartPositionL - 10 + 'px',
          top: cartPositionT - 10 + 'px'
        }"
      >
        <div>
          <img :src="moveImgUrl" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import YHeader from "/common/header";
import YFooter from "/common/footer";
import { mapState, mapMutations } from "vuex";
export default {
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
  computed: {
    ...mapState([
      "cartPositionT",
      "cartPositionL",
      "showMoveImg",
      "elLeft",
      "elTop",
      "moveImgUrl"
    ])
  },
  methods: {
    // 动态修改样式
    changeFixed(clientHeight) {
      //动态修改样式
      console.log(clientHeight);
      this.$refs.homePage.style.height = clientHeight + "px";
    },
    ...mapMutations(["ADD_ANIMATION"]),
    // 监听图片进入购物车
    listenInCart() {
      this.ADD_ANIMATION({ moveShow: false, receiveInCart: true });
    },
    beforeEnter(el) {
      let elStyle = el.style;
      let elChild = el.children[0];
      let elChildSty = elChild.style;
      elStyle.transform = `translate3d(0,${this.elTop -
        this.cartPositionT}px,0)`;
      elChildSty.transform = `translate3d(${-(
        this.cartPositionL - this.elLeft
      )}px,0,0) scale(1.2)`;
    },
    afterEnter(el) {
      let elStyle = el.style;
      let elChild = el.children[0];
      let elChildSty = elChild.style;
      elStyle.transform = `translate3d(0,0,0)`;
      elChildSty.transform = `translate3d(0,0,0) scale(.2)`;
      elStyle.transition = "transform .55s cubic-bezier(.29,.55,.51,1.08)";
      elChildSty.transition = "transform .55s linear";
      // 动画结束
      elChild.addEventListener("transitionend", () => {
        this.listenInCart();
      });
      elChild.addEventListener("webkitAnimationEnd", () => {
        this.listenInCart();
      });
    }
  },
  components: {
    YHeader,
    YFooter
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../assets/style/mixin";

.main {
  min-height: calc(100vh - 230px);
  background: #fff;
  width: 100%;
}

.bn {
  border-style: none;
  border-width: 0;
  border: none;
}

.move_img {
  position: fixed;
  @include wh(40px);
  width: 45px;
  z-index: 29;
  height: 45px;
  div {
    @extend .bn;
  }
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: block;
    @extend .bn;
  }
}
</style>
