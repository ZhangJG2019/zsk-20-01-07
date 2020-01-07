var echarts = require('echarts')
// let echarts = require("echarts/lib/echarts");
// require("echarts/lib/chart/bar"); // 引入柱状图组件
// require("echarts/lib/chart/pie"); // 引入饼状图组件
// require("echarts/map/js/china.js"); // 引入中国地图组件 // 引入提示框和title组件
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title"); require("echarts/theme/macarons");
// //引入主题 require("echarts/theme/shine");
let echartFun = {}

echartFun.pie = function (el, opt) {
  var myChart = echarts.init(document.getElementById(el))
  var color = [
    '#22cccc', '#3ea3d8', '#a1e5b9', '#feda67', '#e6bef2',
    '#3dc6e7', '#6de0e2', '#fd9f83', '#f97494',
    '#de65ad', '#e592d0', '#9d99f2', '#847ce7', '#98c0fd'
  ]
  console.log(opt)
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        var res = params.name
        res += '<br />总数：' + Number(params.value)
        return res
      }
    },
    series: [{
      name: '各应用总览',
      type: 'pie',
      radius: [
        '0', '55%'
      ],
      center: [
        '50%', '50%'
      ],
      clockwise: true,
      color: color,

      data: opt.data,
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          textStyle: {
            color: '#999',
            fontSize: 12
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          borderWidth: 1,
          borderColor: '#ffffff'
        },
        emphasis: {
          borderWidth: 0,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
  myChart.setOption(option)
  window.onresize = myChart.resize
}
echartFun.map = function (data) {
  return {
    // backgroundColor: '#FFFFFF',
    title: {
      text: '全国地图大数据',
      // subtext: '虚构数据',
      x: 'center'
    },
    tooltip: {
      trigger: 'item'
    },

    // 左侧小导航图标
    visualMap: {
      show: true,
      x: 'left',
      y: 'center',
      splitList: [{
        start: 5000,
        end: 99999999
      }, {
        start: 4000,
        end: 5000
      }, {
        start: 3000,
        end: 4000
      }, {
        start: 1000,
        end: 3000
      }, {
        start: 300,
        end: 1000
      }, {
        start: 0,
        end: 300
      }],
      color: [
        '#5475f5',
        '#9feaa5',
        '#85daef',
        '#74e2ca',
        '#e6ac53',
        '#9fb5ea'
      ]
    },

    // 配置属性
    series: [{
      name: '数据',
      type: 'map',
      map: 'china',
      roam: false,
      label: {
        normal: {
          show: true // 省份名称
        },
        emphasis: {
          show: false
        }
      },
      data: data
    }]
  }
}

echartFun.bar = function (el, opt, param) {
  var myChart = echarts.init(document.getElementById(el))
  var color = [
    '#9d99f2',
    '#3ea3d8',
    '#a1e5b9',
    '#feda67'
  ]
  var paramArr = JSON.parse(param)
  var xData = []
  var datas = []
  var lineChart = []
  opt.data.forEach((res) => {
    let d = res.typeName === '0' ? '女' : res.typeName === '1' ? '男' : res.typeName === '3' ? '未记录性别' : res.typeName
    let p1 = res[paramArr['0']] ? Number(res[paramArr['0']]) : 0
    let p2 = res[paramArr['1']] ? Number(res[paramArr['1']]) : 0
    let p3 = res[paramArr['2']] ? Number(res[paramArr['2']]) : 0
    let per = ((p2 + (p3 * 2)) / ((p1 + p2 + p3) * 2)) * 100
    console.log(p1, p2, p3, p2 + (p3 * 2), (p1 + p2 + p3) * 2)
    lineChart.push(per.toFixed(2))
    xData.push(d)
  })

  for (let i = 0; i < paramArr.length; i++) {
    let arr = []
    for (let j = 0; j < opt.data.length; j++) {
      let d = opt.data
      if (!d[j][paramArr[i]]) {
        d[j][paramArr[i]] = 0
      }
      arr.push(d[j][paramArr[i]])
    }
    datas.push(arr)
  }

  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    color: color,
    legend: {
      data: paramArr.concat('突变率')
    },
    xAxis: [{
      type: 'category',
      data: xData,
      axisPointer: {
        type: 'shadow'
      }
    }],
    yAxis: [{
      type: 'value',
      name: '基因'
    }, {
      type: 'value',
      name: '突变率',
      axisLabel: {
        formatter: '{value} %'
      }
    }],
    series: [{
      name: paramArr[0],
      type: 'bar',
      barMaxWidth: '10%',
      itemStyle: {
        normal: {
          barBorderRadius: 6
        }
      },
      data: datas[0]
    }, {
      name: paramArr[1],
      type: 'bar',
      barMaxWidth: '10%',
      itemStyle: {
        normal: {
          barBorderRadius: 6
        }
      },
      data: datas[1]
    }, {
      name: paramArr[2],
      type: 'bar',
      barMaxWidth: '10%',
      itemStyle: {
        normal: {
          barBorderRadius: 6
        }
      },
      data: datas[2]
    }, {
      name: '突变率',
      type: 'line',
      yAxisIndex: 1,
      data: lineChart
    }]
  }
  myChart.setOption(option)
  window.onresize = myChart.resize
}

export default echartFun
