<template>
  <div class="footer">
    <div class="container">
      <div>
        <ul class="footUl">
          <li>
            <img src="../public/logo-bottom.png" alt />
          </li>
          <li>
            <p class="links">
              <a target="_blank" href="http://www.3gbio.com.cn/html/about/intro/">
                <strong>关于公司</strong>
              </a>
              <a href="####">
                <strong>|</strong>
              </a>
              <a target="_blank" href="http://www.3gbio.com.cn/html/privacy/">
                <strong>隐私条款</strong>
              </a>
              <a href="####">
                <strong>|</strong>
              </a>
              <a target="_blank" href="http://www.3gbio.com.cn/html/Legal-Notices/">
                <strong>法律声明</strong>
              </a>
              <a href="####">
                <strong>|</strong>
              </a>
              <a target="_blank" href="http://www.3gbio.com.cn/html/mail/">
                <strong>企业邮箱</strong>
              </a>
              <a href="####">
                <strong>|</strong>
              </a>
              <a target="_blank" href="https://www.cnzz.com/stat/website.php?web_id=4698979">
                <strong>站长统计</strong>
              </a>
            </p>
            <p class="copyright">
              <a
                target="_blank"
                href="http://www.miibeian.gov.cn/"
                style="color:#8e8e8e;"
              >湘ICP备18007563号-1</a>
              <strong style="color:#8e8e8e;">长沙三济生物科技有限公司 copyright 2012 © 版权所有</strong>
            </p>
          </li>
          <li>
            <img src="../public/images/phone.png" style="width:50px;height:50px;float:left;" alt />
            <p>
              <span style="color:#979A99;">免费服务热线</span>
              <br />
              <span style="color:#000;font-size:25px;">400-669-0369</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    YButton
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.links a {
  padding-right: 10px;
  color: #343434;
}
.footer .footUl,
.footer {
  width: 100%;
}
.footer .footUl li {
  float: left;
}
.footer .footUl li:first-child {
  width: 25%;
  // background-color: red;
  text-align: center;
}
.footer .footUl li:nth-child(2) {
  width: 50%;
  // background-color: yellow;
}
.footer .footUl li:last-child {
  width: 25%;
  // background-color: green;
}
.footer .footUl li:last-child p {
  float: left;
  color: #fff;
  padding: 0 42px 0 15px;
}
.footer {
  // margin-top: 10px;
  // margin-top: 10px;
  // padding: 25px 0px;
  padding: 60px 0px;
  background: #ebeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 1220px;
}

.siteinfo {
  height: 100px;
  padding: 50px 0 130px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}

.c0 {
  width: 149px;
  line-height: 1;
  float: left;
}

.c1 {
  color: #646464;
  font-size: 12px;
  padding: 0 0 14px;
}

.c2 {
  color: #c3c3c3;
  font-size: 12px;
  padding: 6px 0;
}

.c3 {
  color: #969696;
}

.c4 {
  position: absolute;
  right: 0;
  overflow: hidden;
  line-height: 34px;
}

.tel {
  font-size: 30px;
  line-height: 1;
  color: #646464;
  top: -2px;
  position: relative;
}

.c5 {
  color: #646464;
  right: -70px;
  position: relative;
}

.time {
  margin-top: 5px;
  right: -4px;
  position: relative;
  clear: both;
  width: 241px;
  font-size: 12px;
  line-height: 18px;
  color: #c3c3c3;
  text-align: right;
}

.online {
  clear: both;
  width: 241px;
  font-size: 12px;
  line-height: 18px;
  color: #c3c3c3;
  text-align: right;
}

.button {
  width: 130px;
  height: 34px;
  font-size: 14px;
  color: #5079d9;
  border: 1px solid #dcdcdc;
  margin-top: 8px;
}

.copyright {
  color: #434d55;
  font-size: 12px;
  padding: 20px 0 0;
  display: flex;
  align-items: left;
}

.privacy {
  float: left;
  margin: 0 0 0 12px;
}

.content-c0 {
  color: #5079d9;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #3a5fcd;
  }
}

.content-c1 {
  float: left;
  line-height: 12px;
  padding: 1px 10px 0;
  border-left: 1px solid #ccc;
}

.content-c2 {
  float: left;
  height: 15px;
  line-height: 15px;
  color: #757575;
}

.cop {
  clear: both;
  padding: 10px 0 0;
  height: 15px;
}

.content-c3 {
  margin-right: 20px;
  color: #bdbdbd;
  font-size: 12px;
  height: 12px;
  line-height: 1;
}
</style>
