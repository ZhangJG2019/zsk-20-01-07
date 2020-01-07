var echarts = require('echarts')
let echartFun2 = {}

echartFun2.pie2 = function (data) {
  var color = [
    '#22cccc', '#3ea3d8', '#a1e5b9', '#feda67', '#e6bef2', '#3dc6e7', '#6de0e2',
    '#fd9f83', '#f97494', '#de65ad', '#e592d0', '#9d99f2',
    '#847ce7', '#98c0fd'
  ]
  return {
    backgroundColor: '#FFFFFF',
    title: {
      // text: '中国',
      // subtext: '虚构数据',
      x: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: data
    },
    // 配置属性
    series: [{
      // name: '各应用总览',
      type: 'pie',
      radius: ['0', '55%'],
      center: ['50%', '50%'],
      clockwise: true,
      color: color,
      data: data,
      label: {
        normal: {
          formatter: '{b}\n（ {d}% ）',
          textStyle: {
            color: '#555',
            fontSize: 15
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
}
echartFun2.pie = function (el, opt) {
  var myChart = echarts.init(document.getElementById(el))
  var color = [
    '#22cccc', '#3ea3d8', '#a1e5b9', '#feda67', '#e6bef2', '#3dc6e7', '#6de0e2',
    '#fd9f83', '#f97494', '#de65ad', '#e592d0', '#9d99f2',
    '#847ce7', '#98c0fd'
  ]
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        var res = params.name
        if (typeof (params.data.race) === undefined || params.data.race == null) {
          res += '<br />样本量：' + Number(params.value)
        } else {
          res += '<br />' + params.data.race + '<br />样本量：' + Number(params.value)
        }
        return res
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: opt.data
      // selected: data.selected
    },
    series: [{
      name: '各应用总览',
      type: 'pie',
      radius: ['0', '55%'],
      center: ['50%', '50%'],
      clockwise: true,
      color: color,
      data: opt.data,
      label: {
        normal: {
          formatter: '{b} \n( {d}% ) ',
          //   function (params) {
          //   var res = params.name;
          //   if (typeof (params.data.race) == 'undefined' || params.data.race == null) {
          //     res += "\n样本量：" + Number(params.value);
          //   } else {
          //     res += "\n" + params.data.race + "\n样本量：" + Number(params.value);
          //   }
          //   return res;
          // },
          textStyle: {
            color: '#555',
            fontSize: 15
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

export default echartFun2
