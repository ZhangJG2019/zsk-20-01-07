<template>
  <div class="detail-content">
    <div class="clearfix breadcrumb-nav">
      <div class="w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
          <el-breadcrumb-item>数据统计-c</el-breadcrumb-item>
          <el-breadcrumb-item>内容详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="border-top:1px solid #eee;">
      <div class="w clearfix d-flex">
        <div class="left-box">
          <ul class="tips-list">
            <li class="list-box" :class="{'cur':tabsCur=='0'}" @click="tabsliClick('0')">
              <i class="el-icon-arrow-right icon-right"></i>总结
            </li>
            <li class="list-box" :class="{'cur':tabsCur=='1'}" @click="tabsliClick('1')">
              <i class="el-icon-arrow-right icon-right"></i>药物商品名
            </li>
            <li class="list-box" :class="{'cur':tabsCur=='2'}" @click="tabsliClick('2')">
              <i class="el-icon-arrow-right icon-right"></i>药物说明书
            </li>
            <li class="list-box" :class="{'cur':tabsCur=='3'}" @click="tabsliClick('3')">
              <i class="el-icon-arrow-right icon-right"></i>药物医保目录
            </li>
            <li class="list-box" :class="{'cur':tabsCur=='4'}" @click="tabsliClick('4')">
              <i class="el-icon-arrow-right icon-right"></i>药物相互作用
            </li>
          </ul>
          <span class="tips-border" :style="{top:(tabIndex*40+35)+'px'}"></span>
        </div>
        <div class="right-content-box">
          <p class="detail-tab">
            <el-button class="tabcur">图示</el-button>
            <el-button class="tabdefault">列表</el-button>
          </p>
          <div class="china-box">
            <div class="echarts-box">
              <div :style="{height:height,width:width}" ref="myEchart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import echarts from "echarts"; //引入组件
import "../../../../../node_modules/echarts/map/js/world.js";
export default {
  name: "dataStatisticsChina",
  props: {
    width: { type: String, default: "100%" },
    height: { type: String, default: "500px" }
  },
  // 生命周期函数
  data() {
    return {
      chart: null,
      data: [
        {
          name: "俄罗斯",
          value: 1707.5
        },
        {
          name: "加拿大",
          value: 997.1
        },
        {
          name: "中国",
          value: 960.1
        },
        {
          name: "美国",
          value: 936.4
        },
        {
          name: "巴西",
          value: 854.7
        },
        {
          name: "澳大利亚",
          value: 774.1
        },
        {
          name: "印度",
          value: 328.8
        },
        {
          name: "阿根廷",
          value: 278
        },
        {
          name: "哈萨克斯坦",
          value: 271.7
        },
        {
          name: "苏丹",
          value: 250.6
        },
        {
          name: "阿尔及利亚",
          value: 238.2
        },
        {
          name: "刚果民主共和国",
          value: 234.5
        },
        {
          name: "格陵兰",
          value: 216.6
        },
        {
          name: "沙特阿拉伯",
          value: 215
        },
        {
          name: "墨西哥",
          value: 195.8
        },
        {
          name: "印度尼西亚",
          value: 190.5
        },
        {
          name: "利比亚",
          value: 176
        },
        {
          name: "伊朗",
          value: 163.3
        },
        {
          name: "蒙古",
          value: 156.7
        },
        {
          name: "秘鲁",
          value: 128.5
        },
        {
          name: "乍得",
          value: 128.4
        },
        {
          name: "尼日尔",
          value: 126.7
        },
        {
          name: "安哥拉",
          value: 124.7
        },
        {
          name: "马里",
          value: 124
        },
        {
          name: "南非",
          value: 122.1
        },
        {
          name: "哥伦比亚",
          value: 113.9
        },
        {
          name: "埃塞俄比亚",
          value: 110.4
        },
        {
          name: "玻利维亚",
          value: 109.9
        },
        {
          name: "毛里塔尼亚",
          value: 102.6
        },
        {
          name: "埃及",
          value: 100.1
        },
        {
          name: "坦桑尼亚",
          value: 94.5
        },
        {
          name: "尼日利亚",
          value: 92.4
        },
        {
          name: "委内瑞拉",
          value: 91.2
        },
        {
          name: "纳米比亚",
          value: 82.4
        },
        {
          name: "莫桑比克",
          value: 80.2
        },
        {
          name: "巴基斯坦",
          value: 79.6
        },
        {
          name: "土耳其",
          value: 77.5
        },
        {
          name: "智利",
          value: 75.7
        },
        {
          name: "赞比亚",
          value: 75.3
        },
        {
          name: "缅甸",
          value: 67.7
        },
        {
          name: "阿富汗",
          value: 65.2
        },
        {
          name: "索马里",
          value: 63.8
        },
        {
          name: "中非",
          value: 62.3
        },
        {
          name: "南苏丹",
          value: 61.9
        },
        {
          name: "乌克兰",
          value: 60.4
        },
        {
          name: "马达加斯加",
          value: 58.7
        },
        {
          name: "博茨瓦纳",
          value: 58.2
        },
        {
          name: "肯尼亚",
          value: 58
        },
        {
          name: "法国",
          value: 55.2
        },
        {
          name: "也门",
          value: 52.8
        },
        {
          name: "泰国",
          value: 51.3
        },
        {
          name: "西班牙",
          value: 50.6
        },
        {
          name: "土库曼斯坦",
          value: 48.8
        },
        {
          name: "喀麦隆",
          value: 47.5
        },
        {
          name: "巴布亚新几内亚",
          value: 46.3
        },
        {
          name: "瑞典",
          value: 45
        },
        {
          name: "乌兹别克斯坦",
          value: 44.7
        },
        {
          name: "摩洛哥",
          value: 44.7
        },
        {
          name: "伊拉克",
          value: 43.8
        },
        {
          name: "巴拉圭",
          value: 40.7
        },
        {
          name: "津巴布韦",
          value: 39.1
        },
        {
          name: "日本",
          value: 37.8
        },
        {
          name: "德国",
          value: 35.7
        },
        {
          name: "刚果",
          value: 34.2
        },
        {
          name: "芬兰",
          value: 33.8
        },
        {
          name: "越南",
          value: 33.2
        },
        {
          name: "马来西亚",
          value: 33
        },
        {
          name: "挪威",
          value: 32.4
        },
        {
          name: "波兰",
          value: 32.3
        },
        {
          name: "科特迪瓦",
          value: 32.2
        },
        {
          name: "意大利",
          value: 30.1
        },
        {
          name: "菲律宾",
          value: 30
        },
        {
          name: "厄瓜多尔",
          value: 28.4
        },
        {
          name: "布基纳法索",
          value: 27.4
        },
        {
          name: "新西兰",
          value: 27.1
        },
        {
          name: "西撒哈拉",
          value: 26.6
        },
        {
          name: "加蓬",
          value: 26.8
        },
        {
          name: "几内亚",
          value: 24.6
        },
        {
          name: "英国",
          value: 24.5
        },
        {
          name: "乌干达",
          value: 24.1
        },
        {
          name: "加纳",
          value: 23.9
        },
        {
          name: "罗马尼亚",
          value: 23.8
        },
        {
          name: "老挝",
          value: 23.7
        },
        {
          name: "圭亚那",
          value: 21.5
        },
        {
          name: "阿曼",
          value: 21.2
        },
        {
          name: "白俄罗斯",
          value: 20.8
        },
        {
          name: "吉尔吉斯斯坦",
          value: 19.9
        },
        {
          name: "塞内加尔",
          value: 19.7
        },
        {
          name: "叙利亚",
          value: 18.5
        },
        {
          name: "柬埔寨",
          value: 18.1
        },
        {
          name: "乌拉圭",
          value: 17.7
        },
        {
          name: "突尼斯",
          value: 16.4
        },
        {
          name: "苏里南",
          value: 16.3
        },
        {
          name: "尼泊尔",
          value: 14.7
        },
        {
          name: "孟加拉国",
          value: 14.4
        },
        {
          name: "塔吉克斯坦",
          value: 14.3
        },
        {
          name: "希腊",
          value: 13.2
        },
        {
          name: "尼加拉瓜",
          value: 13
        },
        {
          name: "朝鲜",
          value: 12.1
        },
        {
          name: "厄立特里亚",
          value: 12.4
        },
        {
          name: "马拉维",
          value: 11.8
        },
        {
          name: "贝宁",
          value: 11.3
        },
        {
          name: "洪都拉斯",
          value: 11.2
        },
        {
          name: "利比里亚",
          value: 11.1
        },
        {
          name: "古巴",
          value: 11.1
        },
        {
          name: "保加利亚",
          value: 11.1
        },
        {
          name: "危地马拉",
          value: 10.9
        },
        {
          name: "冰岛",
          value: 10.3
        },
        {
          name: "南斯拉夫",
          value: 10.2
        },
        {
          name: "韩国",
          value: 9.9
        },
        {
          name: "匈牙利",
          value: 9.3
        },
        {
          name: "葡萄牙",
          value: 9.2
        },
        {
          name: "约旦",
          value: 8.9
        },
        {
          name: "塞尔维亚",
          value: 8.83
        },
        {
          name: "阿塞拜疆",
          value: 8.7
        },
        {
          name: "阿联酋",
          value: 8.4
        },
        {
          name: "奥地利",
          value: 8.4
        },
        {
          name: "捷克",
          value: 7.9
        },
        {
          name: "巴拿马",
          value: 7.6
        },
        {
          name: "塞拉里昂",
          value: 7.2
        },
        {
          name: "爱尔兰",
          value: 7
        },
        {
          name: "塞拉利昂",
          value: 7.17
        },
        {
          name: "格鲁吉亚",
          value: 6.9
        },
        {
          name: "斯里兰卡",
          value: 6.6
        },
        {
          name: "拉脱维亚",
          value: 6.5
        },
        {
          name: "立陶宛",
          value: 6.5
        },
        {
          name: "多哥",
          value: 5.7
        },
        {
          name: "克罗地亚",
          value: 5.7
        },
        {
          name: "波斯尼亚和黑塞哥维那",
          value: 5.12
        },
        {
          name: "哥斯达黎加",
          value: 5.1
        },
        {
          name: "斯洛伐克",
          value: 4.9
        },
        {
          name: "多米尼加",
          value: 4.9
        },
        {
          name: "不丹",
          value: 4.7
        },
        {
          name: "爱沙尼亚",
          value: 4.5
        },
        {
          name: "丹麦",
          value: 4.3
        },
        {
          name: "荷兰",
          value: 4.1
        },
        {
          name: "瑞士",
          value: 4.1
        },
        {
          name: "几内亚比绍",
          value: 3.6
        },
        {
          name: "摩尔多瓦",
          value: 3.38
        },
        {
          name: "比利时",
          value: 3.3
        },
        {
          name: "亚美尼亚",
          value: 3
        },
        {
          name: "莱索托",
          value: 3
        },
        {
          name: "阿尔巴尼亚",
          value: 2.9
        },
        {
          name: "所罗门群岛",
          value: 2.9
        },
        {
          name: "布隆迪",
          value: 2.8
        },
        {
          name: "赤道几内亚",
          value: 2.8
        },
        {
          name: "海地",
          value: 2.8
        },
        {
          name: "玻里尼西亚",
          value: 2.7
        },
        {
          name: "卢旺达",
          value: 2.6
        },
        {
          name: "马其顿",
          value: 2.57
        },
        {
          name: "吉布提",
          value: 2.3
        },
        {
          name: "伯利兹",
          value: 2.3
        },
        {
          name: "以色列",
          value: 2.1
        },
        {
          name: "萨尔瓦多",
          value: 2.1
        },
        {
          name: "斯洛文尼亚",
          value: 2
        },
        {
          name: "新喀里多尼亚",
          value: 1.9
        },
        {
          name: "科威特",
          value: 1.8
        },
        {
          name: "斐济共和国",
          value: 1.83
        },
        {
          name: "斯威士兰",
          value: 1.7
        },
        {
          name: "东帝汶",
          value: 1.5
        },
        {
          name: "巴哈马",
          value: 1.4
        },
        {
          name: "黑山",
          value: 1.38
        },
        {
          name: "瓦努阿图",
          value: 1.2
        },
        {
          name: "福克兰群岛",
          value: 1.22
        },
        {
          name: "福克兰",
          value: 1.22
        },
        {
          name: "卡塔尔",
          value: 1.1
        },
        {
          name: "冈比亚",
          value: 1.1
        },
        {
          name: "牙买加",
          value: 1.1
        },
        {
          name: "黎巴嫩",
          value: 1
        },
        {
          name: "塞浦路斯",
          value: 0.9
        },
        {
          name: "波多黎各",
          value: 0.9
        },
        {
          name: "法属南半球和南极领地",
          value: 0.77
        },
        {
          name: "奥兰群岛",
          value: 0.67
        },
        {
          name: "文莱",
          value: 0.6
        },
        {
          name: "巴勒斯坦",
          value: 0.62
        },
        {
          name: "佛得角共和国",
          value: 0.4
        },
        {
          name: "北塞浦路斯",
          value: 0.33
        },
        {
          name: "萨摩亚",
          value: 0.3
        },
        {
          name: "卢森堡",
          value: 0.25
        },
        {
          name: "科摩罗伊斯兰联邦共和国",
          value: 0.2
        },
        {
          name: "毛里求斯",
          value: 0.2
        },
        {
          name: "香港",
          value: 0.1
        },
        {
          name: "新加坡",
          value: 0.1
        },
        {
          name: "塞舌尔",
          value: 0.1
        },
        {
          name: "关岛",
          value: 0.1
        },
        {
          name: "法罗群岛",
          value: 0.13
        },
        {
          name: "巴林王国",
          value: 0.07
        },
        {
          name: "汤加",
          value: 0.1
        },
        {
          name: "马恩岛",
          value: 0.05
        },
        {
          name: "安提瓜和巴布达",
          value: 0.04
        },
        {
          name: "安道尔",
          value: 0.04
        },
        {
          name: "巴巴多斯",
          value: 0.04
        },
        {
          name: "帕劳",
          value: 0.04
        },
        {
          name: "塞舌尔",
          value: 0.04
        },
        {
          name: "格林纳达",
          value: 0.03
        },
        {
          name: "马尔他",
          value: 0.03
        },
        {
          name: "赫德岛和麦克唐纳群岛",
          value: 0.03
        },
        {
          name: "特里尼达和多巴哥",
          value: 0.02
        },
        {
          name: "未知国家S.Geo",
          value: 0.01
        },
        {
          name: "英属印度洋领土",
          value: 0.006
        }
      ],
      nameMap: {
        Samoa: "萨摩亚",
        Aland: "奥兰群岛",
        Andorra: "安道尔",
        "Singapore Rep.": "新加坡",
        "Dominican Rep.": "多米尼加",
        Palestine: "巴勒斯坦",
        Bahamas: "巴哈马",
        "Timor-Leste": "东帝汶",
        Afghanistan: "阿富汗",
        "Guinea-Bissau": "几内亚比绍",
        "Côte d'Ivoire": "科特迪瓦",
        "Siachen Glacier": "锡亚琴冰川",
        "Br. Indian Ocean Ter.": "英属印度洋领土",
        Angola: "安哥拉",
        Albania: "阿尔巴尼亚",
        "United Arab Emirates": "阿联酋",
        Argentina: "阿根廷",
        Armenia: "亚美尼亚",
        "Fr. S. Antarctic Lands": "法属南半球和南极领地",
        Australia: "澳大利亚",
        Austria: "奥地利",
        Azerbaijan: "阿塞拜疆",
        Burundi: "布隆迪",
        Belgium: "比利时",
        Benin: "贝宁",
        Bahrain: "巴林王国",
        "Burkina Faso": "布基纳法索",
        Bangladesh: "孟加拉国",
        Bulgaria: "保加利亚",
        "The Bahamas": "巴哈马",
        "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
        Belarus: "白俄罗斯",
        Belize: "伯利兹",
        Bermuda: "百慕大",
        Bolivia: "玻利维亚",
        Brazil: "巴西",
        Brunei: "文莱",
        Bhutan: "不丹",
        Botswana: "博茨瓦纳",
        "Central African Rep.": "中非",
        Canada: "加拿大",
        Switzerland: "瑞士",
        Chile: "智利",
        China: "中国",
        Comoros: "科摩罗伊斯兰联邦共和国",
        "Ivory Coast": "象牙海岸",
        Cameroon: "喀麦隆",
        "Dem. Rep. Congo": "刚果民主共和国",
        Congo: "刚果",
        Colombia: "哥伦比亚",
        "Costa Rica": "哥斯达黎加",
        Cuba: "古巴",
        "N. Cyprus": "北塞浦路斯",
        Cyprus: "塞浦路斯",
        "Czech Rep.": "捷克",
        Germany: "德国",
        Guam: "关岛",
        Djibouti: "吉布提",
        Denmark: "丹麦",
        Algeria: "阿尔及利亚",
        Ecuador: "厄瓜多尔",
        Egypt: "埃及",
        Eritrea: "厄立特里亚",
        Spain: "西班牙",
        Estonia: "爱沙尼亚",
        Ethiopia: "埃塞俄比亚",
        Finland: "芬兰",
        Fiji: "斐济共和国",
        "Falkland Islands": "福克兰群岛",
        "Falkland Is.": "福克兰",
        France: "法国",
        "Faeroe Is.": "法罗群岛",
        "Isle of Man": "马恩岛",
        Gabon: "加蓬",
        "United Kingdom": "英国",
        Georgia: "格鲁吉亚",
        Ghana: "加纳",
        Guinea: "几内亚",
        Gambia: "冈比亚",
        "Eq. Guinea": "赤道几内亚",
        Greece: "希腊",
        Greenland: "格陵兰",
        Guatemala: "危地马拉",
        "French Guiana": "法属圭亚那",
        Guyana: "圭亚那",
        Honduras: "洪都拉斯",
        Croatia: "克罗地亚",
        Haiti: "海地",
        Hungary: "匈牙利",
        Indonesia: "印度尼西亚",
        India: "印度",
        Ireland: "爱尔兰",
        Iran: "伊朗",
        Iraq: "伊拉克",
        Iceland: "冰岛",
        Israel: "以色列",
        Italy: "意大利",
        Jamaica: "牙买加",
        Jordan: "约旦",
        Japan: "日本",
        Kazakhstan: "哈萨克斯坦",
        Kenya: "肯尼亚",
        Kyrgyzstan: "吉尔吉斯斯坦",
        Cambodia: "柬埔寨",
        Korea: "韩国",
        Kosovo: "科索沃",
        Kuwait: "科威特",
        "Lao PDR": "老挝",
        Lebanon: "黎巴嫩",
        Liberia: "利比里亚",
        Libya: "利比亚",
        "Sri Lanka": "斯里兰卡",
        Lesotho: "莱索托",
        Lithuania: "立陶宛",
        Luxembourg: "卢森堡",
        Latvia: "拉脱维亚",
        Morocco: "摩洛哥",
        Moldova: "摩尔多瓦",
        Madagascar: "马达加斯加",
        Mexico: "墨西哥",
        Macedonia: "马其顿",
        Mali: "马里",
        Myanmar: "缅甸",
        Montenegro: "黑山",
        Mongolia: "蒙古",
        Mozambique: "莫桑比克",
        Mauritania: "毛里塔尼亚",
        Mauritius: "毛里求斯",
        Malawi: "马拉维",
        Malaysia: "马来西亚",
        Namibia: "纳米比亚",
        "New Caledonia": "新喀里多尼亚",
        Niger: "尼日尔",
        Nigeria: "尼日利亚",
        Nicaragua: "尼加拉瓜",
        Netherlands: "荷兰",
        Norway: "挪威",
        Nepal: "尼泊尔",
        "New Zealand": "新西兰",
        Oman: "阿曼",
        Pakistan: "巴基斯坦",
        Panama: "巴拿马",
        Peru: "秘鲁",
        Philippines: "菲律宾",
        "Papua New Guinea": "巴布亚新几内亚",
        Poland: "波兰",
        "Puerto Rico": "波多黎各",
        "Dem. Rep. Korea": "朝鲜",
        Portugal: "葡萄牙",
        Palau: "帕劳",
        Paraguay: "巴拉圭",
        Qatar: "卡塔尔",
        Romania: "罗马尼亚",
        Russia: "俄罗斯",
        Rwanda: "卢旺达",
        "W. Sahara": "西撒哈拉",
        "Saudi Arabia": "沙特阿拉伯",
        Sudan: "苏丹",
        "S. Sudan": "南苏丹",
        Senegal: "塞内加尔",
        "S. Geo. and S. Sandw. Is.": "未知国家S.Geo",
        "Solomon Is.": "所罗门群岛",
        "Sierra Leone": "塞拉利昂",
        "El Salvador": "萨尔瓦多",
        Somaliland: "索马里兰",
        Somalia: "索马里",
        Serbia: "塞尔维亚",
        Suriname: "苏里南",
        Slovakia: "斯洛伐克",
        Slovenia: "斯洛文尼亚",
        Sweden: "瑞典",
        Swaziland: "斯威士兰",
        Syria: "叙利亚",
        Chad: "乍得",
        Togo: "多哥",
        Thailand: "泰国",
        Tajikistan: "塔吉克斯坦",
        Turkmenistan: "土库曼斯坦",
        "East Timor": "东帝汶",
        "Trinidad and Tobago": "特里尼达和多巴哥",
        Tunisia: "突尼斯",
        Turkey: "土耳其",
        Tanzania: "坦桑尼亚",
        Uganda: "乌干达",
        Ukraine: "乌克兰",
        Uruguay: "乌拉圭",
        "United States": "美国",
        Uzbekistan: "乌兹别克斯坦",
        Venezuela: "委内瑞拉",
        Vietnam: "越南",
        "Cape Verde": "佛得角共和国",
        Vanuatu: "瓦努阿图",
        "West Bank": "西岸",
        Yemen: "也门",
        "South Africa": "南非",
        Zambia: "赞比亚",
        "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
        Seychelles: "塞舌尔",
        "Fr. Polynesia": "玻里尼西亚",
        Zimbabwe: "津巴布韦"
      },
      tabsCur: "0",
      // pageSize: 10,
      // pageNum: 1,
      tabs: [
        {
          name: "akflaj",
          label: "交房贷拉设计费拉设计费拉设计费打死了阿熟练度附近说了",
          id: "12"
        },
        {
          name: "akflaj",
          label: "交房贷拉设计费拉设计费拉设计费打死了阿熟练度附近说了",
          id: "123"
        }
      ]
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
        backgroundColor: "#02AFDB",
        title: {
          //地图显示标题
          text: "全球国家面积排行榜",
          subtext: "Global ranking of country area",
          sublink: "http://www.baidu.com",
          top: "30px",
          left: "center",
          textStyle: { color: "#fff" }
        },
        visualMap: {
          //图列显示柱
          type: "continuous",
          min: 0,
          left: 30,
          max: 2000,
          text: ["大", "小"],
          realtime: false,
          calculable: true,
          color: ["orangered", "yellow", "lightskyblue"]
        },

        tooltip: {
          //提示框组件
          trigger: "item",
          formatter: "{b}<br/>{c} 万平方公里"
        },
        series: [
          {
            name: "国家面积",
            type: "map",
            mapType: "world",
            roam: true,
            mapLocation: { y: 100 },
            data: this.data, //绑定数据
            nameMap: this.nameMap,
            symbolSize: 12,
            label: {
              normal: { show: false },
              emphasis: { show: false }
            },
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          }
        ]
      });
    },
    // pageChange(v) {
    //   if (v == this.pageNum) return;
    //   this.pageNum = v;
    //   this.getListDatas();
    //   document.body.scrollTop = document.documentElement.scrollTop = 0;
    // },
    tabsliClick(obj, index) {
      if (this.tabsCur == obj.id) return;
      this.tabsCur = obj.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.left-title {
  height: 40px;
  line-height: 40px;
}
.left-title .title {
  font-weight: 700;
  width: 8.75rem;
  display: inline-block;
}
.detail-content {
  background: #fff;
  .breadcrumb-nav {
    border-top: 1px solid #eee;
    padding: 15px 0 15px;
    line-height: 35px;
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
    padding-top: 25px;
    .tips-list {
      padding-top: 15px;
      .list-box {
        position: relative;
        line-height: 25px;
        font-size: 13px;
        color: #333;
        padding-left: 20px;
        padding-bottom: 10px;
        cursor: pointer;
        &:hover {
          color: #3c8cbf;
        }
        .icon-right {
          position: absolute;
          left: 0;
          font-size: 14px;
          top: 0;
          color: #566;
          line-height: 50px;
        }
        &.cur {
          p {
            color: #3c8cbf !important;
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
    .pagination {
      padding-top: 10px;
    }
  }
  .right-content-box {
    flex: 1;
    padding: 25px 0 60px 40px;
    position: relative;
    z-index: 1;
    .detail-box-top {
      padding-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      .page-title-name {
        font-size: 26px;
        color: #333;
        padding: 15px 0;
        line-height: 38px;
      }
      p {
        line-height: 30px;
        color: #333;
      }
    }
    .detail-box-content {
      .section-box {
        font-size: 16px;
        color: #444;
        padding: 20px 0 10px;
        line-height: 30px;
        font-weight: 600;
      }
      .section-box-text {
        li {
          color: #333;
          font-size: 14px;
          line-height: 30px;
          &::before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 5px;
            background: #ccc;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
      }
      .section-box-word {
        .word-list {
          position: relative;
          padding-left: 45px;
          line-height: 20px;
          padding-bottom: 12px;
          .word-icon {
            position: absolute;
            left: 0;
            top: 7px;
            font-size: 35px;
            color: #3c8cbf;
          }
        }
      }
    }
    .text-box {
      line-height: 30px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
<style lang="scss">
.detail-tab {
  .tabcur {
    padding: 9px 30px;
    background: #d7e8f2;
    border-color: #d7e8f2;
    color: #3c8cbf;
  }
  .tabdefault {
    padding: 9px 30px;
    background: #fff;
    border-color: #3c8cbf;
    color: #3c8cbf;
  }
}
.table {
  margin-top: 5px;
  .el-table {
    border: 1px solid #ccc;
  }
  .el-table th {
    background: #ebf3f8;
    padding: 4px 0;
    font-weight: normal;
    color: #333;
  }
  .el-table td {
    color: #333;
    font-size: 14px;
    border-right: 1px solid #ccc;
    padding: 8px 0;
  }
}
</style>
